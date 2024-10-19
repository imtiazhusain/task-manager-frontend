"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, Moon, Sun, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalState } from "@/app/context/globalContext";
import ProfileModel from "./ProfileModel";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import userUser from "@/hooks/useUser";

const Navbar = () => {
  const user = userUser()
  console.log('user .....')
  console.log(user)
  const { dispatch } = useGlobalState();

  const pathname = usePathname();
  const [isClicked, setIsClicked] = useState(false);
  const [openProfileModel, setOpenProfileModel] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Login", href: "/login" },
    { name: "Signup", href: "/signup" },
  ];

  const toggleNavbar = () => {
    setIsClicked((pre) => !pre);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT_USER" });
  };

  const handleEditProfile = () => {
    setOpenProfileModel(true);
  };

  const changeTheme = () => {
    dispatch({ type: "SET_THEME", payload: "dark" });
  };



  return (
    <nav className="bg-gray-800 dark:bg-card sticky top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="md:hidden flex items-center">
              <button
                className="inline-flex justify-center items-center p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-inset"
                onClick={toggleNavbar}
              >
                {isClicked ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-white"
                onClick={() => setIsClicked(false)}
              >
                Logo
              </Link>
            </div>
          </div>



          <div className="flex  gap-4">
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                {navigation.map((item, index) => {
                  const isActive = pathname === item.href;
                  if (index === 1 && !user) return null;
                  if ((index === 2 || index === 3) && user) return null;
                  if (index === 2) {
                    return <button key={index} className={` text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 font-medium rounded-md ${isActive ? "bg-gray-900 text-white" : ""
                      }`} onClick={() => {
                        setIsClicked(false)
                        signIn()
                      }}>{item.name}</button>
                  }

                  return (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={() => setIsClicked(false)}
                      className={` text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 font-medium rounded-md ${isActive ? "bg-gray-900 text-white" : ""
                        }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {user && (
              <DropdownMenu >
                <DropdownMenuTrigger>
                  <Avatar className="w-8 h-8 rounded-full overflow-hidden">
                    <AvatarImage
                      src={user?.profilePic}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="cursor-pointer "
                    onClick={handleEditProfile}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    // onClick={handleLogout}
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button
              size="icon"
              onClick={changeTheme}
              className="bg-transparent hover:bg-transparent"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-white" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
      {isClicked && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item, index) => {
              if (index === 1 && !user) return null;
              if ((index === 2 || index === 3) && user) return null;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsClicked(false)}
                  className={`block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 font-medium rounded-md ${isActive ? "bg-gray-900 text-white" : ""
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {openProfileModel && (
        <ProfileModel setOpenProfileModel={setOpenProfileModel} />
      )}
    </nav>
  );
};

export default Navbar;
