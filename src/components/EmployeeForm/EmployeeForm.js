import React, { useState, useEffect } from "react";
import "./EmployeeForm.css";
import Alert from "@mui/material/Alert";

function EmployeeForm({ action, employeeToEdit, onEmployeeCreate }) {
  const [employee, setEmployee] = useState({
    emp_id: "",
    first_name: "",
    last_name: "",
    birth_day: "",
    sex: "",
    salary: "",
    super_id: "",
    branch_id: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (action === "edit") {
      setEmployee(employeeToEdit);
    }
  }, []);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/createEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      if (response.ok) {
        onEmployeeCreate("Employee added successfully!");
        // setAlertMessage("Employee added successfully!");
        // setShowAlert(true);
        // Refresh the list of employees
    //    window.location.reload();
      } else {
        console.error("Error adding employee");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = async (editedEmployee) => {
    try {
      const response = await fetch(
        `http://localhost:3000/updateEmployee/${editedEmployee.emp_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedEmployee),
        },
      );

      if (response.ok) {
        // refresh the list of employees
        // window.location.reload();
      } else {
        throw new Error("Failed to update employee");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {showAlert && <Alert severity="success">{alertMessage}</Alert>}
      <form
        onSubmit={(e) => {
          if (action === "create") {
            handleCreate(e);
          } else if (action === "edit") {
            handleEdit(employee);
          }
        }}
      >
        <div className="form-container">
          {action === "create" && (
            <h2 className="form-title">Create New Employee</h2>
          )}
          {action === "edit" && <h2 className="form-title">Edit Employee</h2>}
          <label>Employee ID</label>
          <input
            type="number"
            name="emp_id"
            value={employee.emp_id}
            onChange={handleChange}
            placeholder="Employee ID"
          />
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={employee.first_name}
            onChange={handleChange}
            placeholder="First Name"
          />
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={employee.last_name}
            onChange={handleChange}
            placeholder="Last Name"
          />
          <label>Birth Date</label>
          <input
            type="date"
            name="birth_day"
            value={employee.birth_day}
            onChange={handleChange}
            placeholder="Birthday"
          />
          <label>Sex</label>
          <input
            type="text"
            name="sex"
            value={employee.sex}
            onChange={handleChange}
            placeholder="Sex"
            maxLength="1"
          />
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            placeholder="Salary"
          />
          <label>Supervisor ID</label>
          <input
            type="number"
            name="super_id"
            value={employee.super_id}
            onChange={handleChange}
            placeholder="Supervisor ID"
          />
          <label>Branch ID</label>
          <input
            type="number"
            name="branch_id"
            value={employee.branch_id}
            onChange={handleChange}
            placeholder="Branch ID"
          />
          <button className="submit-button" type="submit">
            {action === "edit" && "Edit Employee"}
            {action === "create" && "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
