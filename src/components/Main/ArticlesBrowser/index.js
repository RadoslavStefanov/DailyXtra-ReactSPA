import React, { useState, useEffect, useContext } from 'react';

import { Col } from "react-bootstrap";
import { getArticles, getFilteredArticles } from '../../../services/articlesGetter';
import calcTimeAgo from '../../../services/timeCalculator';

import style from './ArticlesBrowser.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { disableLoading, toggleLoading } from '../../../services/loadMoreBtnFuncs';
import Filter from '../Filter';
import { preventNotLogged } from '../../../services/usersService';
import { AuthContext } from '../../Contexts/AuthContext';


export default function ArticlesBrowser({tab})
{
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const { isUserLogged } = useContext(AuthContext);
    const [filterResult, setFilter] = useState(
        {
            keywords: null,
            country: '',
            language: null,
            sortOrder: '',
            isApplied: false
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

        if(tab === "filter")
        {
            getFilteredArticles(content)
            .then(a=> setArticles([...articles, ...a]))
            .catch(err => { console.error(err);  content.pageNumber = content.pageNumber-1; });
        }    
        else
        {
            getArticles(content)
            .then(a=> setArticles([...articles, ...a]))
            .catch(err => { console.error(err);  content.pageNumber = content.pageNumber-1; });
        }           

        disableLoading();
    }

    function getFilterConfig(filterObj) {
        filterObj.isApplied = true;
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
        preventNotLogged(tab, navigate);

        if(content.tabKey!==tab)
        {
            content.tabKey = tab;
            content.pageNumber = 1;
            setArticles([]);
        }

        markSelectedTab();

        if(tab !== "filter")
            getArticles(content)
            .then(a=> setArticles(a))
            .catch(err =>{console.error(err)});
        else if(filterResult.isApplied)
            getFilteredArticles(content,filterResult)
            .then(a=> setArticles(a))
            .catch(err =>{console.error(err)});

    },[tab,filterResult])

    return(
        <>           
            <Col md={6} style={{minHeight:"720px"}}>
            {tab === "filter" && <Filter getFilterConfig={getFilterConfig}/>}
            { articles !== undefined &&
                <table className={style.contentTable}>
                    <tbody>
                        {articles.map((article) => (
                        <tr key={article.uri} className={style.articleRow}>
                            <td>
                                {article.image ? <div className={style.articleImage} style={{background:`url(${article.image}) no-repeat center`}}></div>
                                : <div className={style.articleImage} style={{background:`url(https://sdgs.un.org/themes/custom/porto/assets/default-news350x170.png) no-repeat center`}}></div>}
                                
                                <div className="articleInfo">
                                    <Link className={style.articleHeader} to={`/article/${article.uri}`} >{article.title}</Link>
                                    <p>🕒{calcTimeAgo(article.dateTimePub)} {article.authors[0] &&  `| 👨‍🎨${article.authors[0].name}`}                                            
                                    </p>
                                    <p className={style.articleDescription}>{article.body.substring(0,100)+" ..."}</p>
                                </div>
                                <div style={{display:"block"}}>
                                    <div className={style.articleControls}>
                                        <Link to={`/article/${article.uri}`} className={style.articleControlsItem}>| 👁️View</Link>
                                        <a href={""+article.url} className={style.articleControlsItem}>| 📑Check original</a>
                                        {isUserLogged() ? 
                                            <>
                                                <a className={style.articleControlsItem}>| 📜Read later</a>
                                                <a className={style.articleControlsItem}>| 🧡Like</a>
                                            </>                                            
                                            :
                                            <>
                                                <a className={style.articleDisabledControlsItem}>| 📜Read later</a>
                                                <a className={style.articleDisabledControlsItem}>| 🧡Like</a>
                                            </>
                                        }
                                        
                                    </div>
                                </div>                                
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            }
        
            {tab !== "hot" && tab !== "filter" && articles.length > 0&& 
            <button id="loadMoreBtn" className={style.loadMoreBtn} onClick={() => LoadMore()}>LOAD MORE...</button>}

            {tab === "filter" && articles.length > 0 && filterResult.isApplied &&
            <button id="loadMoreBtn" className={style.loadMoreBtn} onClick={() => LoadMore()}>LOAD MORE...</button>}
            
            </Col>
        </>
    )
}