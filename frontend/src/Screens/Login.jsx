import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import axiosClient from "@/Utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()
  const schema = yup.object().shape({
    name: yup
      .string()

      .required("Please fill name"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Please fill the password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    axiosClient
      .post("/user/loginuser", data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("Username", res.data.name);
        localStorage.setItem("Token", res.data.token);

        localStorage.setItem("UseriId", res.data.id);
        window.location.reload()

      })
      .catch((e) => {
        toast.error("Username or password incorrect");
      });
  };

  return (
    <>
      <div className=" h-screen flex items-center ">
        <div className="mx-auto max-w-md space-y-6 ">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="john"
                  required
                  type="name"
                  {...register("name")}
                  defaultValue='admin'
                />
                <p className=" text-xs text-red-600 dark:text-red-500 mt-2">
                  {errors.name?.message}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="********"
                  required
                  type="password"
                  {...register("password")}
                  defaultValue='12345678'
                  autoComplete="username"
                />
                <p className="text-xs text-red-600 dark:text-red-500 mt-2">
                  {errors.password?.message}
                </p>
              </div>
              <Button className="w-full" type="submit">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
