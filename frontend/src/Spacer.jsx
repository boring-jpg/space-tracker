import {useState, useEffect} from "react";
import PropTypes from "prop-types";

function Spacer (props) {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
  }, []);

    return (screenWidth >= 767 ? <Spacer height={props.height} /> : "")
};

Spacer.propTypes = {
    height: PropTypes.string
}


export default Spacer;