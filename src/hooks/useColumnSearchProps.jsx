import { useRef } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';

export const useColumnSearchProps = () => {
  const searchInput = useRef(null);

  const handleReset = (clearFilters, confirm, close) => {
    clearFilters();
    confirm();
    close();
  };

  const getColumnSearchProps = (col) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div className="p-2 flex gap-1 items-center" onKeyDown={(e) => e.stopPropagation()}>
        <input
          ref={searchInput}
          placeholder={`Search ${col.title}`}
          value={selectedKeys[0] || ''}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onKeyDown={(e) => e.code === 'Enter' && confirm()}
          className="outline-none"
        />

        <button
          data-search={!!selectedKeys[0]}
          onClick={() => clearFilters && handleReset(clearFilters, confirm, close)}
          className="cursor-pointer text-gray-400 transition-all duration-300 opacity-0 hover:text-accent data-[search='true']:opacity-100"
        >
          <AiOutlineClose />
        </button>
        <button
          type="button"
          onClick={confirm}
          className="cursor-pointer text-gray-400 transition-colors duration-300 hover:text-accent"
        >
          <AiOutlineSearch />
        </button>
      </div>
    ),
    filterIcon: (filtered) => (
      <AiOutlineSearch style={{ color: filtered ? '#03c9d7' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[col.dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const setColumnSearchProps = (colGrid, searchableCols) =>
    colGrid.map((col) => {
      const searchCol = searchableCols.find((item) => item.title === col.title);
      if (!searchCol) return { ...col };
      return { ...col, ...getColumnSearchProps(searchCol) };
    });

  return { getColumnSearchProps, setColumnSearchProps };
};
