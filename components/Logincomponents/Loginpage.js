"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../public/Logo.png";
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';

import { Adminlogin, } from "@/lib/API/Auth";

import Cookies from "js-cookie";
import { Tabs, Tab } from "@nextui-org/react";


import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Checkbox,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
// import { setUser } from '../../lib/AuthSlice';
// import { useDispatch } from 'react-redux';
// import { fetchUserDetails } from "@/lib/AuthSlice";

const Loginpage = () => {
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [superAdminEmail, setSuperAdminEmail] = useState("");
  const [superAdminPassword, setSuperAdminPassword] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [selected, setSelected] = React.useState("Superadminlogin");
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userdata,Setuserdata]=useState()

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setSuperAdminEmail(rememberedEmail);
      setAdminEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);
  const properties = ["Property 1", "Property 2", "Property 3"]; // Example properties

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setIsDropdownOpen(false);
  };

  // const handleSubmit = async () => {
  //   const data = {
  //     Email: email,
  //     Password: password,
  //   };
  //   const result = await Superadminlogin(data);
  //   if (result.status) {
  //     console.log(result.token);
  //     Cookies.set("token", result.token, { expires: 7 });
  //     window.location.href = "/";
  //   } else {
  //     toast.error(result.message || "An error occurred");
  //   }
  // };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validate = () => {
    if (selected === "Superadminlogin") {
      if (!superAdminEmail) {
        return "Email is required";
      } else if (!validateEmail(superAdminEmail)) {
        return "Invalid  email format";
      }
      if (!superAdminPassword) return " Password is required";
    } else {
      if (!adminEmail) {
        return " Email is required";
      } else if (!validateEmail(adminEmail)) {
        return "Invalid  email format";
      }
      if (!adminPassword) return " Password is required";
    }
    return null;
  };

  const handleSubmit = async () => {
    const errors = validate();
    if (errors) {
      toast.error(errors);
      return;
    }

    setLoading(true);

    let data, result;

    try {
      if (selected === "Superadminlogin") {
        data = {
          Email: superAdminEmail,
          Password: superAdminPassword,
        };
        result = await Adminlogin(data);
       if(result.data){
        Setuserdata(result.data)
      }
      } else {
        data = {
          Email: adminEmail,
          Password: adminPassword,
        };
        result = await Adminlogin(data);
        if(result.data){
          Setuserdata(result.data)
        }
      }

      if (result.status) {
        console.log(result.token);
        Cookies.set("token", result.token);
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", data.Email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        router.push("/");
      } else {
        toast.error(result.message || "An error occurred during login");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <main className="h-screen w-full   flex justify-center items-center flex-col">
        <div className="md:w-96 lg:w-96 w-11/12 h-auto rounded-lg overflow-hidden mx-auto boxshadow">
          <div className="flex gap-3 bg-white justify-center items-center py-2  ">
            <Image alt=" logo" height={40} radius="sm" src={Logo} width={40} className="object-contain h-24 w-24" />
           
          </div>
          <div className="flex gap-3 justify-center bg-white items-center py-4 flex-col">
            <Tabs
              fullWidth
              classNames={{
                tabList:
                  "gap-6 w-11/12 mx-auto relative  rounded-md p-0  ",
                cursor: "w-full bg-white",
                tab: " px-2 h-6",
                tabContent: "group-data-[selected=true]:text-black text-black uppercase font-bold",
              }}
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="Superadminlogin" title="Login" className="w-full">
                <div className="w-full flex justify-center items-center flex-col gap-3">
                  <div className="bg-slate rounded-md w-11/12 mx-auto h-12 flex justify-start px-2 items-center gap-4">
                    <FaUser className="text-[#9c1dac]" size={24} />
                    <input
                      className="outline-none bg-slate text-black placeholder:text-black placeholder:text-sm placeholder:font-medium w-full"
                      placeholder="User Name"
                      value={superAdminEmail}
                      onChange={(e) => setSuperAdminEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="bg-slate rounded-md w-11/12 mx-auto h-12 flex justify-start px-2 items-center gap-4">
                    <IoMdLock className="text-[#9c1dac]" size={24} />
                    <input
                      className="outline-none bg-slate text-black placeholder:text-black placeholder:text-sm placeholder:font-medium w-full"
                      placeholder="Password"
                      type="password"
                      value={superAdminPassword}
                      onChange={(e) => setSuperAdminPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </Tab>
              
            </Tabs>

            <div className="flex py-2 px-6 justify-between w-full">
              <Checkbox
               color="secondary"
                classNames={{
                  label: "text-small text-black opacity-70",
                }}
                isSelected={rememberMe}
                onValueChange={setRememberMe}
              >
                Remember me
              </Checkbox>
              <Link
                color="primary"
                href="#"
                size="sm"
                className="text-black opacity-70"
              >
                Forgot password?
              </Link>
            </div>
            <div className="w-full flex justify-center items-center py-2">
              <Button
                onPress={handleSubmit}
                className="bg-[#9c1dac] w-11/12 text-white font-semibold rounded-md"
              >
                {loading ? <span className="loader2"></span> : "Login"}
              </Button>
            </div>
          </div>
        </div>
        
      </main>


      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "white",
            color: "#000",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
};

export default Loginpage;

