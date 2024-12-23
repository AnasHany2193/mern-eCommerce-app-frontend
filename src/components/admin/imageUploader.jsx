import axios from "axios";
import { useEffect, useRef } from "react";
import {
  Image,
  ImagePlus,
  Loader2,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const API_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Product Image Uploader component
 * @description This component is used to upload product images to the cloudinary storage.
 */
const ProductImageUploader = ({
  imageFile,
  isEditMode,
  setImageUrl,
  setImageFile,
  imageLoading,
  setImageLoading,
  customStyle = false,
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (imageFile) {
      const uploadImageToCloudinary = async () => {
        setImageLoading(true);
        const data = new FormData();
        data.append("image", imageFile);

        const response = await axios.post(
          `${API_URL}/api/admin/products/upload-image`,
          data,
          { withCredentials: true }
        );

        if (response.data?.success) {
          setImageUrl(response.data.result.url);
          setImageLoading(false);
        }
      };

      uploadImageToCloudinary();
    }
  }, [imageFile, setImageUrl, setImageLoading]);

  return (
    <div className={`w-full ${customStyle ? "" : "max-w-md mx-auto"} `}>
      <Label
        htmlFor="imageUpload"
        className="flex items-center gap-2 mb-2 text-lg font-semibold"
      >
        <ImagePlus /> Upload Image
      </Label>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`p-4 border-2 border-dashed rounded-lg ${
          isEditMode && "opacity-60"
        }`}
      >
        <Input
          ref={inputRef}
          type="file"
          id="imageUpload"
          className="hidden"
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="imageUpload"
            className={`flex flex-col items-center justify-center h-32 ${
              !isEditMode ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          >
            <UploadCloudIcon className="w-10 h-10 mb-2 text-muted-foreground" />
            <span>Drag and drop or click to select an image.</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {imageLoading ? (
                <Loader2 className="w-8 h-8 mr-2 rounded-full text-primary animate-spin" />
              ) : (
                <Image className="w-8 h-8 mr-2 text-primary" />
              )}
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              onClick={handleRemoveImage}
              size="icon"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove image</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUploader;
