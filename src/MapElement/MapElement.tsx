import React from "react";

interface Props {
  mapElement: React.Ref<HTMLDivElement>;
  mapClick: React.MouseEventHandler<HTMLDivElement>;
}
const MapElement: React.FC<Props> = ({ mapElement, mapClick }) => {
  return <div ref={mapElement} id="map" onClick={mapClick}></div>;
};

export default MapElement;
