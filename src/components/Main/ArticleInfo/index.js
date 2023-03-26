import style from './ArticlesInfo.module.css';
import { Link, useParams } from "react-router-dom";
import DXACarousel from "../Carousel";

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
    </>);
}