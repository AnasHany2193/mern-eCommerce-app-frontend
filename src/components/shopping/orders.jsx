import { toast } from "sonner";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ShoppingOrderDetails from "./OrderDetails";

import {
  getOrdersDetails,
  getUserOrders,
  resetOrderDetails,
} from "@/store/orderSlice";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatDate, getBadgeClass } from "@/config";

const ShoppingOrders = () => {
  const dispatch = useDispatch();
  const [, setOpenOrderDetails] = useState(false);
  const { orderList, orderDetails } = useSelector(
    (state) => state.shoppingOrder
  );

  const handleFetchOrderDetails = (id) => {
    dispatch(getOrdersDetails(id)).catch((err) => toast.error(err.message));
  };

  useEffect(() => {
    dispatch(getUserOrders()).catch((err) => toast.error(err.message));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenOrderDetails(true);
  }, [orderDetails]);

  const handleDialogClose = () => {
    setOpenOrderDetails(false);
    dispatch(resetOrderDetails());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList?.length > 0 ? (
              orderList.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell className="capitalize">
                    <Badge className={getBadgeClass(order.orderStatus)}>
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${order.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog
                      // open={openOrderDetails}
                      onOpenChange={handleDialogClose}
                    >
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => handleFetchOrderDetails(order._id)}
                          variant="link"
                          size="icon"
                          className="hover:text-blue-600"
                        >
                          <Ellipsis />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-5/6 overflow-auto rounded-lg h-2/3 md:h-5/6">
                        <ShoppingOrderDetails orderDetails={orderDetails} />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="font-semibold text-center text-slate-500"
                >
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
