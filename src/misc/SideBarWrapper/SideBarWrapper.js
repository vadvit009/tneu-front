import React, {useEffect, useState} from "react";
import s from "./SideBarWrapper.module.css";
import {Link} from "react-router-dom";
import {_axios} from "../../axios/_axios";

const SideBarWrapper = ({Component}) => {
  const [fetchedData, setData] = useState('');
  const [dataScience, setDataScience] = useState('');
  useEffect(
    () => {
      _axios.get('/news')
        .then(({data}) => {
          setData(data.splice(0, 3))
        })
        .catch(e => {
          console.log(e)
        })

      _axios.get('/science_activity')
        .then(({data}) => {
          setDataScience(data.splice(0, 3))
        })
        .catch(e => {
          console.log(e)
        })
    }, [])

  return (
    <div className={s.container}>
      <div className={s.info}>
        <h3 className={s.title}>Вступникам: </h3>
        <div className={s.abit_info}>
          <p className={s.links}><a href={'http://www.tneu.edu.ua/documents-entrant/'}>Строки прийому заяв і
            документів</a></p>
          <p className={s.links}><a href={'http://www.tneu.edu.ua/schedule-entrance/'}>Розклад вступних випробувань</a>
          </p>
          <p className={s.links}><a href={'http://www.tneu.edu.ua/certification-testing-entrance-test/'}>Вступні
            випробування</a></p>
          <p className={s.links}><a href={'http://www.tneu.edu.ua/decision-entrant/'}>Рішення приймальної комісії</a>
          </p>
          <p className={s.links}><a href={'http://www.tneu.edu.ua/ranking-lists-entrant/'}>Рейтингові списки</a></p>
          <p className={s.links}><a href={'http://www.tneu.edu.ua/questions-and-answers-entrant/'}>Запитання та
            відповіді</a></p>
          <p className={s.links}><a href={'http://www.tneu.edu.ua/entrant/'}>Контакти приймальної комісії</a></p>
        </div>
        <h3 className={s.title}>Новини: </h3>
        <div className={s.news}>
          {fetchedData && fetchedData?.map(news =>
            <p className={s.links} key={news._id}>
              <Link to={'/new/' + news._id}>{news.title}</Link><br/>
              <p> {news.short_desc}</p>
            </p>
          )}
        </div>
        <h3 className={s.title}>Наукова діяльність: </h3>
        <div className={s.science_info}>
          {dataScience && dataScience?.map(science =>
            <p key={science._id} className={s.links}>
              <Link to={'/science_activity/' + science._id}>{science.title}</Link>
            </p>
          )}
          {/*<p className={s.links}><Link to={'/science_activity/1'}>Розклад вступних випробувань</Link></p>*/}
          {/*<p className={s.links}><Link to={'/'}>Строки прийому заяв і документів</Link></p>*/}
          {/*<p className={s.links}><Link to={'/'}>Строки прийому заяв і документів</Link></p>*/}
          {/*<p className={s.links}><Link to={'/'}>Строки прийому заяв і документів</Link></p>*/}
        </div>
      </div>
      <div className={s.main}>
        <Component/>
      </div>
    </div>
  )
}

export default SideBarWrapper;
