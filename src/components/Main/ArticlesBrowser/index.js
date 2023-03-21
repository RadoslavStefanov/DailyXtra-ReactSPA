import React, { useState, useEffect } from 'react';

import { Container, Row, Col } from "react-bootstrap";
import { getArticles } from '../../../services/articlesGetter';
import calcTimeAgo from '../../../services/timeCalculator';
import PopularTopics from "../Floater/PopularTopics";
import UserPanel from "../Floater/UserPanel";

import style from './ArticlesBrowser.module.css';
import DXACarousel from '../Carousel';
import { Link } from 'react-router-dom';
import { disableLoading, toggleLoading } from '../../../services/loadMoreBtnFuncs';


export default function ArticlesBrowser(tab)
{

    console.log(tab.tab)
    const [articles, setArticles] = useState([]);

    function markSelectedTab()
    {
        document.querySelectorAll("a.selected").forEach(a=>a.classList.remove("selected"));

        if(document.getElementById(tab.tab))
        {document.getElementById(tab.tab).classList.add("selected")}
    }

    function LoadMore()
    {
        debugger;
        toggleLoading();
        content.pageNumber = content.pageNumber+1;

        getArticles(content)
        .then(a=> setArticles([...articles, ...a]))
        .catch(err =>{console.error(err)});

        disableLoading();
    }

    const [content,] = 
    useState(
        {
            pageNumber:1,
            tabKey: tab.tab
        });

    useEffect(() => 
    {   
        if(content.tabKey!==tab.tab)
           {
             content.tabKey = tab.tab;
             content.pageNumber = 1;
             setArticles([]);
           }

        getArticles(content)
        .then(a=> setArticles(a))
        .then( () => markSelectedTab() )
        .catch(err =>{console.error(err)});
    },[tab.tab])

    return(
        <>
            <DXACarousel/>
            <ul className={style.browserTabs}>
                <Link to="/" id="global">🌐Global</Link>
                <Link to="/hot" id="hot">🔥Hot</Link>
                <Link to="/filter" id="filter">🔎Filter</Link>
                <Link to="/foryou" id="foryou" disabled={true} >❤️ForYou</Link>
            </ul>
            
            <Container fluid className='px-5'>
                <Row>
                <Col md={3} className="border-right">
                    <PopularTopics/>
                </Col>
                    <Col md={6} style={{minHeight:"720px"}}>
                        <table className={style.contentTable}>
                            <tbody>
                                {articles.map((article) => (
                                <tr key={article.url} className={style.articleRow}>
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
                        {tab.tab != "hot" && 
                        <button id="loadMoreBtn" className={style.loadMoreBtn} onClick={() => LoadMore()}>LOAD MORE...</button>}
                        
                    </Col>
                    <Col md={3} className="position-sticky">
                    <UserPanel/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}