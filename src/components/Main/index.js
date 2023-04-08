import { Link, Route, Routes, useLocation } from 'react-router-dom';
import ArticlesInfo from './ArticleInfo';
import ArticlesBrowser from './ArticlesBrowser';
import DXACarousel from "./Carousel";
import { Container, Row, Col } from "react-bootstrap";
import UserPanel from "../Shared/Floater/UserPanel";
import PopularTopics from "../Shared/Floater/PopularTopics";
import Login from "../UserOps/Login";
import Register from "../UserOps/Register";
import AboutUs from '../GenericPages/AboutUs';
import Subscribe from '../GenericPages/Subscription';

import style from './Main.module.css';
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import Profile from '../UserOps/Profile';
import SavedNews from '../UserOps/SavedNews';

function Main() {
  const { isUserLogged } = useContext(AuthContext);

  const containerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [location]);



  return (
    <>
      <DXACarousel/>
      <ul className={style.browserTabs} ref={containerRef}>
          <Link to="/" id="global">🌐Global</Link>
          <Link to="/hot" id="hot">🔥Hot</Link>
          {isUserLogged() ? 
              <>
                  <Link to="/filter" id="filter">🔎Search</Link>
                  <Link to="/foryou" id="foryou" disabled={true} >❤️ForYou</Link>
              </>                                            
              :
              <>
                  <Link to="/login" id="filter" className={style.disabledTabs}>🔎Search</Link>
                  <Link to="/login" id="foryou"  className={style.disabledTabs}>❤️ForYou</Link>
              </>
          }
          
      </ul>
      <Container fluid className='px-5'>
        <Row>
          <Col md={3} className="border-right">
              <PopularTopics/>
          </Col>
          <Routes>
                <Route path="/" element={<ArticlesBrowser tab={"global"}/>}/>
                <Route path="/hot" element={<ArticlesBrowser tab={"hot"}/>}/>
                <Route path="/politics" element={<ArticlesBrowser tab={"politics"}/>}/>
                <Route path="/sports" element={<ArticlesBrowser tab={"sports"}/>}/>
                <Route path="/entertainment" element={<ArticlesBrowser tab={"entertainment"}/>}/>
                <Route path="/techworld" element={<ArticlesBrowser tab={"techworld"}/>}/>
                <Route path="/filter" element={<ArticlesBrowser tab={"filter"}/>}/>
                <Route path="/foryou" element={<ArticlesBrowser tab={"foryou"}/>}/>
                <Route path="/savednews" element={<SavedNews/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/aboutus" element={<AboutUs/>}/>
                <Route path="/subscribe" element={<Subscribe/>}/>
                <Route path="/article/:id" element={<ArticlesInfo/>}/>
          </Routes>
          <Col md={3} className="position-sticky profileFloater">
            <UserPanel/>
          </Col>
        </Row>
        </Container>
    </>
    
  );
}

export default Main;