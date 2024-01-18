import "./App.css";
import React, { useState } from 'react';
import EmployeeModal from "./components/EmployeeModal/EmployeeModal";
import EmployeeTable from "./components/EmployeeTable/EmployeeTable";
import Alert from "@mui/material/Alert";

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleShowAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      window.location.reload();
    }, 3000);
  };
  
  return (
    <div className="App">
      {showAlert && <Alert severity="success">{alertMessage}</Alert>}
      <h1>Employee Dashboard</h1>
      <EmployeeModal onEmployeeCreate={handleShowAlert} action={"create"} />
      <EmployeeTable />
    </div>
  );
}

export default App;
