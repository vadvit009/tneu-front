import React from "react";
import s from "./Slider.module.css";
import SliderImg from '../../assets/slider.jpeg'

const Slider = () => {
  return (
    <div className={s.slider}>
      <img src={SliderImg} alt={'slider'}/>
    </div>
  )
}

export default Slider;
