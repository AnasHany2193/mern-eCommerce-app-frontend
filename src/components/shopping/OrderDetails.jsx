import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { Loader2 } from "lucide-react";
import { getBadgeClass } from "@/config";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const ShoppingOrderDetails = ({ orderDetails }) => {
  const { user } = useSelector((state) => state.auth);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      ? date.toLocaleString("en-US", {
          year: "numeric", // '2024'
          month: "long", // 'December'
          day: "numeric", // '19'
          hour: "2-digit", // '03'
          minute: "2-digit", // '00'
        })
      : "N/A";
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <DialogHeader>
        <DialogTitle className="text-2xl font-semibold text-gray-900">
          Order Details
        </DialogTitle>
        <DialogDescription className="text-sm text-gray-500">
          Review the complete details of your order, including purchased items,
          pricing, and shipping information.
        </DialogDescription>
      </DialogHeader>

      {/* Loading State */}
      {!orderDetails ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      ) : (
        <>
          {/* Order Info */}
          <div className="mt-6 space-y-4 capitalize">
            {[
              { label: "Order ID", value: orderDetails?._id || "N/A" },
              {
                label: "Order Date",
                value: formatDate(orderDetails?.createdAt),
              },
              {
                label: "Order Status",
                value: orderDetails?.orderStatus || "N/A",
              },
              {
                label: "Order Price",
                value: `$${orderDetails?.totalAmount || "0.00"}`,
              },
              {
                label: "Payment Method",
                value: `${orderDetails?.paymentMethod || "Cash"}`,
              },
              {
                label: "Payment Status",
                value: `${orderDetails?.paymentStatus || "Cash"}`,
              },
            ].map((info) => (
              <div
                className="flex justify-between pb-2 text-gray-700 border-b"
                key={info.label}
              >
                <p className="font-medium">{info.label}</p>
                {info.label === "Order Status" ? (
                  <Badge className={getBadgeClass(orderDetails?.orderStatus)}>
                    {info.value}
                  </Badge>
                ) : (
                  <p className="font-semibold text-gray-800">{info.value}</p>
                )}
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          {/* Cart Items */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Order Items</h3>
            <ul className="divide-y divide-gray-200">
              {orderDetails?.cartItems?.length > 0 ? (
                orderDetails.cartItems.map((item) => (
                  <li
                    className="flex justify-between py-3 text-gray-600"
                    key={item._id}
                  >
                    <span className="font-medium text-gray-800">
                      {item.title}{" "}
                      <span className="text-gray-500">x{item.quantity}</span>
                    </span>
                    <span className="font-semibold text-gray-900">
                      $
                      {(
                        (item.salePrice > 0 ? item.salePrice : item.price) *
                        item.quantity
                      )?.toFixed(2)}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No items in the cart.</li>
              )}
            </ul>
          </div>

          <Separator className="my-6" />

          {/* Shipping Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 ">
              Shipping Info
            </h3>
            <div className="space-y-2">
              {[
                { label: "Username", value: user.username || "N/A" },
                {
                  label: "Address",
                  value: orderDetails?.address?.address || "N/A",
                },
                { label: "City", value: orderDetails?.address?.city || "N/A" },
                {
                  label: "Phone",
                  value: orderDetails?.address?.phone || "N/A",
                },
                {
                  label: "Pin Code",
                  value: orderDetails?.address?.pinCode || "N/A",
                },
                {
                  label: "Notes",
                  value:
                    orderDetails?.address?.note ||
                    "No additional notes provided.",
                },
              ].map(({ label, value }, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-medium text-gray-600 ">{label}:</span>
                  <span className="text-gray-700 capitalize">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingOrderDetails;
