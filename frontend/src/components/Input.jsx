const Input = ({ label, name, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <input name={name} {...props} />
    </div>
  );
};
export default Input;
