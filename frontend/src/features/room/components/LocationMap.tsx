"use client";

import * as React from "react";

type MapLatLng = {
  lat: number;
  lng: number;
};

type MapClickEvent = {
  latlng: MapLatLng;
};

type LeafletMap = {
  setView: (center: [number, number], zoom: number) => LeafletMap;
  getZoom: () => number;
  on: (event: string, handler: (event: MapClickEvent) => void) => LeafletMap;
  remove: () => void;
};

type LeafletMarker = {
  addTo: (map: LeafletMap) => LeafletMarker;
  setLatLng: (position: [number, number]) => LeafletMarker;
  getLatLng: () => MapLatLng;
  on: (event: string, handler: () => void) => LeafletMarker;
  remove: () => LeafletMarker;
  setOpacity: (opacity: number) => LeafletMarker;
  setZIndexOffset: (offset: number) => LeafletMarker;
};

type LeafletApi = {
  map: (
    element: HTMLElement,
    options?: { zoomControl?: boolean },
  ) => LeafletMap;
  tileLayer: (
    url: string,
    options: { attribution: string; maxZoom: number },
  ) => { addTo: (map: LeafletMap) => void };
  marker: (
    position: [number, number],
    options: { draggable: boolean },
  ) => LeafletMarker;
};

type LeafletWindow = Window & {
  L?: LeafletApi;
  __foodFightLeafletPromise?: Promise<LeafletApi>;
};

const DEFAULT_CENTER: [number, number] = [13.7563, 100.5018];
const DEFAULT_ZOOM = 12;

export interface LocationMapMarker {
  id: string;
  latitude?: number | null;
  longitude?: number | null;
  label?: string;
}

