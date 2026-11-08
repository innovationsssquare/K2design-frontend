"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  ChevronDown,
  ArrowLeft,
  Mail,
  Lock,
  Sparkles
} from "lucide-react";
import { FaWhatsapp, FaGoogle } from "react-icons/fa";

export function AuthModal({ isOpen, setIsOpen, onLoginSuccess }) {
  const [authMode, setAuthMode] = useState("phone"); // 'phone' | 'otp' | 'password'
  
  // WhatsApp / Mobile OTP State
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(30);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [mockGeneratedOtp, setMockGeneratedOtp] = useState("");
  const otpInputRefs = useRef([]);

  // Password Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  // Resend OTP Countdown
  useEffect(() => {
    let interval = null;
    if (authMode === "otp" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [authMode, resendTimer]);

  const handleSendOtp = () => {
    const cleaned = phoneNumber.replace(/\D/g, "");
    if (cleaned.length !== 10) {
      toast.error("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    setIsSendingOtp(true);
    setTimeout(() => {
      const code = String(Math.floor(100000 + Math.random() * 900000));
      setMockGeneratedOtp(code);
      setAuthMode("otp");
      setResendTimer(30);
      setIsSendingOtp(false);
      toast.success(`WhatsApp OTP sent! Use code: ${code}`, { duration: 6000 });
    }, 600);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, "").slice(0, 6).split("");
      const newDigits = [...otpDigits];
      pasted.forEach((char, i) => {
        if (i < 6) newDigits[i] = char;
      });
      setOtpDigits(newDigits);
      if (pasted.length === 6) {
        verifyOtpCode(newDigits.join(""));
      }
      return;
    }

    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    if (newDigits.every((d) => d !== "")) {
      verifyOtpCode(newDigits.join(""));
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtpCode = (enteredCode) => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const cleaned = phoneNumber.replace(/\D/g, "");
      const sessionUser = {
        name: `Member +91 ${cleaned.slice(0, 5)}...`,
        phone: `+91 ${cleaned}`,
        email: `user_${cleaned.slice(-4)}@k2sign.com`,
        isVerified: true,
        authProvider: "whatsapp",
        role: "customer",
      };

      const mockToken = "k2_jwt_" + Date.now() + "_" + Math.random().toString(36).substring(7);
      Cookies.set("token", mockToken, { expires: 30 });
      if (typeof window !== "undefined") {
        localStorage.setItem("k2_user", JSON.stringify(sessionUser));
        window.dispatchEvent(new Event("storage"));
      }

      toast.success("Welcome! Successfully signed in via WhatsApp OTP.");
      setIsOpen(false);
      resetState();
      if (onLoginSuccess) onLoginSuccess(sessionUser);
    }, 800);
  };

  const handleGoogleLogin = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const googleUser = {
        name: "Google Customer",
        email: "verified.customer@gmail.com",
        isVerified: true,
        authProvider: "google",
        role: "customer",
      };

      const mockToken = "k2_google_jwt_" + Date.now();
      Cookies.set("token", mockToken, { expires: 30 });
      if (typeof window !== "undefined") {
        localStorage.setItem("k2_user", JSON.stringify(googleUser));
        window.dispatchEvent(new Event("storage"));
      }

      toast.success("Signed in with Google account!");
      setIsOpen(false);
      resetState();
      if (onLoginSuccess) onLoginSuccess(googleUser);
    }, 700);
  };

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setIsPasswordLoading(true);
    setTimeout(() => {
      setIsPasswordLoading(false);
      const standardUser = {
        name: email.split("@")[0].toUpperCase(),
        email: email,
        isVerified: true,
        authProvider: "email",
        role: email.includes("admin") ? "admin" : "customer",
      };

      const mockToken = "k2_pwd_jwt_" + Date.now();
      Cookies.set("token", mockToken, { expires: 30 });
      if (typeof window !== "undefined") {
        localStorage.setItem("k2_user", JSON.stringify(standardUser));
        window.dispatchEvent(new Event("storage"));
      }

      toast.success(`Welcome back, ${standardUser.name}!`);
      setIsOpen(false);
      resetState();
      if (onLoginSuccess) onLoginSuccess(standardUser);
    }, 800);
  };

  const resetState = () => {
    setAuthMode("phone");
    setOtpDigits(["", "", "", "", "", ""]);
    setPhoneNumber("");
    setResendTimer(30);
    setEmail("");
    setPassword("");
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetState();
      }}
    >
      <DialogContent
        className="w-full max-w-4xl p-0 overflow-hidden bg-white border border-gray-200 rounded-[32px] shadow-2xl"
        style={{ backgroundColor: "#ffffff" }}
      >
        <DialogTitle className="sr-only">Sign in to K2 Sign & Print</DialogTitle>

        <div className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-6 gap-6 items-stretch">
          
          {/* LEFT COLUMN: VISUAL BANNER CARD (Vistaprint / Modern Travel Style) */}
          <div className="md:col-span-5 relative rounded-[24px] overflow-hidden min-h-[340px] md:min-h-[480px] bg-gradient-to-br from-[#180a29] via-[#2a1145] to-[#120520] flex flex-col justify-between p-6 sm:p-7 text-white shadow-inner">
            {/* Background Texture & Signage Graphic */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay">
              <Image
                src="/images/acrylic-3d-letters.jpg"
                alt="K2 Sign & Print Production"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none" />

            {/* Top Brand Tag */}
            <div className="relative z-10 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-300/90 block">
                K2 SIGN & PRINT
              </span>
            </div>

            {/* Middle Content: Catchy Headline & Subtitle */}
            <div className="relative z-10 text-center space-y-2.5 my-auto py-6">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight leading-snug">
                Print Smarter. <br />
                Grow Your Brand.
              </h3>
              <p className="text-xs text-purple-200/90 font-medium max-w-[240px] mx-auto leading-relaxed">
                Industrial offset & digital printing press with 6 branch stores in Pune & Mumbai
              </p>

              {/* Dashed Border Badge */}
              <div className="pt-2">
                <span className="inline-block border border-dashed border-white/60 bg-black/40 backdrop-blur-xs px-4 py-2 rounded-full text-xs font-bold text-white tracking-wide shadow-xs">
                  Visiting Cards from ₹0.20*
                </span>
              </div>
            </div>

            {/* Bottom Assurance */}
            <div className="relative z-10 flex items-center justify-center gap-1.5 text-[11px] text-gray-300 font-medium border-t border-white/10 pt-3">
              <Sparkles size={13} className="text-amber-300" />
              <span>300 DPI Pre-Press Proofing Guaranteed</span>
            </div>
          </div>

          {/* RIGHT COLUMN: LOGIN / SIGNUP FORM */}
          <div className="md:col-span-7 flex flex-col justify-between p-2 sm:p-4 sm:pr-6">
            
            <div>
              {/* Brand Logo & Title Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-[#9c1dac] text-white flex items-center justify-center font-black text-sm shadow-xs">
                  K2
                </div>
                <span className="font-extrabold text-sm tracking-wider text-gray-900">
                  K2 SIGN & PRINT
                </span>
              </div>

              {/* Eyebrow & Main Heading */}
              <div className="space-y-1 mb-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Login/Signup
                </p>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                  Welcome to K2 Sign & Print
                </h2>
              </div>

              {/* FLOW 1: PHONE NUMBER INPUT */}
              {authMode === "phone" && (
                <div className="space-y-4">
                  {/* Phone Input with Country Code Dropdown */}
                  <div className="flex gap-2.5">
                    {/* Country Code Pill Box */}
                    <div className="flex items-center gap-1.5 px-3.5 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 text-sm font-bold shrink-0">
                      <span>+91</span>
                      <ChevronDown size={14} className="text-gray-500" />
                    </div>

                    {/* Phone Number Input */}
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="Phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendOtp();
                      }}
                      className="w-full h-12 px-4 text-sm font-semibold rounded-2xl border border-gray-200 focus:border-[#9c1dac] focus:ring-4 focus:ring-[#9c1dac]/10 outline-none transition placeholder:text-gray-400 placeholder:font-normal"
                      autoFocus
                    />
                  </div>

                  {/* Primary CTA Button: Continue */}
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isSendingOtp || phoneNumber.length < 10}
                    className="w-full h-12 rounded-2xl bg-[#9c1dac] hover:bg-[#831492] disabled:opacity-50 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSendingOtp ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Sending WhatsApp OTP...</span>
                      </>
                    ) : (
                      <span>Continue</span>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="relative my-4 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-100" />
                    </div>
                    <span className="relative bg-white px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                      or continue with
                    </span>
                  </div>

                  {/* Google Login Button */}
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isVerifying}
                    className="w-full h-12 rounded-2xl border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs shadow-xs flex items-center justify-center gap-3 transition cursor-pointer"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  {/* Switch to Password */}
                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setAuthMode("password")}
                      className="text-xs text-gray-500 hover:text-purple-700 font-medium transition cursor-pointer"
                    >
                      Sign in with Email & Password &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* FLOW 2: 6-DIGIT OTP VERIFICATION */}
              {authMode === "otp" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-1">
                    <button
                      type="button"
                      onClick={() => setAuthMode("phone")}
                      className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition cursor-pointer"
                      title="Back to phone number"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <div>
                      <p className="text-xs font-bold text-gray-800">
                        Verification code sent via WhatsApp
                      </p>
                      <p className="text-[11px] text-gray-500">
                        Code sent to <span className="font-bold text-gray-800">+91 {phoneNumber}</span>
                      </p>
                    </div>
                  </div>

                  {/* 6 Digit Inputs */}
                  <div className="flex justify-between gap-1.5 py-1">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpInputRefs.current[idx] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-11 h-12 text-center text-lg font-black rounded-xl border border-gray-200 focus:border-[#9c1dac] focus:ring-4 focus:ring-[#9c1dac]/15 outline-none transition bg-gray-50/50"
                        autoFocus={idx === 0}
                      />
                    ))}
                  </div>

                  {mockGeneratedOtp && (
                    <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-center text-[11px] text-amber-800 font-medium">
                      Demo Code: <span className="font-mono font-bold text-sm text-purple-900 tracking-wider">{mockGeneratedOtp}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => verifyOtpCode(otpDigits.join(""))}
                    disabled={isVerifying || otpDigits.some((d) => !d)}
                    className="w-full h-12 rounded-2xl bg-[#9c1dac] hover:bg-[#831492] disabled:opacity-50 text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <span>Verify & Continue</span>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-xs pt-1 px-1">
                    <button
                      type="button"
                      onClick={() => setAuthMode("phone")}
                      className="text-gray-500 hover:text-gray-800 underline font-medium cursor-pointer"
                    >
                      Change Number
                    </button>

                    {resendTimer > 0 ? (
                      <span className="text-gray-400 font-medium">
                        Resend in {resendTimer}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-[#9c1dac] hover:text-[#831492] font-bold cursor-pointer"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* FLOW 3: PASSWORD LOGIN FALLBACK */}
              {authMode === "password" && (
                <form onSubmit={handlePasswordLogin} className="space-y-3.5">
                  <div className="flex items-center gap-2 pb-1">
                    <button
                      type="button"
                      onClick={() => setAuthMode("phone")}
                      className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition cursor-pointer"
                      title="Back to phone login"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <span className="text-xs font-bold text-gray-800">
                      Sign in with Email
                    </span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 px-4 text-sm font-semibold rounded-xl border border-gray-200 focus:border-[#9c1dac] focus:ring-4 focus:ring-[#9c1dac]/10 outline-none transition"
                      autoFocus
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-11 px-4 text-sm font-semibold rounded-xl border border-gray-200 focus:border-[#9c1dac] focus:ring-4 focus:ring-[#9c1dac]/10 outline-none transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPasswordLoading}
                    className="w-full h-12 rounded-2xl bg-[#9c1dac] hover:bg-[#831492] disabled:opacity-50 text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isPasswordLoading ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <span>Sign In</span>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* BOTTOM DISCLAIMER (Matches Reference Design) */}
            <div className="pt-6 mt-4">
              <p className="text-[11px] text-gray-400 leading-relaxed text-left">
                By signing up, you agree to our{" "}
                <span className="text-[#9c1dac] font-semibold hover:underline cursor-pointer">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="text-[#9c1dac] font-semibold hover:underline cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>

          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
