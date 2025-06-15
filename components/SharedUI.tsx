
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { QuizQuestion } from '../types';
import { APP_NAME, HOME_ICON_PATH, QUIZ_ICON_PATH, PROFILE_ICON_PATH } from '../constants'; 
import { useUserProfile } from '../App'; 

// Icon Component
interface IconProps {
  path: string;
  className?: string;
  viewBox?: string;
}
export const Icon: React.FC<IconProps> = ({ path, className = 'w-6 h-6', viewBox = '0 0 20 20' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} fill="currentColor" className={className} aria-hidden="true">
    <path fillRule="evenodd" d={path} clipRule="evenodd" />
  </svg>
);

// Navbar Component
export const Navbar: React.FC = () => {
  const { userProfile } = useUserProfile();
  const navItems = [
    { path: '/', label: 'Inicio', icon: HOME_ICON_PATH },
    { path: '/quizzes', label: 'Quizzes', icon: QUIZ_ICON_PATH },
    { path: '/perfil', label: 'Mi Perfil', icon: PROFILE_ICON_PATH },
  ];
  const appIconUrl = "https://res.cloudinary.com/dyxvur3js/image/upload/v1750013745/a-3d-render-of-a-minimalist-black-and-wh_0sSTS0OyQeKMas8Um0RrRQ_p65JDA6HR7GpgsrHxV0diQ-removebg-preview_ltzhob.png";

  return (
    <nav className="bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl sm:text-2xl font-bold flex items-center transition-transform transform hover:scale-105">
            <img src={appIconUrl} alt="App Icon" className="h-7 w-7 sm:h-8 sm:w-8 mr-2 rounded-sm" />
            {APP_NAME}
          </Link>
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-25 transition-all-smooth transform hover:scale-105 flex items-center space-x-2 ${
                    isActive ? 'bg-white bg-opacity-30' : ''
                  }`
                }
              >
                <Icon path={item.icon} className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
             <span className="px-4 py-2 text-sm font-medium">XP: {userProfile.xp}</span>
          </div>
          {/* Mobile Menu Button - can be implemented later */}
        </div>
      </div>
    </nav>
  );
};

// Footer Component
export const Footer: React.FC = () => (
  <footer className="bg-gradient-to-r from-violet-500 to-blue-500 text-white text-center p-6 shadow-top mt-auto">
    <p>&copy; {new Date().getFullYear()} MiMaternoFetal.cl. Todos los derechos reservados.</p>
    <p className="text-xs mt-1">Este contenido es informativo y no reemplaza el consejo médico profesional.</p>
  </footer>
);

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}
export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', isLoading = false, ...props }) => {
  const baseStyle = "font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all-smooth flex items-center justify-center";
  
  const variantStyles = {
    primary: "bg-violet-500 hover:bg-violet-600 text-white focus:ring-violet-400 active:bg-violet-700",
    secondary: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400 active:bg-blue-700",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 active:bg-red-700",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${isLoading ? 'opacity-75 cursor-not-allowed' : ''} ${props.disabled ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

// Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => (
  <div
    className={`bg-white shadow-xl rounded-xl p-6 transition-all-smooth ${onClick ? 'cursor-pointer hover:shadow-2xl hover:scale-[1.03]' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md transform transition-all duration-300 ease-out scale-95 animate-modal-pop-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-violet-600">{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-all-smooth">
            <Icon path="M6 18L18 6M6 6l12 12" className="w-5 h-5" viewBox="0 0 24 24" /> {/* Close Icon */}
          </button>
        </div>
        <div>{children}</div>
      </div>
      <style>{`
        @keyframes modal-pop-in {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-pop-in { animation: modal-pop-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};


// Loading Spinner Component
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg', message?: string }> = ({ size = 'md', message }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 border-4',
    md: 'w-12 h-12 border-[5px]',
    lg: 'w-16 h-16 border-[6px]',
  };
  return (
    <div className="flex flex-col items-center justify-center my-8 animate-fade-in">
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-violet-500 border-t-transparent`}></div>
      {message && <p className="mt-3 text-lg text-violet-600 font-semibold">{message}</p>}
    </div>
  );
};

// Quiz Question Display Component
interface QuizQuestionDisplayProps {
  question: QuizQuestion;
  onAnswer: (optionId: string) => void;
  selectedOptionId?: string | null;
  isAnswered?: boolean;
}
export const QuizQuestionDisplay: React.FC<QuizQuestionDisplayProps> = ({ question, onAnswer, selectedOptionId, isAnswered }) => {
  return (
    <Card className="mb-6">
      <h3 className="text-xl font-semibold text-slate-700 mb-4">{question.text}</h3>
      <div className="space-y-3">
        {question.options.map(option => {
          const isCorrect = option.id === question.correctOptionId;
          const isSelected = option.id === selectedOptionId;
          
          let buttonClass = "w-full text-left p-3 rounded-lg border-2 transition-all-smooth ";
          if (isAnswered) {
            if (isCorrect) {
              buttonClass += "bg-green-100 border-green-500 text-green-700 font-semibold ring-2 ring-green-400";
            } else if (isSelected && !isCorrect) {
              buttonClass += "bg-red-100 border-red-500 text-red-700 ring-2 ring-red-400";
            } else {
              buttonClass += "bg-slate-50 border-slate-300 text-slate-600 opacity-70";
            }
          } else {
            buttonClass += isSelected 
              ? "bg-violet-200 border-violet-500 ring-2 ring-violet-500 text-violet-700" 
              : "bg-slate-50 border-slate-300 hover:bg-violet-100 hover:border-violet-400 text-slate-700";
          }

          return (
            <button
              key={option.id}
              onClick={() => !isAnswered && onAnswer(option.id)}
              disabled={isAnswered}
              className={buttonClass}
            >
              {option.text}
            </button>
          );
        })}
      </div>
    </Card>
  );
};

// Floating Home Button
export const FloatingHomeButton: React.FC = () => {
  return (
    <Link
      to="/"
      aria-label="Volver a la página de inicio"
      className="fixed bottom-6 right-6 z-50 bg-violet-500 text-white p-4 rounded-full shadow-lg hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-75 transition-all-smooth transform hover:scale-110 active:scale-100 animate-subtle-pulse-home"
    >
      <Icon path={HOME_ICON_PATH} className="w-6 h-6" viewBox="0 0 20 20" />
    </Link>
  );
};