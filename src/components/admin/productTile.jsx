import { Pencil, Trash2 } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

/**
 * Product Tile Component
 * @description This component renders a single product tile with its details and actions for editing and deleting. It is used in the ProductList component.
 */
const ProductTile = ({
  product,
  setFormData,
  handleDelete,
  setCurrentEditedId,
  setOpenCreateProductDialog,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg">
      {/* Product Image */}
      <div className="relative">
        <img
          src={
            product?.image || "https://placehold.co/400?font=Lora&text=Missing"
          } // Fallback for missing image
          alt={product?.title || "Product Image"}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
      </div>

      {/* Product Details */}
      <CardContent className="p-4">
        {/* Product Title */}
        <h2 className="text-lg font-semibold text-center text-gray-800">
          {product?.title || "Untitled Product"}
        </h2>

        {/* Price Display */}
        <div className="flex items-center justify-between my-2 text-base font-semibold text-gray-600">
          <span
            className={`${
              product.salePrice > 0 && "line-through text-gray-500"
            }`}
          >
            ${product.price.toFixed(2)}
          </span>
          {product.salePrice > 0 && (
            <span className="text-green-600">
              ${product.salePrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="px-4 pb-4">
        <div className="flex items-center justify-between w-full">
          {/* Edit Button */}
          <Button
            variant="secondary"
            onClick={() => {
              setFormData(product);
              setCurrentEditedId(product?._id);
              setOpenCreateProductDialog(true);
            }}
            className="flex items-center gap-2"
          >
            <Pencil /> Edit
          </Button>

          {/* Delete Button */}
          <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={() => handleDelete(product?._id)}
          >
            <Trash2 /> Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
export default ProductTile;
