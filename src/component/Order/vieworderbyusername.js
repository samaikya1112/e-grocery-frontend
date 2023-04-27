import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import "./order.css";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { Button } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  CANCEL_ORDER,
  GET_ADDRESS_AID,
  ORDER_BY_ID,
  PAYMENT_BY_ID,
} from "./order-service/order-service";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ViewOrderByUsername() {
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [searchDeliveryTerm, setSearchDeliveryTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedProp, setSortedProp] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [searchDateTerm, setSearchDateTerm] = useState("");
  const [searchAddressTerm, setSearchAddressTerm] = useState("");
  const [searchStatusTerm, setSearchStatusTerm] = useState("");
  // Calculate starting and ending index of rows for current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const handleBrowseButton = () => {
    window.location.href = "/products";
  };
  console.log(orders);
  console.log(typeof orders);
  
  const filteredOrders = orders.filter(
    (order) =>
      order.payment.type.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (order.status?.toLowerCase() || "").includes(
        searchStatusTerm.toLowerCase()
      ) &&
      order.orderDate.includes(searchDateTerm)&&
      (order.delivery.deliveryTime?.toLowerCase() || "").includes(
        searchDeliveryTerm.toLowerCase()
      ) &&
            (order.address.housenumber
              .toString()
              .toLowerCase()
              .includes(searchAddressTerm.toLowerCase()) ||
              order.address.street
                .toLowerCase()
                .includes(searchAddressTerm.toLowerCase()) ||
              order.address.landmark
                .toLowerCase()
                .includes(searchAddressTerm.toLowerCase()) ||
              order.address.district
                .toLowerCase()
                .includes(searchAddressTerm.toLowerCase()) ||
              order.address.state
                .toLowerCase()
                .includes(searchAddressTerm.toLowerCase()) ||
              order.address.pin
                .toString()
                .toLowerCase()
                .includes(searchAddressTerm.toLowerCase()))
  );
  const handleYesButtonClick = () => {
    setShowConfirmDialog(false);
    handleCancel();
  };
  const handleCancelButtonClick = () => {
    setShowConfirmDialog(true);
  };
  const handleNoButtonClick = () => {
    setShowConfirmDialog(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleupdate = () => {
    setOpen(true);
  };
  const handleOKClick = () => {
    window.location.reload();
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //console.log(orders[0].orderId,"..............................")
  const handleCancel = () => {
    // e.preventDefault;
    axios
      .delete(`${CANCEL_ORDER}${orders[0].orderId}`)
      .then((res) => {
        console.log(res.data);
        handleupdate();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // Update sortedProp whenever sortOrder or prop changes
    const sortedData = orders.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.orderId - b.orderId;
      } else {
        return b.orderId - a.orderId;
      }
    });
    setSortedProp(sortedData);
  }, [sortOrder, orders]);
  useEffect(() => {
    let userId = localStorage.getItem("userId");
    console.log(userId);

    axios
      .get(`${ORDER_BY_ID}${userId}`)
      .then((response) => {
        setOrders(response.data);
        setSortedProp(response.data);
        let paymentId = orders[0].payment.paymentId;
        response.data.forEach((order) => {
          axios
            .get(`${PAYMENT_BY_ID}${paymentId}`)
            .then((paymentResponse) => {
              // Update the payment type in the order object
              const updatedOrder = {
                ...order,
                paymentType: paymentResponse.data.paymentType,
              };
              // Update the orders state with the updated order object
              setOrders((prevOrders) =>
                prevOrders.map((prevOrder) =>
                  prevOrder.orderId === order.orderId ? updatedOrder : prevOrder
                )
              );
            })
            .catch((err) => {
              console.log(err.message);
            });
          let addressId = orders[0].address.addressId;
          axios
            .get(`${GET_ADDRESS_AID}${addressId}`)
            .then((addressResponse) => {
              // Update the address in the order object
              const updatedOrder = { ...order, address: addressResponse.data };
              // Update the orders state with the updated order object
              setOrders((prevOrders) =>
                prevOrders.map((prevOrder) =>
                  prevOrder.orderId === order.orderId ? updatedOrder : prevOrder
                )
              );
            })
            .catch((err) => {
              console.log(err.message);
            });
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    fetch("/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);

 
  return (
    <div>
      <Nav />
      <br></br>
      <br></br>
      <br></br>
      {orders.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "70vh",
          }}
        >
          <div style={{ textAlign: "center", margin: "20px" }}>
            <SentimentVeryDissatisfiedIcon fontSize="large" />
            <br />
            <br />
            <div>No Orders Yet</div>
            <br></br>
            <Button variant="contained" onClick={handleBrowseButton}>
              Browse Products
            </Button>
          </div>
        </div>
      ) : (
        <TableContainer>
          <Table sx={{ maxWidth: 1200 }} align="center">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">
                  {" "}
                  <Button
                    style={{ color: "white" }}
                    variant="text"
                    onClick={() =>
                      sortOrder === "asc"
                        ? setSortOrder("desc")
                        : setSortOrder("asc")
                    }
                  >
                    OrderId
                    {sortOrder && (
                      <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>
                    )}
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  Payment Type
                  <br />
                  <input
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      border: "white",
                      maxWidth: "80px",
                    }}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search payment"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  Deliver To
                  <br />
                  <input
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      border: "white",
                      maxWidth: "80px",
                    }}
                    type="text"
                    value={searchAddressTerm}
                    onChange={(e) => setSearchAddressTerm(e.target.value)}
                    placeholder="Search payment"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  Order Date
                  <br />
                  <input
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      border: "white",
                      maxWidth: "80px",
                    }}
                    type="text"
                    value={searchDateTerm}
                    onChange={(e) => setSearchDateTerm(e.target.value)}
                    placeholder="Search Date"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  Status
                  <br />
                  <input
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      border: "white",
                      maxWidth: "80px",
                    }}
                    type="text"
                    value={searchStatusTerm}
                    onChange={(e) => setSearchStatusTerm(e.target.value)}
                    placeholder="Search Status"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  Delivery Slot
                  <br />
                  <input
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      border: "white",
                      maxWidth: "80px",
                    }}
                    type="text"
                    value={searchDeliveryTerm}
                    onChange={(e) => setSearchDeliveryTerm(e.target.value)}
                    placeholder="Search Date"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {filteredOrders ?
              filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <StyledTableRow key={order.orderId}>
                    <StyledTableCell align="center">
                      {order.orderId}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {order.payment.type}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {order.address.housenumber},{order.address.street},
                      {order.address.landmark},{order.address.district},
                      {order.address.state},{order.address.pin}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {order.orderDate}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {order.status}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {order.delivery.deliveryDate},
                      {order.delivery.deliveryTime}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        color="error"
                        variant="contained"
                        disabled={order.status !== "PLACED"}
                        onClick={handleCancelButtonClick}
                      >
                        Cancel
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                )):null}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[
              5,
              10,
              25,
              { label: "All", value: orders.length },
            ]}
            component="div"
            style={{ marginRight: "450px" }}
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <br></br>
          <div className="text-center">
            <Button>
              <a href="/products" className="btn btn-danger">
                Cancel
              </a>
            </Button>
          </div>
        </TableContainer>
      )}
      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
      >
        <DialogTitle>Confirmation</DialogTitle>{" "}
        <DialogContent>
          Are you sure you want to Cancel the order?
        </DialogContent>{" "}
        <DialogActions>
          {" "}
          <Button variant="secondary" onClick={handleNoButtonClick}>
            No{" "}
          </Button>{" "}
          <Button onClick={handleYesButtonClick}> Yes </Button>{" "}
        </DialogActions>{" "}
      </Dialog>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Order Cancelled Successfully</DialogTitle>
        <DialogContent>
          <p>Your order has been successfully cancelled.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOKClick}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ViewOrderByUsername;
