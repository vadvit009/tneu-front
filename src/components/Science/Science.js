import s from "../Science/Science.module.css";
import {useEffect, useState} from "react";
import {_axios} from "../../axios/_axios";

const Science = () => {
  const [data, setData] = useState();
  useEffect(
    () => {
      _axios.get('/sciences')
        .then(({data}) => {
          setData(data)
        })
        .catch(e => {
          console.log(e)
        })
    }, [])

  return (
    <div>
      <h1 className={s.main_title}>Наука</h1>
      <div className={s.main}>
        {data && data.map(news =>
          <div key={news._id}>
            <hr/>
            <div className={s.text}>
              <h3 className={s.name}>{news.title}</h3>
              <div dangerouslySetInnerHTML={{__html: news.desc}}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Science;
