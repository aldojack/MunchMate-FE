import { ButtonHTMLAttributes } from "react";

interface Props {
  name: ButtonVariant;
  handler: () => void;
}

type ButtonVariant = "save" | "cancel" | "add";

type ButtonType = {
  className: string;
  displayName: string;
};

const buttonMapper: Record<ButtonVariant, ButtonType> = {
  save: {
    className:
      "flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition",
    displayName: "Save",
  },
  add: {
    className: 'flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition',
    displayName: 'Save and Add'
  },
  cancel: {
    className:
      "flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition",
    displayName: "Cancel",
  },
};

const FormButton = ({ name, handler, ...rest }: Props & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
    {...rest}
      type="button"
      onClick={handler}
      className={buttonMapper[name].className}
    >
      {buttonMapper[name].displayName}
    </button>
  );
};

export default FormButton;
