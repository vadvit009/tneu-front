import s from "../Kafedra/Kafedra.module.css";
import {useEffect, useState} from "react";
import {_axios} from "../../axios/_axios";
import {Link} from "react-router-dom";

const Kafedra = () => {
  const [data, setData] = useState();
  // const mimeType = data?.gallery?.data && Buffer.from(data.gallery.data).toString('base64').split('/')[1].split('base64')[0];
  // const decodedImg = data?.gallery?.data && Buffer.from(data.gallery.data).toString('base64').split('base64')[1];
  console.log(data);

  useEffect(
    () => {
      _axios.get('/people')
        .then(({data}) => {
          setData(data)
        })
        .catch(e => {
          console.log(e)
        })
    }, [])

  return (
    <div>
      <h1 className={s.main_title}>Наші викладачі</h1>
      <div className={s.main}>
        {data && data.map(person => {
            const mimeType = person.gallery?.data && Buffer.from(person.gallery.data).toString('base64').split('/')[1].split('base64')[0];
            const decodedImg = person.gallery?.data && Buffer.from(person.gallery.data).toString('base64').split('base64')[1];
          console.log(mimeType,decodedImg)
            return <div key={person._id}>
              <hr/>
              <div className={s.person}>
                <Link className={s.name} to={'/person/' + person._id}>
                  <img className={s.img} alt={'news_photo'}
                       src={`data:image/${mimeType};base64,${decodedImg}`}/>
                  {/*{person.gallery && <img alt={'person'}*/}
                  {/*      src={`data:${person?.gallery?.contentType};base64,${Buffer.from(person?.gallery?.data, 'base64').toString('base64')}`}/>}*/}
                </Link>
                <div className={s.text}>
                  <Link className={s.name} to={'/person/' + person._id}>
                    <h3>{person.fName + ' ' + person.sName}</h3>
                  </Link>
                  < p>< strong> Вчене звання: </strong>{person.scinceTitle}</p>
                  <p><strong>Науковий ступінь: </strong>{person.scinceLevel}</p>
                </div>
              </div>
            </div>
          }
        )}
      </div>
    </div>
  );
}

export default Kafedra;
