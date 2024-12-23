import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "@/components/ui/input";
import {
  getProductDetails,
  getSearchProducts,
  resetSearchResult,
} from "@/store/shopSlice";
import { toast } from "sonner";
import ShoppingProductTile from "@/components/shopping/productTile";
import { addToCart, fetchCartItem } from "@/store/cartSlice";
import ProductDetails from "@/components/shopping/productDetails";

const ShoppingSearch = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [, setSearchParams] = useSearchParams();
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { searchResult, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );

  const handleGetProductDetails = (id) => {
    dispatch(getProductDetails(id));
    setOpen((open) => !open);
  };

  const handleAddToCart = (id, totalStock) => {
    const cart = cartItems.items || [];
    const existingItem = cart.find((item) => item.productId === id);

    // Check if the product exists in the cart and if adding another exceeds the stock
    if (existingItem) {
      const newQuantity = existingItem.quantity + 1;
      if (newQuantity > totalStock) {
        return toast.info(
          `Only ${existingItem.quantity} items can be added for this product.`
        );
      }
    }

    // Proceed to add the item to the cart
    dispatch(addToCart({ productId: id, quantity: 1 }))
      .unwrap()
      .then((data) => {
        dispatch(fetchCartItem());
        toast.success(data.message);
      })
      .catch((error) =>
        toast.error(error.message || "An error occurred while adding the item.")
      );
  };

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchProducts(keyword)).catch((err) =>
          toast.error(err.message)
        );
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(``));
      dispatch(resetSearchResult());
    }
  }, [keyword, dispatch, setSearchParams]);

  useEffect(() => {
    if (productDetails !== null) setOpen(true);
  }, [productDetails]);

  return (
    <div className="container px-4 py-8 mx-auto md:px-6">
      <div className="flex justify-center mb-8">
        <div className="flex items-center w-full">
          <Input
            value={keyword}
            placeholder="Search for products"
            className="py-6"
            name="keyword"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {searchResult?.length
          ? searchResult.map((product) => (
              <ShoppingProductTile
                product={product}
                key={product._id}
                handleAddToCart={handleAddToCart}
                handleGetProductDetails={handleGetProductDetails}
              />
            ))
          : null}
      </div>
      {!searchResult?.length && (
        <div className="w-full p-4 text-center">
          <p className="text-lg font-semibold">No products found. 🛒</p>
          <p className="text-sm text-gray-500">
            Try adjusting your search or check back later.
          </p>
        </div>
      )}

      <ProductDetails
        open={open}
        setOpen={setOpen}
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ShoppingSearch;
