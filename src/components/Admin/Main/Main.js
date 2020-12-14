import React from "react";
import {Link} from "react-router-dom";
import s from './Main.module.css'

const Main = () => {
  return (
    <div className={s.container}>
      <div className={s.link}>
        <Link to={'/admin-update'}>Редагування</Link>
      </div>
      <hr/>
      <div className={s.link}>
        <Link to={'/admin-create'}>Створення</Link>
      </div>
    </div>
  );
}

export default Main;
