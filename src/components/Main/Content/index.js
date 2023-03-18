import React, { useState } from 'react';

import { Container, Row, Col } from "react-bootstrap";
import calcTimeAgo from '../../../services/timeCalculator';
import PopularTopics from "../Floater/PopularTopics";
import UserPanel from "../Floater/UserPanel";

import style from './Content.module.css';


export default function MainContent(key)
{
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
      
    const articles = [
        { id: 1, header: "Flux Pavilion joins a “new age of dubstep” and releases newest single, 'Paradise'", content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { id: 2, header: 'Second Article', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { id: 3, header: 'Third Article', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
      ];
    
    const getRowColor = (index) => {
        return index % 2 === currentColorIndex ? '#F0FFF0' : '#ffffff';
    };

    const getBorder = (index) => {
        return index % 2 === currentColorIndex ? '5px solid #4fbe1d' : '';
    };

    console.log(key.kay)
    return(
        <Container fluid className='px-5'>
          <Row>
          <Col md={3} className="border-right">
            <PopularTopics/>
          </Col>
            <Col md={6} style={{minHeight:"720px"}}>
                <table className={style.contentTable}>
                    <tbody>
                        {articles.map((article, index) => (
                        <tr key={article.id} className={style.articleRow} style={{ backgroundColor: getRowColor(index), borderLeft: getBorder(index)}}>
                            <td>
                                <div className={style.articleImage} style={{background:"url(https://www.youredm.com/wp-content/uploads/2021/01/Flux-Pavilion-Press-Shot-1-2020-Fiona-Garden-1-750x500.jpg)"}}></div>
                                <div className="articleInfo">
                                    <a className={style.articleHeader} href="https://www.reviewgeek.com/148545/7-eleven-will-charge-your-ev-while-you-guzzle-a-slurpee/">{article.header}</a>
                                    <p>🕒{calcTimeAgo("2023-03-18T17:26:55Z")} | 👨‍🎨Cory Gunther</p>
                                    <p className={style.articleDescription}>In the future, when you stop for a Big Gulp fountain drink or slurpee at 7-Eleven, there’s a good chance you’ll find a spot to recharge your electric vehicle. The famous convenience store is launching 7Charge, a massive new EV fast-charging network.</p>
                                </div>
                                <div style={{display:"block"}}>
                                    <div className={style.articleControls}>
                                        <div className={style.articleControlsItem}>| 👁️View</div>
                                        <div className={style.articleControlsItem}>| 📑Check original</div>
                                        <div className={style.articleControlsItem}>| 💾Save</div>
                                        <div className={style.articleControlsItem}>| 🧡Like</div>
                                    </div>
                                </div>                                
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </Col>
            <Col md={3} className="position-sticky">
              <UserPanel/>
            </Col>
          </Row>
        </Container>
    )
}