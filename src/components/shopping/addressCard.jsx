import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

const AddressCard = ({
  addressInfo,
  selectedAddress,
  setSelectedAddress,
  handleDeleteAddress,
  handleUpdateAddress,
}) => {
  return (
    <Card
      className={`overflow-hidden border rounded-md shadow-md cursor-pointer ${
        selectedAddress?._id === addressInfo._id && "border-2 border-black"
      }`}
      onClick={
        setSelectedAddress ? () => setSelectedAddress(addressInfo) : null
      }
    >
      <CardContent className="grid gap-2 p-4 bg-gray-50">
        <div className="flex flex-col space-y-2">
          <Label className="text-sm font-medium text-gray-600">
            Address:{" "}
            <span className="font-semibold text-gray-800">
              {addressInfo?.address}
            </span>
          </Label>
          <Label className="text-sm font-medium text-gray-600">
            City:{" "}
            <span className="font-semibold text-gray-800">
              {addressInfo?.city}
            </span>
          </Label>
          <Label className="text-sm font-medium text-gray-600">
            PinCode:{" "}
            <span className="font-semibold text-gray-800">
              {addressInfo?.pinCode}
            </span>
          </Label>
          <Label className="text-sm font-medium text-gray-600">
            Phone:{" "}
            <span className="font-semibold text-gray-800">
              {addressInfo?.phone}
            </span>
          </Label>
          <Label className="text-sm font-medium text-gray-600">
            Note:{" "}
            <span className="font-semibold text-gray-800">
              {addressInfo?.note}
            </span>
          </Label>
        </div>
      </CardContent>

      {/* Footer Buttons */}
      <CardFooter className="flex justify-between gap-4 p-4 bg-white border-t">
        <Button
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={(e) => {
            e.stopPropagation();
            handleUpdateAddress(addressInfo);
          }}
        >
          <Pencil />
        </Button>
        <Button
          className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo._id);
          }}
        >
          <Trash2 />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
