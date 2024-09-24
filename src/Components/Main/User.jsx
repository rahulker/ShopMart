import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import UserEditInput from "../Custom/UserEditInput";
import Button from "../Custom/Button";
let buttonStyle = "flex items-center gap-2 w-[100px]";
const User = () => {
  const userData = useSelector((state) => state.userData.userDetail);
  const isLogin = useSelector((state) => state.isLogin);
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [userDetailsUpdate, setUserDetailsUpdate] = useState({
    email: userData.email,
    address: userData.address,
    phoneNum: userData.phoneNum,
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
  }
  function handleDeleteUser() {
    console.log("user Deleted");
  }
  function handleSendNewData() {
    console.log("hello word");
  }
  return (
    <section className="mt-10 flex items-center flex-col">
      <div className="flex items-center flex-col gap-1.5">
        <RxAvatar size={60} />
        <div>
          <h2 className="text-2xl font-semibold">Welcome, {userData.name}</h2>
        </div>
        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 items-center gap-10">
            <UserEditInput
              isEdit={isEdit}
              userData={userData.email}
              label="Email"
              type="email"
              value={userDetailsUpdate.email}
              onChange={(e) => handleChages("email", e)}
            />
            <UserEditInput
              isEdit={isEdit}
              userData={userData.phoneNum}
              label="Phone number"
              type="number"
              value={userDetailsUpdate.phoneNum}
              onChange={(e) => handleChages("phoneNum", e)}
            />
          </div>
          <div className="mt-4">
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
            <div className="flex justify-end gap-4 items-center">
              <Button
                text={isEdit ? "Submit" : [[<GoPencil key={1} />], "Edit"]}
                className={isEdit ? buttonStyle + " !w-auto" : buttonStyle}
                onClick={
                  isEdit
                    ? () => {
                        handleSendNewData;
                      }
                    : () => {
                        setIsEdit(true);
                      }
                }
              />
              <Button
                text={
                  isEdit ? "Cancel" : [[<FaRegTrashAlt key={1} />], "Delete"]
                }
                className={isEdit ? buttonStyle + " !w-auto" : buttonStyle}
                onClick={
                  isEdit
                    ? () => {
                        setIsEdit(false);
                      }
                    : () => {
                        handleDeleteUser;
                      }
                }
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default User;
