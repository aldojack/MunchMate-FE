interface InputProps {
    name: string
    label: string
    required?: boolean
    type: string
    placeholder?: string
    data : string | number | undefined
    handleChange: (e : {target: HTMLInputElement}) => void
};


const FormInput = ({name, label,required = false, type, placeholder,data ,handleChange}: InputProps) => {
  return (
      <>
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}:{required && <span className="text-red-600 text-xl">*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={data === 0 ? "" : data}
        required={required}
        placeholder={placeholder}
        className="border-2 border-gray-400 pl-2 focus:outline-2 focus:outline-blue-600 rounded-md w-full"
        onChange={handleChange}
      />
      </>
  );
};

export default FormInput;
