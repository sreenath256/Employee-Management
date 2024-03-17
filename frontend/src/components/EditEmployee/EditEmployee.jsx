import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosClient from "@/Utils/axios";
import toast from "react-hot-toast";

const EditEmployee = ({ id, setEditEmployee }) => {
  const [employeeList, setEmployeeList] = useState([]);
  const [imagePreview, setImagePreview] = useState(""); // State to store image preview data URL

  const schema = yup.object().shape({
    name: yup.string().required("Please fill name"),
    email: yup
      .string()
      .email("Email is not valid")
      .required("Please fill the email"),
    mobNo: yup
      .string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Please fill the mobile number"),
    designation: yup.string().required("Please fill the Designation"),
    gender: yup.string().required("Please fill the Gender"),
    courses: yup.array().min(1, "Select at least one language"),
    img: yup
      .mixed()
      .nullable() // Allow img to be null or undefined
      .test("fileType", "Only JPG or PNG files are allowed", (value) => {
        if (!value || !value[0]) return true; // If no file is provided, skip validation
        const fileType = value[0].type && value[0].type.split("/")[1]; // Extract file extension
        return ["jpg", "jpeg", "png"].includes(fileType); // Check if file type is allowed
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Saving", data);
    let formData = { ...data, id: id };

    // Check if an image is provided
    if (data.img && data.img[0]) {
      formData = { ...formData, img: data.img[0] };
    }

    console.log("form-data", formData);
    try {
      const res = await axiosClient.post("employee/update-by-id", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      if (res) {
        toast.success("Update Success");
        window.location.reload();
      } else {
        toast.error("There is an error in updating");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while updating");
    }

    handleCancel();
  };

  const handleCancel = () => {
    setEditEmployee(false);
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

  useEffect(() => {
    const fetchData = async () => {
      console.log("Coming id ", id);
      const res = await axiosClient.post("employee/get-employee-by-id", { id });
      if (res && res.data) {
        console.log(res);
        setEmployeeList(res.data);

        // Prefill form with employee data
        const { name, email, mobNo, designation, gender, courses } = res.data;
        setValue("name", name);
        setValue("email", email);
        setValue("mobNo", mobNo);
        setValue("designation", designation);
        setValue("gender", gender);
        setValue("courses", courses);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className=" bg-opacity-75 backdrop-filter pt-16 backdrop-blur-md fixed top-0 right-0 left-0 h-screen overflow-y-scroll flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-auto pt-24">
        <CardContent className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Rest of your form content */}
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...register("name")}
                type="text"
              />
            </div>
            <p className="text-xs text-red-600 dark:text-red-500 mt-2">
              {errors.name?.message}
            </p>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="email@example.com"
                {...register("email")}
                type="text"
              />
            </div>
            <p className="text-xs text-red-600 dark:text-red-500 mt-2">
              {errors.email?.message}
            </p>
            <div className="space-y-1">
              <Label htmlFor="mobile-number">Mobile Number</Label>
              <Input
                id="mobile-number"
                placeholder="+1234567890"
                {...register("mobNo")}
                type="text"
              />
            </div>
            <p className="text-xs text-red-600 dark:text-red-500 mt-2">
              {errors.mobNo?.message}
            </p>
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
                  {employeeList.gender === "male" ? (
                    <Input
                      id="gender-male"
                      name="gender"
                      type="radio"
                      value="male"
                      {...register("gender")}
                      checked
                    />
                  ) : (
                    <Input
                      id="gender-male"
                      name="gender"
                      type="radio"
                      value="male"
                      {...register("gender")}
                    />
                  )}
                  <span className="ml-2 text-sm font-medium">Male</span>
                </Label>
                <Label className="flex items-center" htmlFor="gender-female">
                  {employeeList.gender === "female" ? (
                    <Input
                      id="gender-female"
                      name="gender"
                      type="radio"
                      value="female"
                      {...register("gender")}
                      checked
                    />
                  ) : (
                    <Input
                      id="gender-female"
                      name="gender"
                      type="radio"
                      value="female"
                      {...register("gender")}
                    />
                  )}
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
            <div className="flex items-center space-x-2">
              <Button type="submit">Save</Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditEmployee;
