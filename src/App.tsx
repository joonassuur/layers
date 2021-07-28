import React, { useState, useRef, useEffect } from "react";
import { Map, View, Overlay } from "ol";
import { get } from "ol/proj";
import { GeoJSON } from "ol/format";
import { Stroke, Style } from "ol/style";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import TileGrid from "ol/tilegrid/TileGrid";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";

import featureRequest from "./requests";

import Popup from "./Popup/Popup";
import "ol/ol.css";
import "./App.scss";

const App: React.FC = () => {
  const initialPopupDataObj = {
    l_aadress: "",
    ay_nimi: "",
    pind_m2: "",
  };
  const map = new Map({});
  const [popupData, setPopupData] = useState(initialPopupDataObj || undefined);

  const mapElement = useRef<HTMLDivElement>(null);
  const projection = get("EPSG:3301");

  const vectorSource = new VectorSource();
  const vector = new VectorLayer({
    source: vectorSource,
    style: new Style({
      stroke: new Stroke({
        color: "rgba(0, 0, 255, 1.0)",
        width: 2,
      }),
      // fill: new Fill({
      //   color: "rgba(0, 0, 255, 1.0)",
      // }),
    }),
  });
  const layer = new TileLayer({
    source: new XYZ({
      projection: "EPSG:3301",
      url: "https://tiles.maaamet.ee/tm/tms/1.0.0/foto/{z}/{x}/{-y}.jpg&ASUTUS=MAAAMET&KESKKOND=LIVE&IS=XGIS",
      tileGrid: new TileGrid({
        extent: [40500, 5993000, 1064500, 7017000],
        minZoom: 3,
        resolutions: [
          4000, 2000, 1000, 500, 250, 125, 62.5, 31.25, 15.625, 7.8125, 3.90625,
          1.953125, 0.9765625, 0.48828125,
        ],
      }),
    }),
  });
  const view = new View({
    center: [550000, 6520000],
    projection,
    zoom: 9,
    minZoom: 9,
  });

  const modifyTooltip = (coords?: number[]) => {
    const newPopup = new Overlay({
      element: document.getElementById("popup") || undefined,
    });
    map.addOverlay(newPopup);
    if (coords) {
      newPopup.setPosition(coords);
    }
  };
  map.addLayer(layer);
  map.setView(view);
  
  const setMapTarget = () => {
    map.setTarget(mapElement.current || "");
    return () => map.setTarget("");
  };

  const useMountEffect = (fun: React.EffectCallback) => useEffect(fun, []);
  useMountEffect(setMapTarget);

  useEffect(() => {
    if (map) {
      map.on("click", async (event) => {
        const coords = event.coordinate;
        map.removeLayer(vector);
        vectorSource.clear();
        const response = await featureRequest(coords);
        const newFeature = new GeoJSON().readFeatures(response);
        if (newFeature.length) {
          const responseProps = response.features[0].properties;
          const { l_aadress, pind_m2, ay_nimi } = responseProps;
          setPopupData({ l_aadress, pind_m2, ay_nimi });
          vectorSource.addFeatures(newFeature);
          // zooms to vector:
          // map.getView().fit(vectorSource.getExtent());
          map.addLayer(vector);
          modifyTooltip(coords);
        } else {
          setPopupData(initialPopupDataObj);
          modifyTooltip();
        }
      });
    }
  });

  return (
    <>
      <Popup data={popupData}></Popup>
      <div ref={mapElement} id="map"></div>
    </>
  );
};

export default App;
