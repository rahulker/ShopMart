import PropTypes from "prop-types";

const UserEditInput = ({ isEdit, userData, label, type, ...props }) => {
  return (
    <div>
      <label htmlFor={label} className="text-xl">
        {label}:
      </label>
      {isEdit ? (
        <input
          type={type}
          className="p-2 border-black border appearance-none mt-1  w-full rounded-md"
          id={label}
          name={label}
          {...props}
        />
      ) : (
        <p className="text-lg leading-5">{userData}</p>
      )}
    </div>
  );
};

export default UserEditInput;

UserEditInput.propTypes = {
  isEdit: PropTypes.bool,
  userData: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.any,
  value: PropTypes.any,
};
