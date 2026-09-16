import type { ButtonHTMLAttributes } from "react";
type ButtonVariant = "primary" | "secondary";
// variant?: "primary" | "secondary" | "success" | "error" | "warning" | "info";

type ButtonProps = {
  name: string;
  variant?: ButtonVariant;
  type?: HTMLButtonElement["type"];
};

const variantMapping = {
  primary: "bg-primary",
  secondary: "bg-secondary",
} as const satisfies Record<ButtonVariant, string>;

const Button = ({
  name,
  variant = "primary",
  type = "button",
  ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      className={`${variantMapping[variant]} rounded-lg text-white px-4 py-2 w-fit`}
      type={type}
    >
      {name}
    </button>
  );
};

export default Button;
