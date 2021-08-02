import React from "react";
import "./MapElement.scss";

interface Props {
  mapElement: React.Ref<HTMLDivElement>;
  isLoading: boolean;
  mapClick: React.MouseEventHandler<HTMLDivElement>;
}
const MapElement: React.FC<Props> = ({ mapElement, mapClick, isLoading }) => {
  return (
    <>
      {isLoading && <div className="loader">loading...</div>}
      <div ref={mapElement} id="map" onClick={mapClick}></div>
    </>
  );
};

export default MapElement;
