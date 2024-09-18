import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Button = ({ text, className, type, isLinks, id, ...props }) => {
  let commonCss = `py-3 text-center px-4 bg-black text-white hover:text-black hover:bg-white rounded-xl hover:drop-shadow-lg border border-black transition-all ${className}`;
  return (
    <>
      {isLinks ? (
        <NavLink
          to={`/product/${id}`}
          onClick={window.scrollTo(0, 0)}
          className={commonCss}
        >
          {text}
        </NavLink>
      ) : (
        <button className={commonCss} type={type} {...props}>
          {text}
        </button>
      )}
    </>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  isLinks: PropTypes.bool,
  id: PropTypes.number,
};
