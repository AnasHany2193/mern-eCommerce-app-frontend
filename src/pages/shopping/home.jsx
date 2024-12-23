import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";

import bnrOne from "../../assets/banner-1.jpg";
import bnrTwo from "../../assets/banner-2.jpg";
import bnrThree from "../../assets/banner-3.jpg";
import bnrFour from "../../assets/banner-4.jpg";

import { filterOptions } from "@/config";
import { addToCart, fetchCartItem } from "@/store/cartSlice";
import { getFilteredProducts, getProductDetails } from "@/store/shopSlice";

import ProductDetails from "@/components/shopping/productDetails";
import ShoppingProductTile from "@/components/shopping/productTile";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ShoppingHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const slide = [bnrOne, bnrTwo, bnrThree, bnrFour];
  const [currentIndex, setCurrentIndex] = useState(0);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );

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

  const handleGetProductDetails = (id) => {
    dispatch(getProductDetails(id));
    setOpen((open) => !open);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slide.length); // Wrap around to the first image
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slide.length - 1 : prevIndex - 1
    );
  };

  const handleNavigate = (key, id) => {
    sessionStorage.removeItem("filters");

    const filter = { [key]: [id] };
    sessionStorage.setItem("filters", JSON.stringify(filter));

    navigate(`/shopping/listing?${key}=${id}`);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slide.length);
    }, 5 * 1000);

    return () => clearInterval(timer);
  }, [slide.length]);

  useEffect(() => {
    dispatch(getFilteredProducts({ filters: {}, sortBy: "price-lowtohigh" }));
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      {/* Slider Section */}
      <div className="relative w-full overflow-hidden">
        <Slider
          slide={slide}
          currentIndex={currentIndex}
          navigate={navigate}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      </div>

      <section className="py-8 bg-gray-50">
        <div className="px-4 mx-auto ">
          <h2 className="mb-10 text-4xl font-extrabold text-center text-gray-800">
            Shopping by Category
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {filterOptions.Category.map((item) => (
              <Card
                key={item.id}
                className="transition-shadow cursor-pointer hover:shadow-lg"
                onClick={() => handleNavigate("Category", item.id)}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold ">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="px-4 mx-auto ">
          <h2 className="mb-10 text-4xl font-extrabold text-center text-gray-800">
            Shopping by Brand
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {filterOptions.Brand.map((item) => (
              <Card
                key={item.id}
                className="transition-shadow cursor-pointer hover:shadow-lg"
                onClick={() => handleNavigate("Brand", item.id)}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold ">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container px-6 mx-auto lg:px-12">
          <h2 className="mb-10 text-4xl font-extrabold text-center text-gray-800">
            Feature Products
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {productList?.length > 0 ? (
              productList
                .slice(0, 5)
                .map((product) => (
                  <ShoppingProductTile
                    key={product._id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                    handleGetProductDetails={handleGetProductDetails}
                  />
                ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No feature products available at the moment.
              </p>
            )}
          </div>

          {productList && productList.length > 5 && (
            <div className="mt-6 text-center">
              <Button
                onClick={() => navigate("/shopping/listing")}
                className="px-6 py-3"
              >
                Show More
              </Button>
            </div>
          )}
        </div>
      </section>

      <ProductDetails
        open={open}
        setOpen={setOpen}
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

const Slider = ({
  slide,
  currentIndex,
  navigate,
  handleNext,
  handlePrevious,
}) => {
  return (
    <>
      <div key={currentIndex} className="relative w-full h-full">
        {/* Image */}
        <img
          src={slide[currentIndex]}
          alt={`banner-${currentIndex}`}
          className="object-cover w-full h-full"
        />

        {/* Left-half content */}
        <div className="absolute top-0 left-0 flex flex-col items-start justify-center w-1/2 h-full p-5 md:p-24">
          <h2 className="my-4 text-sm leading-tight sm:text-lg md:text-2xl lg:my-10 lg:text-4xl text-slate-900">
            We Picked Every Item With Care,
            <span className="font-bold"> You Must Try </span> At Least Once.
          </h2>
          <Button
            className="flex items-center gap-2 px-3 text-xs md:text-base sm:gap-5 sm:px-6 sm:py-4 lg:text-lg"
            onClick={() => navigate("/shopping/listing")}
          >
            Go to Collection
            <MoveRight />
          </Button>
        </div>

        {/* Right-half blur overlay */}
        {currentIndex < 2 && (
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/50 via-white/30 to-transparent backdrop-blur-md"></div>
        )}
      </div>

      {/* Navigation Buttons */}
      <Button
        onClick={handlePrevious}
        className="absolute p-2 text-white rounded-full top-1/2 left-4 bg-black/30 hover:bg-black/70"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        onClick={handleNext}
        className="absolute p-2 text-white rounded-full top-1/2 right-4 bg-black/30 hover:bg-black/70"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </>
  );
};

export default ShoppingHome;
