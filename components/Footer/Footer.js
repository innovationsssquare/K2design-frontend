// import Arrowleft from "../../public/Loginasset/Arrowleft.png";
// import Conatcticon from "../../public/Loginasset/Contacticon.png";
// import Locationicon from "../../public/Loginasset/Locationicon.png";
// import Mailicon from "../../public/Loginasset/Mailicon.png";
// import Instagram from "../../public/Loginasset/Instagram.png";
// import Linkdin from "../../public/Loginasset/Linkdin.png";
// import Facebook from "../../public/Loginasset/Facebook.png";
// import X from "../../public/Loginasset/X.png";
// import Youtube from "../../public/Loginasset/Youtube.png";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { FaHome } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { MdLocationPin } from "react-icons/md";
import { Divider, Input } from "@nextui-org/react";

import { MdOutlineMail } from "react-icons/md";
import { TbNetwork } from "react-icons/tb";
import { FaPhone } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate  pt-4  ">
      <div className="w-11/12 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-Apptheme mb-4">
              K2 Signage
            </h2>
            <p className="text-sm leading-6">{`At K2 Signage, we bring your brand to life – where creativity meets craftsmanship. Join us as we craft captivating designs, collaborate with industry experts, and create signage that leaves a lasting impression. Your vision begins here`}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-Apptheme">
              Quick Links
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center  cursor-pointer">
                {/* <Image src={Arrowleft} alt="arrow" className="object-contain" /> */}
                {/* <FaHome /> */}
                Home
              </li>
              <li className="flex items-center gap-2 cursor-pointer">
                {/* <Image src={Arrowleft} alt="arrow" className="object-contain" /> */}
                About Us
              </li>
              <li className="flex items-center gap-2 cursor-pointer">
                {/* <Image src={Arrowleft} alt="arrow" className="object-contain" /> */}
                Contact Us
              </li>
              <li className="flex items-center gap-2 cursor-pointer">
                {/* <Image src={Arrowleft} alt="arrow" className="object-contain" /> */}
                Payment Options
              </li>
              <li className="flex items-center gap-2 cursor-pointer">
                {/* <Image src={Arrowleft} alt="arrow" className="object-contain" /> */}
                Refund & Cancellation Policy
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-Apptheme">
              Top Categories
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-2 cursor-pointer">
                {/* <Image src={Arrowleft} alt="arrow" className="object-contain" /> */}
                Paper Printing
              </li>
              <li className="flex items-center gap-2 cursor-pointer">
                {/* <Image src={Arrowleft} alt="arrow" className="object-contain" /> */}
                Light Board
              </li>
              <li className="flex items-center gap-2 cursor-pointer">
                {/* <Image src={Arrowleft} alt="arrow" className="object-contain" /> */}
                Media Printing
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-Apptheme">
              Get In Touch
            </h3>
            <ul className="flex flex-col items-start justify-start gap-4  text-sm">
              <li className="flex items-center gap-2 cursor-pointer">
                {/* <Image
                  src={Conatcticon}
                  alt="arrow"
                  className="object-contain h-4 w-4"
                /> */}
                <FaPhoneAlt />
                +91 8999291978
              </li>
              <li className="flex items-center gap-2 cursor-pointer">
                {/* <Image
                  src={Mailicon}
                  alt="arrow"
                  className="object-contain h-4 w-4"
                /> */}
                <GrMail />
                k2signprint@gmail.com
              </li>
              <li className="flex items-center gap-2 cursor-pointer">
                {/* <Image
                  src={Locationicon}
                  alt="arrow"
                  className="object-contain h-4 w-4"
                /> */}
                <MdLocationPin className="text-2xl" />
                At-Kamshet , Tal-Maval Dist-Pune, Maharashtra 410105
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <div className="bg-Apptheme py-2 w-full text-white flex justify-between px-6 items-center  text-sm text-center">
        <div className="flex items-center gap-2"></div>
        <p>
          &copy;Copyrights {new Date().getFullYear()} .2024 K2 Design - Digital
          Signage House . All rights reserved.
        </p>
        <div>
          <Button
            size="sm"
            className="ring-1 ring-white text-white bg-transparent rounded-md"
          >
            ENG
          </Button>
        </div>
      </div> */}

      <div className="w-full flex-col bg-gradient-to-r from-purple-600 to-indigo-600 text-white" style={{ background: "linear-gradient(to right, #6A1B9A, #1E88E5)" }}>
        <div className="md:m-10 m-4 flex items-center justify-center  relative ">
          {/* <Image
         className="w-full object-fill h-80 rounded-lg "
         src={Conatctus}
         alt="Conatctus"
       /> */}

          <div className="text-center flex flex-col items-center gap-2 p-4">
            <h3 className="font-bold text-2xl md:text-4xl text-white">
              K2 Design - Digital Signage House
            </h3>
            <p className="text-xs md:text-base text-white mt-1">
              At-Kamshet , Tal-Maval Dist-Pune, Maharashtra 410105
            </p>
            <div className="flex flex-col md:flex-row justify-between items-center text-white gap-2 md:gap-10 mt-2">
              <p className="flex items-center">
                <MdOutlineMail size={24} />
                k2signprint@gmail.com
              </p>
              <p className="flex items-center">
                <FaPhone size={24} />
                +91 8999291978
              </p>
              <p className="flex items-center">
                <TbNetwork size={24} />
                <Link href="https://www.vakratundtours.com/">
                  www.k2signprint.com
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="w-11/12 mx-auto z-10 bg-white md:mb-0 lg:mb-0 mb-8 ">
          <Divider orientation="horizontal" />
        </div>

        <p className="text-center  text-white py-2  font-sans md:text-xs lg:text-xs text-tiny px-1 uppercase w-full">
          {` 2024 K2 Design - Digital Signage House - All rights reserved.`}
        </p>
      </div>
    </footer>
  );
}
