const Button = ({ bgColor, color, borderRadius, text, size }) => {
  return (
    <button
      type="button"
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={`text-${size} p-3 hover:drop-shadow-xl transition-all duration-300`}
    >
      {text}
    </button>
  );
};

export default Button;
