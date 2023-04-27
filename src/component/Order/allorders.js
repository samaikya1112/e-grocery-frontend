import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Nav";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { Button, TablePagination } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ALL_ORDERS } from "./order-service/order-service";
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
    border: 1,
  },
}));

function ViewOrder() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
 
  const [prop, setProp] = useState([]);
  const [sortedProp, setSortedProp] = useState([]);
  const [searchStatusTerm, setSearchStatusTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchDeliveryTerm,setSearchDeliveryTerm]=useState("")
  const [page, setPage] = useState(0);
  const [sortOrder, setSortOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchDateTerm, setSearchDateTerm] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const filteredOrders = prop.filter(
    (order) =>
      order.payment.type.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (order.status?.toLowerCase() || "").includes(
        searchStatusTerm.toLowerCase()
      ) &&
      order.orderDate.includes(searchDateTerm)&&
      (order.delivery.deliveryTime?.toLowerCase() || "").includes(
        searchDeliveryTerm.toLowerCase()
      )
  );
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // Calculate starting and ending index of rows for current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleUpdateButton = () => {
    setShowConfirmDialog(true);
    const sortedData = prop.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.orderId - b.orderId;
      } else {
        return b.orderId - a.orderId;
      }
    });
    setSortedProp(sortedData);
  };
  console.log(prop);
  const handleNoButtonClick = () => {
    setShowConfirmDialog(false);
    window.location.href = "/allorders";
  };
  const handleYesButtonClick = () => {
    setShowConfirmDialog(false);
    window.location.href = "/updatestatus";
  };

  useEffect(() => {
    console.log(prop);
    try {
      axios.get(ALL_ORDERS).then((res) => {
        setProp(res.data);
        setSortedProp(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    // Update sortedProp whenever sortOrder or prop changes
    const sortedData = prop.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.orderId - b.orderId;
      } else {
        return b.orderId - a.orderId;
      }
    });
    setSortedProp(sortedData);
  }, [sortOrder, prop]);
  const handleUpdate = () => {
    window.location.href = "/updatestatus";
  };
  return (
    <div>
      <Nav></Nav>
      <br />
      <br />
      <br />
      <TableContainer>
        <Table sx={{ maxWidth: 1050 }} align="center">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">
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
                PAYMENT
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
                ORDER DATE
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
                STATUS
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
              <StyledTableCell align="center">DELIVERY SLOT
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
                /></StyledTableCell>
              <StyledTableCell align="center">ACTION</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {filteredOrders
              ? filteredOrders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((p) => (
                    <StyledTableRow key={p.orderId}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {p.orderId}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {p.payment.type}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {p.orderDate}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {p.status}
                      </StyledTableCell>
                      <StyledTableCell align="center">{p.delivery.deliveryDate},{p.delivery.deliveryTime}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          onClick={handleUpdateButton}
                          disabled={p.status == "DELIVERED"}
                        >
                          Update
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
              : null}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: prop.length }]}
          component="div"
          style={{ marginRight: "450px" }}
          count={prop.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
      >
                <DialogTitle>Confirmation</DialogTitle>       {" "}
        <DialogContent>Are you sure you want to Update Status?</DialogContent> 
             {" "}
        <DialogActions>
                   {" "}
          <Button variant="secondary" onClick={handleNoButtonClick}>
                        No          {" "}
          </Button>
                   
          <Button onClick={handleYesButtonClick}>        Yes       </Button>   {" "}
        </DialogActions>
         {" "}
      </Dialog>
    </div>
  );
}

export default ViewOrder;
