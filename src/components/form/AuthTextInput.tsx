type AuthTextInputProps = {
  value?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  className?: string;
};

const AuthTextInput = ({
  value,
  placeholder,
  id,
  name,
  className,
}: AuthTextInputProps) => {
  return (
    <input
      className=" rounded-md border border-solid p-2 shadow-sm focus:border-solid focus:border-sky-400 focus:outline-0"
      type="text"
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default AuthTextInput;
