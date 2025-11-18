import React from 'react'
import Button from '../../components/Button'
import img from "/images/grocerylist.jpg";

const ShoppingListInfo = () => {
  return (
          <section className="flex flex-col md:grid md:grid-cols-2 gap-4">
        <div>
          <img
            src={img}
            className="w-full object-cover rounded-3xl"
            alt="grocery list"
          />
        </div>
        <div className="flex justify-center items-center flex-col gap-4">
          <div className="flex flex-col space-y-4">
            <h2 className="text-lg md:text-2xl ">
              Your <span className="text-primary font-bold">ingredients</span>, organised in <span className="text-primary font-bold">seconds.</span>
            </h2>
            <p>
              Pick your meals and get a complete, combined shopping list
              instantly. Everything grouped, counted, and ready for the store.
            </p>
            <Button name="Start Now" />
          </div>
        </div>
      </section>
  )
}
export default ShoppingListInfo