export function exportGeometry(vm) {
  const geometry = vm.getGeometry();
  const filename = "geometry.geojson";

  const blob = new Blob([JSON.stringify(geometry)], {
    type: "application/json",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  link.click();
}

export function getGeometry(map, markers) {
  const geometry = {
    type: "GeometryCollection",
    features: [],
  };

  const allFeatures = map.queryRenderedFeatures();
  allFeatures.forEach((feature) => {
    geometry.features.push(feature.toJSON());
  });

  markers.forEach((marker) => {
    const feature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: marker.getLngLat().toArray(),
      },
      properties: {},
    };
    geometry.features.push(feature);
  });

  return geometry;
}
