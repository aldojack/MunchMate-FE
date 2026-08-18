import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { createPortal } from "react-dom";
import useShoppingContext from "@/hooks/useShoppingContext";

const ShoppingListFab = () => {
  const { shoppingList, toggleDrawer } = useShoppingContext();

  return createPortal(
    shoppingList.length > 0 && (
      <button
        type="button"
        onClick={toggleDrawer}
        aria-label="Open shopping list"
        className="
        fixed bottom-4 right-4 z-[500]
        h-14 w-14
        rounded-full
        border-2 border-primary
        bg-primary text-white
        flex items-center justify-center
        shadow-md
        transition
        hover:shadow-lg
        active:scale-95
        focus:outline-none
        focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        <div className="relative">
          <div
            className="absolute right-[-15px] top-[-15px] rounded-full bg-accent px-2 shadow-md text-white"
            aria-label="shopping list badge counter"
          >
            {shoppingList.length}
          </div>
          <ReceiptLongIcon sx={{ fontSize: "2.25rem" }} />
        </div>
      </button>
    ),
    document.body,
  );
};

export default ShoppingListFab;
