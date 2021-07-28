import React from "react";
import "./Popup.scss";

const Popup = ({ data }) => {
  return (
    <div id="popup">
      <div className="address-field">
        <div className="address-name">Aadress: </div>
        <div className="size-value">{data?.address}</div>
      </div>
      <div className="size-field">
        <div className="size-name">Pindala: </div>
        <div className="size-value">{data?.areaSize} m2</div>
      </div>
    </div>
  );
};

export default Popup;
