import { ButtonHTMLAttributes } from "react";
type ButtonVariant = "primary" | "secondary";
// variant?: "primary" | "secondary" | "success" | "error" | "warning" | "info";

type ButtonProps = {
  name: string;
  variant?: ButtonVariant;
};

const variantMapping = {
  primary: "bg-primary",
  secondary: "bg-secondary",
} as const satisfies Record<ButtonVariant, string>;

const Button = ({
  name,
  variant = "primary",
  ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      className={`${variantMapping[variant]} rounded-lg text-white px-4 py-2 w-fit`}
      type="button"
    >
      {name}
    </button>
  );
};

export default Button;
