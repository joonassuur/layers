import React, { useState, useRef, useEffect } from "react";
import { Map, View, Overlay } from "ol";
import { get } from "ol/proj";
import { GeoJSON, WFS } from "ol/format";
import { Stroke, Style, Fill } from "ol/style";
import { Point } from "ol/geom";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { or, intersects, within, contains } from "ol/format/filter";
import TileGrid from "ol/tilegrid/TileGrid";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";

import Popup from "./Popup/Popup";
import "ol/ol.css";
import "./App.scss";

function App() {
  const [map, setMap] = useState(undefined);
  const [popupData, setPopupData] = useState();

  const mapElement = useRef();

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

  useEffect(() => {
    const mapObj = new Map({
      layers: [layer, vector],
      view: new View({
        center: [550000, 6520000],
        projection,
        zoom: 9,
      }),
    });
    setMap(mapObj);
  }, []);

  useEffect(() => {
    const mapObj = new Map({
      layers: [layer, vector],
      view: new View({
        center: [550000, 6520000],
        projection,
        zoom: 9,
        minZoom: 9,
      }),
    });
    mapObj.setTarget(mapElement.current);

    setMap(mapObj);
    return () => mapObj.setTarget(undefined);
  }, []);

  const featureRequestObject = (coords) => {
    return new WFS().writeGetFeature({
      baseUrl: "https://gsavalik.envir.ee/geoserver/maaamet/ows?",
      featureNS: "maaamet",
      srsName: "EPSG:3301",
      featurePrefix: "maaamet",
      propertyNames: ["geom", "l_aadress", "pind_m2"],
      featureTypes: ["ky_kehtiv"],
      outputFormat: "application/json",
      filter: or(
        intersects("geom", new Point(coords)),
        within("geom", new Point(coords))
      ),
    });
  };

  const featureRequest = async (coords) => {
    try {
      const response = await fetch(
        "https://gsavalik.envir.ee/geoserver/maaamet/ows",
        {
          method: "POST",
          body: new XMLSerializer().serializeToString(
            featureRequestObject(coords)
          ),
        }
      );
      return response.json();
    } catch (err) {
      console.error(err);
    }
  };

  const createPopup = (json, coords) => {
    const newPopup = new Overlay({
      element: document.getElementById("popup"),
    });
    map.addOverlay(newPopup);
    const address = json.features[0].properties.l_aadress;
    const areaSize = json.features[0].properties.pind_m2;
    newPopup.setPosition(coords);
    setPopupData({ address, areaSize });
  };

  useEffect(() => {
    if (map) {
      map.on("click", async (event) => {
        const coords = event.coordinate;
        map.removeLayer(vector);
        vectorSource.clear();
        const json = await featureRequest(coords);
        const newFeature = new GeoJSON().readFeatures(json);
        if (newFeature.length) {
          vectorSource.addFeatures(newFeature);
          // zooms to vector:
          // map.getView().fit(vectorSource.getExtent());
          map.addLayer(vector);
          createPopup(json, coords);
        }
      });
    }
  }, [map]);

  return (
    <>
      <Popup data={popupData}></Popup>
      <div ref={mapElement} id="map"></div>
    </>
  );
}

export default App;
