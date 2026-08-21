import { Drawer } from "@mui/material";
import useShoppingContext from "@/features/shopping-list/hooks/useShoppingContext";
import { ShoppingListItem } from "../types";

const ShoppingListComponent = ({
  item,
  toggleChecked,
}: {
  item: ShoppingListItem;
  toggleChecked: (item: ShoppingListItem) => void;
}) => {
  return (
    <li className={`list-none border-b border-[#ccc] h-auto`}>
      <button
        onClick={() => toggleChecked(item)}
        className={`p-2 text-text indent-14 ${item.isChecked ? "line-through" : ""} `}
        type="button"
      >
        {item.name}: {item.quantity} {item.unit}
      </button>
    </li>
  );
};

const ShoppingListDrawer = () => {
  const { shoppingList, isDrawerOpen, toggleDrawer, toggleChecked } =
    useShoppingContext();

  const unchecked = shoppingList.filter((item) => !item.isChecked);
  const checked = shoppingList.filter((item) => item.isChecked);

  return (
    <Drawer open={isDrawerOpen} anchor="right" onClose={toggleDrawer}>
      <div className="w-screen sm:w-[80vw] md:w-96 lg:w-[450px] p-4 h-full  bg-background">
        <div className="flex justify-between">
          <h2 className="text-text text-xl font-medium">Shopping List</h2>
          <button
            onClick={toggleDrawer}
            className="text-lg font-semibold"
            type="button"
          >
            X
          </button>
        </div>
        <div className="relative">
          <div className="absolute border-l border-[#ffaa9f] border-r h-full ml-10 mr-6 px-1"></div>
          {!!unchecked.length && (
            <>
              <h3 className="text-lg underline font-medium indent-14">Need</h3>
              <ul className="text-xl p-0 border-[1px] border-[#dedede]  bg-background">
                {unchecked.map((item) => (
                  <ShoppingListComponent
                    item={item}
                    toggleChecked={toggleChecked}
                    key={item.id}
                  />
                ))}
              </ul>
            </>
          )}

          {!!checked.length && (
            <>
              <h3 className="text-lg underline font-medium indent-14">Got</h3>
              <ul className="text-xl p-0 border-[1px] border-[#dedede] bg-background">
                {checked.map((item) => (
                  <ShoppingListComponent
                    item={item}
                    toggleChecked={toggleChecked}
                    key={item.id}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default ShoppingListDrawer;
