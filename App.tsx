
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserProfile, UserProfileContextType, Quiz, QuizQuestion, AppView } from './types';
import { QUIZZES_DATA, USER_PROFILE_KEY, INITIAL_USER_PROFILE, APP_NAME } from './constants';
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
        <Navbar />
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