import React, { useState } from 'react';
import './App.css';

function App() {
  // Usaremos un estado para saber si el usuario hizo clic en el botón
  const [isBlooming, setIsBlooming] = useState(false);

  if (!isBlooming) {
    return (
      <div className="container intro-screen">
        <h1>Para mi niña hermosa</h1>
        <p>En este mes de las flores amarillas, he cultivado algo especial para ti.</p>
        <p>¿Quieres verlo florecer?</p>
        <button onClick={() => setIsBlooming(true)}>
          Sí, quiero
        </button>
      </div>
    );
  }

  // Aquí es donde mostraremos el resto de la página más adelante
  return (
    <div className="container garden-screen">
      <h1>¡Nuestro Jardín Secreto!</h1>
      {/* Próximamente: Las otras secciones irán aquí */}
    </div>
  );
}

export default App;