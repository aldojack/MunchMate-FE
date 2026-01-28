import {ButtonHTMLAttributes} from "react";
interface Props {
  name: string;
}

const Button = ({ name, ...rest }: Props & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...rest} className="bg-primary rounded-lg text-white px-4 py-2 w-fit">
      {name}
    </button>
  );
};

export default Button;
