import { CiCircleCheck } from "react-icons/ci";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleMakeAlert } from "../../Store/Store";
const Alert = ({ className }) => {
  const message = useSelector((state) => state.Alert.alertMessage);
  const dispacth = useDispatch();
  useEffect(() => {
    const time = setTimeout(() => {
      dispacth(handleMakeAlert());
    }, 3000);
    return () => {
      clearTimeout(time);
    };
  });
  return (
    <div className={`${className} success-alert`}>
      <p className="flex items-center gap-2">
        <CiCircleCheck size={24} />
        {message}
      </p>
    </div>
  );
};

export default Alert;

Alert.propTypes = {
  className: PropTypes.string,
};
