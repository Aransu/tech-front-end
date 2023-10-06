"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useDebounce from "@/customHook/useDeboune";
import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { user, googleSignIn, signOut } = UserAuth();

  const debouncedData = useDebounce(data, 1000);

  return (
    <div className=" absolute inset-y-0 inset-x-0 p-[30px]  bg-white">
      <div className="flex gap-4 justify-center">
        <h1 className="text-[3rem] font-[700] capitalize tracking-wide">
          Đăng nhập tài khoản{" "}
        </h1>
        <div className="relative w-[120px]">
          <Image
            src={"/images/1x/Asset1.png"}
            fill
            alt="logo"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      <form className="flex flex-col gap-2">
        {["email", "password"].map((x, i) => (
          <motion.input
            key={i}
            whileFocus={{ scale: 1.05, borderColor: "#3b82f6" }}
            value={data[x]}
            onChange={(e) => {
              setData((pre) => ({ ...pre, [x]: e.target.value }));
            }}
            placeholder={x}
            className="w-full border-b-2  outline-none text-[2.5rem] font-[600] px-2"
          />
        ))}

        <motion.button
          initial={{ backgroundColor: "#60a5fa", color: "white" }}
          whileHover={{ backgroundColor: "#2563eb" }}
          transition={{ type: "spring" }}
          className="w-full uppercase font-[600] mt-2  p-3 rounded-3xl text-[1.8rem]"
        >
          Login
        </motion.button>
      </form>

      <div className="uppercase text-center text-[1.4em] font-[700] my-6">
        hoặc
      </div>

      <button
        onClick={() => {
          googleSignIn();
          setIsLogin(true);
        }}
      >
        Google login
      </button>
    </div>
  );
};

export default LoginForm;