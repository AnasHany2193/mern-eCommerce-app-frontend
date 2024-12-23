import { toast } from "sonner";
import { useEffect, useState } from "react";
import { CirclePlus, Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import CommonForm from "@/components/shared/form";
import ProductTile from "@/components/admin/productTile";
import ProductImageUploader from "@/components/admin/imageUploader";

import { addProductFormElements } from "@/config";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "@/store/adminSlice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const initialState = {
  title: "",
  price: "",
  brand: "",
  image: null,
  category: "",
  salePrice: "",
  totalStock: "",
  description: "",
};

/**
 * Admin Products Page
 * @description This page is used to manage all the products in the store like adding, updating and deleting products.
 */
const AdminProducts = () => {
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [imageLoading, setImageLoading] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);

  const { productList } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  const isFormValid = () =>
    Object.values(formData).every((value) => value !== "");

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
      .unwrap()
      .then((data) => {
        dispatch(getProducts());
        toast.success(data.message);
      })
      .catch((err) => toast.error(err.message));
  };

  useEffect(() => {
    dispatch(getProducts()).catch((err) => toast.error(err.message));
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const action = currentEditedId
      ? editProduct({ id: currentEditedId, formData })
      : addNewProduct({ ...formData, image: uploadedImageUrl });

    dispatch(action)
      .unwrap()
      .then((data) => {
        dispatch(getProducts());

        setImageFile(null);
        setCurrentEditedId(null);
        setFormData(initialState);
        setOpenCreateProductDialog(false);

        toast.success(data.message);
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <>
      <div className="flex flex-col w-full gap-5 px-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold lg:text-3xl">Products</h1>
          <Sheet
            open={openCreateProductDialog}
            onOpenChange={() => {
              setCurrentEditedId(null);
              setFormData(initialState);
              setOpenCreateProductDialog(!openCreateProductDialog);
            }}
          >
            <SheetTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <CirclePlus /> Add new Product
              </Button>
            </SheetTrigger>

            <SheetContent className="overflow-auto">
              <SheetHeader className="text-start">
                <SheetTitle>
                  {currentEditedId !== null
                    ? "Update Product"
                    : "Add new Product"}
                </SheetTitle>
                <SheetDescription>
                  {currentEditedId !== null
                    ? "Update Product in the store."
                    : "Add new product to the store."}
                </SheetDescription>
              </SheetHeader>

              <Separator className="my-3" />

              <ProductImageUploader
                imageFile={imageFile}
                imageLoading={imageLoading}
                setImageFile={setImageFile}
                setImageUrl={setUploadedImageUrl}
                setImageLoading={setImageLoading}
                isEditMode={currentEditedId !== null}
              />

              <Separator className="my-3" />

              <CommonForm
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonDisabled={!isFormValid()}
                buttonContent={
                  currentEditedId !== null ? (
                    <>
                      <Pencil /> Update
                    </>
                  ) : (
                    <>
                      <CirclePlus /> Add
                    </>
                  )
                }
                formControls={addProductFormElements}
              />
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {productList &&
            productList.length > 0 &&
            productList.map((product) => (
              <ProductTile
                key={product._id}
                product={product}
                setFormData={setFormData}
                handleDelete={handleDelete}
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
