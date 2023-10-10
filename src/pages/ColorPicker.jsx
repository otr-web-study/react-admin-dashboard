import { useState } from 'react';
import Circle from '@uiw/react-color-circle';
import Chrome from '@uiw/react-color-chrome';
import { GithubPlacement } from '@uiw/react-color-github';
import { Header } from '../components';

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

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Color Picker" />
      <div className="text-center">
        <div id="preview" style={{ backgroundColor: color }} />
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
    </div>
  );
};

export default ColorPicker;
