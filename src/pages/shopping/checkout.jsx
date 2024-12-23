import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import accImg from "../../assets/account.jpg";

import Address from "@/components/shopping/address";
import UserCartItemsContent from "@/components/shopping/cartItemsContent";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/store/orderSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ShoppingCheckout = () => {
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { isLoading: loadingCheckout } = useSelector(
    (state) => state.shoppingOrder
  );

  const totalAmount = useMemo(() => {
    return (
      cartItems?.items?.reduce(
        (sum, item) =>
          sum +
          (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
        0
      ) || 0
    );
  }, [cartItems]);

  const handleCheckout = () => {
    if (!selectedAddress) return toast.info("Please select an address.");

    const orderData = {
      cartId: cartItems.cartId,
      items: cartItems.items.map((cartItem) => ({
        productId: cartItem.productId,
        title: cartItem.title,
        image: cartItem.image,
        price: cartItem.price,
        salePrice: cartItem.salePrice,
        quantity: cartItem.quantity,
      })),
      address: {
        addressId: selectedAddress._id,
        address: selectedAddress.address,
        city: selectedAddress.city,
        phone: selectedAddress.phone,
        pinCode: selectedAddress.pinCode,
        note: selectedAddress.note,
      },
      totalAmount,
    };

    dispatch(createCheckoutSession(orderData))
      .unwrap()
      .then((data) => {
        toast.success(data.message);
        window.location.href = data.url;
      })
      .catch((err) => {
        toast.error(err.message || "Something went wrong.");
      });
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          alt="Account"
          className="object-cover object-center w-full h-full"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 p-5 mt-5 sm:grid-cols-2">
        <Address
          setSelectedAddress={setSelectedAddress}
          selectedAddress={selectedAddress}
        />

        <div className="flex flex-col gap-6 p-6 bg-white border rounded-lg shadow-md">
          {cartItems?.items?.length > 0 ? (
            <>
              <div className="space-y-4">
                {cartItems.items.map((item) => (
                  <UserCartItemsContent key={item.productId} item={item} />
                ))}
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total</span>
                  <span>${totalAmount?.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                type="button"
                disabled={loadingCheckout}
                onClick={handleCheckout}
                className="w-full px-4 py-3 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {!loadingCheckout ? (
                  "Checkout with Stripe"
                ) : (
                  <Loader2 className="animate-spin" />
                )}
              </Button>
            </>
          ) : (
            <p className="font-medium text-center text-gray-500">
              Your cart is empty.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
