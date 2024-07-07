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
import { Button } from "@mui/material";
import AddGrainModal from "../components/AddGrainModal";

const Home = () => {
  const dispatch = useDispatch();
  const grainData = useSelector((state) => state?.grains?.data);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleAdd = (grainDetails) => {
    const payload = {
      ...grainDetails,
      id: uuidv4(), // Generate a unique string ID,
      startDate: grainDetails?.startDate
        ? dayjs(grainDetails.startDate).format()
        : null,
      endDate: grainDetails?.endDate
        ? dayjs(grainDetails.endDate).format()
        : null,
      cropYear: dayjs(grainDetails?.cropYear).year(),
    };
    console.log(payload, "payload");
    dispatch(addGrain(payload));
    setOpenAddModal((openAddModal) => !openAddModal);
  };

  const handleEdit = () => {
    setOpenAddModal((openEditModal) => !openEditModal);
  };

  const handleDelete = () => {
    setOpenAddModal((openDeleteModal) => !openDeleteModal);
  };

  const handleOpenModal = (modalType) => {
    if (modalType === "ADD") {
      setOpenAddModal((openAddModal) => !openAddModal);
    } else if (modalType === "EDIT") {
      setOpenEditModal((openEditModal) => !openEditModal);
    } else if (modalType === "DELETE") {
      setOpenDeleteModal((openDeleteModal) => !openDeleteModal);
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
                  {new Date(row?.startDate).getDate()}
                </TableCell>
                <TableCell align="right">{row?.cropYear}</TableCell>
                <TableCell align="right">{row?.price}</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddGrainModal
        isShow={openAddModal}
        handleClose={handleOpenModal}
        handleAdd={handleAdd}
      />
    </div>
  );
};

export default Home;
