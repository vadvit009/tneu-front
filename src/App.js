import s from './App.module.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from "./misc/Header/Header";
import Menu from "./misc/Menu/Menu";
import Home from "./components/Home/Home";
import Footer from "./misc/Footer/Footer";
import Kafedra from "./components/Kafedra/Kafedra";
import SideBarWrapper from "./misc/SideBarWrapper/SideBarWrapper";
import Create from "./components/Admin/Create/Create";
import Vstupnykam from "./components/Vstupnykam/Vstupnykam";
import People from "./components/People/People";
import SingleNews from "./components/SingleNews/SingleNews";
import News from "./components/News/News";
import Science from "./components/Science/Science";
import ScienceProcess from "./components/ScienceProcess/ScienceProcess";
import Blog from "./components/Blog/Blog";
import Reviews from "./components/Reviews/Reviews";
import ScienceActivity from "./components/ScienceActivity/ScienceActivity";
import Login from "./components/Admin/Login/Login";
import {useEffect, useState} from "react";
import Update from "./components/Admin/Update/Update";
import Main from "./components/Admin/Main/Main";

const App = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(
      localStorage.getItem('_token')
    )
  }, [token]);

  return (
    <div className={s.container}>
      <BrowserRouter>
        <Header/>
        <Menu/>
        <Switch>
          <Route exact path={'/'} component={Home}/>
          {token && <Route path={'/admin'} component={Main}/>}
          {token && <Route path={'/admin-update'} component={Update}/>}
          {token && <Route path={'/admin-create'} component={Create}/>}
          <Route path={'/login'} component={Login}/>
          <Route path={'/kafedra'}>
            <SideBarWrapper Component={Kafedra}/>
          </Route>
          <Route path={'/person/:id'}>
            <SideBarWrapper Component={People}/>
          </Route>
          <Route path={'/vstupnykam'}>
            <SideBarWrapper Component={Vstupnykam}/>
          </Route>
          <Route path={'/science_process'}>
            <SideBarWrapper Component={ScienceProcess}/>
          </Route>
          <Route path={'/science'}>
            <SideBarWrapper Component={Science}/>
          </Route>
          <Route path={'/science_activity/:id'}>
            <SideBarWrapper Component={ScienceActivity}/>
          </Route>
          <Route path={'/news'}>
            <SideBarWrapper Component={News}/>
          </Route>
          <Route path={'/new/:id'}>
            <SideBarWrapper Component={SingleNews}/>
          </Route>
          <Route path={'/blog'}>
            <SideBarWrapper Component={Blog}/>
          </Route>
          <Route path={'/reviews'}>
            <SideBarWrapper Component={Reviews}/>
          </Route>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
