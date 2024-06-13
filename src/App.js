import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { Outlet } from 'react-router-dom';
import { ModeProvider } from './components/ModeContext';



import { useState } from "react";
import Chart_fill from "./imgaes/dashboard.png";
import chart from "./imgaes/Chart.png";
import cumi from "./imgaes/cumi_final.png"
import control from "./imgaes/control.png";
import logout_img from "./imgaes/arrow.png";
import xyma from "./imgaes/xyma.png";
import folder from "./imgaes/Folder.png";
import setting from "./imgaes/Setting.png";
import { Link } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
function App() {
  const [open, setOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const Menus = [
    { title: "Dashboard", src: Chart_fill, url: "/" },
    { title: "Chart", src: chart, gap: true, url: "/chart" },
    { title: "Reports", src: folder, gap: true, url: "/report" },
    // { title: "Upgrade Plan", src: calander, gap: true, url: "/upgrade" },
    // { title: "Map", src: search, gap: true, url: "/map" },
    { title: "Settings", src: setting, gap: true, url: "/setting" },
  ];
  const handleItemClick = (index) => {
    setActiveIndex(index); 
  };
  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }


  return (
    <ModeProvider>
      <div className="flex overflow-y-auto scrollbar-hide">
        <div className=''>
          <Sidebar/>
        </div>
        <div className='basis-[100%] h-[200vh] md:h-[100vh]   bg-[#424242] w-[80%]'>
          <Outlet/>
        </div>
      </div>
    </ModeProvider>
  );
}

export default App;


