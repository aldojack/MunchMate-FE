interface InputProps {
  name: string;
  label: string;
  required?: boolean;
  type: string;
  placeholder?: string;
  data: string | number | undefined;
  handleChange: (e: { target: HTMLInputElement }) => void;
}

const FormInput = ({
  name,
  label,
  required = false,
  type,
  placeholder,
  data,
  handleChange,
}: InputProps) => {
  return (
    <>
      <label htmlFor={name} className="text-sm font-medium text-secondary">
        {label}:{required && <span className="text-red-600 text-xl">*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={data === 0 ? "" : data}
        required={required}
        placeholder={placeholder}
        className="border-2 border-accent pl-2 focus:outline-2 focus:outline-primary rounded-md w-full bg-background text-text"
        onChange={handleChange}
      />
    </>
  );
};

export default FormInput;
