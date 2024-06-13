import React,{useContext} from 'react';
import { FaTemperatureHigh } from 'react-icons/fa';
import { WiHumidity } from "react-icons/wi";
import { GiMagnet } from "react-icons/gi";
import { IoIosSpeedometer } from "react-icons/io";
const Dashboard = () => {
  return (
    <div className='grid grid-rows-3'>
    <div className='grid grid-cols-3 gap-4'>
        <div className="flex flex-col border-4 border-gray-500/75 card items-center p-4 bg-gray-50 rounded-lg shadow-md mb-4 sm:flex-row">
          <div className="p-3 mb-2 mr-4 text-pink-500 bg-pink-100 rounded-full sm:mb-0">
            <svg className="w-6 h-6" fill="currentColor" viewBox="-1 -2 18 18">
              <WiHumidity />
            </svg>
          </div>
          <div className="text-sm font-medium  text-gray-600 text-center sm:text-left">
            
            <p className="text-lg  font-bold card_size text-gray-700 mt-1">37</p>
            <p className="mt-1">Humidity</p>
          </div>
        </div>
        <div className="flex flex-col border-4 border-gray-500/75 card items-center p-4 bg-gray-50 rounded-lg shadow-md mb-4 sm:flex-row">
          <div className="p-3 mb-2 mr-4 text-red-500 bg-red-100 rounded-full sm:mb-0">
            <svg className="w-6 h-6" fill="currentColor" viewBox="-1 -2 18 18">
              <GiMagnet />
            </svg>
          </div>
          <div className="text-sm font-medium  text-gray-600 text-center sm:text-left">
            
            <p className="text-lg  font-bold card_size text-gray-700 mt-1">37</p>
            <p className="mt-1">Magnetic Flex</p>
          </div>
        </div>
        <div className="flex flex-col border-4 border-gray-500/75 card items-center p-4 bg-gray-50 rounded-lg shadow-md mb-4 sm:flex-row">
          <div className="p-3 mb-2 mr-4 text-orange-500 bg-orange-100 rounded-full sm:mb-0">
            <svg className="w-6 h-6" fill="currentColor" viewBox="-1 -2 18 18">
              <IoIosSpeedometer />
            </svg>
          </div>
          <div className="text-sm font-medium  text-gray-600 text-center sm:text-left">
            
            <p className="text-lg  font-bold card_size text-gray-700 mt-1">37</p>
            <p className="mt-1">Rpm</p>
          </div>
          </div>
        </div>
      <div>
    </div>


  </div>
  );
};
export default Dashboard;