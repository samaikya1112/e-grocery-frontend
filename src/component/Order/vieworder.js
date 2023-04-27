import React from "react";
import Nav from "../Nav";
import "./order.css"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
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
function ViewOrder() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const handleCancelButtonClick = () => {
    setShowConfirmDialog(true);
  };

  const handleYesButtonClick = () => {
    setShowConfirmDialog(false);
    window.location.href="/cancelorder"
  };

  const handleNoButtonClick = () => {
    setShowConfirmDialog(false);
  };
    return(
        <div>
            <Nav></Nav>
            <br></br>
      <TableContainer>
        <Table sx={{ maxWidth: 850 }} align="center">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">OrderId</StyledTableCell>
              <StyledTableCell align="center">Payment</StyledTableCell>
              <StyledTableCell align="center">Deliver To</StyledTableCell>
              <StyledTableCell align="center">Order Date</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell align="center">
                1
              </StyledTableCell>
              <StyledTableCell align="center">
                Cash
              </StyledTableCell>
              <StyledTableCell align="center">
              Bangalore,Karnataka,785768
              </StyledTableCell>
              <StyledTableCell align="center">
                02-03-2023
              </StyledTableCell>
              <StyledTableCell align="center">
                ON THE WAY
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button color="error" variant="contained" disabled onClick={handleCancelButtonClick}> Cancel</Button>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
            <StyledTableCell align="center">
                2
              </StyledTableCell>
              <StyledTableCell align="center">
                Card
              </StyledTableCell>
              <StyledTableCell align="center">
              Bangalore,Karnataka,785768
              </StyledTableCell>
              <StyledTableCell align="center">
                02-04-2023
              </StyledTableCell>
              <StyledTableCell align="center">
                PICKEDUP
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button color="error" variant="contained" disabled  onClick={handleCancelButtonClick}> Cancel</Button>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
            <StyledTableCell align="center">
                3
              </StyledTableCell>
              <StyledTableCell align="center">
                UPI
              </StyledTableCell>
              <StyledTableCell align="center">
              Bangalore,Karnataka,785768
              </StyledTableCell>
              <StyledTableCell align="center">
                28-03-2023
              </StyledTableCell>
              <StyledTableCell align="center">
                DELIVERED
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button color="error" variant="contained" disabled  onClick={handleCancelButtonClick}> Cancel</Button>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
            <StyledTableCell align="center">
                4
              </StyledTableCell>
              <StyledTableCell align="center">
                UPI
              </StyledTableCell>
              <StyledTableCell align="center">
              Bangalore,Karnataka,785768
              </StyledTableCell>
              <StyledTableCell align="center">
                28-03-2023
              </StyledTableCell>
              <StyledTableCell align="center">
                SHIPPED
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button color="error" variant="contained"  onClick={handleCancelButtonClick}> Cancel</Button>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
            <StyledTableCell align="center">
                5
              </StyledTableCell>
              <StyledTableCell align="center">
                UPI
              </StyledTableCell>
              <StyledTableCell align="center">
              Bangalore,Karnataka,785768
              </StyledTableCell>
              <StyledTableCell align="center">
                28-03-2023
              </StyledTableCell>
              <StyledTableCell align="center">
                PLACED
              </StyledTableCell>
              <StyledTableCell align="center">
                <Button color="error" variant="contained"  onClick={handleCancelButtonClick}> Cancel</Button>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
        <br></br>
        <div className="text-center">
        <Button>
                <a href="/products" class="btn btn-danger">
                  Cancel
                </a>
              </Button>
              
              </div>
      </TableContainer>
      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
      >
                <DialogTitle>Confirmation</DialogTitle>       {" "}
        <DialogContent>Are you sure you want to Cancel Order?</DialogContent>       {" "}
        <DialogActions>
                   {" "}
          <Button variant="secondary" onClick={handleNoButtonClick}>
                        No          {" "}
          </Button>
                   {" "}
          <Button onClick={handleYesButtonClick}>        Yes       </Button>   {" "}
        </DialogActions>
         {" "}
      </Dialog>
        </div>
    );
}

export default ViewOrder;

