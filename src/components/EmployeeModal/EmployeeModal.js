import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import EmployeeForm from "../EmployeeForm/EmployeeForm";

function EmployeeModal({ action, employeeToEdit, onEmployeeCreate }) {
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    maxHeight: "50vh",
    overflowY: "auto",
  };

  return (
    <div>
      <button onClick={handleOpen}>
        {action === "edit" && "Edit"}
        {action === "create" && "Create New Employee"}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EmployeeForm onEmployeeCreate={onEmployeeCreate} employeeToEdit={employeeToEdit} action={action} />
        </Box>
      </Modal>
    </div>
  );
}

export default EmployeeModal;
