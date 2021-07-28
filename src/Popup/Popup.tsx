import React from "react";
import "./Popup.scss";

interface DataObj {
  l_aadress?: string;
  ay_nimi?: string;
  pind_m2?: string;
}
interface Props {
  data: DataObj;
}

const Popup: React.FC<Props> = ({ data }) => {
  return (
    <div id="popup">
      <div className="address-field">
        <div className="address-name">{data?.l_aadress && "Aadress:"}</div>
        <div className="address-value">
          <div>{data?.l_aadress}</div>
          <div>{data?.ay_nimi}</div>
        </div>
      </div>
      <div className="size-field">
        <div className="size-name">{data?.pind_m2 && "Pindala:"}</div>
        <div className="size-value">
          {data?.pind_m2 && `${data?.pind_m2} m2`}
        </div>
      </div>
    </div>
  );
};

export default Popup;
