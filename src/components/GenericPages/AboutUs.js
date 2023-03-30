
import style from './AboutUs.module.css';
import { Col } from "react-bootstrap";

function AboutUs() {
  return (
    <Col md={6} style={{minHeight:"720px"}}>
    {
        <>
            <img className={style.headImg} src="/images/aboutus-banner.png"/>

            <div className={style.aboutUsDesc}>
                <p>Welcome to <strong>DailyXtra</strong>, the premier news aggregator for all your daily needs. At DailyXtra, we strive to bring you the most relevant and up-to-date news from over 150,000 trusted news sources across the web.</p>

                <p>Our mission is to provide a streamlined, user-friendly experience that makes staying informed both effortless and enjoyable. With our carefully curated collection of articles, you can easily filter, save, share, and read through the latest news stories on a variety of topics, including politics, entertainment, business, sports, and more.</p>

                <p>We take great pride in the quality of our content, and our team of experienced editors works tirelessly to ensure that only the most accurate and trustworthy articles make it to our platform. We believe that informed citizens are essential to a healthy democracy, and we are dedicated to empowering our users with the knowledge they need to stay informed and engaged.</p>

                <p>At DailyXtra, we understand that everyone has different interests and preferences when it comes to news, which is why we offer a variety of customizations and personalizations to tailor your experience to your specific needs. Whether you're looking for breaking news alerts, curated article recommendations, or in-depth analysis, we've got you covered.</p>
            
                <p>We take pride in our reputation as one of the most popular and trusted news aggregation services on the web, and we are committed to maintaining the highest standards of excellence in everything we do. Thank you for choosing DailyXtra, and we hope you enjoy using our service as much as we enjoy providing it.</p>
            </div>
        </>
    }                        
    </Col>
  );
}

export default AboutUs;