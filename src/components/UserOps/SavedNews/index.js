import React, { useState, useEffect, useContext } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import { calcTimeAgo } from '../../../services/Helper';
import { getSavedArticles } from '../../../services/articlesGetter';
import { removeSavedArticle } from '../../../services/usersService';

import style from './SavedNews.module.css';

export default function SavedNews() {
  const [articles, setArticles] = useState([]);
  const { isUserLogged } = useContext(AuthContext);
  const [selectedArticles, setSelectedArticles] = useState([]);

  useEffect(() => {
    getSavedArticles().then(res => setArticles(res));
  }, []);

  function removeArticle(id) {
    removeSavedArticle(id).then(() => {
      setArticles(prevArticles => prevArticles.filter(article => article.uri !== id));
      setSelectedArticles(prevSelectedArticles => prevSelectedArticles.filter(selectedId => selectedId !== id));
    });
  }

  function toggleSelected(id) {
    setSelectedArticles(prevSelectedArticles => {
      if (prevSelectedArticles.includes(id)) {
        return prevSelectedArticles.filter(selectedId => selectedId !== id);
      } else {
        return [...prevSelectedArticles, id];
      }
    });
  }

  return (
    <Col md={6} style={{ minHeight: '720px' }}>
      {articles.length > 0 ? (
        <>
          <img className={style.headImg} src="/images/page-banner.png" alt="page banner" />
          <div className={style.profileHeader}>
            <h1>"Read Later" Collection</h1>
          </div>
          <table className={style.contentTable}>
            <tbody>
              {articles.map(article => (
                <tr key={article.uri} className={`${style.articleRow} ${selectedArticles.includes(article.uri) ? style.selected : ''}`}>
                  <td>
                    {article.image ? (
                      <div className={style.articleImage} style={{ background: `url(${article.image}) no-repeat center` }}></div>
                    ) : (
                      <div className={style.articleImage} style={{ background: `url(https://sdgs.un.org/themes/custom/porto/assets/default-news350x170.png) no-repeat center` }}></div>
                    )}

                    <div className="articleInfo">
                      <Link className={style.articleHeader} to={`/article/${article.uri}`}>
                        {article.title}
                      </Link>
                      <p>
                        🕒{calcTimeAgo(article.dateTimePub)} {article.authors[0] && `| 👨‍🎨${article.authors[0].name}`}
                      </p>
                      <p className={style.articleDescription}>{article.body.substring(0, 100) + ' ...'}</p>
                    </div>
                    <div style={{ display: 'block' }}>
                      <div className={style.articleControls}>
                        <Link to={`/article/${article.uri}`} className={style.articleControlsItem}>
                          | 👁️View
                        </Link>
                        <a href={article.url} className={style.articleControlsItem}>
                          | 📑Check original
                        </a>
                        <a className={style.articleControlsItem} onClick={() => removeArticle(article.uri)}>
                          | ❌Remove
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className={style.errorDiv}>
            <img src="/images/missingSavedNews.png" alt="Missing articles!" />
            <strong>Your "Saved articles" collections is empty!!</strong>
            <p>To fill up your collection click on the <strong className={style.pageExample}>📜 Read later</strong> button under any article. 😊</p>
        </div>
        )}
    </Col>
    )
}