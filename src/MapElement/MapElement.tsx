import React from "react";

interface Props {
  mapElement: React.Ref<HTMLDivElement>;
}
const MapElement: React.FC<Props> = ({ mapElement }) => {
  return <div ref={mapElement} id="map"></div>;
};

export default MapElement;
