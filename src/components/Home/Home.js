import s from './Home.module.css';
import SideBar from "../../misc/SideBar/SideBar";
import Slider from "../../misc/Slider/Slider";
import {useEffect, useState} from "react";
import {_axios} from "../../axios/_axios";

const Home = () => {
  const [data, setData] = useState();
  useEffect(
    () => {
      _axios.get('/pages').then(({data}) => {
        setData(data[0])
      })
    }, []
  )

  return (
    <div>
      <Slider/>
      <div className={s.container}>
        <SideBar/>
        <div className={s.main}>
          <h1 className={s.main_title}>{data?.title}</h1>
          <div dangerouslySetInnerHTML={{__html: data?.desc}}>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
