import { Route, Routes } from 'react-router-dom';
import ArticlesBrowser from './ArticlesBrowser';

function Main(key) {

  return (
    <Routes>
      <Route path="/" element={<ArticlesBrowser tab={"global"}/>}/>
      <Route path="/hot" element={<ArticlesBrowser tab={"hot"}/>}/>
      <Route path="/filter" element={<ArticlesBrowser tab={"filter"}/>}/>
      <Route path="/foryou" element={<ArticlesBrowser tab={"foryou"}/>}/>
    </Routes>
  );
}

export default Main;