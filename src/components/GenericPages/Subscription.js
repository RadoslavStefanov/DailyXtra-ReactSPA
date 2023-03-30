
import style from './AboutUs.module.css';
import { Col } from "react-bootstrap";

function Subscribe() {
  document.querySelectorAll("a.selected").forEach(a=>a.classList.remove("selected"));
  
  return (
    <Col md={6} style={{minHeight:"720px"}}>
    {
        <>
            <img className={style.headImg} src="/images/subscribe-banner.png"/>

            <div className={style.aboutUsDesc}>

                <p>Stay up-to-date with <strong>DailyXtra's</strong> free email subscription service. Sign up today to receive regular notifications of new articles, policy changes, and exclusive offers delivered straight to your inbox.</p>

                <p>At DailyXtra, we understand the importance of staying informed, and we're committed to making it easy for you to do so. By subscribing to our email service, you'll never miss out on breaking news, trending stories, or important updates from your favorite topics.</p>
                
                <p>Our email subscription service is completely free and can be canceled at any time. We respect your privacy, and we will never share your personal information with third parties. You can trust us to deliver timely and relevant news and information directly to you.</p>

                <p>In addition to keeping you informed, our email subscription service also gives you access to exclusive offers and promotions. From time to time, we'll send you special discounts, early access to events, and other perks that you won't find anywhere else.</p>

                <p>So why wait? Sign up for DailyXtra's email subscription service today and start enjoying the convenience of having the latest news and information delivered right to your inbox.</p>

            </div>
        </>
    }                        
    </Col>
  );
}

export default Subscribe;