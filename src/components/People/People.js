import s from "../People/People.module.css";
import {useEffect, useState} from "react";
import {_axios} from "../../axios/_axios";

const People = () => {
  const id = window.location.pathname.split('/')[2];
  const [data, setData] = useState();
  const [bufferImg, setBufferImg] = useState();

  useEffect(
    () => {
      _axios.get('/people/' + id)
        .then(({data}) => {
          setData(data)
          setBufferImg(Buffer.from(data.gallery.data, 'base64').toString('base64'))
        })
        .catch(e => {
          console.log(e)
        })
    }, [id]);
  const mimeType = data?.gallery?.data && Buffer.from(data.gallery.data,'base64').toString('base64').split('/')[1].split('base64')[0];
  const decodedImg = data?.gallery?.data && Buffer.from(data.gallery.data,"base64").toString('base64').split('base64')[1]
  console.log(mimeType)
  console.log(data&&Buffer.from(data.gallery.data, 'base64').toString('base64'))

  return (
    <div>
      <div className={s.main}>
        <h1 className={s.fio}>{data?.fName + ' ' + data?.sName}</h1>
        <div className={s.desc}>
          {/*<img alt={'news_photo'} src={`data:${data?.gallery?.contentType};base64,${bufferImg}`}/>*/}
          <img className={s.img} alt={'news_photo'}
               src={`data:image/${mimeType};base64,${decodedImg}`}/>
          <div>
            <h2>Найбільш актуальні публікації:</h2>
            <div className={s.left_text} dangerouslySetInnerHTML={{__html: data?.desc}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default People;
