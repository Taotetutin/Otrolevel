
import React, { useState, useEffect, useCallback, createContext, useContext, useRef } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserProfile, UserProfileContextType, Quiz, QuizQuestion, AppView } from './types';
import { QUIZZES_DATA, USER_PROFILE_KEY, INITIAL_USER_PROFILE, APP_NAME, SPEAKER_OFF_ICON_PATH, SPEAKER_ON_ICON_PATH } from './constants';
import { HomePageView, QuizListView, QuizTakingView, ProfileView } from './components/PageViews';
import { Navbar, Footer, FloatingHomeButton } from './components/SharedUI';

// User Profile Context
const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const useUserProfile = (): UserProfileContextType => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem(USER_PROFILE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_USER_PROFILE;
    } catch (error) {
      console.error("Error parsing user profile from localStorage:", error);
      return INITIAL_USER_PROFILE;
    }
  });

  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true); // Start muted

  useEffect(() => {
    // CRÍTICO: Se ha reemplazado la URL placeholder con la proporcionada por el usuario.
    console.log('Creando instancia de Audio. Si esto se repite mucho, hay un problema.');
    audioRef.current = new Audio("https://res.cloudinary.com/dyxvur3js/video/upload/v1750020168/Cancio%CC%81n_de_la_dulce_espera_p6v2lc.mp3"); 
    audioRef.current.loop = true;
    console.log('Audio source set to:', audioRef.current.src);
  }, []); // El array vacío [] asegura que esto se ejecute solo una vez al montar.

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      console.log('Estado de isMuted cambiado a:', isMuted, 'Aplicado a audio.muted.');
      if (!isMuted) {
        console.log("Intentando reproducir audio. Fuente:", audioRef.current?.src);
        // Intentar reproducir. Los navegadores pueden bloquear esto hasta una interacción del usuario.
        audioRef.current.play()
          .then(() => {
            console.log("Reproducción de audio iniciada exitosamente.");
          })
          .catch(error => {
            console.error("Fallo al reproducir audio:", error);
            console.warn("La reproducción de audio fue prevenida. Esto sucede a menudo por políticas de autoplay del navegador. Se requiere interacción del usuario (como clic en el botón de desilenciar). También verifica que la URL del audio sea válida y accesible.");
          });
      } else {
        audioRef.current.pause(); // Pausar explícitamente cuando se silencia.
        console.log("Audio pausado (silenciado).");
      }
    } else {
        console.warn("audioRef.current es null en el efecto de isMuted. Esto no debería pasar si el efecto de inicialización funcionó.");
    }
  }, [isMuted]); // Este efecto se ejecuta cuando isMuted cambia.

  const toggleMute = useCallback(() => {
    console.log("toggleMute llamado. Estado actual de isMuted:", isMuted, "El nuevo estado será:", !isMuted);
    setIsMuted(prev => !prev);
  }, [isMuted]); // isMuted es dependencia para que el log sea correcto.


  useEffect(() => {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(userProfile));
  }, [userProfile]);

  const addXp = useCallback((points: number) => {
    setUserProfile(p => ({ ...p, xp: p.xp + points }));
  }, []);

  const markQuizCompleted = useCallback((quizId: string) => {
    setUserProfile(p => ({
      ...p,
      completedQuizIds: Array.from(new Set([...p.completedQuizIds, quizId])),
    }));
  }, []);
  
  const updateName = useCallback((name: string) => {
    setUserProfile(p => ({ ...p, name: name || INITIAL_USER_PROFILE.name }));
  }, []);

  const contextValue = { userProfile, addXp, markQuizCompleted, updateName };

  return (
    <UserProfileContext.Provider value={contextValue}>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-700">
        <Navbar isMuted={isMuted} toggleMute={toggleMute} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePageView />} />
            <Route path="/quizzes" element={<QuizListView quizzes={QUIZZES_DATA} />} />
            <Route path="/quiz/:quizId" element={<QuizTakingView quizzes={QUIZZES_DATA} />} />
            <Route path="/perfil" element={<ProfileView />} />
          </Routes>
        </main>
        {location.pathname !== '/' && <FloatingHomeButton />}
        <Footer />
      </div>
    </UserProfileContext.Provider>
  );
};

export default App;
