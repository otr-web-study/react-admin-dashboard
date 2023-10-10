import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Header } from '../components';
import { EditorData } from '../data/dummy';

const Editor = () => {
  const [value, setValue] = useState(EditorData);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Editor" />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        className="shadow-xl rounded-lg [&>.ql-container]:min-h-[50vh] [&>.ql-container]:rounded-b-lg [&>.ql-container]:border-none [&>.ql-toolbar]:bg-light-gray [&>.ql-toolbar]:rounded-t-lg [&>.ql-toolbar]:border-t-0 [&>.ql-toolbar]:border-x-0"
      />
    </div>
  );
};

export default Editor;
