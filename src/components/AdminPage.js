import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AdminPage = ({Devicenames}) => {
const [allData,setAlldata]=useState('')

   useEffect(()=>{
    fetchAllData();
    const alldata = setInterval(fetchAllData,2000);
    return()=>{
        clearInterval(alldata)
    }
   },[])



   const fetchAllData =async()=>{
    try{
        const response = await axios.get('http://localhost:4000/backend/fetchAllData');
        setAlldata(response.data)
    }catch(error){
        console.error("Error fetching data:",error)
    }
   }
    const Arraycount = Array.from({ length: Devicenames.length }, (_, index) => index);
    const AllData_Fillter_Count = Array.from({ length: allData.length }, (_, index) => index);

  return (
    <div>
        <div className='flex w-[100v] h-[100vh]'>
            <div className='border border-white w-full overflow-auto scrollbar-hide'>
                {Arraycount.length>0 ? Arraycount.map((item,index)=>(
                    <div key={index} className='bg-gray-200 rounded-lg m-4 flex justify-between'>   
                    <p className='font-bold text-sm ml-4'>{Devicenames[index].Device_ID}</p>
                    <p className='font-bold text-sm text-orange-900'>{Devicenames[index].Device_Name}</p>
                    <p className='font-bold text-sm'>{Devicenames[index].Thickness}</p>
                    <p className='font-bold text-sm text-green-900'>{Devicenames[index].Location}</p>
                    <p className='font-bold text-sm'>{Devicenames[index].MaxThickness}</p>
                    <p className='font-bold text-sm mr-4'>{Devicenames[index].Sleep_time}</p>
                    </div>
                )):""}
            </div>
            <div className='border border-white w-full overflow-auto'>
                {AllData_Fillter_Count.length>0?AllData_Fillter_Count.map((item,index)=>(
                    <div key={index} className='bg-gray-300 m-4 flex justify-between'>
                        
                        <p className='font-bold text-sm'>{allData[index].device_name}</p>
                        <p className='font-bold text-sm text-green-600'>{allData[index].thickness}</p>
                        <p className='font-bold text-sm'>{allData[index].device_status}</p>
                        <p className='font-bold text-sm'>{allData[index].signal_strength}</p>
                        <p className='ml-2 font-bold text-sm'>{allData[index].battery_status}</p>
                        <p className='mr-2 font-bold text-sm text-red-600'>{allData[index].timestamp}</p>
                    </div>
                )):""}
            </div>
        </div>
    </div>
  )
}

export default AdminPage
