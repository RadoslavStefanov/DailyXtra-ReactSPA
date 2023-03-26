import React, { useState, useEffect } from 'react';

import { Container, Row, Col } from "react-bootstrap";
import { getArticles, getFilteredArticles } from '../../../services/articlesGetter';
import calcTimeAgo from '../../../services/timeCalculator';
import PopularTopics from "../Floater/PopularTopics";
import UserPanel from "../Floater/UserPanel";

import style from './ArticlesBrowser.module.css';
import DXACarousel from '../Carousel';
import { Link } from 'react-router-dom';
import { disableLoading, toggleLoading } from '../../../services/loadMoreBtnFuncs';
import Filter from '../Filter';


export default function ArticlesBrowser({tab})
{
    const [articles, setArticles] = useState([]);
    const [filterResult, setFilter] = useState(
        {
            keywords: null,
            country: '',
            language: null,
            sortOrder: ''
        });

    function markSelectedTab()
    {
        document.querySelectorAll("a.selected").forEach(a=>a.classList.remove("selected"));

        if(document.getElementById(tab))
        {document.getElementById(tab).classList.add("selected")}
    }

    function LoadMore()
    {
        toggleLoading();
        content.pageNumber = content.pageNumber+1;

        if(tab !== "filter")
            getArticles(content)
            .then(a=> setArticles([...articles, ...a]))
            .catch(err => { console.error(err);  content.pageNumber = content.pageNumber-1; });
        else
            getFilteredArticles(content)
            .then(a=> setArticles([...articles, ...a]))
            .catch(err => { console.error(err);  content.pageNumber = content.pageNumber-1; });

        disableLoading();
    }

    function getFilterConfig(filterObj) {
        setFilter(filterObj);
    }

    const [content,] = 
    useState(
        {
            pageNumber:1,
            tabKey: tab
        });

    useEffect(() => 
    {   
        if(content.tabKey!==tab)
           {
             content.tabKey = tab;
             content.pageNumber = 1;
             setArticles([]);
           }

        if(tab !== "filter")
            getArticles(content)
            .then(a=> setArticles(a))
            .then( () => markSelectedTab() )
            .catch(err =>{console.error(err)});
        else
            getFilteredArticles(content,filterResult)
            .then(a=> setArticles(a))
            .then( () => markSelectedTab() )
            .catch(err =>{console.error(err)});
    },[tab,filterResult])

    return(
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
                    {tab === "filter" && <Filter getFilterConfig={getFilterConfig}/>}
                    { articles !== undefined &&
                        <table className={style.contentTable}>
                            <tbody>
                                {articles.map((article) => (
                                <tr key={article.url} className={style.articleRow}>
                                    <td>
                                        {article.media ? <div className={style.articleImage} style={{background:`url(${article.media})`}}></div>
                                        : <div className={style.articleImage} style={{background:`url(https://thumbs.dreamstime.com/b/news-header-background-title-abstract-colorful-global-map-text-hightech-design-blue-colorful-template-90494676.jpg)`}}></div>}
                                        
                                        <div className="articleInfo">
                                            <a className={style.articleHeader} href={""+article.url} >{article.title}</a>
                                            <p>🕒{calcTimeAgo(article.published_date)} | 👨‍🎨{article.author}</p>
                                            <p className={style.articleDescription}>{article.excerpt}</p>
                                        </div>
                                        <div style={{display:"block"}}>
                                            <div className={style.articleControls}>
                                                <a href={""+article.link}className={style.articleControlsItem}>| 👁️View</a>
                                                <a className={style.articleControlsItem}>| 📑Check original</a>
                                                <a className={style.articleControlsItem}>| 💾Save</a>
                                                <a className={style.articleControlsItem}>| 🧡Like</a>
                                            </div>
                                        </div>                                
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                
                    {tab !== "hot" && tab !== "filter" && 
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