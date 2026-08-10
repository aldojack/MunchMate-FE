import { ButtonHTMLAttributes } from "react";
type ButtonProps = {
  name: string;
};

const Button = ({
  name,
  ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      className="bg-primary rounded-lg text-white px-4 py-2 w-fit"
    >
      {name}
    </button>
  );
};

export default Button;
