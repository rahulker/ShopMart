import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import UserEditInput from "../Custom/UserEditInput";
import Button from "../Custom/Button";
import { handleEditUser } from "../../constant/http";
import { handleUserData } from "../../Store/Store";
import DeleteModal from "../Custom/DeleteModal";
let buttonStyle = "flex items-center gap-2 w-[105px]";
const User = () => {
  const userData = useSelector((state) => state.userData.userDetail);
  const isLogin = useSelector((state) => state.isLogin);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userDetailsUpdate, setUserDetailsUpdate] = useState({
    email: userData.email,
    address: userData.address,
    phoneNum: userData.phoneNum,
    pass: userData.pass,
  });
  const [validation, setValidation] = useState({
    isEmailNotCorrect: false,
    isPhoneNumNotCorrect: false,
  });
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  });

  function handleChages(id, e) {
    setUserDetailsUpdate((state) => ({ ...state, [id]: e.target.value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (
      userDetailsUpdate.email.trim() === "" &&
      userDetailsUpdate.phoneNum.trim() === ""
    ) {
      setValidation(() => ({
        isEmailNotCorrect: true,
        isPhoneNumNotCorrect: true,
      }));
      return;
    }
    if (!userDetailsUpdate.email.includes("@")) {
      setValidation((state) => ({
        ...state,
        isEmailNotCorrect: true,
      }));
      return;
    }
    if (userDetailsUpdate.phoneNum.length < 8) {
      setValidation((state) => ({
        ...state,
        isPhoneNumNotCorrect: true,
      }));
      return;
    }
    let userDataToSend = {
      ...userDetailsUpdate,
      id: userData.id,
      name: userData.name,
    };
    handleEditUser(userDataToSend);
    dispatch(handleUserData(userDataToSend));
  }
  return (
    <section className="mt-10 flex items-center flex-col">
      {showDeleteModal && (
        <DeleteModal
          userId={userData.id}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
      <div className="flex items-center flex-col gap-1.5">
        <RxAvatar size={60} />
        <div>
          <h2 className="text-2xl font-semibold">Welcome, {userData.name}</h2>
        </div>
        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 items-center gap-2.5 sm:gap-10">
            <UserEditInput
              isEdit={isEdit}
              userData={userData.email}
              label="Email"
              type="email"
              value={userDetailsUpdate.email}
              onChange={(e) => handleChages("email", e)}
            />
            {validation.isEmailNotCorrect && (
              <p className="text-red-300 mt-1.5">
                {userDetailsUpdate.email.length == 0
                  ? "please enter email"
                  : "Please enter correct email"}
              </p>
            )}
            <UserEditInput
              isEdit={isEdit}
              userData={userData.phoneNum}
              label="Phone number"
              type="number"
              value={userDetailsUpdate.phoneNum}
              onChange={(e) => handleChages("phoneNum", e)}
            />
            {validation.isPhoneNumNotCorrect && (
              <p className="text-red-300 mt-1.5">
                {userDetailsUpdate.phoneNum.length == 0
                  ? "please enter phone number"
                  : "Please enter correct phone number"}
              </p>
            )}
          </div>
          <div className="sm:mt-4 mt-2.5">
            <label className="text-xl">Address</label>
            {isEdit ? (
              <textarea
                value={userDetailsUpdate.address}
                onChange={(e) => handleChages("address", e)}
                className="p-2 border-black border appearance-none mt-1  w-full rounded-md"
              />
            ) : (
              <p className="text-lg leading-5">{userData.address}</p>
            )}
          </div>
          <div className="mt-5 ">
            <div className="flex sm:justify-end justify-center sm:gap-4 gap-2 items-center">
              <Button
                text={isEdit ? "Submit" : [[<GoPencil key={1} />], "Edit"]}
                className={isEdit ? buttonStyle + " !w-auto" : buttonStyle}
                type={isEdit ? "submit" : undefined}
                onClick={() => setIsEdit((pre) => !pre)}
              />

              <Button
                text={
                  isEdit ? "Cancel" : [[<FaRegTrashAlt key={1} />], "Delete"]
                }
                className={isEdit ? buttonStyle + " !w-auto" : buttonStyle}
                type="button"
                onClick={() => {
                  isEdit ? setIsEdit(false) : setShowDeleteModal(true);
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default User;
