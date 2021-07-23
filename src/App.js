import React, { useState, useRef, useEffect } from "react";
import "ol/ol.css";
import "./App.css";
import { Map, View } from "ol";
import Projection from 'ol/proj/Projection';
import ImageWMS from "ol/source/ImageWMS";
import { Image as ImageLayer } from "ol/layer";

function App() {
  const [map, setMap] = useState();

  const mapElement = useRef();
  mapElement.current = map;
  const projection = new Projection({
    code: 'EPSG:3301',
    units: 'm'
  });
  
  useEffect(() => {
    if (!map) {
      const newMap = new Map({
        target: "map",
        layers: [
          new ImageLayer({
            source: new ImageWMS({
              url: "http://kaart.maaamet.ee/wms/alus?",
              params: {
                LAYERS: "MA-ALUS",
                VERSION: "1.1.1",
              },
            }),
          }),
        ],
        view: new View({
          center: [550000, 6520000],
          projection,
          zoom: 10,
        }),
      });
      setMap(newMap);
    }
  }, [setMap, projection]);

  return <div ref={mapElement} id="map"></div>;
}

export default App;
