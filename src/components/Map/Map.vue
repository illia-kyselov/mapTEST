<template>
  <link
    rel="stylesheet"
    href="https://unpkg.com/maplibre-gl@4.1.2/dist/maplibre-gl.css"
  />

  <div class="flex align-center justify-space">
    <div id="map" class="map w-1/2"></div>
    <Form
      @colorChanged="handleColorChanged"
      @opacityChanged="handleOpacityChanged"
      @selectedLayer="handleLayerChange"
      @exportGeometry="exportGeometry"
    />
  </div>
</template>

<script>
import maplibregl from "maplibre-gl";
import * as turf from "@turf/turf";
import Form from "../Form/Form.vue";
import {
  handleColorChanged,
  handleOpacityChanged,
  handleLayerChange,
} from "../../helpers/eventHandlers.js";
import { exportGeometry, getGeometry } from "../../helpers/geoExport.js";
import mapSettings from "../../utils/mapSettings.js";
import { createMarkerPopup } from "../../utils/createMarkerPopup.js";
import lineCoords  from "../../data/linesCoords.json";

export default {
  name: "MapView",
  props: {
    msg: String,
  },
  components: {
    Form,
  },
  data() {
    return {
      map: null,
      markers: [],
      selectedColor: "",
      layer: "markers",
      geometry: {
        type: "GeometryCollection",
        features: [],
      },
    };
  },

  mounted() {
    const map = new maplibregl.Map({ ...mapSettings });
    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: lineCoords.coordinates,
          },
        },
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#1a1a1a",
          "line-width": 8,
        },
      });

      const bbox = [29.465332, 50.317408, 30.981445, 51.275662];
      const points = turf.randomPoint(100, { bbox });
      const polygons = turf.randomPolygon(1, { bbox });

      points.features.forEach((point, index) => {
        const marker = new maplibregl.Marker()
          .setLngLat(point.geometry.coordinates)
          .addTo(map);
        createMarkerPopup(marker, index);
        this.markers.push(marker);
      });

      map.addSource("random-polygons", {
        type: "geojson",
        data: polygons,
      });

      map.addLayer({
        id: "random-polygons",
        type: "fill",
        source: "random-polygons",
        paint: {
          "fill-color": this.selectedColor || "#1a1a1a",
          "fill-opacity": 0.5,
        },
      });
    });

    this.map = map;
  },

  methods: {
    handleColorChanged(color) {
      handleColorChanged(color, this.layer, this.map);
    },
    handleOpacityChanged(opacity) {
      handleOpacityChanged(opacity, this.layer, this.map);
    },
    handleLayerChange(layer) {
      handleLayerChange(layer, this);
    },
    exportGeometry() {
      exportGeometry(this);
    },
    getGeometry() {
      return getGeometry(this.map, this.markers);
    },
  },
};
</script>

<style scoped>
.map {
  height: calc(100vh - 50px);
}
</style>
