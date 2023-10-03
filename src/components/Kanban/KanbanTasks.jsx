import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  closestCenter,
  pointerWithin,
  rectIntersection,
  DndContext,
  DragOverlay,
  getFirstCollision,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensors,
  useSensor,
  MeasuringStrategy,
} from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';
// import update from 'immutability-helper';
import { SectionItem, FieldItem } from './KanbanTask';

export default function KanbanTasks({ tasks, columns }) {
  const [data, setData] = useState(null);
  const [items, setItems] = useState({});
  const [containers, setContainers] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const lastOverId = useRef(null);
  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  useEffect(() => {
    if (tasks) {
      setData(tasks);
      let cols = {};
      columns.forEach((c) => {
        cols['column-' + c.keyField] = [];
      });
      tasks.forEach((d) => {
        if (!('column-' + d.Status in cols)) {
          cols['column-' + d.Status] = [];
        }
        cols['column-' + d.Status].push('task-' + d.Id);
      });
      setItems(cols);
      setContainers(Object.keys(cols));
    }
  }, [tasks, columns]);

  const moveBetweenContainers = useCallback(
    (activeContainer, overContainer, active, over, overId) => {
      const activeItems = items[activeContainer];
      const overItems = items[overContainer];
      const overIndex = overItems.indexOf(overId);
      const activeIndex = activeItems.indexOf(active.Id);

      let newIndex;

      if (overId in items) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect?.current?.translated &&
          active.rect?.current?.translated.top >= over.rect?.top + over.rect?.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }
      recentlyMovedToNewContainer.current = true;

      setItems(
        // update(items, {
        //   [activeContainer]: {
        //     $splice: [[activeIndex, 1]],
        //   },
        //   [overContainer]: {
        //     $splice: [[newIndex, 0, active.id]],
        //     //$splice: [[newIndex, 0, items[activeContainer][activeIndex]],
        //   },
        // }),
        {
          ...items,
          [activeContainer]: items.activeContainer.toSplice(activeIndex, 1),
          [overContainer]: items.overContainer.toSplice(newIndex, 0, active.Id),
        },
      );
    },
    [items],
  );

  /**
   * Custom collision detection strategy optimized for multiple containers
   *
   * - First, find any droppable containers intersecting with the pointer.
   * - If there are none, find intersecting containers with the active draggable.
   * - If there are no intersecting containers, return the last matched intersection
   *
   */
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.Id in items,
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, 'id');

      if (overId !== null) {
        if (overId in items) {
          const containerItems = items[overId];

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) => container.Id !== overId && containerItems.includes(container.Id),
              ),
            })[0]?.Id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, items],
  );

  const [clonedItems, setClonedItems] = useState(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        //distance: 5,
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 5,
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      KeyboardSensor: {
        distance: 5,
        delay: 100,
        tolerance: 5,
      },
    }),
  );

  const findContainer = (id) => {
    if (id in items) return id;
    return containers.find((key) => items[key].includes(id));
  };

  function handleDragStart({ active }) {
    setActiveId(active.Id);
    setClonedItems(items);
  }

  function handleDragOver({ active, over }) {
    const overId = over?.Id;

    if (!overId || active.Id in items) return;

    const overContainer = findContainer(overId);
    const activeContainer = findContainer(active.Id);

    if (!overContainer || !activeContainer) return;

    if (activeContainer !== overContainer) {
      moveBetweenContainers(activeContainer, overContainer, active, over, overId);
    }
  }

  function handleDragEnd({ active, over }) {
    if (!over) {
      setActiveId(null);
      return;
    }

    if (active.Id in items && over?.Id) {
      setContainers((containers) => {
        const activeIndex = containers.indexOf(active.Id);
        const overIndex = containers.indexOf(over.Id);

        return arrayMove(containers, activeIndex, overIndex);
      });
    }

    const activeContainer = findContainer(active.Id);

    if (!activeContainer) {
      setActiveId(null);
      return;
    }

    const overContainer = findContainer(over.Id);

    if (overContainer) {
      const activeIndex = items[activeContainer].indexOf(active.Id);
      const overIndex = items[overContainer].indexOf(over.Id);

      if (activeIndex !== overIndex) {
        setItems((items) => ({
          ...items,
          [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
        }));
      }
    }

    setActiveId(null);
  }

  const handleDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  return (
    <div className="kanban">
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetectionStrategy}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.WhileDragging,
          },
        }}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="kanban-container">
          <SortableContext items={containers} strategy={horizontalListSortingStrategy}>
            {containers.map((containerId) => {
              return (
                <SectionItem
                  id={containerId}
                  key={containerId}
                  items={items[containerId]}
                  name={columns.filter((c) => 'column-' + c.keyField === containerId)[0].headerText}
                  data={data}
                  isSortingContainer={isSortingContainer}
                />
              );
            })}
          </SortableContext>
        </div>
        <DragOverlay>
          {activeId ? (
            containers.includes(activeId) ? (
              <SectionItem
                id={activeId}
                items={items[activeId]}
                name={columns.filter((c) => 'column-' + c.keyField === activeId)[0].headerText}
                data={data}
                dragOverlay
              />
            ) : (
              <FieldItem
                id={activeId}
                item={data.filter((d) => 'task-' + d.Id === activeId)[0]}
                dragOverlay
              />
            )
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
