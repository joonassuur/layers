import React, { useState, useRef, useEffect } from "react";
import "ol/ol.css";
import "./App.css";
import { Map, View, Overlay } from "ol";
import { get } from "ol/proj";
import { GeoJSON, WFS } from "ol/format";
import { Stroke, Style, Fill } from "ol/style";
import { toStringXY, toStringHDMS } from "ol/coordinate";
import { transform } from "ol/proj";
import { add } from "ol/coordinate";
import { Point, Polygon } from "ol/geom";
import {
  Image as ImageLayer,
  Tile as TileLayer,
  Vector as VectorLayer,
} from "ol/layer";
import {
  and as andFilter,
  equalTo as equalToFilter,
  like as likeFilter,
  or,
  intersects,
  within,
  contains,
} from "ol/format/filter";
import TileGrid from "ol/tilegrid/TileGrid";
import { bbox as bboxStrategy } from "ol/loadingstrategy";
import VectorSource from "ol/source/Vector";
import OSMXML from "ol/format/OSMXML";
import XYZ from "ol/source/XYZ";

function App() {
  const [map, setMap] = useState(undefined);
  const [popup, setPopup] = useState();

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
      fill: new Fill({
        color: "rgba(0, 0, 255, 1.0)",
      }),
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
      }),
    });
    mapObj.setTarget(mapElement.current);

    setMap(mapObj);
    return () => mapObj.setTarget(undefined);
  }, []);

  if (map) {
    map.on("click", (e) => {
      const coords = e.coordinate;
      const featureRequest = new WFS().writeGetFeature({
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

      fetch("https://gsavalik.envir.ee/geoserver/maaamet/ows", {
        method: "POST",
        body: new XMLSerializer().serializeToString(featureRequest),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          // const featureId = json.features[0].id
          // const checkIfFeatureExists = vector.getSource().getFeatures(featureId);
          map.removeLayer(vector);
          vectorSource.clear();
          const newFeature = new GeoJSON().readFeatures(json);
          vectorSource.addFeatures(newFeature);
          map.getView().fit(vectorSource.getExtent());
          map.addLayer(vector);

          const address = json.features[0].properties.l_aadress;
          const size = json.features[0].properties.pind_m2;
          const newPopup = new Overlay({
            element: document.getElementById('popup'),
            stopEvent: false,
          })
          newPopup.setPosition(e.coordinate);
          map.addOverlay(newPopup);
          setPopup({ address, size })

        });
    });
  }

  return (
    <>
      {
        <div id="popup">
          <div>{popup?.address}</div>
          <div>{popup?.size}</div>
        </div>
      }
      <div ref={mapElement} id="map"></div>
    </>
  );
}

export default App;
