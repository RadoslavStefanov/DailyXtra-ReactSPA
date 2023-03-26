import Carousel from 'react-bootstrap/Carousel';

export default function DXACarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/banners/Banner1.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/banners/Banner2.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/banners/Banner3.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}