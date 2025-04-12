import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";



function Map() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  const handleGetLocation = (e) => {
    e.preventDefault();

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
        });
        setError('');
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('User denied the request for Geolocation.');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Location information is unavailable.');
            break;
          case err.TIMEOUT:
            setError('The request to get user location timed out.');
            break;
          default:
            setError('An unknown error occurred.');
        }
      }
    );
  };

  return (
    <>
 <div style={styles.container}>
      <h2>Click the link to get your location</h2>
      <a href="#" onClick={handleGetLocation} style={styles.link}>
        📍 Get My Location
      </a>

      <div style={styles.output}>
        {location && (
          <>
            <p><strong>Latitude:</strong> {location.latitude}</p>
            <p><strong>Longitude:</strong> {location.longitude}</p>
          </>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
    </>
  );
  
};
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '40px',
    background: '#f0f4f8',
    minHeight: '100vh',
  },
  link: {
    display: 'inline-block',
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'background 0.3s',
  },
  output: {
    marginTop: '30px',
    fontSize: '18px',
    color: '#333',
  },
};

export default Map;