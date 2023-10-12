const PageContainer = ({ children }) => {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:text-gray-200 dark:bg-secondary-dark-bg">
      {children}
    </div>
  );
};

export default PageContainer;
