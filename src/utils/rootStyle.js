export const applyStyle = (property, value) => {
  const root = document.documentElement;

  root.style.setProperty(property, value);
};
