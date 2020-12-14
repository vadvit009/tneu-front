import s from "../News/News.module.css";
import {useEffect, useState} from "react";
import {_axios} from "../../axios/_axios";
import {Link} from "react-router-dom";

const News = () => {
  const [data, setData] = useState();
  useEffect(
    () => {
      _axios.get('/news')
        .then(({data}) => {
          setData(data)
        })
        .catch(e => {
          console.log(e)
        })
    }, [])

  return (
    <div>
      <h1 className={s.main_title}>Новини</h1>
      <div className={s.main}>
        {data && data.map(news =>
          <div key={news._id}>
            <hr/>
              <div className={s.text}>
                <Link className={s.name} to={'/new/' + news._id}>
                  <h3>{news.title}</h3>
                </Link>
                <p>{news.short_desc}</p>
              </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default News;
