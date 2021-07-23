import React, { useState, useRef, useEffect } from "react";
import "ol/ol.css";
import "./App.css";
import { Map, View } from "ol";
import { get } from "ol/proj";
import GeoJSON from 'ol/format/GeoJSON';
import ImageWMS from "ol/source/ImageWMS";
import { Stroke, Style } from "ol/style";
import {
  Image as ImageLayer,
  Tile as TileLayer,
  Vector as VectorLayer,
} from "ol/layer";
import TileGrid from "ol/tilegrid/TileGrid";
import { bbox as bboxStrategy } from "ol/loadingstrategy";
import VectorSource from "ol/source/Vector";
import OSMXML from "ol/format/OSMXML";
import XYZ from "ol/source/XYZ";

function App() {
  const [map, setMap] = useState();

  const mapElement = useRef();
  mapElement.current = map;

  const projection = get("EPSG:3301");

  const vectorSource = new VectorSource({
    format: new GeoJSON({dataProjection: 'EPSG:3301'}),
    projection,
    url: function(extent) {
      return (
        "https://gsavalik.envir.ee/geoserver/maaamet/ows?" +
        "service=WFS&version=1.0.0&request=GetFeature&" +
        "typeName=ky_kehtiv&" +
        "featurePrefix=maaamet&" +
        "geometryPropertyName=geom&" +
        "maxfeatures=100" +
        extent.join(",") +
        ",EPSG:3301"
      );
    },
  });
  const vector = new VectorLayer({
    source: vectorSource,
    style: new Style({
      stroke: new Stroke({
        color: "rgba(0, 0, 255, 1.0)",
        width: 2,
      }),
    }),
  });
  const layer = new TileLayer({
    source: new XYZ({
      projection: 'EPSG:3301',
      url: "https://tiles.maaamet.ee/tm/tms/1.0.0/foto/{z}/{x}/{-y}.jpg&ASUTUS=MAAAMET&KESKKOND=LIVE&IS=XGIS",
      tileGrid: new TileGrid({
        extent: [40500, 5993000, 1064500, 7017000],
        minZoom: 3,
        resolutions: [
          4000, 2000, 1000, 500, 250, 125, 62.5, 31.25, 15.625, 7.8125,
          3.90625, 1.953125, 0.9765625, 0.48828125,
        ],
      }),
    }),

  });


  useEffect(() => {
    if (!map) {
      const newMap = new Map({
        target: "map",
        layers: [
          vector,
          layer,
        ],
        view: new View({
          center: [550000, 6520000],
          projection: 'EPSG:3301',
        }),
      });
      setMap(newMap);
    }
  }, [map, setMap, projection, vector, layer]);

  return <div ref={mapElement} id="map"></div>;
}

export default App;
