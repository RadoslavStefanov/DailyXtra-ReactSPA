import React, { useState, useEffect } from 'react';

import { Container, Row, Col } from "react-bootstrap";
import { getArticles } from '../../../services/articlesGetter';
import calcTimeAgo from '../../../services/timeCalculator';
import PopularTopics from "../Floater/PopularTopics";
import UserPanel from "../Floater/UserPanel";

import style from './Content.module.css';


export default function MainContent(key)
{
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const [articles, setArticles] = useState([]);
    const [content, setContext] = 
    useState(
        {
            pageNumber:1,
            tabKey: key.k
        });

    useEffect(() => 
    {   
        if(content.tabKey!==key.k)
           {
             content.tabKey = key.k;
             setArticles([]);
           }

        getArticles(content)
        .then(a=> setArticles(a))
        .catch(err =>{console.error(err)});
    },[key.k])

    const getRowColor = (index) => 
    { return index % 2 === currentColorIndex ? '#F0FFF0' : '#ffffff'; };

    const getBorderLeft = (index) => 
    { return index % 2 === currentColorIndex ? '5px solid #4fbe1d' : ''; };

    const getBorderRight = (index) => 
    { return index % 2 !== currentColorIndex ? '5px solid lightgray' : ''; };

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
                        <tr key={article.url} className={style.articleRow} style={{ backgroundColor: getRowColor(index), borderLeft: getBorderLeft(index), borderRight: getBorderRight(index)}}>
                            <td>
                                {article.urlToImage ? <div className={style.articleImage} style={{background:`url(${article.urlToImage})`}}></div>
                                : <div className={style.articleImage} style={{background:`url(https://thumbs.dreamstime.com/b/news-header-background-title-abstract-colorful-global-map-text-hightech-design-blue-colorful-template-90494676.jpg)`}}></div>}
                                
                                <div className="articleInfo">
                                    <a className={style.articleHeader} href={""+article.url} >{article.title}</a>
                                    <p>🕒{calcTimeAgo(article.publishedAt)} | 👨‍🎨{article.author}</p>
                                    <p className={style.articleDescription}>{article.description}</p>
                                </div>
                                <div style={{display:"block"}}>
                                    <div className={style.articleControls}>
                                        <a href={""+article.url}className={style.articleControlsItem}>| 👁️View</a>
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