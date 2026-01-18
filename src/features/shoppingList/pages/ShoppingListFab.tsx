import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { createPortal } from "react-dom";
import useShoppingContext from "../../../context/useShoppingContext";

const ShoppingListFab = () => {
  const { shoppingList } = useShoppingContext();

  const showList = () => {
    console.log(shoppingList)
  }

  return createPortal( shoppingList.length > 0 &&
    <button
    onClick={showList}
      aria-label="Open shopping list"
      className="
    fixed bottom-4 right-4 z-[500]
    h-14 w-14
    rounded-full
    border-2 border-text
    bg-background text-text
    flex items-center justify-center
    shadow-md
    transition
    hover:shadow-lg
    active:scale-95
    focus:outline-none
    focus:ring-2 focus:ring-accent focus:ring-offset-2
  "
    >
      <div className="relative">
        <div
          className="absolute right-[-15px] top-[-15px] rounded-full bg-accent px-2 shadow-md"
          aria-label="shopping list badge counter"
        >
          {shoppingList.length}
        </div>
        <ReceiptLongIcon sx={{ fontSize: "2.25rem" }} />
      </div>
    </button>,
    document.body,
  );
};

export default ShoppingListFab;
