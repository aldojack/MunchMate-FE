interface Props {
  name: string;
}

const Button = ({ name }: Props) => {
  return (
    <button className="bg-blue-600 rounded-lg text-white px-4 py-2 w-fit">
      {name}
    </button>
  );
};

export default Button;
