import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaClipboardList, 
  FaCalendarAlt, 
  FaClipboardCheck, 
  FaBuilding, 
  FaUsers, 
  FaKey, 
  FaBoxOpen, 
  FaBusinessTime, 
  FaCloud, 
  FaBars, 
  FaTimes, 
  FaCaretDown, 
  FaCaretUp 
} from 'react-icons/fa'; // Importing React Icons
import image from "./asset/CebuTowers.png";

const Sidebar = () => {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location]);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleContentVisibility = () => setIsContentVisible(!isContentVisible);

  const sidebarContent = (
    <div className="h-screen flex flex-col p-4 bg-white shadow-lg">
      {/* Card with Image */}
      <div className="mb-4 rounded-lg overflow-hidden shadow-md">
        <div className="relative pb-[50%]">
          <img
            src={image}
            alt="Cebu Towers"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <h6 className="font-bold">Cebu Towers</h6>
            <button onClick={toggleContentVisibility} className="text-gray-500">
              {isContentVisible ? <FaCaretUp /> : <FaCaretDown />}
            </button>
          </div>
          {isContentVisible && (
            <p className="text-gray-600 text-sm">200 George Street, <br /> Sydney NSW 2000</p>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              to={item.path}
              key={index}
              className={`flex items-center p-3 mb-2 rounded-r-full transition-all duration-300 hover:bg-blue-100 ${
                isActive ? 'bg-blue-100 border-l-4 border-blue-500' : 'border-l-4 border-white'
              }`}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <item.icon
                className={`mr-3 text-gray-500 transition-all duration-300 transform ${
                  hoveredItem === index ? 'scale-110 rotate-6' : ''
                }`}
              />
              <span className={`text-sm ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Menu Icon Button for Mobile */}
      <button
        onClick={toggleDrawer}
        className="block md:hidden fixed top-7 left-3 z-100 bg-white p-2 shadow-md rounded-lg"
      >
        {isDrawerOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Drawer */}
      <div
        className={`w-full h-full bg-white shadow-lg transition-transform duration-300 z-40 ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-64`}
      >
        {sidebarContent}
      </div>
    </>
  );
};

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt },
  { name: 'Cases', path: '/cases', icon: FaClipboardList },
  { name: 'Work Order Sent', path: '/work-orders', icon: FaClipboardCheck },
  { name: 'Calendar', path: '/calendar', icon: FaCalendarAlt },
  { name: 'Maintenance Schedule', path: '/maintenance-schedule', icon: FaClipboardCheck },
  { name: 'Building', path: '/building', icon: FaBuilding },
  { name: 'Residents', path: '/residents', icon: FaUsers },
  { name: 'Keys', path: '/keys', icon: FaKey },
  { name: 'Parcels', path: '/parcels', icon: FaBoxOpen },
  { name: 'Contractors', path: '/contractors', icon: FaBusinessTime },
  { name: 'Cloud Sense', path: '/cloud-sense', icon: FaCloud },
];

export default Sidebar;
