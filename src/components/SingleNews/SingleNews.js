import s from "../SingleNews/SingleNews.module.css";
import {useEffect, useState} from "react";
import {_axios} from "../../axios/_axios";
import {useParams} from 'react-router-dom';

const SingleNews = () => {
  const {id} = useParams();
  const [data, setData] = useState();

  useEffect(
    () => {
      _axios.get('/news/' + id)
        .then(({data}) => {
          setData(data)
          console.log(data)
        })
        .catch(e => {
          console.log(e)
        })
    }, [id])

  return (
    <div>
      <div className={s.main}>
        <h1 className={s.fio}>{data?.title}</h1>
        <div className={s.desc}>
          <div>
            <div className={s.left_text} dangerouslySetInnerHTML={{__html: data?.desc}}></div>
          </div>
          {data?.gallery?.map((image, i) => {
            const mimeType = image.data && Buffer.from(image.data).toString('base64').split('/')[1].split('base64')[0];
            const decodedImg = image.data && Buffer.from(image.data).toString('base64').split('base64')[1]
            return <img className={s.img} key={i} alt={'news_photo'}
                        src={`data:image/${mimeType};base64,${decodedImg}`}/>
          })}
        </div>
      </div>
    </div>
  );
}

export default SingleNews;
