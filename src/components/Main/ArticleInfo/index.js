import style from './ArticlesInfo.module.css';
import { Link, useParams } from "react-router-dom";
import DXACarousel from "../Carousel";
import { Col, Container, Row } from 'react-bootstrap';
import PopularTopics from "../Floater/PopularTopics";
import UserPanel from "../Floater/UserPanel";

export default function ArticlesInfo()
{
    let params = useParams();
    alert(params.id)

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
                    <Col md={6} style={{minHeight:"720px"}}>
                        {}                        
                    </Col>
                    <Col md={3} className="position-sticky">
                        <UserPanel/>
                    </Col>
                </Row>
            </Container>
    </>);
}