import { useState ,React,useEffect }  from "react";
import b1 from '../asserts/college_img_1.jpg';
import b2 from '../asserts/college_img_2.jpg';
import b3 from '../asserts/college_img_3.jpg';

// import b3 from '../asserts/off7.png';
// import b4 from '../asserts/off8.png';
// import b5 from '../asserts/off10.png';
// import b6 from '../asserts/off12.png';
import { useCallback } from "react";
import {toast,Toaster} from 'react-hot-toast'
import Cards from './Cards';

import './Home.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Typography } from "@mui/material";

import {useNavigate} from 'react-router-dom'


function Home() {
  const navigate = useNavigate();

  
  const [currentimgindex,setCurrrentimgindex] = useState(0);
  const background_img=[b1,b2,b3];
  
  const prevImg= () => {
    setCurrrentimgindex((prevInd)=>(prevInd +1) % background_img.length)
}

const nextImg = () => {
    setCurrrentimgindex((prevInd)=>(prevInd-1 + background_img.length) % background_img.length);
}
const autoChange = () =>{
  setCurrrentimgindex((prevInd)=>(prevInd +1) % background_img.length)
}
setInterval(autoChange,10000);

 // Use Razorpay only when online







// }, [ isOnline]);

  return (
    <div className='home' >
      <Toaster position="top-center" reverseOrder={false}></Toaster>
         <div className="home_container" id="get-top">
            <ArrowBackIosIcon className="Arrow_Backward" onClick={prevImg} />
            <img height='500px' width='70%' className='home_image' src={background_img[currentimgindex]} alt=""  />
            <ArrowForwardIosIcon className='Arrow_Forward'  onClick={nextImg} />
        </div>
        <div className="cards" >
          <div className="Header_card">
                <h2>Explore Placement Opportunities! </h2>
          </div>
        </div>
    </div>
  )
}

export default Home