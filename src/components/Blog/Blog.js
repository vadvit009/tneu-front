import s from "../Blog/Blog.module.css";
import React, {useEffect, useState} from "react";
import {_axios} from "../../axios/_axios";

const Blog = () => {
  const [data, setData] = useState();
  useEffect(
    () => {
      _axios.get('/blog')
        .then(({data}) => {
          setData(data)
        })
        .catch(e => {
          console.log(e)
        })
    }, [])

  return (
    <div>
      <h1 className={s.main_title}>Блог</h1>
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

export default Blog;
