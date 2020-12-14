import s from "../ScienceActivity/ScienceActivity.module.css";
import {useEffect, useState} from "react";
import {_axios} from "../../axios/_axios";
import {useParams} from 'react-router-dom';

const ScienceActivity = () => {
  const {id} = useParams();
  const [data, setData] = useState();

  useEffect(
    () => {
      _axios.get('/science_activity/' + id)
        .then(({data}) => {
          setData(data)
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
          {data?.gallery.map((image, i) =>
            <img key={i} alt={'news_photo'}
                 src={`data:${image?.contentType};base64,${Buffer.from(image.data, 'base64').toString('base64')}`}/>)}
        </div>
      </div>
    </div>
  );
}

export default ScienceActivity;
