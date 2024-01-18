import React, { useState, useEffect } from "react";
import EmployeeModal from "../EmployeeModal/EmployeeModal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./EmployeeTable.css";

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:3000/getAllEmployees");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (empId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:3000/deleteEmployee/${empId}`,
          {
            method: "DELETE",
          },
        );

        if (response.ok) {
          console.log(`Deleted employee with ID ${empId}`);
          const updatedEmployees = employees.filter(
            (employee) => employee.emp_id !== empId,
          );
          setEmployees(updatedEmployees);
        } else {
          throw new Error(`Failed to delete employee with ID ${empId}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <TableContainer className="table" component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Employee ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Birth Date</TableCell>
            <TableCell>Sex</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Supervisor ID</TableCell>
            <TableCell>Branch ID</TableCell>
            <TableCell>Delete Employee</TableCell>
            <TableCell>Edit Employee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.emp_id}>
              <TableCell>{employee.emp_id}</TableCell>
              <TableCell>{employee.first_name}</TableCell>
              <TableCell>{employee.last_name}</TableCell>
              <TableCell>{employee.birth_day}</TableCell>
              <TableCell>{employee.sex}</TableCell>
              <TableCell>{employee.salary}</TableCell>
              <TableCell>{employee.super_id}</TableCell>
              <TableCell>{employee.branch_id}</TableCell>
              <TableCell>
                <button onClick={() => handleDelete(employee.emp_id)}>
                  Delete
                </button>
              </TableCell>
              <TableCell>
                <EmployeeModal employeeToEdit={employee} action={"edit"} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeeTable;
