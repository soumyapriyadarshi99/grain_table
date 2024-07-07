/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGrain, removeGrain, editGrain } from "../store/grainSlice";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, colors, Typography } from "@mui/material";
import AddGrainModal from "../components/AddGrainModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteGrainMdal from "../components/DeleteGrainMdal";

const Home = () => {
  const dispatch = useDispatch();
  const grainData = useSelector((state) => state?.grains?.data);

  const [selectedRow, setSelectedRow] = useState(null);
  const [editing, setEditing] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleAdd = (grainDetails, isEdit) => {
    const payload = {
      ...grainDetails,
      id: isEdit ? grainDetails.id : uuidv4(),
      startDate: grainDetails.startDate,
      endDate: grainDetails.endDate,
      cropYear: grainDetails.cropYear,
    };
    console.log(payload, isEdit, "isEdit");
    if (isEdit) {
      dispatch(editGrain(payload));
    } else {
      dispatch(addGrain(payload));
    }
    setOpenAddModal(false);
    setEditing(false);
    setSelectedRow(null);
  };

  const handleDelete = () => {
    if (selectedRow) {
      dispatch(removeGrain({ id: selectedRow.id }));
      setSelectedRow(null);
      setOpenDeleteModal(false);
    }
  };

  const handleOpenModal = (modalType, isEdit = false) => {
    if (modalType === "ADD") {
      setOpenAddModal((val) => !val);
      setEditing(isEdit);
    } else if (modalType === "DELETE") {
      setOpenDeleteModal((val) => !val);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>Your grain prices : Feed Wheat</h2>
        <Button
          variant="contained"
          sx={{ float: "right", marginBottom: 5 }}
          onClick={() => handleOpenModal("ADD")}
        >
          Add
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Contract Period</TableCell>
              <TableCell align="right">Crop Year</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grainData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {`${
                    row?.startDate
                      ? dayjs(row.startDate).format("MMM YY")
                      : "N/A"
                  } - ${
                    row?.startDate ? dayjs(row.endDate).format("MMM YY") : "N/A"
                  }`}
                </TableCell>
                <TableCell align="right">{row?.cropYear}</TableCell>
                <TableCell align="right">{row?.price}</TableCell>
                <TableCell align="right">
                  <EditIcon
                    sx={{ cursor: "pointer", color: "grey" }}
                    onClick={() => {
                      setSelectedRow(row);
                      setEditing(true);
                      handleOpenModal("ADD", true);
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <DeleteIcon
                    sx={{ cursor: "pointer", color: "#da312e" }}
                    onClick={() => {
                      setSelectedRow(row);
                      handleOpenModal("DELETE");
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {grainData?.length === 0 && (
        <Typography sx={{ textAlign: "center" }}>
          <h4>No data to display</h4>
        </Typography>
      )}
      <AddGrainModal
        isShow={openAddModal}
        handleClose={handleOpenModal}
        handleAdd={handleAdd}
        rowDetails={selectedRow}
        isEdit={editing}
      />
      <DeleteGrainMdal
        isShow={openDeleteModal}
        handleClose={handleOpenModal}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Home;
