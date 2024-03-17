import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosClient from "@/Utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [imagePreview, setImagePreview] = useState(""); // State to store image preview data URL


  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("Please fill email"),
    email: yup
      .string()
      .email("Email is not valid")
      .required("Please fill the password"),
    mobNo: yup
      .string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Please fill the password"),
    designation: yup.string().required("Please fill the Designaiton"),
    gender: yup.string().required("Please fill the Gender"),
    courses: yup.array().min(1, "Select at least one language"),
    img: yup
      .mixed()
      .test("fileType", "Only JPG or PNG files are allowed", (value) => {
        if (!value[0]) return false; // If no file is provided, skip validation
        const fileType = value[0].type && value[0].type.split("/")[1]; // Extract file extension
        return ["jpg", "jpeg", "png"].includes(fileType); // Check if file type is allowed
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Submit data", data);
    // console.log(data.img[0]);
    const image = data.img[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      // console.log(imgData);
    };
    reader.readAsDataURL(image);

    const formData = {
      ...data,
      img: data.img[0],
    };
    console.log('Form Data ...',formData);
    axiosClient
      .post("employee/create-employee", formData, 
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
      )
      .then((res) => {
        console.log(res);
        toast.success("Employee registered");
        navigate("/employee-list");
      })
      .catch((e) => {
        console.log(e.response.data.error);
        toast.error(e.response.data.error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-6">
              <div className="grid gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. John Doe"
                  {...register("name")}
                />
                <p className="text-xs text-red-600 dark:text-red-500 mt-2">
                  {errors.name?.message}
                </p>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="e.g. john@example.com"
                  type="email"
                  {...register("email")}
                />
                <p className="text-xs text-red-600 dark:text-red-500 mt-2">
                  {errors.email?.message}
                </p>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="mobile-no">Mobile No</Label>
                <Input
                  id="mobile-no"
                  placeholder="e.g. 1234567890"
                  type="number"
                  {...register("mobNo")}
                />
                <p className="text-xs text-red-600 dark:text-red-500 mt-2">
                  {errors.mobNo?.message}
                </p>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="designation">Designation</Label>
                <select
                  id="designation"
                  className="w-[180px] rounded-lg h-10"
                  {...register("designation")}
                >
                  <option value="hr">HR</option>
                  <option value="manager">Manager</option>
                  <option value="sales">Sales</option>
                </select>
                <p className="text-xs text-red-600 dark:text-red-500 mt-2">
                  {errors.designation?.message}
                </p>
              </div>
              <div className="grid gap-2 items-start">
                <Label>Gender</Label>
                <div className="flex items-center gap-4">
                  <Label className="flex items-center" htmlFor="gender-male">
                    <Input
                      id="gender-male"
                      name="gender"
                      type="radio"
                      value="male"
                      {...register("gender")}
                    />
                    <span className="ml-2 text-sm font-medium">Male</span>
                  </Label>
                  <Label className="flex items-center" htmlFor="gender-female">
                    <Input
                      id="gender-female"
                      name="gender"
                      type="radio"
                      value="female"
                      {...register("gender")}
                    />
                    <span className="ml-2 text-sm font-medium">Female</span>
                  </Label>
                </div>
                <p className="text-xs text-red-600 dark:text-red-500 mt-2">
                  {errors.gender?.message}
                </p>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="">Courses</Label>

                <label htmlFor="btech">
                  <input
                    type="checkbox"
                    id="btech"
                    value="B.Tech"
                    className="mr-2"
                    {...register("courses")}
                  />
                  B.Tech
                </label>
                <label htmlFor="bba">
                  <input
                    type="checkbox"
                    id="bba"
                    value="BBA"
                    className="mr-2"
                    {...register("courses")}
                  />
                  BBA
                </label>
                <label htmlFor="bca">
                  <input
                    type="checkbox"
                    id="bca"
                    value="BCA"
                    className="mr-2"
                    {...register("courses")}
                  />
                  BCA
                </label>
                <label htmlFor="bsc">
                  <input
                    type="checkbox"
                    id="bsc"
                    value="B.Sc"
                    className="mr-2"
                    {...register("courses")}
                  />
                  B.Sc
                </label>
              </div>
              <p className="text-xs text-red-600 dark:text-red-500 mt-2">
                {errors.courses?.message}
              </p>
              <div className="grid gap-1.5">
              <Label htmlFor="img-upload">Image Upload</Label>
              <Input
                accept="image/*"
                id="img-upload"
                type="file"
                {...register("img")}
                onChange={handleImageChange} // Call handleImageChange when file selection changes
              />
            </div>
            <div className="mt-4">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-auto"
                />
              )}
            </div>
            <p className="text-xs text-red-600 dark:text-red-500 mt-2">
              {errors.img?.message}
            </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default CreateEmployee;
