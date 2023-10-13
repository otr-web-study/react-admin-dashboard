import { useState } from 'react';
import Circle from '@uiw/react-color-circle';
import Chrome from '@uiw/react-color-chrome';
import { Header, PageContainer } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const circleColors = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#607D8B',
];

const ColorPicker = () => {
  const [color, setColor] = useState('#F44336');
  const { currentMode } = useStateContext();

  return (
    <PageContainer>
      <Header category="App" title="Color Picker" />
      <div className="text-center">
        <div
          id="preview"
          className="w-full"
          style={{
            backgroundColor: color,
            background: `transparent url('/assets/images/${currentMode}-pen.png') no-repeat`,
          }}
        />
        <div className="flex justify-center items-start gap-20 flex-wrap">
          <div className="max-w-[240px]">
            <p className="text-2xl font-semibold mt-2 mb-4">Circle palette</p>
            <Circle colors={circleColors} color="hex" onChange={(color) => setColor(color.hex)} />
          </div>
          <div>
            <p className="text-2xl font-semibold mt-2 mb-4">Chrome palette</p>
            <Chrome color={color} onChange={(color) => setColor(color.hex)} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ColorPicker;
