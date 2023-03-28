import { Link, useParams, useNavigate } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap';
import PopularTopics from "../Floater/PopularTopics";
import UserPanel from "../Floater/UserPanel";
import { getArticleById } from '../../../services/articlesGetter';

import style from './ArticlesInfo.module.css';
import { useEffect, useState } from "react";
import calcTimeAgo from "../../../services/timeCalculator";

export default function ArticlesInfo()
{
    let params = useParams();   
    const back = useNavigate();
    const [article, setArticle] = useState({});

    useEffect(() => {   
        debugger;
        getArticleById(params.id)
        .then(a => setArticle(a))
    },[])

    return (
    <>
        <Container fluid className='px-5'>
                <Row>
                    <Col md={3} className="border-right">
                        <PopularTopics/>
                    </Col>
                    <Col md={6} style={{minHeight:"720px"}}>
                        {
                            <>
                                <div className={style.articleInfoHeader}>
                                    <button className = {style.backButton} onClick={() => {back(-1)}}>Back</button>
                                    <h1>{article.title}</h1>
                                </div>
                                <img src={article.image} className={style.articleImage} />
                                <div className={style.articleBody}>
                                    <div>
                                        <p>🕒{calcTimeAgo(article.dateTimePub)} {article.authors && article.authors[0] &&  `| 👨‍🎨${article.authors[0].name}`}</p>
                                        <a href={`${article.url}`} target="_blank">Check Original</a>
                                    </div>
                                    <p>{article.body}</p>
                                    <strong>Language: {article.lang}</strong>
                                </div>
                            </>
                        }                        
                    </Col>
                    <Col md={3} className="position-sticky">
                        <UserPanel/>
                    </Col>
                </Row>
        </Container>
    </>);
}