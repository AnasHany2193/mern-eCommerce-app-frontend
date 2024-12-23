import { toast } from "sonner";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdminOrderDetails from "./OrderDetails";
import { formatDate, getBadgeClass } from "@/config";
import {
  getOrders,
  getOrdersDetails,
  resetOrderDetails,
} from "@/store/adminSlice";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const [, setOpenOrderDetails] = useState(false);
  const { ordersList, orderDetails } = useSelector((state) => state.admin);

  const handleDialogClose = () => {
    setOpenOrderDetails(false);
    dispatch(resetOrderDetails());
    dispatch(getOrders()).catch((err) => toast.error(err.message));
  };

  const handleFetchOrderDetails = (id) => {
    dispatch(getOrdersDetails(id)).catch((err) => toast.error(err.message));
  };

  useEffect(() => {
    dispatch(getOrders()).catch((err) => toast.error(err.message));
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Statue</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersList?.length > 0 ? (
              ordersList.map((order) => (
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
                    <Dialog onOpenChange={handleDialogClose}>
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
                        <AdminOrderDetails orderDetails={orderDetails} />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="mt-5 text-xl font-semibold text-center text-slate-500"
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

export default AdminOrders;
