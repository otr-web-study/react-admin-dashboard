export const applyStyle = (property, value) => {
  const root = document.documentElement;

  root.style.setProperty(property, value);
};

export const applyClass = (className, removeClassName = null) => {
  const root = document.documentElement;

  root.classList.remove(removeClassName);
  root.classList.add(className);
};
