import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const InputAndData = ({
  classData,
  isPassword,
  label,
  type,
  classDataName,
  name,
  ...props
}) => {
  const [showPass, setShowPass] = useState(false);
  function handleShowPass() {
    setShowPass((pre) => !pre);
  }
  return (
    <>
      {isPassword ? (
        <div className={classData}>
          <label htmlFor={name}>{label}</label>
          <br />
          <div className={classDataName}>
            <input
              type={showPass ? "text" : type}
              id={name}
              name={name}
              {...props}
            />
            {showPass ? (
              <FaEyeSlash
                className="absolute right-3 bottom-[13px] cursor-pointer"
                onClick={handleShowPass}
              />
            ) : (
              <FaEye
                className="absolute right-3 bottom-[13px] cursor-pointer"
                onClick={handleShowPass}
              />
            )}
          </div>
        </div>
      ) : (
        <div className={classData}>
          <label htmlFor={name}>{label}</label>
          <br />
          <input type={type} name={name} id={name} {...props} />
        </div>
      )}
    </>
  );
};

export default InputAndData;
