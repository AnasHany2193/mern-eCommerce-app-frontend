import { useEffect, useState } from "react";
import CommonForm from "../shared/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  fetchAddress,
  updateAddress,
} from "@/store/addressSlice";
import { toast } from "sonner";
import AddressCard from "./addressCard";

const initialFormData = {
  address: "",
  city: "",
  phone: "",
  pinCode: "",
  note: "",
};

const Address = ({ selectedAddress, setSelectedAddress }) => {
  const dispatch = useDispatch();
  const [editedId, setEditedId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const { addressList } = useSelector((state) => state.address);

  const handleAddress = (e) => {
    e.preventDefault();

    if (addressList.length >= 3 && editedId === null) {
      setFormData(initialFormData);
      return toast.error("You can add only 3 address");
    }

    editedId !== null
      ? dispatch(updateAddress({ addressId: editedId, ...formData }))
          .unwrap()
          .then((data) => {
            dispatch(fetchAddress());
            setEditedId(null);
            setFormData(initialFormData);
            toast.success(data.message);
          })
          .catch((err) => toast.error(err.message))
      : dispatch(addAddress(formData))
          .unwrap()
          .then((data) => {
            dispatch(fetchAddress());
            setFormData(initialFormData);
            toast.success(data.message);
          })
          .catch((err) => toast.error(err.message));
  };

  const handleUpdateAddress = (addressData) => {
    setEditedId(addressData._id);
    setFormData({
      ...addressData,
      address: addressData?.address,
      city: addressData?.city,
      phone: addressData?.phone,
      pinCode: addressData?.pinCode,
      note: addressData?.note,
    });
  };

  const handleDeleteAddress = (addressId) => {
    dispatch(deleteAddress(addressId))
      .unwrap()
      .then((data) => {
        dispatch(fetchAddress());
        toast.success(data.message);
      })
      .catch((err) => toast.error(err.message));
  };

  const isFormValid = () =>
    Object.values(formData).every((value) => value !== "");

  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  return (
    <Card className="overflow-hidden border rounded-lg shadow-lg">
      {/* Address List */}
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
        {addressList?.length > 0 ? (
          addressList.map((address) => (
            <AddressCard
              key={address._id}
              addressInfo={address}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              handleUpdateAddress={handleUpdateAddress}
              handleDeleteAddress={handleDeleteAddress}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-full">
            No addresses available.
          </div>
        )}
      </div>

      {/* Form Section */}
      <div className="border-t border-gray-200">
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-semibold text-gray-700">
            {editedId !== null ? "Edit Address" : "Add Address"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <CommonForm
            formData={formData}
            onSubmit={handleAddress}
            setFormData={setFormData}
            buttonContent={editedId !== null ? "Edit Address" : "Add Address"}
            buttonDisabled={!isFormValid()}
            formControls={addressFormControls}
          />
        </CardContent>
      </div>
    </Card>
  );
};

export default Address;
