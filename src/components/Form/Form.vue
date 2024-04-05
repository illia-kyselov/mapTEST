<template>
  <div class="flex flex-auto items-center justify-center">
    <div class="w=1/2">
      <div
        class="bg-white shadow rounded p-4 mb-4 border border-gray-300 border-opacity-50"
      >
        <fieldset class="mb-4">
          <label for="layer" class="block font-bold mb-1">Обери об'єкт</label>
          <select
            id="layer"
            name="layer"
            v-model="selectedLayer"
            class="w-full border-2 border-gray-300 border-opacity-50 shadow-md p-1"
            @change="handleLayerChange"
          >
            <option value="markers">Маркери</option>
            <option value="polygons">Полігони</option>
            <option value="lines">Лінії</option>
          </select>
        </fieldset>
        <fieldset class="mb-4">
          <label class="block font-bold mb-1">Обери колір</label>
          <div id="swatches" class="flex flex-wrap gap-2">
            <button
              v-for="color in colors"
              :key="color"
              :style="{ backgroundColor: color }"
              @click="changeColor(color)"
              class="w-8 h-8 rounded-full focus:outline-none focus:shadow-outline hover:scale-110 transition duration-100"
            ></button>
          </div>
        </fieldset>
        <fieldset class="mb-4">
          <label for="default-range" class="block font-bold mb-1">
            Прозорість
          </label>
          <input
            id="default-range"
            type="range"
            value="50"
            v-model="opacityValue"
            min="0"
            max="100"
            @input="changeOpacity"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </fieldset>
        <button
          class="w-full bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-500"
          @click="exportGeometry"
        >
          Експортувати геометрію
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { colors } from "../../utils/formColors.js";

export default {
  name: "FormColorChange",
  data() {
    return {
      selectedLayer: "markers",
      colors: colors,
      opacityValues: {
        markers: 1,
        polygons: 1,
        lines: 1,
      },
    };
  },
  methods: {
    changeColor(color) {
      this.$emit("colorChanged", color);
    },
    changeOpacity() {
      const opacity = this.opacityValue / 100;
      this.$emit("opacityChanged", opacity);
    },
    handleLayerChange(event) {
      this.selectedLayer = event.target.value;
      this.$emit("selectedLayer", this.selectedLayer);
    },
    exportGeometry() {
      this.$emit("exportGeometry");
    },
  },
};
</script>
