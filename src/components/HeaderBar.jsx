import { useState, useRef, useEffect } from "react";
import image from "./asset/profile.jpg";
import { BiPrinter } from "react-icons/bi";
import { LuMonitor } from "react-icons/lu";
import { IoIosCalculator } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { TfiAnnouncement } from "react-icons/tfi";
import { FaRegUserCircle } from "react-icons/fa";

const HeaderBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const IconItem = ({ Icon, color, tooltip }) => (
    <div className="relative group">
      <li
        className={`bg-white rounded-full p-2 cursor-pointer ${color} shadow-lg hover:scale-125 transition-transform duration-100`}
      >
        <Icon size={24} />
      </li>
      <span className="absolute left-1/2 bottom-full mb-2 w-max -translate-x-1/2 bg-gray-800 text-white text-sm rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {tooltip}
      </span>
    </div>
  );

  return (
    <div className="p-2 max-sm:fixed top-0 right-0 left-0 max-sm:bg-gray-50 shadow-md rounded-b-lg relative">
      <div className="flex justify-between items-center ml-5 max-sm:mt-4 relative">
        {/* Left Title Section */}
        <div className="max-sm:hidden max-md:hidden">
          <div className="text-2xl font-bold">Overview</div>
          <div className="text-gray-400">Cedu Towers</div>
        </div>
        <div className="max-md:ml-[35%] md:hidden">
          <div className="text-xl text-gray-600">Cedu Towers</div>
        </div>

        {/* Desktop view */}
        <div className="hidden lg:flex justify-center gap-10 items-center w-[30%]">
          <ul className="flex items-center justify-around gap-3 p-3">
            <IconItem Icon={RiTeamFill} color="text-pink-400" tooltip="Team" />
            <IconItem Icon={TfiAnnouncement} color="text-green-400" tooltip="Announcement" />
            <IconItem Icon={LuMonitor} color="text-orange-400" tooltip="Monitor" />
            <IconItem Icon={BiPrinter} color="text-purple-400" tooltip="Printer" />
            <IconItem Icon={IoIosCalculator} color="text-blue-400" tooltip="Calculator" />
          </ul>
          <div className="w-[2px] h-8 bg-gray-400"></div>
          <div className="flex justify-between items-center gap-3 relative">
            <div>
              <img
                src={image}
                className="rounded-full w-10 h-10 cursor-pointer"
                alt="Profile"
                onClick={toggleMenu}
              />
            </div>
            {/* <div>BMS</div> */}
            <FaAngleDown
              size={24}
              className="text-gray-600 cursor-pointer"
              onClick={toggleMenu}
            />

            {/* Dropdown Menu */}
            {isOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 transition-all duration-300 ease-in-out"
              >
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200 flex items-center">
                  <FaRegUserCircle size={22} className="inline-block mr-2" />
                  BMS
                </div>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile view */}
        <div className="lg:hidden relative">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 flex justify-center items-center gap-3"
          >
            <img src={image} className="rounded-full w-10 h-10" alt="Profile" />
            <FaAngleDown
              size={24}
              className="text-gray-600 cursor-pointer"
              // onClick={toggleMenu}
            />
          </button>

          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-5 right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 transition-all duration-300 ease-in-out"
            >
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200 flex items-center">
                <FaRegUserCircle size={22} className="inline-block mr-2" />
                BMS
              </div>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
