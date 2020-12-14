import React from "react";
import s from "./MobileMenu.module.css";
import CloseIcon from '@material-ui/icons/Close';
import HomeIcon from "@material-ui/icons/Home";
import {Link} from "react-router-dom";

const MobileMenu = ({isOpen, setIsOpen}) => {
  const handleClose = () => {
    setIsOpen(!isOpen)
  }

  return !!isOpen && (
    <div className={s.burger_container}>
      <h2 className={s.header}>Меню <CloseIcon onClick={handleClose} className={s.close}/></h2>
      <div className={s.list_container}>
        <div className={s.menu}>
          <h3 className={s.link_container}>
            <HomeIcon className={s.home}/>
            <Link onClick={handleClose}  className={s.link} to={''}>
              Головна
            </Link>
          </h3>
          <h3 className={s.link_p}>
            <Link onClick={handleClose}  className={s.link} to={'/kafedra'}>Про кафедру</Link>
          </h3>
          <h3 className={s.link_p}>
            <Link onClick={handleClose}  className={s.link} to={'/vstupnykam'}>Вступникам</Link>
          </h3>
          <h3 className={s.link_p}>
            <Link onClick={handleClose}  className={s.link} to={'/science_process'}>Навчальний процес</Link>
          </h3>
          <h3 className={s.link_p}>
            <Link onClick={handleClose}  className={s.link} to={'/science'}>Наука</Link>
          </h3>
          <h3 className={s.link_p}>
            <Link onClick={handleClose}  className={s.link} to={'/news'}>Новини</Link>
          </h3>
          <h3 className={s.link_p}>
            <Link onClick={handleClose}  className={s.link} to={'/blog'}>Блог</Link>
          </h3>
          <h3 className={s.link_p_last}>
            <Link onClick={handleClose}  className={s.link} to={'/reviews'}>Відгуки економіки ЗУНУ</Link>
          </h3>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu;
