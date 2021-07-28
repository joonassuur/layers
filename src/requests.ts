import { WFS } from "ol/format";
import { or, intersects, within } from "ol/format/filter";
import { Point } from "ol/geom";

const featureRequestObject = (coords: number[]) => {
  return new WFS().writeGetFeature({
    featureNS: "https://gsavalik.envir.ee/geoserver/maaamet/ows?",
    srsName: "EPSG:3301",
    featurePrefix: "maaamet",
    propertyNames: ["geom", "l_aadress", "pind_m2", "ay_nimi"],
    featureTypes: ["ky_kehtiv"],
    outputFormat: "application/json",
    filter: or(
      intersects("geom", new Point(coords)),
      within("geom", new Point(coords))
    ),
  });
};

const featureRequest = async (coords: number[]) => {
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

export default featureRequest;
