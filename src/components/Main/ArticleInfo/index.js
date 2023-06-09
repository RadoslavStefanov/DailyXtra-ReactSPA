import { useParams, useNavigate } from "react-router-dom";
import { Col } from 'react-bootstrap';
import { getArticleById } from '../../../services/articlesGetter';

import style from './ArticlesInfo.module.css';
import { useEffect, useState } from "react";
import { calcTimeAgo } from "../../../services/Helper";

export default function ArticlesInfo()
{
    let params = useParams();   
    const back = useNavigate();
    const [article, setArticle] = useState({});

    useEffect(() => {   
        getArticleById(params.id)
        .then(a => setArticle(a))
    },[params.id])

    return (
    <>
        
        <Col md={6} style={{minHeight:"720px"}}>
            {
                <>
                    <div className={style.articleInfoHeader}>
                        <button className = {style.backButton} onClick={() => {back(-1)}}>Back</button>
                        <h1>{article.title}</h1>
                    </div>
                    <img src={article.image} className={style.articleImage} alt="article"/>
                    <div className={style.articleBody}>
                        <div>
                            <p>🕒{calcTimeAgo(article.dateTimePub)} {article.authors && article.authors[0] &&  `| 👨‍🎨${article.authors[0].name}`}</p>
                            <a href={`${article.url}`} target="_blank" rel="noreferrer">Check Original</a>
                        </div>
                        <p>{article.body}</p>
                        <strong>Language: {article.lang}</strong>
                    </div>
                </>
            }                        
        </Col>
    </>);
}