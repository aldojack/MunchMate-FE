import { ButtonHTMLAttributes } from "react";

type FormButtonProps = {
  name: ButtonVariant;
  handler: () => void;
};

type ButtonVariant = "save" | "cancel" | "add";

type ButtonType = {
  className: string;
  displayName: string;
};

const buttonMapper = {
  save: {
    className: "bg-primary hover:bg-primary/80",
    displayName: "Save",
  },
  add: {
    className: "bg-primary hover:bg-primary/80",
    displayName: "Save and Add",
  },
  cancel: {
    className: "bg-red-500 hover:bg-red-700/80 ",
    displayName: "Cancel",
  },
} satisfies Record<ButtonVariant, ButtonType>;

const FormButton = ({
  name,
  handler,
  ...rest
}: FormButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      type="button"
      onClick={handler}
      className={`flex items-center gap-1 text-white px-4 py-2 rounded-lg transition ${buttonMapper[name].className}`}
    >
      {buttonMapper[name].displayName}
    </button>
  );
};

export default FormButton;
