import { CiCircleCheck } from "react-icons/ci";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleMakeAlert } from "../../Store/Store";

const Alert = ({ className }) => {
  const message = useSelector((state) => state.Alert.alertMessage);
  const showAlert = useSelector((state) => state.Alert.showAlert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showAlert === true) {
      const timer = setTimeout(() => {
        dispatch(handleMakeAlert());
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [dispatch, showAlert]);

  return (
    <div
      className={`${className} success-alert transition-all ${
        showAlert ? "translate-x-0 " : "translate-x-[200%] "
      }`}
    >
      <p className="flex items-center gap-2">
        <CiCircleCheck size={24} />
        {message}
      </p>
    </div>
  );
};

export default Alert;

Alert.propTypes = {
  className: PropTypes.any,
};
