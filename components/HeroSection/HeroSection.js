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


const products = [
  {imgName:"yg2",name:"Product 1 Name"},
  {imgName:"wg1",name:"Product 2 Name"},
  {imgName:"tl4",name:"Product 3 Name"},
  {imgName:"tm8",name:"Product 4 Name"},
  {imgName:"ts3",name:"Product 5 Name"},
  {imgName:"cc1",name:"Product 6 Name"},
  {imgName:"pc1",name:"Product 7 Name"},
  {imgName:"ic1",name:"Product 8 Name"},
  {imgName:"mu1",name:"Product 9 Name"},
];
const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <Carousel
        swipeable
        draggable
        showDots
        responsive={responsive}
         // means to render carousel on server-side.
        infinite={true}
        autoPlay
        autoPlaySpeed={5000}
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
          products.map((product, idx)=>{
            return(
              <HeroSlide
                key={idx}
                imgSrc={`/assets/products/${product.imgName}.jpg`}
                name={product.name}
                description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              />
            )
          })
        }
        
        
      </Carousel>
    </section>
  );
};

export default HeroSection;