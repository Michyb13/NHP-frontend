"use client";
import { useState } from "react";
import Link from "next/link";
import {
  IoMdClose,
  IoMdMenu,
  IoMdHome,
  IoMdTime,
  IoMdSettings,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useAuthContext } from "@/app/context/AuthContextProvider";
import { useRouter } from "next/navigation";
import { signOut } from "@/utils/apis/usersApi";

const Header = () => {
  const { state, dispatch } = useAuthContext();
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = async () => {
    setIsLoading(true);
    await signOut();
    dispatch({ type: "Log Out" });
    localStorage.clear();
    setIsLoading(false);
    router.push("/login");
  };
  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white text-navy shadow-navy shadow-sm border-b rounded-md border-white ">
        <div className="flex items-center">
          <button onClick={toggleNav} className="mr-4">
            <IoMdMenu size={24} />
          </button>
        </div>
        <div className=" flex items-center mr-5">
          <div className="relative">
            <div className="flex items-center cursor-pointer">
              <FaUserCircle
                size={24}
                className="text-navy hover:text-gray-300 transition duration-300"
              />
              <p className="ml-2 text-lg">@{state.user.username}</p>
              <button onClick={toggleDropdown}>
                {isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
              </button>
            </div>
            {isOpen && (
              <ul className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link href={`/profile/${state.user.id}`}>Profile</Link>
                </li>
                <li className=" border-t border-gray-200 px-4 py-2 hover:bg-gray-100">
                  <button disabled={isLoading} onClick={handleLogOut}>
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>

      <nav
        className={`fixed inset-y-0 left-0 bg-navy shadow-md transform ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 w-64`}
      >
        <button onClick={toggleNav} className=" ml-[17px] mt-[16px] text-white">
          <IoMdClose size={24} />
        </button>
        <div className="p-4">
          <h1 className="text-xl text-white font-bold mb-6 mt-[-10px]">
            NHP Revenue Predictor
          </h1>
          <div className=" mt-10">
            <Link
              href="/"
              className="text-white py-2 px-4 hover:bg-gray-700 rounded mb-2 flex items-center space-x-2"
            >
              <IoMdHome size={20} className=" mb-[3px]" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/history"
              className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-700 rounded mb-2 text-white"
            >
              <IoMdTime size={20} className=" mb-[2px]" />
              <span>History</span>
            </Link>
            {state.user.role === "Admin" && (
              <Link
                href="/admin"
                className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-700 rounded text-white"
              >
                <IoMdSettings size={20} className=" mb-[2px]" />
                <span>Admin</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
