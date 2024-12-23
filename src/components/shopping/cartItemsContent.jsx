import { deleteCartItem, updateCartQuantity } from "@/store/cartSlice";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Button } from "../ui/button";

const UserCartItemsContent = ({ item }) => {
  const dispatch = useDispatch();

  const handleDeleteCartItem = (id) => {
    dispatch(deleteCartItem(id))
      .unwrap()
      .then((data) =>
        toast.success(data.message || "Item removed from cart successfully")
      )
      .catch((err) =>
        toast.error(err.message || "Failed to remove item from cart")
      );
  };

  const handleUpdateCartQuantity = (productId, newQuantity, totalStock) => {
    // Check if the new quantity exceeds the available stock
    if (newQuantity > totalStock)
      return toast.info(
        `Only ${totalStock} items are available for this product.`
      );

    // Validate that quantity is not less than 1
    if (newQuantity < 1) return toast.info("Quantity must be at least 1.");

    // Dispatch the update action
    dispatch(updateCartQuantity({ productId, quantity: newQuantity }))
      .unwrap()
      .then((data) =>
        toast.success(data.message || "Cart updated successfully.")
      )
      .catch((err) => toast.error(err.message || "Failed to update cart."));
  };

  return (
    <div className="flex gap-2">
      <img
        src={item.image}
        alt={`Image of ${item.title}`}
        className="object-cover w-16 h-16 rounded-md"
      />
      <div className="flex flex-col justify-between flex-1 p-1">
        <div className="flex justify-between">
          <span className="font-bold text-gray-800">{item.title}</span>
          <span className="font-semibold text-gray-600">
            $
            {(
              (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity
            )?.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="w-6 h-6 rounded-full"
              size="icon"
              aria-label="Decrease quantity"
              disabled={item.quantity === 1}
              onClick={() =>
                handleUpdateCartQuantity(
                  item.productId,
                  item.quantity - 1,
                  item.totalStock
                )
              }
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="font-medium">{item.quantity}</span>
            <Button
              variant="outline"
              className="w-6 h-6 rounded-full"
              size="icon"
              aria-label="Increase quantity"
              onClick={() =>
                handleUpdateCartQuantity(
                  item.productId,
                  item.quantity + 1,
                  item.totalStock
                )
              }
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <Trash2
            className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-700"
            aria-label="Remove item"
            onClick={() => handleDeleteCartItem(item.productId)}
          />
        </div>
      </div>
    </div>
  );
};

export default UserCartItemsContent;
