import React,{useState,useRef} from 'react'
import { Tooltip } from 'react-tooltip'

const Model = ({Devicename}) => {
  const[Show_Device_Popup,SetDevice_Popup]= useState(false);
  const [tooltipContent, setTooltipContent] = useState({ id: '', thickness: '' ,Device_locations:''});
  const [devicename,setDevicename]=useState([])
  const [device_location,setLocations]=useState([])
  const [deviceId,setDeviceId]=useState([]);
  const [success_popup,setSucess]=useState(true);
  const inputRef = useRef("");
  const inputDevice =useRef ("")


  const data1=[];
  const data2 = [];
  const data3=[];


  for (let i = 0; i <= 9; i++) {
    if (Devicename[i]) { 
     let devicename_data = "";

      let device_ids = Devicename[i].Device_ID;
      if(Devicename[i].Device_ID === device_ids){
        devicename_data =Devicename[i].Device_Name;
      }
       const id = devicename_data ;
       const Device_locations = Devicename[i].Location;
       const Device_Id = Devicename[i].Device_ID;
       const Thickness_Value = Devicename[i].Thickness;
       const maxthickness = Devicename[i].MaxThickness;
       data1.push({ id, thickness: Thickness_Value ,Device_locations,Device_Id,maxthickness});
    } else {
      console.log(`Object at index ${i} does not exist`);
    }
  }

  for (let i = 10; i <= 19; i++) {
    if (Devicename[i]) { 
      let devicename_data = "";
 
       let device_ids = Devicename[i].Device_ID;
       if(Devicename[i].Device_ID === device_ids){
         devicename_data =Devicename[i].Device_Name;
       }
        const id = devicename_data ;
        const Device_locations = Devicename[i].Location;
        const Device_Id = Devicename[i].Device_ID;
        const Thickness_Value = Devicename[i].Thickness;
        const maxthickness = Devicename[i].MaxThickness;
        data2.push({ id, thickness: Thickness_Value,Device_locations,Device_Id,maxthickness});
     } else {
       console.log(`Object at index ${i} does not exist`);
     }
  }


  for (let i = 20;i<=29;i++){
    if (Devicename[i]) { 
      let devicename_data = "";
 
       let device_ids = Devicename[i].Device_ID;
       if(Devicename[i].Device_ID === device_ids){
         devicename_data =Devicename[i].Device_Name;
       }
        const id = devicename_data ;
        const Device_locations = Devicename[i].Location;
        const Device_Id = Devicename[i].Device_ID;
        const Thickness_Value = Devicename[i].Thickness;
        const maxthickness = Devicename[i].MaxThickness;
        data3.push({ id, thickness: Thickness_Value ,Device_locations,Device_Id,maxthickness});
     } else {
       console.log(`Object at index ${i} does not exist`);
     }
  }


  const handleDeviceClick = (device, thickness,Device_locations,Device_Id) => {
    SetDevice_Popup(true);
    setDevicename(device);
    setLocations(Device_locations);
    setDeviceId(Device_Id);
  };

  const handleDeviceIDCLick =(device,thickness,device_location,Device_Id)=>{
    localStorage.setItem("DeviceId", Device_Id);
  }

  const handleClosePopup=()=>{
    SetDevice_Popup(false);
  }


  const handleMouseEnter = (id, thickness,Device_locations) => {
    setTooltipContent({ id, thickness,Device_locations });
  };

  const handleMouseLeave = () => {
    setTooltipContent({ id: '', thickness: '',Device_locations:'' });
  };
  

  const Device_info_update=async()=>{
    try{
      const location_inputValue = inputRef.current.value;
      const Device_Name = inputDevice.current.value;
      let devicenames = '';
      let devcelocation = '';
      
      if(location_inputValue == ""){
        devcelocation = device_location;
      }else{
        devcelocation =location_inputValue 
      }
      if(Device_Name == ""){
        devicenames = devicename ;
      }else{
        devicenames =Device_Name
      }
      const response_data = await fetch("http://34.100.168.176:4000/backend/Update_Info",{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({deviceId,devicenames,devcelocation}),
      });
      if(response_data.status === 200){
  
        setSucess(false);
        setTimeout(()=>{
          setSucess(true);
          SetDevice_Popup(false)
        },3000);
      }
    }catch(error){
      console.error(error);
    }
  }
  const tooltipStyle = {
    backgroundColor: '#03D0AB', 
    padding: '8px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };



const renderGridItems1 = () => {
  return data1.map((item, index) => {
    let devicethickness_value = parseFloat(item.maxthickness)+parseFloat(2)
    const finaly_thickness = parseFloat(item.thickness)> (devicethickness_value)
    const d1_max= parseInt(item.maxthickness);
    const limitvalue = ((item.thickness-0)*(100-0))/(parseFloat(d1_max)-0)+0;
    const rounded_value = (limitvalue.toFixed(2));
    const isAbove50 = rounded_value < 50;
    const isAbove51_to_70 = rounded_value >=50 && rounded_value <=75;
    const isAbove71_to_100 = rounded_value >75 && finaly_thickness === false;
    const isAbove100_to_1001 = rounded_value >100 && rounded_value <=1000;
    const isAbove125 = item.thickness >= devicethickness_value;
    const ER01 = rounded_value == 0;
    const ER02 = item.thickness == 9999.00;
    return (
      <div key={index} className='grid grid-cols-2 md:mt-1'>
        <span
          className={`hover:border-[#b9fd5f] my-anchor-element flex text-xs font-bold justify-center m-2 border cursor-pointer  ${
            isAbove50 ? 'bg-red-500' : isAbove51_to_70 ? 'bg-[#ED7014]': isAbove71_to_100 ? 'bg-green-500':isAbove100_to_1001 ? 'bg-sky-400':isAbove125?'bg-sky-400':''}`} 
          onClick={() => handleDeviceClick(item.id, item.thickness, item.Device_locations, item.Device_Id)} 
          onMouseEnter={() => handleMouseEnter(item.id, item.thickness, item.Device_locations)}
          onMouseLeave={handleMouseLeave}
        >
          {item.id}
        </span>
        <div 
          onClick={() => handleDeviceIDCLick(item.id, item.thickness, item.Device_locations, item.Device_Id)} 
          className={`rounded-md hover:border-[#b9fd5f] flex justify-center m-2 border text-sm font-bold cursor-pointer ${
            isAbove50 ? 'bg-red-500' : isAbove51_to_70 ? 'bg-[#ED7014]': isAbove71_to_100 ? 'bg-green-500':isAbove100_to_1001 ? 'bg-sky-400':isAbove125?'bg-sky-400':''
          }`}
        >
          {ER01 || ER02 ? '⚠️'  : rounded_value+"%"}
        </div>
        
        <Tooltip anchorSelect=".my-anchor-element" place="top" style={tooltipStyle}>
        <div>
          {tooltipContent.id && tooltipContent.thickness ? (
              <div>
                <span>ID : {tooltipContent.id}</span><br/>
                <span>LOCATION : {tooltipContent.Device_locations}</span>
              </div>
        
          ) : (
            <div>No data</div>
          )}
        </div>

        </Tooltip>
      </div>
    );
  });
};


  const renderGridItems2 = () => {
    return data2.map((item, index) => {
      let devicethickness_value = parseFloat(item.maxthickness)+parseFloat(2)
      const finaly_thickness = parseFloat(item.thickness)> (devicethickness_value)

      const d3_max= parseInt(item.maxthickness);
      const limitvalue = ((item.thickness-0)*(100-0))/(parseFloat(d3_max)-0)+0;
      const rounded_value = (limitvalue.toFixed(2));
      const isAbove50 = rounded_value < 50;
      const isAbove51_to_70 = rounded_value >=50 && rounded_value <=75;
      const isAbove71_to_100 = rounded_value >75 && finaly_thickness === false;
      const isAbove100_to_1001 = rounded_value >100 && rounded_value <=1000;
      const isAbove125 = item.thickness >= devicethickness_value;
      return(
      <div key={index} className='grid grid-cols-2 md:mt-1'>
            <span
        className={`hover:border-[#b9fd5f] my-anchor-element flex text-xs font-bold justify-center m-2 border cursor-pointer`} 
        onClick={() => handleDeviceClick(item.id, item.thickness,item.Device_locations,item.Device_Id)} 
        onMouseEnter={() => handleMouseEnter(item.id, item.thickness,item.Device_locations)}
        onMouseLeave={handleMouseLeave}
        >
        {item.id}
      </span>
       <div 
          onClick={() => handleDeviceIDCLick(item.id, item.thickness, item.Device_locations, item.Device_Id)} 
          className={`rounded-md hover:border-[#b9fd5f] flex justify-center m-2 border text-sm font-bold cursor-pointer ${
            isAbove50 ? 'bg-red-500' : isAbove51_to_70 ? 'bg-[#ED7014]': isAbove71_to_100 ? 'bg-green-500':isAbove100_to_1001 ? 'bg-sky-400':isAbove125?'bg-sky-400':''
          }`}
        >
         {isAbove125 === true ? '⚠️' :rounded_value+"%"}
        </div>
    
          <Tooltip anchorSelect=".my-anchor-element"  place="top" style={tooltipStyle}>
          <div>
          {tooltipContent.id && tooltipContent.thickness ? (
            <div>
              <span>ID : {tooltipContent.id}</span><br/>
              <span>LOCATION : {tooltipContent.Device_locations}</span>
            </div>
          ) : (
            <div>No data</div>
          )}
        </div>
          </Tooltip>
      </div>
      );
  });
  };

  const renderGridItems3 = () => {
    return data3.map((item, index) => {
      let devicethickness_value = parseFloat(item.maxthickness)+parseFloat(2)
      const finaly_thickness = parseFloat(item.thickness)> (devicethickness_value)
      const d3_max= parseInt(item.maxthickness);
      const limitvalue = ((item.thickness-0)*(100-0))/(parseFloat(d3_max)-0)+0;
      const rounded_value = (limitvalue.toFixed(2));
      const isAbove50 = rounded_value < 50;
      const isAbove51_to_70 = rounded_value >=50 && rounded_value <=75;
      const isAbove71_to_100 = rounded_value >75 &&finaly_thickness === false;
      const isAbove100_to_1001 = rounded_value >100 && rounded_value <=1000;
      const isAbove125 = item.thickness >= devicethickness_value;
      return(
      <div key={index} className='grid grid-cols-2 md:mt-1'>
           <span
      className={`hover:border-[#b9fd5f] my-anchor-element flex text-xs font-bold justify-center m-2 border cursor-pointer`} 
      onClick={() => handleDeviceClick(item.id, item.thickness,item.Device_locations,item.Device_Id)} 
      onMouseEnter={() => handleMouseEnter(item.id, item.thickness,item.Device_locations)}
      onMouseLeave={handleMouseLeave}
      >
      {item.id}
    </span>
        <div 
          onClick={() => handleDeviceIDCLick(item.id, item.thickness, item.Device_locations, item.Device_Id)} 
          className={`rounded-md hover:border-[#b9fd5f] flex justify-center m-2 border text-sm font-bold cursor-pointer ${
            isAbove50 ? 'bg-red-500' : isAbove51_to_70 ? 'bg-[#ED7014]': isAbove71_to_100 ? 'bg-green-500':isAbove100_to_1001 ? 'bg-sky-400':isAbove125?'bg-sky-400':''
          }`}
        >
          {isAbove125 === true ? '⚠️' :rounded_value+"%"}
        </div>
   
        <Tooltip anchorSelect=".my-anchor-element"  place="top" style={tooltipStyle}>
        <div>
        {tooltipContent.id && tooltipContent.thickness ? (
          <div>
            <span>ID : {tooltipContent.id}</span><br/>
            <span>LOCATION : {tooltipContent.Device_locations}</span>
          </div>
        ) : (
          <div>No data</div>
        )}
      </div>
        </Tooltip>
    </div>
      );
  });
  };

  

  return (
    <div className='text-white h-full'>
      {Show_Device_Popup && (
          <div className='Devicename_popup' id='popup1'>
            
          <div className='Devicename_overlay'></div>
            <div className="Devicename_content flex flex-col items-center justify-center">
    
            {!success_popup &&(
              <div>
                <div class="">
                   <svg class="checkmark" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> 
                   <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                    <div className='text-black'>Successfully Saved </div>
                  </div>
              </div>
            )}
            {success_popup && (
                <div>
                  <div className="Devicename_close-btn cursor-pointer self-end" onClick={handleClosePopup}>
                &times;
              </div>
                <h1 className="font-bold text-emerald-500 text-center">DEVICE INFO!!</h1>
                  <div className="gap-2 w-full max-w-md">
                    <div className="flex justify-between mt-2">
                      <span className="text-black text-sm font-serif font-bold">DEVICE-ID:</span>
                      <input
                        className="bg-gray-50 h-5 w-[70%] border-b-4 border-black text-gray-900 text-sm focus:ring-red-500 focus:border-red-500 ps-1 p-2.5 dark:placeholder-gray-400 dark:text-black"
                        placeholder={devicename}
                        ref={inputDevice}
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-black font-serif text-sm  font-bold">LOCATION:</span>
                      <input
                        className="bg-gray-50 h-5 w-[70%] border-b-4 border-black text-gray-900 text-sm focus:ring-red-500 focus:border-red-500 ps-1 p-2.5 dark:placeholder-gray-400 dark:text-black"
                        placeholder={device_location}
                        ref={inputRef}
                      />
                    </div>
                  </div>
                  <button className="mt-4 border bg-blue-600 text-white font-bold p-2 rounded-md" onClick={Device_info_update}>Submit</button>
              </div>
            )}
      
          </div> 
        </div>
      )
      }
      <div className=' grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1 max-h-[50vh] overflow-y-auto scrollbar-hide'>
        <div className='bg-[#2d2d2d] '>
          <div className='flex justify-center gap-2 md:gap-5 border bg-[#f77f50e5] border-emerald-50'>
          <span className='font-bold'>Device</span>
            <span className='font-bold'>Thickness</span>
          </div>
          {renderGridItems1()}
        </div>
        <div className='bg-[#2d2d2d]'>
          <div className='flex justify-center gap-2 md:gap-5   border bg-[#f77f50e5] border-emerald-50'>
          <span className='font-bold'>Device</span>
            <span className='font-bold'>Thickness</span>
            
          </div>
          {renderGridItems2()}
        </div>
        <div className='bg-[#2d2d2d]'>
          <div className='flex gap-2 md:gap-5 bg-[#f77f50e5]  border border-emerald-50'>
          <span className='font-bold ml-2'>Device</span>
            <span className='font-bold '>Thickness</span>
          </div>
          {renderGridItems3()}
        </div>
      </div>
    </div>
  )
}
export default Model
