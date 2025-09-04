import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isBlooming, setIsBlooming] = useState(false);
  const [isFading, setIsFading] = useState(false);

  // Función para manejar el clic y la animación de salida
  const handleBloomClick = () => {
    setIsFading(true); // Inicia la animación de desvanecimiento
    setTimeout(() => {
      setIsBlooming(true); // Cambia al jardín después de que termine la animación
    }, 1000); // 1000ms = 1s, debe coincidir con la duración de la animación 'fadeOut'
  };
  
  // Generamos los pétalos para la animación de fondo
  const petals = Array.from({ length: 15 }).map((_, index) => (
    <div className="petal" key={index} style={{
      left: `${Math.random() * 100}vw`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${5 + Math.random() * 5}s`,
    }}></div>
  ));

  return (
    <div className="app-container">
      {/* Contenedor para la lluvia de pétalos de fondo */}
      <div className="petals-container">{petals}</div>
      
      {!isBlooming ? (
        <div className={`container intro-screen ${isFading ? 'fade-out' : 'fade-in'}`}>
          <h1 className="animate-item">Para mi niña hermosa</h1>
          <p className="animate-item" style={{ animationDelay: '0.5s' }}>
            En este mes de las flores amarillas, he cultivado algo especial para ti.
          </p>
          <p className="animate-item" style={{ animationDelay: '1s' }}>
            ¿Quieres verlo florecer?
          </p>
          <button 
            className="animate-item" 
            style={{ animationDelay: '1.5s' }} 
            onClick={handleBloomClick}
          >
            Sí, quiero
          </button>
        </div>
      ) : (
        <div className="container garden-screen fade-in">
          <h1 className="animate-item">¡Nuestro Jardín Secreto!</h1>
          <p className="animate-item" style={{ animationDelay: '0.5s' }}>
            Aquí florecerá nuestro amor.
          </p>
          {/* Próximamente: Las otras secciones irán aquí */}
        </div>
      )}
    </div>
  );
}

export default App;