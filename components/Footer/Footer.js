// import React from 'react';
// import { Input } from '@nextui-org/react';
// import 'primeicons/primeicons.css';

// const Footer = () => {
//   return (
//     <footer className="bg-[#123F37] text-white py-10 px-6">
//       <div className="container mx-auto">
//         <div className="flex flex-wrap justify-between items-start">
//           <div className="w-full md:w-auto mb-6 md:mb-0">
//             <h2 className="text-xl font-bold mb-4">Chobani</h2>
//             <ul className="text-sm">
//               <li className="mb-2"><a href="#" className="hover:underline">Careers</a></li>
//               <li className="mb-2"><a href="#" className="hover:underline">Consumer care</a></li>
//               <li className="mb-2"><a href="#" className="hover:underline">Alumni</a></li>
//               <li className="mb-2"><a href="#" className="hover:underline">Our Café</a></li>
//               <li className="mb-2"><a href="#" className="hover:underline">Chobani News</a></li>
//               <li className="mb-2"><a href="#" className="hover:underline">Foodservice</a></li>
//               <li className="mb-2"><a href="#" className="hover:underline">Chobani® Canada</a></li>
//               <li className="mb-2"><a href="#" className="hover:underline">Chobani® Mexico</a></li>
//             </ul>
//           </div>
//           <div className="w-full md:w-auto mb-6 md:mb-0 flex flex-col items-start">
//             <h3 className="mb-4 text-sm">Get the freshest Chobani news</h3>
//             <div className="flex mb-2">
//               <Input
//                 placeholder="Your email here"
//                 type="email"
//                 css={{
//                   backgroundColor: "#184E45", 
//                   borderColor: "#2D7261",
//                   color: "white",
//                   marginRight: "0.5rem",
//                   width: "200px"
//                 }}
//               />
//               <button className="bg-transparent border border-white text-white px-4 py-2">
//                 Subscribe
//               </button>
//             </div>
//             <div className="flex items-center text-sm">
//               <input type="checkbox" className="form-checkbox text-white border-white mr-2"/>
//               <span>By checking the box, you agree that you are at least 16 years of age.</span>
//             </div>
//           </div>
//           <div className="w-full md:w-auto flex justify-center md:justify-start space-x-4 mt-6 md:mt-0">
//             <a href="#" className="text-white hover:text-gray-300"><i className="pi pi-facebook"></i></a>
//             <a href="#" className="text-white hover:text-gray-300"><i className="pi pi-instagram"></i></a>
//             <a href="#" className="text-white hover:text-gray-300"><i className="pi pi-twitter"></i></a>
//             <a href="#" className="text-white hover:text-gray-300"><i className="pi pi-pinterest"></i></a>
//             <a href="#" className="text-white hover:text-gray-300"><i className="pi pi-youtube"></i></a>
//           </div>
//         </div>
//         <div className="border-t border-gray-600 mt-8 pt-4 text-xs text-center">
//           <p className="text-gray-400">
//             <a href="#" className="hover:underline mx-1">Website Terms</a> |
//             <a href="#" className="hover:underline mx-1">Privacy Policy</a> |
//             <a href="#" className="hover:underline mx-1">Accessibility Statement</a> |
//             <a href="#" className="hover:underline mx-1">CA Transparency in Supply Chains Act</a> |
//             <a href="#" className="hover:underline mx-1">Supplier Code of Conduct</a> |
//             <a href="#" className="hover:underline mx-1">Marketing to Children</a> |
//             <a href="#" className="hover:underline mx-1">Do Not Sell My Information</a>
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
"use client";
import { Divider, Input } from "@nextui-org/react";
import React, { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Footers from "../../public/images/FooterHero.JPG";
import { FaInstagram } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";
import { FaWhatsapp } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { TbNetwork } from "react-icons/tb";
import { FaPhone } from "react-icons/fa6";

// import "primeicons/primeicons.css";


const Footer = () => {
  //   const [email, setEmail] = useState("");
  //   const [subscribed, setSubscribed] = useState(false);
  //   const router = useRouter();

  //   const handleSubscribe = () => {
  //     // Simulate subscription process
  //     if (email) {
  //       // Here, you can integrate your actual subscription logic
  //       toast.success("Thank you for subscribing!");
  //       setEmail("");
  //     } else {
  //       toast.error("Please enter a valid email address.");
  //     }
  //   };

  return (
    <div className="w-full flex flex-col bg-[#123F37]">
      <div className="w-full h-full bg-[#123F37] py-3 sm:py-4 box-border relative text-start uppercase __className_1fc36d">
        <div className="grid container px-4 grid-cols-2 md:grid-cols-4 gap-2 items-center justify-center p-2 text-slate-200">
          <div className="flex flex-col gap-2 items-start justify-start p-2">
            <h2 className="md:text-4xl lg:text-4xl sm:text-3xl text-xl font-bold text-white">
              99%
            </h2>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Satisfaction
            </h3>
            <hr className="w-1/5 sm:w-1/3 border border-white"></hr>
            <ul className="flex flex-col gap-1 items-start justify-start md:text-sm lg:text-sm text-xs font-medium sm:font-semibold text-slate">
              <li>Customer Satisfaction</li>
              <li>Deluxe Quality Prints</li>
              <li>Attention to Detail</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2 items-start justify-start p-2">
            <h2 className="md:text-4xl lg:text-4xl sm:text-3xl text-xl font-bold text-white">
              100%
            </h2>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Best Services
            </h3>
            <hr className="w-1/5 sm:w-1/3 border border-white"></hr>
            <ul className="flex flex-col gap-1 items-start justify-start md:text-sm lg:text-sm text-xs font-medium sm:font-semibold text-slate">
              <li>Custom Printing Solutions</li>
              <li>Premium Printing Services</li>
              <li>Affordable Pricing</li>
            </ul>
          </div>
          <div className="flex flex-col gap-2 items-start justify-start p-2">
            <h2 className="md:text-4xl lg:text-4xl sm:text-3xl text-xl font-bold text-white">
              10+
            </h2>
            <h3 className="text-base sm:text-lg font-bold text-white">
         Years of Experience
</h3>
<hr className="w-1/5 sm:w-1/3 border border-white" />
<ul className="flex flex-col gap-1 items-start justify-start md:text-sm lg:text-sm text-xs font-medium sm:font-semibold text-slate">
  <li>500+ Completed Projects</li>
  <li>Nationwide Service</li>
  <li>10+ Years of Experience</li>
</ul>
          </div>
          <div className="flex flex-col gap-2 items-start justify-start p-2">
            <h2 className="md:text-4xl lg:text-4xl sm:text-3xl text-xl font-bold text-white">
              24/7
            </h2>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Support
            </h3>
            <hr className="w-1/5 sm:w-1/3 border border-white"></hr>
            <ul className="flex flex-col gap-1 items-start justify-start md:text-sm lg:text-sm text-xs font-medium sm:font-semibold text-slate">
              <li>Easy Booking</li>
              <li>Customer Support</li>
              <li>Dedicated Service</li>
            </ul>
          </div>
        </div>
      </div>
      <footer
        className="md:py-12 lg:py-12 py-4 z-30 relative flex"
        style={{
          backgroundImage: `url(${Footers.src})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="max-w-[1400px]  px-4 mx-auto">
          <div className="overflow-hidden filter bg-gradient-to-b from-slate via-white/50 to-white backdrop-blur-md sticky z-10 p-10 shadow-lg border border-slate rounded-3xl px-4 md:px-6 grid grid-cols-1 lg:px-8 xl:px-12 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl text-gray-700 font-[500] __className_1fc36d">
                Our Vision
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-6 -tracking-tight">
              At K2 Signage, we bring your brand to life – where creativity meets craftsmanship. Join us as we craft captivating designs, collaborate with industry experts, and create signage that leaves a lasting impression. Your vision begins here.
                <Link className="text-Apptheme hover:text-[#000]" href="/">
                  More
                </Link>{" "}
              </p>
            </div>

            <div className="space-y-4 md:pl-8 md:border-l-2 border-white/30">
              <h3 className="text-lg md:text-xl text-gray-700 font-[500] ">
                Quick Link
              </h3>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
                <Link
                  className="hover:text-primary-main text-sm max-w-max text-gray-700 transition-colors duration-200 ease-in-out"
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className="hover:text-primary-main  text-sm  max-w-max text-gray-700 transition-colors duration-200 ease-in-out"
                  href="/review"
                >
                  Review
                </Link>
               
                <Link
                  className="hover:text-primary-main  text-sm  max-w-max text-gray-700 transition-colors duration-200 ease-in-out"
                  href="/aboutus"
                >
                  About Us
                </Link>
                <Link
                  className="hover:text-primary-main  text-sm  max-w-max text-gray-700 transition-colors duration-200 ease-in-out"
                  href="/Contactus"
                >
                  Contact Us
                </Link>
                <Link
                  className="hover:text-primary-main  text-sm  max-w-max text-gray-700 transition-colors duration-200 ease-in-out"
                  href="/privacypolicy"
                >
                  Privacy Policy
                </Link>
                <Link
                  className="hover:text-primary-main  text-sm  max-w-max text-gray-700 transition-colors duration-200 ease-in-out"
                  href="/payment"
                >
                  Payment Options
                </Link>
                <Link
                  className="hover:text-primary-main  text-sm  max-w-max text-gray-700 transition-colors duration-200 ease-in-out"
                  href="/termsandconditions"
                >
                  Terms and Condition
                </Link>
                <Link
                  className="hover:text-primary-main  text-sm  max-w-max text-gray-700 transition-colors duration-200 ease-in-out"
                  href="/disclaimer"
                >
                  Disclaimer
                </Link>
                <Link
                  className="hover:text-primary-main capitalize  text-sm  max-w-max text-gray-700 transition-colors duration-200 ease-in-out"
                  href="/cancellationpolicy"
                >
                 Refund & Cancellation Policy
                </Link>
              </div>
            </div>
            <div className="space-y-4 md:pl-8 md:border-l-2 border-white/30">
              <h3 className="text-lg md:text-xl text-gray-700 font-[500] __className_1fc36d">
                Top Categories
              </h3>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
              
                <Link
                  className="hover:text-primary-main  text-sm  max-w-max text-gray-700 transition-colors duration-200 ease-in-out"
                  href="/"
                >
                  Paper Printing 
                </Link>
                <Link
                  className="hover:text-primary-main  text-sm  max-w-max text-gray-700 transition-colors duration-200 ease-in-out"
                  href="/destination/upcomingTrip"
                >
                  Media Printing
                </Link>
                <Link
                  className="hover:text-primary-main  text-sm  max-w-max text-gray-700 transition-colors duration-200 ease-in-out"
                  href="/destination/weekendtrip"
                >
                  Light Board
                </Link>
              </div>
            </div>
            <div className="space-y-4 text-sm md:pl-8 md:border-l-2 border-white/30">
              <div>
                <h3 className="text-xl md:text-2xl text-gray-700 font-[500] __className_1fc36d">
                  Contact Us
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Email :<span>k2signprint@gmail.com</span>
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Phone : 8999291978
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Website :<span> www.k2signprint.com</span>
                </p>
             
                <div className="flex justify-center items-center w-full rounded-lg h-24  mt-20">
                  <div className="flex justify-around gap-2 items-center">
                    <Link
                      href={
                        "https://www.instagram.com/vakratund_tours/?utm_source=ig_embed&ig_rid=22824f35-53c7-4967-8fe8-83f163b00532"
                      }
                    >
                      <div className="group transition-all duration-700 flex justify-center items-center rounded-md bg-[#4aaca8] w-12 h-12 hover:bg-white hover:text-[#36a39e]">
                        <FaInstagram
                          size={24}
                          className="text-white transition-all duration-700 group-hover:text-[#36a39e]"
                        />
                      </div>
                    </Link>
                    <Link href={"https://www.facebook.com/people/Vakratund-Tours-Adventures/61564626934045/?mibextid=ZbWKwL"}> <div className="group transition-all duration-700 flex justify-center items-center rounded-md bg-[#4aaca8] w-12 h-12 hover:bg-white hover:text-[#36a39e]">
                      <SlSocialFacebook
                        size={24}
                        className="text-white transition-all duration-700 group-hover:text-[#36a39e]"
                      />
                    </div> </Link>
                   
                    <Link href={"https://wa.link/f5qsnc"}>
                      <div className="group transition-all duration-700 flex justify-center items-center rounded-md bg-[#4aaca8] w-12 h-12 hover:bg-white hover:text-[#36a39e]">
                        <FaWhatsapp
                          size={24}
                          className="text-white transition-all duration-700 group-hover:text-[#36a39e]"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="md:m-10 m-4 flex items-center justify-center  relative ">
        {/* <Image
          className="w-full object-fill h-80 rounded-lg "
          src={Conatctus}
          alt="Conatctus"
        /> */}

        <div className="text-center p-4">
          <h3 className="font-bold text-2xl md:text-4xl text-white">
            K2 Design - Digital Signage House
          </h3>
          <p className="text-xs md:text-base text-white mt-1">
            At-Kamshet , Tal-Maval Dist-Pune, Maharashtra 410105
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center text-white gap-2 md:gap-10 mt-2">
            <p className="flex items-center">
            <MdOutlineMail size={24}/>
              k2signprint@gmail.com
            </p>
            <p className="flex items-center">
            <FaPhone size={24}/>
              +91 8999291978
            </p>
            <p className="flex items-center">
            <TbNetwork  size={24}/>
              <Link href="https://www.vakratundtours.com/">
              www.k2signprint.com
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* <div className="bg-[#0b8d7c] md:h-40 lg:h-40 h-56 md:pb-0 lg:pb-0 pb-4 w-full gap-8 flex flex-col md:flex-row lg:flex-row justify-between md:items-center lg:items-center items-start md:px-12 lg:px-12 px-4 ">
        <div className="flex justify-start items-start gap-2 md:w-1/2 lg:w-1/2 w-full flex-col">
          <h6 className="text-xs font-medium text-[#FF7143] uppercase">
            newsletter
          </h6>
          <p className="text-[0.7rem] md:text-xs lg:text-xs font-medium text-white md:leading-7 lg:leading-7 leading-7 uppercase">
            {`Sign up for our newsletter now! Get exclusive offers and discounts. Stay informed, stay ahead. Subscribe today!`}
          </p>
        </div>
        <div className="flex items-center h-12 ring-1 ring-white rounded-lg md:w-1/2 lg:w-1/2 w-full px-4">
          <input
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="border-none text-white w-11/12 focus:outline-none bg-[#0b8d7c] p-2"
          />
          <span
            // onClick={handleSubscribe}
            className="text-sm font-extrabold text-[#FF7143] uppercase cursor-pointer"
          >
            send
          </span>
        </div>
      </div> */}

      <div className="w-11/12 mx-auto z-10 bg-white md:mb-0 lg:mb-0 mb-8 ">
        <Divider orientation="horizontal" />
      </div>

      <p className="text-center mt-2 text-white mb-3 font-sans md:text-xs lg:text-xs text-tiny px-1 uppercase w-full">
        {` 2024 K2 Design - Digital Signage House - All rights reserved.`}
      </p>

      {/* <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/> */}
    </div>
  );
};

export default Footer;
