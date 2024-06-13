import React,{useState,useEffect,useRef} from 'react'
import { TbRulerMeasure } from "react-icons/tb";
import { FaTemperatureLow, FaSignal, FaSortAmountUpAlt } from "react-icons/fa";
import { PiBatteryFullFill } from "react-icons/pi";
import Select from 'react-select';
import './style.css';
import toast, { Toaster } from 'react-hot-toast';

const Rcards = ({lastupdated_data,Last_time}) => {
  const[dropdowndata,setDropdown]=useState("");

  const[show_error_popup,setPopu1]= useState(false);
  const[show_error_popup2,setPopup2]= useState(false);
  const[show_error_popup3,setPopup3]= useState(false);
  const[show_error_popup4,setPopup4]= useState(false);
  const[show_error_popup5,setPopup5]= useState(false);

  const inputRef = useRef(null);

  const usertime=Last_time?Last_time.Sleep_time:"N/A";
  const device_thickness = Last_time?Last_time.MaxThickness :"N/A"
 
  


  const last_updated_time=lastupdated_data?lastupdated_data.timestamp:"N/A";
  const thickness = lastupdated_data?lastupdated_data.thickness:"N/A";
  const battery = lastupdated_data?lastupdated_data.battery_status:"N/A";
  const signal = lastupdated_data?lastupdated_data.signal_strength:"N/A";
const device_temp  =lastupdated_data ? lastupdated_data.device_status :'N/A'

const intconvert = parseFloat(thickness)
const limitvalue = ((intconvert-0)*(100-0))/(parseFloat(device_thickness)-0)+0;
const rounded_value = limitvalue.toFixed(2);


let devicethickness_value = parseFloat(device_thickness)+parseFloat(2)
const finaly_thickness = parseFloat(thickness)> (devicethickness_value)



const signal_percentage= (signal - 0)*(100 - 0 )/(32 - 0)+0;
const signal_percentage_convert = parseInt(signal_percentage)


const Current_battery = battery.split(",");
const Battery_percentage = (Current_battery[0] - 437) * (100 - 0) / (776 - 437) + 0;
const Battery_Percentage_Value =parseInt(Battery_percentage)


let time = new Date();

function formatDateTime(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}



const Data_freequences = [
  { label: '5 Min', value: '5' },
  { label: '1 Hrs', value: '60' },
  { label: '1 Day', value: '1440' },
  { label: '2 Days', value: '2880' },
  { label: '7 Days', value: '10080' },
  { label: '15 Days', value: '21600' },
];
const customStyles_2 = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#13B7FE',
    borderColor:'#2d2d2d',
    color: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    

  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#13B7FE', 
  }),
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: '#fffff', 
  }),
};

let time_data;
if(parseInt(usertime)===1440){
  time_data = "1 Day"
}else if(parseInt(usertime)===5){
  time_data="5 Min"
}
else if(parseInt(usertime)===60){
  time_data="1 hrs"
}
else if(parseInt(usertime)===2880){
  time_data="2 Days"
}
else if(parseInt(usertime)===10080){
  time_data="7 Days"
}
else if(parseInt(usertime)===21600){
  time_data="15 Days"
}

const handle_dropdown_Change = async(selectedOption) => {
  try {
    let dayValue;
    if (selectedOption.value === "5"){
      dayValue = 5;
    }
    else if(selectedOption.value === "60"){
      dayValue = 60;
    }
    else if(selectedOption.value === "1440"){
      dayValue = 1440;
    }
    else if(selectedOption.value === "2880"){
      dayValue = 2880;
    }
    else if(selectedOption.value === "10080"){
      dayValue = 10080;
    }
    else if(selectedOption.value === "21600"){
      dayValue = 21600;
    }
   
    setDropdown(dayValue);
  } catch (error) {
    console.error(error);
  }
}
const handleSubmit = async(event)=>{
  event.preventDefault();
  const inputValue = inputRef.current.value;
  const ints = parseInt(inputValue);
  const deviceId = lastupdated_data.device_name

  if(dropdowndata === "" || inputValue === ""){
    if(inputValue === ""){
      toast.error("Kindly Enter a Max Thickness",{
        duration: 1000
      })
    }
    if(dropdowndata === ""){
      toast.error("Kindly Select the Clockify",{
        duration: 1000
      })
    }
  }
  else{
    const response_data = await fetch("http://34.100.168.176:4000/backend/Update_Info",{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({deviceId,inputValue,dropdowndata}),
    });
    if(response_data.status === 200){
      inputRef.current.value = ""
      toast.success('Successfully saved!')
    }
  }
}



