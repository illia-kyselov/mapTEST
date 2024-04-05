import maplibregl from "maplibre-gl";

export function createMarkerPopup(marker, index) {
  const popupContent = document.createElement("div");
  popupContent.innerHTML = `
      <div class="p-2 bg-white">
        <h3 class="text-sm font-semibold">ID маркера: ${index}</h3>
      </div>
    `;

  const popup = new maplibregl.Popup({
    offset: 25,
    maxWidth: "none",
  }).setDOMContent(popupContent);

  marker.setPopup(popup);
}
