import React from 'react';
import './form-input.scss';
const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="group">
      <input
        onChange={handleChange}
        className="form-input"
        required
        {...otherProps}
      />
      {label ? (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;