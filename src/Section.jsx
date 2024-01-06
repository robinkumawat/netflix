import React from 'react';
// import Slider from 'react-slick'; 

const Section = () => {
  // Sample carousel data (you can replace this with your own data)
  const carouselData = [
    {
      id: 1,
      image: 'image1.jpg',
      caption: 'Image 1',
    },
    {
      id: 2,
      image: 'image2.jpg',
      caption: 'Image 2',
    },
    {
      id: 3,
      image: 'image3.jpg',
      caption: 'Image 3',
    },
  ];

  // Settings for the carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {carouselData.map((item) => (
          <div key={item.id} className="carousel-item">
            <img src={item.image} alt={item.caption} />
            <p className="caption">{item.caption}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Section;
