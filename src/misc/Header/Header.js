import React, {useState} from "react";
import s from "./Header.module.css";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import EmailIcon from '@material-ui/icons/Email';
import {TextField} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {withStyles} from "@material-ui/core/styles";
import {Link, useHistory} from "react-router-dom";
import logo from '../../assets/logo.jpg';

const Header = () => {
  const h = useHistory();
  const [search, setSearch] = useState('');
  const handleSearch = () => {
    console.log(search)
    h.push('/news')
  }
  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const CssTextField = withStyles({
    root: {
      '& .MuiOutlinedInput-root': {
        borderRadius: '0',
        '& fieldset': {
          borderColor: '#6d3a95',
        },
        '&:hover fieldset': {
          borderColor: '#6d3a95',
        },
      },
    },
  })(TextField);

  return (
    <header className={s.header_container}>
      <div className={s.header}>
        <div className={s.img_title}>
          <div className={s.logo}>
            <Link to={'/'}>
              <img className={s.logoImage} src={logo} alt={'logo'}/>
            </Link>
          </div>
          <div className={s.title}>
            <Link to={'/'} className={s.link}>
              <h2 className={s.name}>
                Кафедра економіки та економічної теорії
              </h2>
            </Link>
          </div>
        </div>
        <div className={s.search}>
          <div className={s.search_container}>
            <CssTextField
              label={'Пошук'}
              variant="outlined"
              size={'small'}
              type={'search'}
              value={search}
              autoFocus
              onChange={handleChange}
              InputProps={{
                endAdornment: <SearchIcon onClick={handleSearch} className={s.search_icon}/>
              }}
            />
          </div>
        </div>
        <div className={s.social}>
          <p className={s.social_title}>Ми в соцмережах:</p>
          <a href={'https://www.facebook.com/economicsTNEU/'}>
            <FacebookIcon className={s.fb}/>
          </a>
          <a href={'https://instagram.com/kafedra_eet?igshid=1sexx39r6cwxd'}>
            <InstagramIcon className={s.insta}/>
          </a>
          <a href={'https://www.youtube.com'}>
            <YouTubeIcon className={s.youtube}/>
          </a>
          <a href={'mailto:kaf_et@wunu.edu.ua'}>
            <EmailIcon className={s.email}/>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header;
