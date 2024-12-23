import Loader from "@/components/shared/Loader";
import ProductFilter from "@/components/shopping/filter";
import ProductDetails from "@/components/shopping/productDetails";
import ShoppingProductTile from "@/components/shopping/productTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItem } from "@/store/cartSlice";
import { getFilteredProducts, getProductDetails } from "@/store/shopSlice";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState("price-lowtohigh");
  const [searchParams, setSearchParams] = useSearchParams();
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const [filters, setFilters] = useState(
    JSON.parse(sessionStorage.getItem("filters")) || {}
  );
  const { isLoading, productList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );

  const categorySearchParams = searchParams.get("Category");

  const handleGetProductDetails = (id) => {
    dispatch(getProductDetails(id));
    setOpen((open) => !open);
  };

  const handleFilter = (section, option) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      const sectionOptions = updatedFilters[section] || [];

      if (sectionOptions.includes(option)) {
        updatedFilters[section] = sectionOptions.filter(
          (item) => item !== option
        );
      } else {
        // Add option if it doesn't exist
        updatedFilters[section] = [...sectionOptions, option];
      }

      // Remove the section if it becomes empty
      if (updatedFilters[section].length === 0) {
        delete updatedFilters[section];
      }

      // Persist in sessionStorage
      sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
      return updatedFilters;
    });
  };

  const buildQueryString = (filters) =>
    Object.entries(filters)
      .filter(([, values]) => values.length) // Keep non-empty filters
      .map(([key, values]) => `${key}=${values.join(",")}`) // Create query parameters
      .join("&");

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
    if (Object.keys(filters).length) {
      setSearchParams(buildQueryString(filters));
    }
  }, [filters, setSearchParams]);

  useEffect(() => {
    dispatch(getFilteredProducts({ filters, sortBy }));
  }, [dispatch, sortBy, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpen(true);
  }, [productDetails]);

  useEffect(() => {
    setSortBy("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParams]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />

      <div className="flex flex-col gap-3 p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuRadioGroup
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem
                      value={option.id}
                      key={option.id}
                      checked={sortBy}
                    >
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator />

        {isLoading ? (
          <Loader />
        ) : productList && productList.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
            {productList.map((product) => (
              <ShoppingProductTile
                product={product}
                key={product._id}
                handleAddToCart={handleAddToCart}
                handleGetProductDetails={handleGetProductDetails}
              />
            ))}
          </div>
        ) : (
          <div className="p-4 text-center">
            <p className="text-lg font-semibold">No products found. 🛒</p>
            <p className="text-sm text-gray-500">
              Try adjusting your filters or check back later.
            </p>
          </div>
        )}
      </div>

      <ProductDetails
        open={open}
        setOpen={setOpen}
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ShoppingListing;
