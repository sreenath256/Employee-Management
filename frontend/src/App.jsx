import { Route, Routes } from "react-router-dom";
import Login from "./Screens/Login";
import Navbar from "./components/Navbar/Navbar";
import Dashbord from "./Screens/Dashbord";
import CreateEmployee from "./Screens/CreateEmployee";
import EmployeeList from "./Screens/EmployeeList";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(()=>{
    const checkAdmin=()=>{
      if(localStorage.getItem('Username')){
        setIsAdmin(true)
      }
    }
    checkAdmin()
  },[])

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      {isAdmin && <Navbar />}
      {/* <CreateEmployee/> */}
      {/* <EmployeeList/> */}
      <div>
        <Routes>
          {!isAdmin ? (
            <Route path="/" element={<Login />} />
          ) : (
            <>
              <Route path="/" element={<Dashbord />} />
              <Route path="/create-employee" element={<CreateEmployee />} />
              <Route path="/employee-list" element={<EmployeeList />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
