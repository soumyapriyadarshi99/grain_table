/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box, Modal, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 10,
  p: 4,
};

const AddGrainModal = ({
  isShow,
  handleClose = () => null,
  handleAdd = () => null,
}) => {
  const [grainDetails, setGrainDetails] = useState({
    startDate: "",
    endDate: "",
    cropYear: "",
    price: 0,
  });

  return (
    <div>
      <Modal
        open={isShow}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" sx={{ mb: 2 }}>
            Add Grain
          </Typography>

          <DatePicker
            value={dayjs(grainDetails?.startDate)}
            onChange={(val) =>
              setGrainDetails({ ...grainDetails, startDate: val })
            }
            label="Contract Start Date"
            sx={{ mb: 2, width: "100%" }}
          />

          <DatePicker
            value={dayjs(grainDetails?.endDate)}
            onChange={(val) =>
              setGrainDetails({ ...grainDetails, endDate: val })
            }
            label="Contract End Date"
            sx={{ mb: 2, width: "100%" }}
          />

          <DatePicker
            views={["year"]}
            value={dayjs(grainDetails?.cropYear)}
            onChange={(val) =>
              setGrainDetails({ ...grainDetails, cropYear: val })
            }
            label="Crop Year"
            sx={{ mb: 2, width: "100%" }}
          />

          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            sx={{ mb: 2, width: "100%" }}
            value={grainDetails?.price}
            type="number"
            onChange={(e) =>
              setGrainDetails({ ...grainDetails, price: e?.target?.value })
            }
          />

          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              sx={{ mr: 1 }}
              color="success"
              onClick={() => {
                setGrainDetails({
                  ...grainDetails,
                  startDate: "",
                  endDate: "",
                  cropYear: "",
                  price: 0,
                });
                handleClose("ADD");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={
                !grainDetails.startDate ||
                !grainDetails.endDate ||
                !grainDetails.cropYear ||
                !grainDetails.price
              }
              color="success"
              onClick={() => handleAdd(grainDetails)}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddGrainModal;
