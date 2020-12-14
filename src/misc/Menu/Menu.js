import React, {useState} from "react";
import s from "./Menu.module.css";
import MenuIcon from '@material-ui/icons/Menu';
import ShareIcon from '@material-ui/icons/Share';
import SearchIcon from '@material-ui/icons/Search';
import MobileMenu from "../MobileMenu/MobileMenu";

const Menu = () => {
  const [isOpen, setIsOpen] = useState();
  const isBurgerOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className={s.menu_container}>
      <div className={s.burger_container}>
        <div className={s.burger_icon} onClick={isBurgerOpen}>
          <MenuIcon/> <span>МЕНЮ</span>
        </div>
        <div className={s.search_share}>
          <SearchIcon className={s.search_icon}/>
          <ShareIcon className={s.share_icon}/>
        </div>
      </div>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  )
}

export default Menu;
