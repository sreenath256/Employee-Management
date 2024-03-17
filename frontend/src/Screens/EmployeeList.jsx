import React from "react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
const imageURL = import.meta.env.IMAGE_BASE_URL;
import { Input } from "@/components/ui/input";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import axiosClient from "@/Utils/axios";
import toast from "react-hot-toast";
import EditEmployee from "@/components/EditEmployee/EditEmployee";
const EmployeeList = () => {
  const [employee, setEmployee] = useState([]);
  const [reLoad, setReLoad] = useState(false);
  const [searchResult, setSearchResult] = useState();
  const [editEmployee, setEditEmployee] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const employee = await axiosClient.get("employee/get-employee");
      setEmployee(employee.data);
      console.log(employee);
    };
    fetchData();
  }, [reLoad]);

  const handleSearch = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filteredData = employee.filter((entry) =>
      Object.values(entry).some((value) =>
        String(value).toLowerCase().includes(lowerCaseSearchTerm)
      )
    );

    setSearchResult(filteredData);
    console.log(filteredData);
  };

  const deleteEmployee = async (id) => {
    const confirm = window.confirm("Are you sure want to delete...");
    if (confirm) {
      console.log("Delete button clicked");
      const res = await axiosClient.post("employee/delete-employee", { id });
      toast.success(res.data.message);
      setReLoad(!reLoad);

      if (!res) {
        console.log(res);
        toast.error(res.data.message);
      }
    }
  };
  const handleEditEmployeeOn = (id) => {
    setEditEmployeeId(id);
    setEditEmployee(true);
  };
  const handleEditEmployeeOff = () => {
    setEditEmployee(false);
    console.log("off");
  };

  return (
    <div>
      <div className="flex flex-col ">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Search employee..."
                  type="search"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </form>
          </div>
          <Button className="bg-green-500">
            <Link to="/create-employee">Create Employee</Link>
          </Button>{" "}
        </header>
        <main className="flex  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 ">
          <div className="border shadow-sm rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No</TableHead>
                  <TableHead>Employee id</TableHead>

                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile No</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Gender </TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Create Date</TableHead>

                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResult
                  ? searchResult.map((data, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-medium">
                            {data._id}
                          </TableCell>
                          <TableCell className="font-medium" onClick={()=>window.open('http://localhost:3000/' + data.imagePath)}>
                            <img width={100} height={100}  className="object-contain" src={'http://localhost:3000/' + data.imagePath} alt="" />
                          </TableCell>
                          <TableCell className="font-medium">
                            {data.name}
                          </TableCell>
                          <TableCell className="font-medium">
                            {data.email}
                          </TableCell>
                          <TableCell className="font-medium">
                            {data.mobNo}
                          </TableCell>
                          <TableCell className="font-medium">
                            {data.designation}
                          </TableCell>
                          <TableCell className="font-medium">
                            {data.gender}
                          </TableCell>
                          <TableCell className="font-medium">
                            {data.courses}
                          </TableCell>
                          <TableCell className="font-medium">
                            {data.createdAt}
                          </TableCell>

                          <TableCell className="font-medium flex gap-4">
                            <Button
                              className="bg-green-500"
                              onClick={() => handleEditEmployeeOn(data._id)}
                            >
                              Edit
                            </Button>
                            <Button
                              className="bg-red-500"
                              onClick={() => deleteEmployee(data._id)}
                            >
                              Remove employee
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : employee.map((data, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-medium">
                            {data._id}
                          </TableCell>
                          <TableCell className="font-medium" onClick={()=>window.open('http://localhost:3000/' + data.imagePath)} >
                            <img width={100} height={100} className="object-contain" src={'http://localhost:3000/' + data.imagePath} alt="" />
                          </TableCell>
                          <TableCell className="font-medium">
                            {data.name}
                          </TableCell>
                          <TableCell className="font-medium">
                            {data.email}
                          </TableCell>
                          <TableCell className="font-medium">
                            {data.mobNo}
                          </TableCell>
                          <TableCell className="font-medium">
                            {data.designation}
                          </TableCell>
                          <TableCell className="font-medium">
                            {data.gender}
                          </TableCell>
                          <TableCell className="font-medium">
                            {data.courses}
                          </TableCell>
                          <TableCell className="font-medium">
                            {data.createdAt}
                          </TableCell>

                          <TableCell className="font-medium flex gap-4">
                            <Button
                              className="bg-green-500"
                              onClick={() => handleEditEmployeeOn(data._id)}
                            >
                              Edit
                            </Button>
                            <Button
                              className="bg-red-500"
                              onClick={() => deleteEmployee(data._id)}
                            >
                              Remove employee
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
      {editEmployee && (
        <div className="">
          <EditEmployee id={editEmployeeId} setEditEmployee={setEditEmployee} />
        </div>
      )}
    </div>
  );
};

export default EmployeeList;

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