useEffect(() => {
  let a = "";
  let b = "";
  let c = "";
  if (finaly_thickness === true && thickness < 9999) {
    setPopu1(true);
      const devicename = Last_time ? Last_time.Device_Name : 'N/A';
      const existing_device_info = localStorage.getItem(devicename);
      if (existing_device_info) {
          const parsedInfo = JSON.parse(existing_device_info);
          if (parsedInfo.device_names && parsedInfo.time && parsedInfo.Err) {
              if (a !== "" && b !=="" && c !=="") {
                  a += ",";
                  b += ",";
                  c += ",";
              }
              a += parsedInfo.device_names + ", " + devicename;
              b += parsedInfo.time + "," + formatDateTime(time)
              c +=parsedInfo.Err +"," + "Overlimit"
          } else {
              a += devicename;
              b += formatDateTime(time);
              c += "Overlimit";
          }
      } else {
          a += devicename;
          b += formatDateTime(time)
           c+="Overlimit"
      }
      const devie_info = JSON.stringify({
          device_names: a,
          time: b,
          Err : c
      });

      localStorage.setItem(devicename, devie_info);
  }
  if (parseFloat(thickness) === parseFloat(0)) {
    setPopup2(true);
    const devicename = Last_time ? Last_time.Device_Name : 'N/A';
      const existing_device_info = localStorage.getItem(devicename);
      if (existing_device_info) {
          const parsedInfo = JSON.parse(existing_device_info);
          if (parsedInfo.device_names && parsedInfo.time) {
              if (a !== "" && b !=="" && c !=="") {
                a += ",";
                b += ",";
                c += ",";
              }
              a += parsedInfo.device_names + ", " + devicename;
              b += parsedInfo.time + "," + formatDateTime(time);
              c +=parsedInfo.Err +"," + "ER01";
          } else {
              a += devicename;
              b += formatDateTime(time);
              c+= "ER01";
          }
      } else {
          a += devicename;
          b += formatDateTime(time)
          c+="ER01"
      }
      const devie_info = JSON.stringify({
          device_names: a,
          time: b,
          Err:c,
      });
      localStorage.setItem(devicename, devie_info);
  }
  if (parseFloat(thickness) === parseFloat(9999.00)  ) {
    setPopup3(true);
    const devicename = Last_time ? Last_time.Device_Name : 'N/A';
      const existing_device_info = localStorage.getItem(devicename);
      if (existing_device_info) {
          const parsedInfo = JSON.parse(existing_device_info);
          if (parsedInfo.device_names && parsedInfo.time) {
              if (a !== "" && b !=="") {
                  a += ",";
                  b += ",";
                  c +=","
              }
              a += parsedInfo.device_names + ", " + devicename;
              b += parsedInfo.time + "," + formatDateTime(time);
              c += parsedInfo.Err +"," +"ER02"
          } else {
              a += devicename;
              b += formatDateTime(time);
              c +="ER02";
          }
      } else {
          a += devicename;
          b += formatDateTime(time);
          c += "C";
      }
      const devie_info = JSON.stringify({
          device_names: a,
          time: b,
          Err:c

      });

      localStorage.setItem(devicename, devie_info);
  }
}, [finaly_thickness,thickness]);

