export function handleColorChanged(color, layer, map) {
  let markerElements;

  switch (layer) {
    case "polygons":
      map.setPaintProperty("random-polygons", "fill-color", color);
      break;
    case "markers":
      markerElements = document.querySelectorAll(".maplibregl-marker");
      markerElements.forEach((marker) => {
        const pathElement = marker.querySelector("g path");
        if (pathElement) {
          pathElement.setAttribute("fill", color);
        }
      });
      break;
    case "lines":
      map.setPaintProperty("route", "line-color", color);
      break;
    default:
      console.error("Unknown layer:", layer);
      break;
  }
}

export function handleOpacityChanged(opacity, layer, map) {
  let markerElements;

  switch (layer) {
    case "polygons":
      map.setPaintProperty("random-polygons", "fill-opacity", opacity);
      break;
    case "markers":
      markerElements = document.querySelectorAll(".maplibregl-marker");
      markerElements.forEach((marker) => {
        const pathElement = marker.querySelector("g");
        if (pathElement) {
          pathElement.setAttribute("fill-opacity", opacity);
        }
      });
      break;
    case "lines":
      map.setPaintProperty("route", "line-opacity", opacity);
      break;
    default:
      console.error("Unknown layer:", layer);
      break;
  }
}

export function handleLayerChange(layer, vm) {
  vm.layer = layer;
}