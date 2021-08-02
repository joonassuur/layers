import React, { useState, useRef, useEffect, useMemo } from "react";
import { Map, View, Overlay } from "ol";
import { get } from "ol/proj";
import { GeoJSON } from "ol/format";
import { Stroke, Style } from "ol/style";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import TileGrid from "ol/tilegrid/TileGrid";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import ImageWMS from "ol/source/ImageWMS";
import { Image as ImageLayer } from "ol/layer";

import featureRequest from "./requests";

import Popup from "./Popup/Popup";
import MapElement from "./MapElement/MapElement";

import "ol/ol.css";
import "./App.scss";

const App: React.FC = () => {
  const initialPopupDataObj = {
    l_aadress: "",
    ay_nimi: "",
    pind_m2: "",
  };
  const [map] = useState(new Map({}));
  const [coords, setCoords] = useState<number[]>([]);
  const [popupData, setPopupData] = useState(initialPopupDataObj || undefined);

  const mapElement = useRef<HTMLDivElement>(null);
  const projection = get("EPSG:3301");

  const vectorSource = useMemo(() => new VectorSource(), []);
  const vector = useMemo(
    () =>
      new VectorLayer({
        source: vectorSource,
        style: new Style({
          stroke: new Stroke({
            color: "rgba(0, 0, 255, 1.0)",
            width: 2,
          }),
        }),
        zIndex: 1,
      }),
    [vectorSource]
  );
  const view = new View({
    center: [550000, 6520000],
    projection,
    zoom: 9,
    extent: [305744, 6323471.339593588, 805744, 6716528.660406412],
    minZoom: 9,
  });
  const tileLayer = new TileLayer({
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
  const imageLayer = new ImageLayer({
    source: new ImageWMS({
      url: "http://kaart.maaamet.ee/wms/alus?",
      params: {
        LAYERS: "MA-ALUS",
        VERSION: "1.1.1",
      },
    }),
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

  const initMap = () => {
    map.setTarget(mapElement.current || "");
    map.addLayer(tileLayer);
    map.setView(view);
    return () => map.setTarget("");
  };

  const removeLayers = () => {
    const layers = [...map.getLayers().getArray()];
    layers.forEach((layer) => {
      if (layer.constructor.name !== "VectorLayer") {
        map.removeLayer(layer);
      }
    });
  };

  const activateLayer = (
    layer: ImageLayer<ImageWMS> | TileLayer<XYZ>
  ): void => {
    removeLayers();
    map.addLayer(layer);
  };

  const useMountEffect = (fun: React.EffectCallback) => useEffect(fun, []);
  useMountEffect(initMap);

  useEffect(() => {
    map.on("click", async (event) => {
      setCoords(event.coordinate);
      map.removeLayer(vector);
      vectorSource.clear();
    });
  }, [map, setCoords, vector, vectorSource]);

  const handleMapClick = async () => {
    setCoords([])
    if (coords.length) {
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
    }
  };

  return (
    <>
      <div className="button-overlay">
        <button onClick={() => activateLayer(imageLayer)}>image layer</button>
        <button onClick={() => activateLayer(tileLayer)}>tile layer</button>
      </div>
      <Popup data={popupData}></Popup>
      <MapElement
        mapElement={mapElement}
        mapClick={() => handleMapClick()}
      ></MapElement>
    </>
  );
};

export default App;
