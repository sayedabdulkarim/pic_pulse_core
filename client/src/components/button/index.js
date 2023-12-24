import React from "react";
import Prototype from "prop-types";

const ButtonContained = ({ disabled, buttonName, children, loading }) => {
  return (
    <button
      disabled={disabled}
      className="btn mt-3 submit-btn"
      variant="primary"
      type="submit"
    >
      {loading ? children : buttonName}
    </button>
  );
};
ButtonContained.protoType = {
  disabled: Prototype.bool,
};
export default ButtonContained;
