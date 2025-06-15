
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Quiz, QuizQuestion } from '../types';
import { useUserProfile } from '../App';
import { QUIZZES_DATA, APP_NAME, BOOK_OPEN_ICON_PATH, PROFILE_ICON_PATH } from '../constants'; // CHAT_ICON_PATH removed
import { Card, Button, Modal, LoadingSpinner, QuizQuestionDisplay, Icon } from './SharedUI';
// GeminiService and ChatMessage related imports removed

// HomePageView Component
export const HomePageView: React.FC = () => {
  const { userProfile } = useUserProfile();
  const navigate = useNavigate();
  const [bannerImageError, setBannerImageError] = useState(false);
  const newBannerImageUrl = "https://res.cloudinary.com/dyxvur3js/image/upload/v1750012795/a-vibrant-digital-illustration-in-the-st_kxwLGfjIT4m2cKr69iRxBA_y02LlodzSOCEpJdiwRwUDQ_lvjtnj.png";

  return (
    <div className="text-center">
      {bannerImageError ? (
        <div 
          className="rounded-xl shadow-lg mb-8 w-full h-56 md:h-72 bg-violet-100 flex items-center justify-center animate-fade-in text-center p-4"
          role="img"
          aria-label="Banner de bienvenida no disponible"
        >
          <div>
            <p className="text-xl font-semibold text-violet-700 mb-1">Banner no disponible</p>
            <p className="text-sm text-slate-500">La imagen no se pudo cargar. Por favor, verifica la URL o los permisos de la imagen.</p>
          </div>
        </div>
      ) : (
        <img 
          src={newBannerImageUrl}
          alt="Bienvenida a ObsteriX Play - Level Up Mom" 
          className="rounded-xl shadow-lg mb-8 w-full object-cover object-top h-56 md:h-72 animate-fade-in" 
          onError={() => setBannerImageError(true)}
        />
      )}
      <h1 className="text-4xl md:text-5xl font-bold text-violet-600 mb-4 animate-fade-in-down" style={{animationDelay: '0.2s'}}>
        ¡Bienvenida a {APP_NAME}!
        <br />
        <span className="text-violet-600 italic">"{userProfile.name}"</span>
      </h1>
      <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto animate-fade-in-down" style={{animationDelay: '0.4s'}}>
        Tu compañera de confianza en el hermoso viaje del embarazo y la maternidad. Aquí encontrarás quizzes educativos y apoyo.
      </p>
      <div className="flex justify-center max-w-md mx-auto animate-fade-in" style={{animationDelay: '0.6s'}}>
        <Card onClick={() => navigate('/quizzes')} className="bg-blue-100 hover:bg-blue-200 w-full">
          <Icon path={BOOK_OPEN_ICON_PATH} className="w-12 h-12 text-violet-500 mx-auto mb-3" />
          <h2 className="text-2xl font-semibold text-violet-700 mb-2">Explorar Quizzes</h2>
          <p className="text-slate-600">Pon a prueba tus conocimientos y aprende de forma divertida.</p>
        </Card>
      </div>
    </div>
  );
};

