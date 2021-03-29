import React, {Children, useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai';
import {motion, AnimatePresence} from 'framer-motion';
import './slider.css';

/** Put any component or element inside Slider's tags and it wil render a Slide, the component is fully responsive
 * 
 * @example 
 * <Slider>
 *   <element1/>
 *   <element2/>
 *   <element3/>
 *   <element4/>
 * </Slider>
 * @copyright 2021 JOXPULP
 */
function Slider({children, autoPlay, size}) {
    const [hoverImage, setHoverImage] = useState(false);
    const [x, setX] = useState(0)
   
    const prevSlide = () => {
        setX(x === 0 ? -100*(Children.count(children)-1 ): x + 100)    
    }
    const nextSlide = () => {
       setX(x === -100*(Children.count(children)-1 )? 0: x - 100)    
    }
    

    const hoverStart = () => setHoverImage(true);
    const hoverEnd = () => setHoverImage(false);
  
    const childrenArray = Children.map(children, (child, index) => {
        return (<motion.div className="slider-content" style={{transform:`translateX(${x}%)`}} key={index}>{child}</motion.div>)
    });

    const autoPlayRef = useRef()

    useEffect(() => {
         autoPlayRef.current = nextSlide
      });

    useEffect(() => {
        const play = () => {
            autoPlayRef.current()
          }

          const interval = autoPlay !== undefined && !hoverImage && setInterval(play, autoPlay * 1000)
          return () => clearInterval(interval)
      }, [autoPlay, hoverImage])
   
    return (
        <motion.div style={{width:`${size}%`}} onHoverStart={hoverStart} onHoverEnd={hoverEnd} initial={{opacity: 0}} animate={{opacity: 1}} className="slider-container">
                <AnimatePresence>
                {hoverImage && 
                    <>
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="left-arrow"><AiOutlineLeft className="arrow-icons"  onClick={prevSlide}/></motion.div>
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="right-arrow"><AiOutlineRight className="arrow-icons" onClick={nextSlide}/></motion.div>
                    </>
                }
                </AnimatePresence>
            {childrenArray}
        </motion.div>
    )
}

Slider.propTypes = {
     /** This prop receives a number wich 
      * represents the duration 
      * in seconds until the
      * other element is showed
      * @example 
      * autoPlay={3} // The Slider waits 3 seconds to change to another element.
    */
    autoPlay: PropTypes.number,
    /** This prop receives a number that represents
     * the size of the Slider in %
     * @example
     * size={50} // Means that the width of the slider is set to 50% and the height is auto.
     */
    size: PropTypes.number,
}

export default Slider;
