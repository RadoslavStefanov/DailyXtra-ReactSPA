import { Link, Route, Routes } from 'react-router-dom';
import ArticlesInfo from './ArticleInfo';
import ArticlesBrowser from './ArticlesBrowser';
import DXACarousel from "./Carousel";

import style from './Main.module.css';

function Main(key) {

  return (
    <>
      <DXACarousel/>
      <ul className={style.browserTabs}>
          <Link to="/" id="global">🌐Global</Link>
          <Link to="/hot" id="hot">🔥Hot</Link>
          <Link to="/filter" id="filter">🔎Search</Link>
          <Link to="/foryou" id="foryou" disabled={true} >❤️ForYou</Link>
      </ul>
      <Routes>
      <Route path="/" element={<ArticlesBrowser tab={"global"}/>}/>
      <Route path="/hot" element={<ArticlesBrowser tab={"hot"}/>}/>
      <Route path="/filter" element={<ArticlesBrowser tab={"filter"}/>}/>
      <Route path="/foryou" element={<ArticlesBrowser tab={"foryou"}/>}/>
      <Route path="/article/:id" element={<ArticlesInfo/>}/>
      </Routes>
    </>
    
  );
}

export default Main;