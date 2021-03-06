import s from "../Vstupnykam/Vstupnykam.module.css";
import React, {useEffect, useState} from "react";
import {_axios} from "../../axios/_axios";

const Vstupnykam = () => {
  const [data, setData] = useState([]);

  useEffect(
    () => {
      _axios.get('/vstup')
        .then(({data}) => {
          setData(data)
        })
        .catch(e => {
          console.log(e)
        })
    }, []);

  return (
    <div>
      <h1 className={s.main_title}>Вступникам</h1>
      <div className={s.main}>
        {data && data?.map(news =>
          <div key={news._id}>
            <hr/>
            <div className={s.text}>
              <h3 className={s.name}>{news.title}</h3>
              <div dangerouslySetInnerHTML={{__html: news.desc}}/>
              <img alt={'reviews_photo'}
                   src={`data:${news.gallery?.contentType};base64,${Buffer.from(news.gallery[0].data, 'base64').toString('base64')}`}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Vstupnykam;
