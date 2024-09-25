import Button from "./Button";
import PropTypes from "prop-types";
import { handleUserDelete } from "../../constant/http.js";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../Store/Store.js";
import { useNavigate } from "react-router";
const DeleteModal = ({ userId, setShowDeleteModal }) => {
  let buttonStyle = "flex items-center gap-2 w-[80px] justify-center";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleDeleteAndSendUser(id) {
    handleUserDelete(id);
    dispatch(handleLogin());
    navigate("/");
  }
  return (
    <div className="modal__backdrop flex flex-col justify-center items-center">
      <div className="modal__container">
        <h2 className="capitalize text-2xl leading-8">are you sure?</h2>
        <p className="text-lg mt-2">
          Are you sure, You want to do this action. Once it is done then it can
          {"'"}t be reverted
        </p>
        <div className="flex justify-end gap-4 items-center mt-4">
          <Button
            text="Yes"
            className={buttonStyle}
            onClick={() => handleDeleteAndSendUser(userId)}
          />
          <Button
            text="Cancel"
            className={buttonStyle}
            onClick={() => setShowDeleteModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

DeleteModal.propTypes = {
  userId: PropTypes.number,
  setShowDeleteModal: PropTypes.func,
};
