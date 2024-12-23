import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "@/store/shopSlice";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { addNewReview, getReviews, resetReviews } from "@/store/reviewSlice";
import StarRatings from "../shared/starRatings";

const ProductDetails = ({ open, setOpen, productDetails, handleAddToCart }) => {
  const dispatch = useDispatch();
  const [rate, setRate] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const { reviews } = useSelector((state) => state.review);

  const handleDialogClose = () => {
    setRate(0);
    setOpen(false);
    setReviewMessage("");
    dispatch(setProductDetails());
    dispatch(resetReviews());
  };

  const handleAddReview = () => {
    if (rate === 0)
      toast.info("Please rate the product before adding a review");

    const data = {
      productId: productDetails?._id,
      review: reviewMessage,
      rate,
    };

    dispatch(addNewReview(data))
      .unwrap()
      .then((data) => {
        toast.success(data.message);
        dispatch(getReviews(productDetails?._id)).catch((err) =>
          toast.error(err.message)
        );
      })
      .catch((err) => toast.error(err.message));

    setRate(0);
    setReviewMessage("");
  };

  useEffect(() => {
    if (productDetails)
      dispatch(getReviews(productDetails._id)).catch((err) =>
        toast.error(err.message)
      );
  }, [dispatch, productDetails]);

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTitle>{productDetails?.title}</DialogTitle>
      <DialogDescription>{productDetails?.description}</DialogDescription>
      <DialogContent className="grid overflow-auto sm:grid-cols-2 gap-6 p-8 max-w-[90vw] rounded-lg sm:max-w-[80vw] lg:max-w-[70vw] h-[90vh]">
        {/* Product Image */}
        <div className="relative flex items-center justify-center rounded-lg">
          <img
            src={
              productDetails?.image ||
              "https://placehold.co/400?font=Lora&text=Image+Unavailable"
            }
            alt={`Image of ${productDetails?.title || "product"}`}
            className="object-cover w-1/2 sm:w-5/6 md:w-full md:h-full"
          />
        </div>

        {/* Product Details */}
        <div className="grid gap-3 sm:overflow-auto">
          {/* Basic Details */}
          <div className="flex flex-col gap-2 sm:gap-4">
            <h1 className="text-base font-extrabold sm:text-xl md:text-3xl">
              {productDetails?.title}
            </h1>
            <p className="text-sm font-medium text-gray-600 lg:text-lg">
              {productDetails?.description}
            </p>

            {/* Price Section */}
            <div className="flex items-center justify-between">
              <span
                className={`${
                  productDetails?.salePrice > 0
                    ? "line-through text-gray-500"
                    : ""
                } text-sm sm:text-lg font-semibold`}
              >
                ${productDetails?.price.toFixed(2)}
              </span>
              {productDetails?.salePrice > 0 && (
                <span className="text-sm font-bold text-green-600 sm:text-lg">
                  ${productDetails?.salePrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-2">
              {productDetails && (
                <StarRatings
                  size={24}
                  defaultRating={productDetails?.averageRate || 0}
                  disabled
                />
              )}
              <span className="text-sm text-gray-500 sm:text-lg">
                ({productDetails?.averageRate || 0})
              </span>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={
                productDetails?.totalStock === 0
                  ? undefined
                  : () =>
                      handleAddToCart(
                        productDetails._id,
                        productDetails.totalStock
                      )
              }
              disabled={productDetails?.totalStock === 0}
              className="w-full"
            >
              {productDetails?.totalStock === 0
                ? "Out Of Stock"
                : "Add to Cart"}
            </Button>
          </div>

          {/* Separator */}
          <Separator className="my-1" />

          {/* Reviews Section */}
          <div className="flex flex-col gap-4 max-h-[300px]">
            <h2 className="text-base font-extrabold sm:text-xl md:text-3xl">
              Reviews
            </h2>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Avatar className="bg-black">
                    <AvatarFallback className="font-extrabold text-white capitalize bg-black">
                      {review.username[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <h3 className="font-bold">
                      {review?.username || "Anonymous"}
                    </h3>
                    <StarRatings
                      size={16}
                      defaultRating={review?.rate || 0}
                      disabled
                    />
                  </div>
                  <p className="text-gray-500 capitalize">
                    {review?.review || "No comment"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}

            {/* Write a Review */}
            <div>
              <h3 className="text-base font-extrabold sm:text-xl md:text-3xl">
                Write a Review
              </h3>
              <StarRatings
                size={28}
                defaultRating={rate}
                onSetRating={setRate}
              />
              <div className="flex gap-2 mx-1 mt-4">
                <Input
                  placeholder="Write a review..."
                  name="review"
                  value={reviewMessage}
                  onChange={(e) => setReviewMessage(e.target.value)}
                />
                <Button
                  onClick={handleAddReview}
                  disabled={reviewMessage.trim() === ""}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