// QuizListView Component
interface QuizListViewProps {
  quizzes: Quiz[];
}
export const QuizListView: React.FC<QuizListViewProps> = ({ quizzes }) => {
  const { userProfile } = useUserProfile();
  const navigate = useNavigate();

  const getQuizStatus = (quizId: string) => {
    return userProfile.completedQuizIds.includes(quizId) ? "Completado" : "Pendiente";
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-violet-600 mb-8 text-center animate-fade-in-down">Nuestros Quizzes</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz, index) => (
          <div key={quiz.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
            <Card onClick={() => navigate(`/quiz/${quiz.id}`)} className="flex flex-col justify-between h-full">
              <div>
                {quiz.iconPath && <Icon path={quiz.iconPath} className="w-10 h-10 text-violet-500 mb-3" />}
                <h2 className="text-xl font-semibold text-violet-700 mb-2">{quiz.title}</h2>
                <p className="text-sm text-slate-600 mb-3">{quiz.description}</p>
              </div>
              <div className="mt-auto">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${userProfile.completedQuizIds.includes(quiz.id) ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                  {getQuizStatus(quiz.id)}
                </span>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

// QuizTakingView Component
interface QuizTakingViewProps {
  quizzes: Quiz[];
}
export const QuizTakingView: React.FC<QuizTakingViewProps> = ({ quizzes }) => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { addXp, markQuizCompleted } = useUserProfile();

  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [questionKey, setQuestionKey] = useState(0); // For re-triggering animation

  useEffect(() => {
    const foundQuiz = quizzes.find(q => q.id === quizId);
    if (foundQuiz) {
      setCurrentQuiz(foundQuiz);
      setCurrentQuestionIndex(0);
      setSelectedOptionId(null);
      setScore(0);
      setIsAnswered(false);
      setShowResultsModal(false);
      setQuestionKey(prevKey => prevKey + 1);
    } else {
      navigate('/quizzes'); 
    }
  }, [quizId, quizzes, navigate]);

  const handleAnswer = (optionId: string) => {
    setSelectedOptionId(optionId);
    setIsAnswered(true);
    if (currentQuiz && optionId === currentQuiz.questions[currentQuestionIndex].correctOptionId) {
      setScore(prevScore => prevScore + (currentQuiz.questions[currentQuestionIndex].points || 10));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuiz && currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setQuestionKey(prevKey => prevKey + 1);
    } else {
      if(currentQuiz) {
        addXp(score);
        markQuizCompleted(currentQuiz.id);
      }
      setShowResultsModal(true);
    }
  };

  if (!currentQuiz) return <LoadingSpinner message="Cargando quiz..." />;

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-violet-600 mb-2 text-center animate-fade-in-down">{currentQuiz.title}</h1>
      <p className="text-sm text-slate-500 mb-6 text-center animate-fade-in-down" style={{animationDelay: '0.1s'}}>Pregunta {currentQuestionIndex + 1} de {currentQuiz.questions.length}</p>
      
      <div className="w-full bg-blue-200 rounded-full h-2.5 mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
        <div className="bg-violet-500 h-2.5 rounded-full transition-all-smooth duration-500 ease-out" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      <div key={questionKey} className="animate-fade-in" style={{animationDelay: '0.3s'}}>
        <QuizQuestionDisplay 
          question={currentQuestion} 
          onAnswer={handleAnswer}
          selectedOptionId={selectedOptionId}
          isAnswered={isAnswered}
        />
      </div>

      {isAnswered && (
        <div className="animate-fade-in">
          <Card className="mt-4 bg-violet-50 border border-violet-200">
            <h4 className="font-semibold text-lg mb-1">
              {selectedOptionId === currentQuestion.correctOptionId 
                ? <span className="text-green-600">¡Correcto! 🎉</span> 
                : <span className="text-red-600">Respuesta incorrecta.</span>
              }
            </h4>
            <p className="text-sm text-slate-600">{currentQuestion.explanation}</p>
            <Button onClick={handleNextQuestion} className="mt-4 w-full">
              {currentQuestionIndex < currentQuiz.questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
            </Button>
          </Card>
        </div>
      )}

      <Modal isOpen={showResultsModal} onClose={() => setShowResultsModal(false)} title="Resultados del Quiz">
        <div className="text-center">
          <p className="text-lg mb-2">Has completado el quiz: <strong className="text-violet-600">{currentQuiz.title}</strong></p>
          <p className="text-2xl font-bold mb-4">Puntuación: <span className="text-green-600">{score} XP</span></p>
          <p className="text-sm text-slate-600 mb-4">
            ¡Sigue aprendiendo y acumulando puntos! Tu conocimiento es tu mayor fortaleza.
          </p>
          <Button onClick={() => { setShowResultsModal(false); navigate('/quizzes'); }} className="mr-2">
            Volver a Quizzes
          </Button>
           <Button onClick={() => { setShowResultsModal(false); navigate('/'); }} variant="secondary">
            Ir al Inicio
          </Button>
        </div>
      </Modal>
    </div>
  );
};

// ExpertChatView Component Removed

// ProfileView Component
export const ProfileView: React.FC = () => {
  const { userProfile, updateName } = useUserProfile();
  const [nameInput, setNameInput] = useState(userProfile.name);
  const [isEditing, setIsEditing] = useState(false);
  const [pulsateXp, setPulsateXp] = useState(false);


  useEffect(() => {
    // Trigger pulse animation for XP card on initial load or XP change
    setPulsateXp(true);
    const timer = setTimeout(() => setPulsateXp(false), 800); // Duration of pulseOnce animation
    return () => clearTimeout(timer);
  }, [userProfile.xp]);


  const handleSaveName = () => {
    updateName(nameInput);
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="animate-fade-in">
        <Icon path={PROFILE_ICON_PATH} className="w-20 h-20 sm:w-24 sm:h-24 text-violet-500 mx-auto mb-4" viewBox="0 0 24 24"/>
      </div>
      <h1 className="text-3xl font-bold text-violet-600 mb-6 animate-fade-in-down" style={{animationDelay: '0.1s'}}>Mi Perfil de {APP_NAME}</h1>
      
      <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
        <Card className="mb-6">
          {isEditing ? (
            <div className="flex flex-col items-center space-y-3">
              <input 
                type="text" 
                value={nameInput} 
                onChange={(e) => setNameInput(e.target.value)}
                className="p-2 border border-slate-300 rounded-md w-full max-w-xs text-center text-xl"
                aria-label="Editar nombre"
              />
              <Button onClick={handleSaveName} size="sm">Guardar Nombre</Button>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <h2 className="text-2xl font-semibold text-slate-700">{userProfile.name}</h2>
              <button onClick={() => setIsEditing(true)} className="text-violet-500 hover:text-violet-700 p-1 rounded-full hover:bg-violet-100 transition-all-smooth" aria-label="Editar nombre">
                <Icon path="M17.293 2.293a1 1 0 00-1.414 0l-11 11A1 1 0 004.293 15H6a1 1 0 001-1v-1.707l10-10a1 1 0 000-1.414l-1.707-1.707a1 1 0 00-.293-.293zM5 14v.586L13.586 6 13 5.414 5 13.414V14zm11-11L14.414 4.586 16 6.172 17.586 4.586 16 3z" className="w-5 h-5" viewBox="0 0 20 20"/>
              </button>
            </div>
          )}
        </Card>
      </div>

      <div className={`animate-fade-in ${pulsateXp ? 'animate-pulse-once' : ''}`} style={{animationDelay: '0.3s'}}>
        <Card className="mb-6 bg-blue-100">
          <p className="text-xl text-blue-800">Puntos de Experiencia (XP):</p>
          <p className="text-3xl sm:text-4xl font-bold text-violet-600 my-2">{userProfile.xp}</p>
        </Card>
      </div>

      <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
        <Card>
          <h3 className="text-xl font-semibold text-slate-700 mb-3">Quizzes Completados:</h3>
          {userProfile.completedQuizIds.length > 0 ? (
            <ul className="space-y-2">
              {userProfile.completedQuizIds.map((quizId, index) => {
                const quiz = QUIZZES_DATA.find(q => q.id === quizId);
                return (
                  <li 
                    key={quizId} 
                    className="text-slate-600 bg-green-50 px-3 py-2 rounded-md border border-green-200 shadow-sm animate-fade-in-down"
                    style={{animationDelay: `${0.5 + index * 0.1}s`}} // Staggered animation for list items
                  >
                    {quiz ? quiz.title : quizId} <span role="img" aria-label="Completado">✔️</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-slate-500 italic">Aún no has completado ningún quiz. ¡Anímate a empezar!</p>
          )}
        </Card>
      </div>
      <div className="mt-8 animate-fade-in" style={{animationDelay: '0.5s'}}>
        <Link to="/quizzes">
          <Button variant="secondary">
            <Icon path={BOOK_OPEN_ICON_PATH} className="w-5 h-5 mr-2" />
            Explorar más Quizzes
          </Button>
        </Link>
      </div>
    </div>
  );
};