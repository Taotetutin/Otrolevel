
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

// Wrapper para QuizTakingView para forzar el remontado con una key
const QuizTakingViewWrapper: React.FC<{ quizzes: Quiz[] }> = ({ quizzes }) => {
  const { quizId } = useParams<{ quizId: string }>();
  // La key es esencial aquí para asegurar que QuizTakingView se remonte
  // cuando quizId cambie, reseteando su estado interno.
  return <QuizTakingView key={quizId} quizzes={quizzes} />;
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
  const [isMuted, setIsMuted] = useState(true); // Comienza silenciado por defecto

  useEffect(() => {
    console.log('Creando instancia de Audio. Esto debería ejecutarse solo una vez al montar App.');
    if (!audioRef.current) { // Solo crea una nueva instancia si no existe
        audioRef.current = new Audio("https://res.cloudinary.com/dyxvur3js/video/upload/v1750020168/Cancio%CC%81n_de_la_dulce_espera_p6v2lc.mp3");
        audioRef.current.loop = true;
        console.log('Audio source set to:', audioRef.current.src);
    }
  }, []); 

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      console.log('Estado de isMuted cambiado a:', isMuted, 'Aplicado a audio.muted.');
      if (!isMuted) {
        console.log("Intentando reproducir audio. Fuente:", audioRef.current?.src);
        audioRef.current.play()
          .then(() => {
            console.log("Reproducción de audio iniciada exitosamente.");
          })
          .catch(error => {
            console.error("Fallo al reproducir audio:", error);
            console.warn("La reproducción de audio fue prevenida. Esto sucede a menudo por políticas de autoplay del navegador. Se requiere interacción del usuario (como clic en el botón de desilenciar). También verifica que la URL del audio sea válida y accesible.");
          });
      } else {
        audioRef.current.pause(); 
        console.log("Audio pausado (silenciado).");
      }
    } else {
        console.warn("audioRef.current es null en el efecto de isMuted. Esto no debería pasar si el efecto de inicialización funcionó.");
    }
  }, [isMuted]); 

  const toggleMute = useCallback(() => {
    console.log("toggleMute llamado. Estado actual de isMuted:", isMuted, "El nuevo estado será:", !isMuted);
    setIsMuted(prev => !prev);
  }, []);


  useEffect(() => {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(userProfile));
    console.log("UserProfile actualizado en localStorage:", userProfile);
  }, [userProfile]);

  const addXp = useCallback((points: number) => {
    setUserProfile(p => ({ ...p, xp: p.xp + points }));
  }, []);

  const markQuizCompleted = useCallback((quizId: string) => {
    setUserProfile(p => {
      const updatedProfile = {
        ...p,
        completedQuizIds: Array.from(new Set([...p.completedQuizIds, quizId])),
      };
      console.log(`Quiz ${quizId} marcado como completado. Nuevo completedQuizIds:`, updatedProfile.completedQuizIds);
      return updatedProfile;
    });
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
            {/* Usar el QuizTakingViewWrapper aquí */}
            <Route path="/quiz/:quizId" element={<QuizTakingViewWrapper quizzes={QUIZZES_DATA} />} />
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
