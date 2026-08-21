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
}: {
  latitude?: number | null;
  longitude?: number | null;
  onPositionChange: (latitude: number, longitude: number) => void;
  onError: (message: string) => void;
}) {
  const mapElement = React.useRef<HTMLDivElement | null>(null);
  const map = React.useRef<LeafletMap | null>(null);
  const marker = React.useRef<LeafletMarker | null>(null);
  const onPositionChangeRef = React.useRef(onPositionChange);
  const onErrorRef = React.useRef(onError);
  const initialCenterRef = React.useRef({
    center: isValidCoordinate(latitude, longitude)
      ? ([latitude, longitude] as [number, number])
      : DEFAULT_CENTER,
    hasCoordinate: isValidCoordinate(latitude, longitude),
  });
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    onPositionChangeRef.current = onPositionChange;
    onErrorRef.current = onError;
  }, [onError, onPositionChange]);

  React.useEffect(() => {
    let isCancelled = false;

    if (!mapElement.current) {
      return;
    }

    const element = mapElement.current;
    const { center: initialCenter, hasCoordinate } = initialCenterRef.current;

    setIsLoading(true);

    void loadLeaflet()
      .then((leaflet) => {
        if (isCancelled) {
          return;
        }

        const nextMap = leaflet
          .map(element, { zoomControl: true })
          .setView(initialCenter, hasCoordinate ? 15 : DEFAULT_ZOOM);

        leaflet
          .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a>',
            maxZoom: 19,
          })
          .addTo(nextMap);

        const nextMarker = leaflet
          .marker(initialCenter, { draggable: true })
          .addTo(nextMap);

        const updatePosition = (position: MapLatLng) => {
          nextMarker.setLatLng([position.lat, position.lng]);
          onPositionChangeRef.current(position.lat, position.lng);
        };

        nextMap.on("click", (event) => updatePosition(event.latlng));
        nextMarker.on("dragend", () => updatePosition(nextMarker.getLatLng()));

        map.current = nextMap;
        marker.current = nextMarker;
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

    return () => {
      isCancelled = true;
      marker.current = null;
      map.current?.remove();
      map.current = null;
    };
  }, []);

  React.useEffect(() => {
    if (
      !map.current ||
      !marker.current ||
      !isValidCoordinate(latitude, longitude)
    ) {
      return;
    }

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return;
    }

    const position: [number, number] = [latitude, longitude];
    marker.current.setLatLng(position);
    map.current.setView(position, Math.max(map.current.getZoom(), 15));
  }, [latitude, longitude]);

  return (
    <div className="relative isolate z-0 overflow-hidden rounded-xl border border-border">
      <div
        ref={mapElement}
        className="h-64 w-full bg-surface-subtle"
        aria-label="Choose a location on the map"
      />
      {isLoading ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-surface/70 text-sm text-text-secondary">
          Loading map...
        </div>
      ) : null}
      <p className="bg-surface px-3 py-1.5 text-[10px] text-text-muted">
        Click or drag the pin to change the location.
      </p>
    </div>
  );
}
