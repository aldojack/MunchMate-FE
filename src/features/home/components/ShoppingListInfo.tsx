import Button from "@/components/shared/Button/Button";
import img from "/images/grocerylist.jpg";

const ShoppingListInfo = () => {
  return (
    <section className="flex flex-col md:grid md:grid-cols-2 gap-8 items-center py-16 px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto">
      <div className="order-2 md:order-1 max-w-md md:max-w-lg mx-auto">
        <img
          src={img}
          className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
          alt="grocery list"
        />
      </div>
      <div className="flex justify-center items-center flex-col gap-6 order-1 md:order-2 max-w-lg">
        <div className="flex flex-col space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
            Your <span className="text-secondary font-bold">ingredients</span>,
            organised in <span className="text-accent font-bold">seconds.</span>
          </h2>
          <p className="text-lg md:text-xl text-text/80">
            Pick your meals and get a complete, combined shopping list
            instantly. Everything grouped, counted, and ready for the store.
          </p>
          <Button name="Start Now" />
        </div>
      </div>
    </section>
  );
};
export default ShoppingListInfo;
