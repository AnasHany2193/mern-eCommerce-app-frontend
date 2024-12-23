import ProductImageUploader from "@/components/admin/imageUploader";
import { Button } from "@/components/ui/button";
import { getImage, addImage } from "@/store/featureSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const { featureList } = useSelector((state) => state.features);

  const handleUploadFeature = () => {
    if (!uploadedImageUrl) return toast.info("Please select an image");

    dispatch(addImage(uploadedImageUrl))
      .unwrap()
      .then((data) => {
        toast.success(data.message);
        setImageFile(null);
        setUploadedImageUrl("");
      })
      .catch((err) => toast.error(err.message));
  };

  useEffect(() => {
    dispatch(getImage()).catch((err) => toast.error(err.message));
  }, [dispatch]);

  return (
    <div className="w-full">
      <ProductImageUploader
        imageFile={imageFile}
        imageLoading={imageLoading}
        setImageFile={setImageFile}
        setImageUrl={setUploadedImageUrl}
        setImageLoading={setImageLoading}
        customStyle
        // isEditMode={currentEditedId !== null}
      />
      <Button className="w-full mt-5" onClick={handleUploadFeature}>
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureList?.length > 0 &&
          featureList.map((image, currentIndex) => (
            <div className="relative" key={image._id}>
              <img
                src={
                  image.image ||
                  "https://placehold.co/400?font=Lora&text=Missing"
                } // Fallback for missing image
                alt="Products Image"
                className="w-full h-[300px] object-cover rounded-lg"
              />

              {currentIndex < 2 && (
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/50 via-white/30 to-transparent backdrop-blur-md"></div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
