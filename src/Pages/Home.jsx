import React from 'react'
import Hero from '../Components/Hero'
import Testimonial from '../Components/Testimonial'
import Carousel from '../Components/Carousel'
import Newsletter from '../Components/Newsletter'

const Home = () => {
  let slides = [
    "https://www.slashgear.com/img/gallery/5-tech-gadgets-that-will-help-the-visually-impaired/intro-1706643725.jpg",
    "https://t4.ftcdn.net/jpg/12/80/54/35/360_F_1280543557_iU1i9PKOFtbG5ZRnBnXKksIec7MbM1H2.jpg",
    "https://static.toiimg.com/thumb/msid-94073409,width-400,resizemode-4/94073409.jpg",
  ];
  
  return (
    <>
      <Hero/>
      <Carousel slides={slides} />
      <Testimonial/>
      <Newsletter/>
    </>

  )
}

export default Home
