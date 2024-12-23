import { useMemo } from "react";

import ImgLogo from "../../assets/cart-icon.png";

import UserCartItemsContent from "./cartItemsContent";

import { Button } from "../ui/button";
import {
  SheetTitle,
  SheetClose,
  SheetFooter,
  SheetHeader,
  SheetContent,
  SheetDescription,
} from "../ui/sheet";
import { useNavigate } from "react-router";

const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    if (!cartItems || cartItems.length === 0) return 0;
    return (
      cartItems.reduce(
        (sum, item) =>
          sum +
          (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
        0
      ) || 0
    );
  }, [cartItems]);

  return (
    <SheetContent className="overflow-auto sm:max-w-md">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-5">
          <img src={ImgLogo} alt="Company logo" width={32} /> Your Cart
        </SheetTitle>
        <SheetDescription>Manage your selected items below</SheetDescription>
      </SheetHeader>

      <div className="mt-8 space-y-6">
        {cartItems?.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <UserCartItemsContent key={item.productId} item={item} />
            ))}

            <div className="">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">${totalPrice?.toFixed(2)}</span>
              </div>
            </div>

            <SheetFooter>
              <SheetClose asChild className="w-full">
                <Button
                  type="submit"
                  className="w-full"
                  onClick={() => {
                    setOpenCartSheet(false);
                    navigate("/shopping/checkout");
                  }}
                >
                  Checkout
                </Button>
              </SheetClose>
            </SheetFooter>
          </>
        ) : (
          <p className="font-semibold text-center text-slate-500">
            Your cart is empty.
          </p>
        )}
      </div>
    </SheetContent>
  );
};
export default UserCartWrapper;
