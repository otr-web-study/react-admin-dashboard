import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Header, PageContainer } from '../components';
import { EditorData } from '../data/dummy';

const Editor = () => {
  const [value, setValue] = useState(EditorData);

  return (
    <PageContainer>
      <Header category="App" title="Editor" />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        className="shadow-xl rounded-lg [&>.ql-container]:min-h-[50vh] [&>.ql-container]:rounded-b-lg [&>.ql-container]:border-none [&>.ql-toolbar]:bg-light-gray dark:[&_*]:bg-secondary-dark-bg dark:[&_*]:dark:stroke-gray-200 dark:[&_*]:dark:text-gray-200 [&>.ql-toolbar]:rounded-t-lg [&>.ql-toolbar]:border-t-0 [&>.ql-toolbar]:border-x-0"
      />
    </PageContainer>
  );
};

export default Editor;
