import React from 'react';
import { useRouter } from "next/router"
import styles from "./HeroSection.module.scss";
import HeroSlide from "./HeroSlide";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};



const HeroSection = (props) => {
  const productsList = useRouter().locale === "en" ? props?.products?.en || [] : props?.products?.ar || [];
  return (
    <section id={"#homeHeroSection"} className={styles.hero}>
      <Carousel
        swipeable
        draggable
        showDots
        responsive={responsive}
        // means to render carousel on server-side.
        infinite={true}
        autoPlay
        autoPlaySpeed={500000}
        keyBoardControl={true}
        containerClass="carousel__container"
        renderDotsOutside
        arrows={true}
        containerClass={styles.containerClass}
        sliderClass={styles.sliderClass}
        itemClass={styles.itemClass}
        dotListClass={styles.dotListClass}
      >
        {
          productsList.reverse().map((product) => {
            return (
              <HeroSlide
                id={product.productId}
                key={product.productId}
                productImage={product.productImage}
                title={product.title}
                description={product.description}
              />
            )
          })
        }


      </Carousel>
    </section>
  );
};

export default HeroSection;