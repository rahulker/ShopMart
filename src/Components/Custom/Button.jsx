import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const Button = forwardRef(
  ({ text, className, link, type, isLinks, id, otherLink, ...props }, ref) => {
    let commonCss = `py-3 text-center px-4 bg-black text-white hover:text-black hover:bg-white rounded-xl hover:drop-shadow-lg border border-black transition-all ${className}`;
    return (
      <>
        {isLinks ? (
          <NavLink
            to={otherLink ? link : `/product/${id}`}
            onClick={window.scrollTo(0, 0)}
            className={commonCss}
            {...props}
          >
            {text}
          </NavLink>
        ) : (
          <button ref={ref} className={commonCss} type={type} {...props}>
            {text}
          </button>
        )}
      </>
    );
  }
);

export default Button;

Button.propTypes = {
  text: PropTypes.any,
  className: PropTypes.string,
  type: PropTypes.string,
  isLinks: PropTypes.bool,
  id: PropTypes.number,
  otherLink: PropTypes.bool,
  link: PropTypes.string,
};