function isValidCoordinate(
  latitude?: number | null,
  longitude?: number | null,
) {
  return (
    typeof latitude === "number" &&
    Number.isFinite(latitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    typeof longitude === "number" &&
    Number.isFinite(longitude) &&
    longitude >= -180 &&
    longitude <= 180
  );
}

function loadLeaflet() {
  const leafletWindow = window as LeafletWindow;

  if (leafletWindow.L) {
    return Promise.resolve(leafletWindow.L);
  }

  if (leafletWindow.__foodFightLeafletPromise) {
    return leafletWindow.__foodFightLeafletPromise;
  }

  leafletWindow.__foodFightLeafletPromise = new Promise<LeafletApi>(
    (resolve, reject) => {
      const existingStylesheet = document.querySelector<HTMLLinkElement>(
        "link[data-foodfight-leaflet]",
      );

      if (!existingStylesheet) {
        const stylesheet = document.createElement("link");
        stylesheet.rel = "stylesheet";
        stylesheet.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        stylesheet.dataset.foodfightLeaflet = "true";
        document.head.appendChild(stylesheet);
      }

      const existingScript = document.querySelector<HTMLScriptElement>(
        "script[data-foodfight-leaflet]",
      );

      const resolveScript = () => {
        if (leafletWindow.L) {
          resolve(leafletWindow.L);
        } else {
          reject(new Error("Leaflet loaded without its map library."));
        }
      };

      if (existingScript) {
        existingScript.addEventListener("load", resolveScript, { once: true });
        existingScript.addEventListener(
          "error",
          () => reject(new Error("Leaflet could not be loaded.")),
          { once: true },
        );
        return;
      }

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.async = true;
      script.defer = true;
      script.dataset.foodfightLeaflet = "true";
      script.addEventListener("load", resolveScript, { once: true });
      script.addEventListener(
        "error",
        () => reject(new Error("Leaflet could not be loaded.")),
        { once: true },
      );
      document.head.appendChild(script);
    },
  );

  return leafletWindow.__foodFightLeafletPromise;
}

export function LocationMap({
  latitude,
  longitude,
  onPositionChange,
  onError,
  markers = [],
  selectedMarkerId = null,
  onMarkerSelect,
  readOnly = false,
}: {
  latitude?: number | null;
  longitude?: number | null;
  onPositionChange: (latitude: number, longitude: number) => void;
  onError: (message: string) => void;
  markers?: LocationMapMarker[];
  selectedMarkerId?: string | null;
  onMarkerSelect?: (markerId: string) => void;
  readOnly?: boolean;
}) {
  const mapElement = React.useRef<HTMLDivElement | null>(null);
  const map = React.useRef<LeafletMap | null>(null);
  const marker = React.useRef<LeafletMarker | null>(null);
  const leafletRef = React.useRef<LeafletApi | null>(null);
  const restaurantMarkers = React.useRef<Map<string, LeafletMarker>>(new Map());
  const onPositionChangeRef = React.useRef(onPositionChange);
  const onErrorRef = React.useRef(onError);
  const onMarkerSelectRef = React.useRef(onMarkerSelect);
  const markersRef = React.useRef(markers);
  const selectedMarkerIdRef = React.useRef(selectedMarkerId);
  const [initialMapState] = React.useState(() => {
    const hasCoordinate = isValidCoordinate(latitude, longitude);
    const firstMarkerWithCoordinate = markers.find((mapMarker) =>
      isValidCoordinate(mapMarker.latitude, mapMarker.longitude),
    );

    return {
      center: hasCoordinate
        ? ([latitude as number, longitude as number] as [number, number])
        : firstMarkerWithCoordinate
          ? ([
              firstMarkerWithCoordinate.latitude as number,
              firstMarkerWithCoordinate.longitude as number,
            ] as [number, number])
          : DEFAULT_CENTER,
      hasCoordinate: Boolean(hasCoordinate || firstMarkerWithCoordinate),
    };
  });
  const { center: initialCenter, hasCoordinate } = initialMapState;
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    onPositionChangeRef.current = onPositionChange;
    onErrorRef.current = onError;
    onMarkerSelectRef.current = onMarkerSelect;
    markersRef.current = markers;
    selectedMarkerIdRef.current = selectedMarkerId;
  }, [markers, onError, onMarkerSelect, onPositionChange, selectedMarkerId]);

  React.useEffect(() => {
    let isCancelled = false;

    if (!mapElement.current) {
      return;
    }

    const element = mapElement.current;
    setIsLoading(true);

    void loadLeaflet()
      .then((leaflet) => {
        if (isCancelled) {
          return;
        }

        const nextMap = leaflet
          .map(element, { zoomControl: true })
          .setView(
            initialCenter,
            readOnly ? (hasCoordinate ? 14 : DEFAULT_ZOOM) : hasCoordinate ? 15 : DEFAULT_ZOOM,
          );

        leaflet
          .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a>',
            maxZoom: 19,
          })
          .addTo(nextMap);

        if (readOnly) {
          markersRef.current
            .filter((mapMarker) =>
              isValidCoordinate(mapMarker.latitude, mapMarker.longitude),
            )
            .forEach((mapMarker) => {
              const nextMarker = leaflet
                .marker(
                  [mapMarker.latitude as number, mapMarker.longitude as number],
                  { draggable: false },
                )
                .addTo(nextMap);

              nextMarker.on("click", () => {
                onMarkerSelectRef.current?.(mapMarker.id);
              });
              restaurantMarkers.current.set(mapMarker.id, nextMarker);
            });
        } else {
          const nextMarker = leaflet
            .marker(initialCenter, { draggable: true })
            .addTo(nextMap);

          const updatePosition = (position: MapLatLng) => {
            nextMarker.setLatLng([position.lat, position.lng]);
            onPositionChangeRef.current(position.lat, position.lng);
          };

          nextMap.on("click", (event) => updatePosition(event.latlng));
          nextMarker.on("dragend", () => updatePosition(nextMarker.getLatLng()));
          marker.current = nextMarker;
        }

        map.current = nextMap;
        leafletRef.current = leaflet;
        restaurantMarkers.current.forEach((restaurantMarker, markerId) => {
          const isSelected = selectedMarkerIdRef.current === markerId;
          restaurantMarker
            .setOpacity(
              selectedMarkerIdRef.current && !isSelected ? 0.55 : 1,
            )
            .setZIndexOffset(isSelected ? 1000 : 0);
        });
        setIsLoading(false);
      })
      .catch(() => {
        if (!isCancelled) {
          setIsLoading(false);
          onErrorRef.current(
            "Map is unavailable right now. You can still search or enter a location manually.",
          );
        }
      });

    const markersToRemove = restaurantMarkers.current;
    return () => {
      isCancelled = true;
      markersToRemove.forEach((restaurantMarker) => restaurantMarker.remove());
      markersToRemove.clear();
      marker.current = null;
      map.current?.remove();
      map.current = null;
      leafletRef.current = null;
    };
  }, [hasCoordinate, initialCenter, readOnly]);

  React.useEffect(() => {
    if (!readOnly || !map.current || !leafletRef.current) {
      return;
    }

    const nextMarkers = markers.filter((mapMarker) =>
      isValidCoordinate(mapMarker.latitude, mapMarker.longitude),
    );
    const nextMarkerIds = new Set(nextMarkers.map((mapMarker) => mapMarker.id));

    restaurantMarkers.current.forEach((restaurantMarker, markerId) => {
      if (!nextMarkerIds.has(markerId)) {
        restaurantMarker.remove();
        restaurantMarkers.current.delete(markerId);
      }
    });

    nextMarkers.forEach((mapMarker) => {
      const position: [number, number] = [
        mapMarker.latitude as number,
        mapMarker.longitude as number,
      ];
      const existingMarker = restaurantMarkers.current.get(mapMarker.id);

      if (existingMarker) {
        existingMarker.setLatLng(position);
        return;
      }

      const nextMarker = leafletRef.current
        ?.marker(position, { draggable: false })
        .addTo(map.current as LeafletMap);

      if (nextMarker) {
        nextMarker.on("click", () => {
          onMarkerSelectRef.current?.(mapMarker.id);
        });
        restaurantMarkers.current.set(mapMarker.id, nextMarker);
      }
    });

    restaurantMarkers.current.forEach((restaurantMarker, markerId) => {
      const isSelected = selectedMarkerId === markerId;
      restaurantMarker
        .setOpacity(selectedMarkerId && !isSelected ? 0.55 : 1)
        .setZIndexOffset(isSelected ? 1000 : 0);
    });

    const selectedMarker = nextMarkers.find(
      (mapMarker) => mapMarker.id === selectedMarkerId,
    );
    const focusMarker = selectedMarker ?? nextMarkers[0];
    if (
      focusMarker &&
      isValidCoordinate(focusMarker.latitude, focusMarker.longitude)
    ) {
      map.current.setView(
        [focusMarker.latitude as number, focusMarker.longitude as number],
        Math.max(map.current.getZoom(), 14),
      );
    }
  }, [markers, readOnly, selectedMarkerId]);

  React.useEffect(() => {
    if (
      readOnly ||
      !map.current ||
      !marker.current ||
      !isValidCoordinate(latitude, longitude) ||
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      return;
    }

    const currentMap = map.current;
    const currentMarker = marker.current;
    const position: [number, number] = [latitude, longitude];
    currentMarker.setLatLng(position);
    currentMap.setView(position, Math.max(currentMap.getZoom(), 15));
  }, [latitude, longitude, readOnly]);

  return (
    <div className="relative isolate z-0 overflow-hidden rounded-xl border border-border">
      <div
        ref={mapElement}
        className="h-64 w-full bg-surface-subtle"
        aria-label={readOnly ? "Restaurant recommendations map" : "Choose a location on the map"}
      />
      {isLoading ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-surface/70 text-sm text-text-secondary">
          Loading map...
        </div>
      ) : null}
      <p className="bg-surface px-3 py-1.5 text-[10px] text-text-muted">
        {readOnly
          ? "เลือกการ์ดร้านอาหารเพื่อโฟกัสหมุดบนแผนที่"
          : "Click or drag the pin to change the location."}
      </p>
    </div>
  );
}
