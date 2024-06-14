import React from "react";
import { Line } from "react-chartjs-2";
import './style.css';
import { Chart as ChartJS,LineElement,CategoryScale,LinearScale,PointElement } from "chart.js";
ChartJS.register(
  LineElement,CategoryScale,LinearScale,PointElement
)

const Charts = ({DeviceData}) => {

const thicknessValues = DeviceData.map(item => item.thickness);
const reversedThicknessValues = thicknessValues.reverse();



const timestamp = DeviceData.map(item => {
  const date = new Date(item.timestamp);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
});

const Thickness_times = timestamp.reverse();
const thcikness_data = reversedThicknessValues?reversedThicknessValues :"N/A";



const time = Thickness_times?Thickness_times :"N/A";

  const data={
    labels:time,
    datasets:[
      {
        data:thcikness_data,
        backgroundColor:'#ffffff',
        borderColor:'#08B8FF',
        pointBorderColor:'#fffff',
      }
    ]
  }
  const options={
    scales: {
      x: {
          title: {
            display: true,
            text: 'TimeStamp', 
            color: '#F7FF00 ' 
        },
          ticks: {
              color: '#D8D8D8 '
          },
          grid: {
            color: '#C5E3E2', 
            borderColor: '#C5E3E2' 
        }
      },
      y: {
        title:{
          display:true,
          text:"Thickness(mm)",
          color:"#00FFFF "
        },
        ticks: {
            color: '#11FFB3' 
        },
        grid: {
          color: '#C5E3E2', 
          borderColor: '#C5E3E2' 
      }
    }
  }
  }
  return (
    <div className="bg-[#2d2d2d] rounded-lg ">
      <div className="md:h-[42vh]">
        <Line className="ml-2 w-full " data={data} options={options}></Line>
      </div>
    </div>
  );
};

export default Charts;