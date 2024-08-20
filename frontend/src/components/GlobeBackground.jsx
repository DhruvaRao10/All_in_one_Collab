import React from "react";
import Globe from "react-globe.gl";

const GlobeBackground = () => {
  const options = {
    ambientLightColor: "red",
    cameraAutoRotateSpeed: 0.1,
    enableCameraRotate: true,
    enableMarkerGlow: true,
    markerGlowCoefficient: 0.1,
  };

  const markers = [
    {
      id: "marker1",
      city: "New York",
      color: "red",
      coordinates: [40.7128, -74.006],
    },
    // Add more markers as needed
  ];

  return (
    <div style={{ height: "100vh" }}>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        markers={markers}
        options={options}
      />
    </div>
  );
};

export default GlobeBackground;
