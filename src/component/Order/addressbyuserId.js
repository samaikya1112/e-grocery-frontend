import React from "react";
import { useState, useEffect } from "react";
import Nav from "../Nav";
// import "./order.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import { Button, Pagination } from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { ADDRESS_BY_ID, DELETE_ADDRESS } from "./order-service/order-service";
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

const PlaceOrder = () => {
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);
  const [addressId, setAddressId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [searchAddressTerm, setSearchAddressTerm] = useState("");
  const totalPages = Math.ceil(addresses.length / rowsPerPage);
  const handleCloseButton = () => {
    window.location.href = "/cart";
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const filteredAddress = addresses.filter(
    (address) =>
      address.housenumber
        .toString()
        .toLowerCase()
        .includes(searchAddressTerm.toLowerCase()) ||
      address.street.toLowerCase().includes(searchAddressTerm.toLowerCase()) ||
      address.landmark
        .toLowerCase()
        .includes(searchAddressTerm.toLowerCase()) ||
      address.district
        .toLowerCase()
        .includes(searchAddressTerm.toLowerCase()) ||
      address.state.toLowerCase().includes(searchAddressTerm.toLowerCase()) ||
      address.pin
        .toString()
        .toLowerCase()
        .includes(searchAddressTerm.toLowerCase())
  );
  const handleAddButton = () => {
    window.location.href = "/orderform";
  };
  // Calculate starting and ending index of rows for current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const handleAddressDelete = async (address) => {
    console.log(address);

    try {
      await axios.delete(`${DELETE_ADDRESS}${address.addressId}`);
      alert("deleted");
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`${ADDRESS_BY_ID}${userId}`)
      .then((response) => {
        setAddresses(response.data);
        setError(null);
      })
      .catch((error) => {
        setAddresses([]);
        setError(error.response.data.message);
      });
  }, []);

  return (
    <div>
      <Nav />
      <br />
      <br />
      <div style={{ display: "flex" }}>
        <Button
          className="text-center"
          color="primary"
          style={{ marginLeft: "1160px" }}
          startIcon={<AddIcon />}
          onClick={handleAddButton}
        >
          ADD
        </Button>
        <Button
          className="text-center"
          color="primary"
          //style={{ marginLeft: "1070px" }}
          startIcon={<CloseIcon />}
          onClick={handleCloseButton}
        ></Button>
      </div>
      <TableContainer>
        <Table sx={{ maxWidth: 850 }} align="center">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">
                Address
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
                  placeholder="Search address"
                />
              </StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {filteredAddress.length > 0 ? (
              filteredAddress.slice(startIndex, endIndex).map((address) => (
                <StyledTableRow key={address.id}>
                  <StyledTableCell>
                    <p>
                      {address.housenumber}, {address.street},{" "}
                      {address.landmark}, {address.district}, {address.state},{" "}
                      {address.pin}
                    </p>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant="contained">
                      <a
                        href="/deliveryslots"
                        style={{ textDecoration: "none", color: "white" }}
                        onClick={() =>
                          localStorage.setItem("addressId", address.addressId)
                        }
                      >
                        Use
                      </a>
                    </Button>
                    {/* <Button variant="contained" color="error">
                      <a
                        onClick={() => handleAddressDelete(address)}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Delete
                      </a>
                    </Button> */}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={2} align="center">
                  <p>No addresses found</p>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            marginTop: "33px",
          }}
        >
          <Pagination
            style={{ backgroundColor: "white" }}
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
          />
        </div>
        <br></br>
      </TableContainer>
    </div>
  );
};

export default PlaceOrder;
