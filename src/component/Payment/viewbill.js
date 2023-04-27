import React, { useEffect, useState } from "react";

import Nav from "../Nav";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { Button, TablePagination } from "@mui/material";
import axios from "axios";
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

function Viewbill() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const [searchTerm,setSearchTerm]=useState("")
  const [searchDateTerm,setSearchDateTerm]=useState("")
  const [payment,setPayment]=useState([])
  const endIndex = startIndex + rowsPerPage;
const handleBrowseButton=()=>{
  window.location.href="/products"
}
const handleChangePage = (event, newPage) => {
  setPage(newPage);
};
const filteredOrders = payment.filter(
  (order) =>
    order.type.toLowerCase().includes(searchTerm.toLowerCase()) &&
    order.date.includes(searchDateTerm)
)
const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};
  // let amount = localStorage.getItem("totalPrice")
  // console.log(amount)
  
  useEffect(()=>{
    let userId = localStorage.getItem("userId")
    
    axios.get(`http://localhost:8084/payment//getbill/${userId}`)
    .then((response)=>{
      setPayment(response.data)
    }).catch((err)=>{
      console.log(err.message);
  })
  },[])
  return (
    <div>
      <Nav></Nav>
      <br></br>
      <br></br>
      <br></br>
      <TableContainer>
        <Table sx={{ maxWidth: 850 }} align="center">
          <TableHead>
            <StyledTableRow>
              
              <StyledTableCell align="center">Total Amount</StyledTableCell>
              <StyledTableCell align="center">Payment Type
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
                  /></StyledTableCell>
              <StyledTableCell align="center">Date
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
                  /></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
           {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((p)=>(
              <StyledTableRow key={p.paymentId}>
                
                <StyledTableCell align="center">{p.amount}</StyledTableCell>
                <StyledTableCell align="center">{p.type}</StyledTableCell>
                <StyledTableCell align="center">{p.date}</StyledTableCell>
              </StyledTableRow>
           ))}
          </TableBody>
        </Table>
        <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: payment.length }]}
        component="div"
        style={{ marginRight: "450px" }}
        count={payment.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        
      />
        <br></br>
        <div className="text-center">
        <Button>
                <a href="/products" class="btn btn-danger">
                  Cancel
                </a>
              </Button>
              
              </div>
      </TableContainer>
      
    </div>
  );
}

export default Viewbill;
