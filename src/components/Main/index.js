import { Link, Route, Routes } from 'react-router-dom';
import ArticlesInfo from './ArticleInfo';
import ArticlesBrowser from './ArticlesBrowser';
import DXACarousel from "./Carousel";
import { Container, Row, Col } from "react-bootstrap";
import UserPanel from "../Shared/Floater/UserPanel";
import PopularTopics from "../Shared/Floater/PopularTopics";
import Login from "../UserOps/Login";

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
      <Container fluid className='px-5'>
        <Row>
          <Col md={3} className="border-right">
              <PopularTopics/>
          </Col>
          <Routes>
                <Route path="/" element={<ArticlesBrowser tab={"global"}/>}/>
                <Route path="/hot" element={<ArticlesBrowser tab={"hot"}/>}/>
                <Route path="/filter" element={<ArticlesBrowser tab={"filter"}/>}/>
                <Route path="/foryou" element={<ArticlesBrowser tab={"foryou"}/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/article/:id" element={<ArticlesInfo/>}/>
          </Routes>
          <Col md={3} className="position-sticky">
            <UserPanel/>
          </Col>
        </Row>
        </Container>
    </>
    
  );
}

export default Main;