const handleClosePopup = () => {
  setPopu1(false);
  setPopup2(false);
  setPopup3(false);
  setPopup4(false);

};

  return (
    <div className='text-white h-full'>
      <div className='sm:flex justify-between mb-1 md:mb-0 md:h-[7vh]'>
        <div className='flex'>
          <p className="text-xs font-bold mr-2 ml-2">Last-Data :<span className="text-red-500 font-bold">{last_updated_time}</span></p>
          <Select  className="sm:w-[35vh]" options={Data_freequences} styles={customStyles_2} isSearchable={false}  placeholder={`Clockify-${time_data} `} onChange={handle_dropdown_Change} />
        </div>
        <div className='flex mt-2 sm:mt-0'>
          <input
            type="number"
            className=" h-9  bg-gray-50 border border-gray-300 text-gray-900 ml-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[53%] ps-1 p-2.5   dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={`Thickness-${device_thickness}`}
            ref={inputRef}
          />
          <button onClick={handleSubmit}
          type="button"
          className="mr-3 ml-3 inline-block w-20 h-9 font-bold text-center bg-gradient-to-tl from-purple-700 to-pink-500 uppercase align-middle transition-all rounded-lg cursor-pointer leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs text-white"
          >SUBMIT
          <Toaster
          position="top-right"
          reverseOrder={false}
          />
          </button>
        </div> 
      </div>
      <div className={`border border-y-white rounded-md h-[20vh] sm:h-[23vh]  flex items-center justify-between
       ${rounded_value < parseFloat(50)?'bg-red-500':
        rounded_value >= parseFloat(50) && rounded_value  <= parseFloat(75) ? 'bg-[#ED7014]': 
        rounded_value > parseFloat(75) && finaly_thickness === false ? 'bg-[#28a33d]' : 
        'bg-[#0A99DF]'
        }`}>
          <div className='sm:ml-4 ml-1 text-[#ff5252] bg-[#fcedda] border rounded-full p-2 sm:p-4'>
            <svg className="h-10" fill="currentColor" viewBox="-1 -2 18 18">
              <TbRulerMeasure />
            </svg>
          </div>
          <div>
            <p className='font-bold sm:text-2xl mr-2'>{parseFloat(thickness) === parseFloat(0)? "⚠️ ER01" :parseFloat(thickness) === parseFloat(9999.00) ? "⚠️ ER02" : finaly_thickness === true ? "OverLimit" : rounded_value + "%"}</p>
            <p className='font-bold sm:text-xl'>Thickness</p>
          </div>
          <div className='mr-4'>
            <p className='font-bold sm:text-xl'>{thickness}/{device_thickness} mm</p>
          </div>
      </div>

      <div className='h-[16vh] mt-5  grid sm:grid-cols-3 gap-2'>
        <div className={`bg-[#2d2d2d] flex justify-center gap-4 items-center border-2  ${parseFloat(device_temp) > 65 || parseFloat(device_temp) < 0  ? 'border-red-500 blink-border' : 'border-white' }  rounded-lg`}>
          <div className='sm:ml-4 text-[#ff5252] bg-[#fcedda] border rounded-full p-1 sm:p-2'>
            <svg className="h-8" fill="currentColor" viewBox="-1 -2 18 18">
            <FaTemperatureLow/>
            </svg>
          </div>
          <div>
            <p className='font-bold ml-4 text-xl'>{device_temp} ℃</p>
            <p className='font-bold text-sm text-yellow-300'>Device Temp</p>
          </div>
        </div>
        <div className={`bg-[#2d2d2d] flex justify-center gap-4 items-center border-2 ${signal_percentage_convert <= 10 ||signal_percentage_convert >=100   ?'border-red-500 blink-border':'border-white'} border-white rounded-lg`}>
        <div className='sm:ml-4 text-[#ff5252] bg-[#fcedda] border rounded-full  p-1 sm:p-2'>
            <svg className="h-8" fill="currentColor" viewBox="-1 -2 18 18">
            <FaSignal/>
            </svg>
          </div>
          <div>
            <p className='font-bold ml-2 text-xl'>{signal_percentage_convert + "%"}</p>
            <p className='font-bold text-sm text-green-400'>Signal Strength</p>
          </div>
         
        </div>
        <div className={`bg-[#2d2d2d] flex justify-center gap-4 items-center border-2  ${Battery_Percentage_Value < 25 ? 'border-red-500 blink-border ' : 'border-white'}  border-white rounded-lg`}>
          <div className='sm:ml-4 text-[#ff5252] bg-[#fcedda] border rounded-full  p-1 sm:p-2'>
            <svg className="h-8" fill="currentColor" viewBox="-1 -2 18 18">
              <PiBatteryFullFill/>
            </svg>
          </div>
          <div>
            <p className='font-bold ml-4 text-xl'>{Battery_Percentage_Value >= 100 ? "100 %" : Battery_Percentage_Value < 0 ? "0 %" : Battery_Percentage_Value + "%"}</p>
            <p className='font-bold text-sm text-blue-400'>
            Battery Level
            </p>
          </div>
        </div>
      </div>
      {show_error_popup &&(
         <div className='popup' id='popup-1'>
         <div className='overlay'></div>
         <div className='content'>
           <div className='close-btn' onClick={handleClosePopup}>&times;</div>
           <h1 className="font-bold text-2xl text-emerald-500">OverLimit</h1>
           <p className="mt-2 text-black">Kindly Check with Maximum Thickness</p>
         </div>
       </div>
      )}
      {show_error_popup2 &&(
         <div className='popup' id='popup-1'>
         <div className='overlay'></div>
         <div className='content'>
           <div className='close-btn' onClick={handleClosePopup}>&times;</div>
           <h1 className="font-bold text-2xl text-emerald-500">⚠️ ER01</h1>
           <p className="mt-2 text-black">Fitment Issue</p>
         </div>
       </div>
      )}

      {show_error_popup3 &&(
         <div className='popup' id='popup-1'>
         <div className='overlay'></div>
         <div className='content'>
           <div className='close-btn' onClick={handleClosePopup}>&times;</div>
           <h1 className="font-bold text-2xl text-emerald-500">⚠️ ER02</h1>
           <p className="mt-2 text-black">Electronics Issue</p>
         </div>
       </div>
      )}
      {show_error_popup4 &&(
         <div className='popup' id='popup-1'>
         <div className='overlay'></div>
         <div className='content'>
           <div className='close-btn' onClick={handleClosePopup}>&times;</div>
           <h1 className="font-bold text-2xl text-emerald-500">ERROR:<span>⚠️ ER04</span></h1>
           <p className="mt-2 text-black">Kinldy Check With Maximum Thickness or Change the Brick</p>
         </div>
       </div>
      )}
      {show_error_popup5 &&(
         <div className='popup' id='popup-1'>
         <div className='overlay'></div>
         <div className='content'>
           <div className='close-btn' onClick={handleClosePopup}>&times;</div>
           <h1 className="font-bold text-2xl text-emerald-500">OverLimit</h1>
           <p className="mt-2 text-black">Kinldy Check With Maximum Thickness or Change the Brick</p>
         </div>
       </div>
      )}
    </div>
  )
}

export default Rcards
