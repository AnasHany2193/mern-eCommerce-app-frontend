import { Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

const ShoppingProductTile = ({
  product,
  isLoading,
  handleAddToCart,
  handleGetProductDetails,
}) => {
  if (isLoading) return <Loader2 className="w-full animate-spin" />;

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg">
      <div
        onClick={() => handleGetProductDetails(product._id)}
        className="cursor-pointer"
      >
        <div className="relative">
          <img
            src={
              product?.image ||
              "https://placehold.co/400?font=Lora&text=Missing"
            } // Fallback for missing image
            alt={product?.title || "Product Image"}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute text-white bg-red-500 top-2 left-2 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute text-white bg-yellow-500 top-2 left-2 hover:bg-yellow-600">
              {`Only ${product.totalStock} items left`}
            </Badge>
          ) : (
            product?.salePrice > 0 && (
              <Badge className="absolute text-white bg-green-500 top-2 left-2 hover:bg-green-600">
                Sale
              </Badge>
            )
          )}
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-center text-gray-800">
              {product?.title || "Untitled Product"}
            </h2>
            <div className="flex items-center justify-between mb-2 capitalize">
              <span className="text-sm text-muted-foreground">
                {product?.category}
              </span>
              <span className="text-sm text-muted-foreground">
                {product?.brand}
              </span>
            </div>

            {/* Price Display */}
            <div className="flex items-center justify-between my-2 text-base font-semibold text-gray-600">
              <span
                className={`${
                  product.salePrice > 0 && "line-through text-gray-500"
                } text-lg font-semibold text-primary`}
              >
                ${product?.price.toFixed(2)}
              </span>
              {product.salePrice > 0 && (
                <span className="text-lg font-semibold text-green-600">
                  ${product?.salePrice.toFixed(2)}
                </span>
              )}
            </div>
          </CardContent>
        </div>
      </div>
      <CardFooter className="px-4 pb-4">
        <Button
          onClick={
            product?.totalStock === 0
              ? undefined
              : () => handleAddToCart(product._id, product.totalStock)
          }
          disabled={product?.totalStock === 0}
          className="w-full"
        >
          {product?.totalStock === 0 ? "Out Of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
