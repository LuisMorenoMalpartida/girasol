import React, { useState, useRef } from 'react';
import './App.css';

// --- Datos para las secciones ---
// Personaliza estos datos con tus propios recuerdos, fotos y mensajes.
const memories = [
  { id: 1, title: "El día que nos vimos por primera vez", date: " 22 de Julio", message: "Ese día supe que contigo cualquier lugar se convierte en el paraíso. Tu sonrisa iluminó todo.", imageUrl: "https://placehold.co/400x500/FFC107/5D4037?text=Nuestra+Foto+1", position: { top: '25%', left: '15%' }, icon: '😳' },
  { id: 2, title: "Aniversario", date: "03 de cada mes", message: "Cada día a tu lado es un regalo. Gracias por tanto amor y alegría.", imageUrl: "https://placehold.co/400x500/F06292/FFFFFF?text=Nuestra+Foto+2", position: { top: '50%', left: '80%' }, icon: '💖' },
  { id: 3, title: "Esa salida Inolvidable", date: "03 de Agosto", message: "Entre risas y el tour, me di cuenta de que no quería pasar un día sin ti.", imageUrl: "https://placehold.co/400x500/8D6E63/FFFFFF?text=Nuestra+Foto+3", position: { top: '75%', left: '30%' }, icon: '🚌' },
  { id: 4, title: "Jugando y hablando por llamadas", date: "Cualquier día", message: "Pasar tiempo contigo es lo mejor que puedo hacer en mi dia", imageUrl: "https://placehold.co/400x500/3F51B5/FFFFFF?text=Nuestra+Foto+4", position: { top: '15%', left: '70%' }, icon: '✨' },
];

const supportMessages = [
  "¡Confío totalmente en ti!",
  "Todo tu esfuerzo va a valer la pena.",
  "Eres más inteligente y fuerte de lo que crees.",
  "Visualiza tu éxito. Yo ya lo estoy haciendo.",
  "No olvides descansar. ¡Tu bienestar es lo más importante!",
  "Estoy muy orgulloso de ti, pase lo que pase."
];


// --- Componente Tarjeta de Recuerdo (Modal) ---
const MemoryCard = ({ memory, onClose }) => {
  if (!memory) return null;
  return (
    <div className="memory-card-overlay" onClick={onClose}>
      <div className="memory-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>{memory.title}</h2>
        <p className="date">{memory.date}</p>
        <img src={memory.imageUrl} alt={memory.title} />
        <p>{memory.message}</p>
      </div>
    </div>
  );
};


// --- Componente Principal ---
function App() {
  const [isBlooming, setIsBlooming] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [activeMemory, setActiveMemory] = useState(null);
  const [bridgeMessage, setBridgeMessage] = useState("Pasa el mouse sobre el camino...");
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  const handleBloomClick = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsBlooming(true);
    }, 1000);
  };
  
  const handleFlowerClick = (memory) => {
    setActiveMemory(memory);
  };

  const handleCloseCard = () => {
    setActiveMemory(null);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const petals = Array.from({ length: 20 }).map((_, index) => (
    <div className="petal" key={index} style={{
      left: `${Math.random() * 100}vw`,
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${8 + Math.random() * 7}s`,
    }}></div>
  ));

  return (
    <>
      {/* Añade tu archivo de música en la carpeta 'public' y cambia el nombre aquí */}
      <audio ref={audioRef} src="/musica-fondo.mp3" loop />
      <button className="music-toggle" onClick={toggleMusic}>
        {isPlaying ? '暂停' : '▶️'}
      </button>

      <div className="app-container">
        <div className="petals-container">{petals}</div>
        
        {!isBlooming ? (
          <div className={`container intro-screen ${isFading ? 'fade-out' : ''}`}>
            <h1 className="animate-item">Para mi niña hermosa</h1>
            <p className="animate-item" style={{ animationDelay: '0.5s' }}>
              En este mes de las flores amarillas, he cultivado algo especial para ti.
            </p>
            <p className="animate-item" style={{ animationDelay: '1s' }}>
              ¿Quieres verlo florecer?
            </p>
            <button onClick={handleBloomClick}>
              Sí, quiero
            </button>
          </div>
        ) : (
          <main className="main-content">
            {/* --- Sección 1: Jardín de Recuerdos --- */}
            <section className="container garden-container">
              <h1>¡Nuestro Jardín Secreto!</h1>
              <p>Cada flor es un recuerdo. Haz clic en ellas para revivir la magia.</p>
              {memories.map(memory => (
                <div 
                  className="flower" 
                  key={memory.id}
                  style={{ top: memory.position.top, left: memory.position.left, animationDelay: `${Math.random()*2}s`}}
                  onClick={() => handleFlowerClick(memory)}
                >
                  {memory.icon}
                </div>
              ))}
              <div className="scroll-indicator">
                <p>Desliza para ver más</p>
                <span>↓</span>
              </div>
            </section>

            {/* --- Sección 2: Puente de Girasoles --- */}
            <section className="container bridge-container">
                <h2>Un Puente Para Nosotros</h2>
                <p>Aunque la distancia nos separe, mi corazón siempre está contigo.</p>
                <div className="bridge-content" onMouseLeave={() => setBridgeMessage("Te envío un abrazo gigante...")}>
                    <div className="location-dot">🏠</div>
                    <div 
                      className="bridge-path" 
                      onMouseEnter={() => setBridgeMessage("Contando los días para verte...")}
                    ></div>
                    <p className="bridge-message">{bridgeMessage}</p>
                    <div className="location-dot">❤️</div>
                </div>
            </section>
            
            {/* --- Sección 3: Caja de Ánimo --- */}
            <section className="container support-box-container">
                <h2>Una Caja de Apoyo Incondicional</h2>
                <p>Para esos momentos en que necesites un empujón. ¡Ábrela!</p>
                <div 
                  className={`support-box ${isBoxOpen ? 'open' : ''}`}
                  onClick={() => setIsBoxOpen(true)}
                >
                  {isBoxOpen ? '🗃️' : '📦'}
                </div>
                {isBoxOpen && (
                    <div className="seed-container">
                        {supportMessages.map((msg, index) => (
                            <div 
                                className="seed" 
                                key={index} 
                                style={{ 
                                    animation: `fly-out 1s ease-out ${index * 0.1}s forwards`,
                                    '--transform-end': `translate(${(Math.random() - 0.5) * 600}px, ${(Math.random() - 0.5) * 400}px)`,
                                    width: `${20 + Math.random() * 15}px`,
                                    height: `${20 + Math.random() * 15}px`,
                                }}
                            >
                                <span className="tooltip">{msg}</span>
                            </div>
                        ))}
                    </div>
                )}
            </section>
          </main>
        )}
      </div>

      <MemoryCard memory={activeMemory} onClose={handleCloseCard} />
    </>
  );
}

export default App;

