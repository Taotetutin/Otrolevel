
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Quiz, QuizQuestion } from '../types';
import { useUserProfile } from '../App';
import { 
  QUIZZES_DATA, 
  APP_NAME, 
  BOOK_OPEN_ICON_PATH, 
  PROFILE_ICON_PATH,
  QUESTION_TIMER_DURATION,
  TIMER_ICON_PATH,
  X_MARK_ICON_PATH,
  CHECK_CIRCLE_SOLID_ICON_PATH,
  TROPHY_ICON_PATH,
  HOME_ICON_PATH 
} from '../constants';
import { Card, Button, Modal, LoadingSpinner, QuizQuestionDisplay, Icon } from './SharedUI';

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

  const firstIncompleteQuizIndex = quizzes.findIndex(q => !userProfile.completedQuizIds.includes(q.id));

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-violet-600 mb-8 text-center animate-fade-in-down">Nuestros Quizzes</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz, index) => {
          const isCompleted = userProfile.completedQuizIds.includes(quiz.id);
          const isActive = firstIncompleteQuizIndex === -1 ? true : index === firstIncompleteQuizIndex; // All complete or current is active
          const isLocked = firstIncompleteQuizIndex !== -1 && index > firstIncompleteQuizIndex;

          let cardClassName = "flex flex-col justify-between h-full transition-all-smooth ";
          let statusText = "";
          let statusBgColor = "";
          let onClickAction = () => navigate(`/quiz/${quiz.id}`);
          let cardHoverEffect = "hover:shadow-2xl hover:scale-[1.03]";
          let levelBadgeBgColor = isLocked ? 'bg-slate-300 text-slate-600' : 'bg-blue-100 text-blue-700';


          if (isCompleted) {
            statusText = "Completado ✔️";
            statusBgColor = "bg-green-100 text-green-700";
            cardClassName += "border-2 border-green-400 bg-white";
          } else if (isActive) {
            statusText = "¡A Jugar! ▶️";
            statusBgColor = "bg-violet-100 text-violet-700";
            cardClassName += "border-2 border-violet-500 shadow-lg shadow-violet-300/50 bg-white";
          } else if (isLocked) {
            statusText = "Bloqueado 🔒";
            statusBgColor = "bg-slate-200 text-slate-500";
            cardClassName += "opacity-60 cursor-not-allowed bg-slate-100 border-2 border-slate-300";
            cardHoverEffect = ""; 
            onClickAction = () => alert("Debes completar los quizzes anteriores para desbloquear este.");
          }


          return (
            <div 
              key={quiz.id} 
              className={`animate-fade-in ${cardHoverEffect}`} 
              style={{animationDelay: `${index * 0.1}s`}}
              onClick={onClickAction}
              role="button"
              tabIndex={isLocked ? -1 : 0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClickAction();}}
              aria-label={`Quiz: ${quiz.title}. Nivel ${index + 1}. Estado: ${isCompleted ? 'Completado' : isActive ? 'Activo' : 'Bloqueado'}`}
            >
              <Card className={`${cardClassName}`}>
                <div>
                  {quiz.iconPath && <Icon path={quiz.iconPath} className={`w-10 h-10 mb-3 ${isLocked ? 'text-slate-400' : 'text-violet-500'}`} />}
                  <div className="flex justify-between items-center mb-2">
                    <h2 className={`text-xl font-semibold ${isLocked ? 'text-slate-600' : 'text-violet-700'}`}>{quiz.title}</h2>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${levelBadgeBgColor}`}>
                      Level {index + 1}
                    </span>
                  </div>
                  <p className={`text-sm mb-3 ${isLocked ? 'text-slate-500' : 'text-slate-600'}`}>{quiz.description}</p>
                </div>
                {!isLocked && (
                  <div className="mt-auto">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusBgColor}`}>
                      {statusText}
                    </span>
                  </div>
                )}
                 {isLocked && (
                   <div className="mt-auto">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusBgColor}`}>
                        {statusText}
                    </span>
                  </div>
                )}
              </Card>
            </div>
          );
        })}
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
  const { userProfile, addXp, markQuizCompleted } = useUserProfile();

  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [questionKey, setQuestionKey] = useState(Date.now()); 
  
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIMER_DURATION);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isTimeUpOverlayVisible, setIsTimeUpOverlayVisible] = useState(false);
  const [showIncorrectAnswerPenalty, setShowIncorrectAnswerPenalty] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false); // New state for starting quiz
  const timerIntervalRef = useRef<number | null>(null);
  const penaltyTimeoutRef = useRef<number | null>(null);


  const resetQuizState = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setScore(0);
    setIsAnswered(false);
    setShowResultsModal(false);
    setIsTimeUp(false);
    setIsTimeUpOverlayVisible(false);
    setShowIncorrectAnswerPenalty(false); 
    setTimeLeft(QUESTION_TIMER_DURATION);
    setQuestionKey(Date.now()); 
    setQuizStarted(false); // Ensure quiz goes back to "Start Quiz" screen
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (penaltyTimeoutRef.current) clearTimeout(penaltyTimeoutRef.current);
  }, []);

  useEffect(() => {
    const foundQuiz = quizzes.find(q => q.id === quizId);
    if (foundQuiz) {
      const firstIncompleteQuizIndex = quizzes.findIndex(q => !userProfile.completedQuizIds.includes(q.id));
      const currentQuizIndexInGlobalList = quizzes.findIndex(q => q.id === quizId);
      
      const isQuizAccessible = firstIncompleteQuizIndex === -1 || currentQuizIndexInGlobalList <= firstIncompleteQuizIndex;

      if (!isQuizAccessible) {
        alert("Este quiz está bloqueado. Completa los anteriores primero.");
        navigate('/quizzes');
        return;
      }
      setCurrentQuiz(foundQuiz);
      resetQuizState(); // Resets and sets quizStarted to false
    } else {
      navigate('/quizzes'); 
    }
  }, [quizId, quizzes, navigate, resetQuizState, userProfile.completedQuizIds]);

  useEffect(() => {
    if (!quizStarted || isAnswered || isTimeUp || showResultsModal || !currentQuiz || showIncorrectAnswerPenalty) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }

    setTimeLeft(QUESTION_TIMER_DURATION); 
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = window.setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          setIsTimeUp(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [quizStarted, currentQuestionIndex, currentQuiz, isAnswered, isTimeUp, showResultsModal, questionKey, showIncorrectAnswerPenalty]);

  useEffect(() => {
    if (isTimeUp) {
      setIsTimeUpOverlayVisible(true);
      // Removed automatic reset: const timeoutId = setTimeout(() => { resetQuizState(); }, 3000); 
      // return () => clearTimeout(timeoutId);
    }
  }, [isTimeUp]); // Removed resetQuizState from dependencies as it's not called here anymore

  useEffect(() => {
    if (showIncorrectAnswerPenalty) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); 
      penaltyTimeoutRef.current = window.setTimeout(() => {
        resetQuizState(); 
        setShowIncorrectAnswerPenalty(false); 
      }, 3000);
      return () => {
        if (penaltyTimeoutRef.current) clearTimeout(penaltyTimeoutRef.current);
      };
    }
  }, [showIncorrectAnswerPenalty, resetQuizState]);


  const handleAnswer = (optionId: string) => {
    if (isAnswered || !currentQuiz || showIncorrectAnswerPenalty || !quizStarted) return;

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setIsAnswered(true);
    setSelectedOptionId(optionId);

    if (optionId === currentQuiz.questions[currentQuestionIndex].correctOptionId) {
      setScore(s => s + (currentQuiz.questions[currentQuestionIndex].points || 10));
    } else {
      setShowIncorrectAnswerPenalty(true); 
    }
  };

  const handleNextQuestion = () => {
    if (!currentQuiz) return;

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setIsTimeUp(false); 
      setTimeLeft(QUESTION_TIMER_DURATION); 
      setQuestionKey(Date.now()); 
    } else {
      if (score >= (currentQuiz.questions.length * (currentQuiz.questions[0]?.points || 10) * 0.7)) { 
         markQuizCompleted(currentQuiz.id);
         addXp(score);
      }
      setShowResultsModal(true);
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(QUESTION_TIMER_DURATION); // Explicitly reset timer when quiz starts
    setQuestionKey(Date.now()); // Re-trigger timer effect
  };

  if (!currentQuiz) {
    return <LoadingSpinner message="Cargando quiz..." />;
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const progressPercentage = quizStarted ? ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100 : 0;
  const nextIncompleteQuiz = quizzes.find((q, idx) => q.id !== currentQuiz.id && !userProfile.completedQuizIds.includes(q.id) && idx > quizzes.findIndex(cq => cq.id === currentQuiz.id));
  const isCurrentAnswerCorrect = isAnswered && selectedOptionId === currentQuestion.correctOptionId;

  return (
    <div className="max-w-2xl mx-auto animate-fade-in relative">
      {isTimeUpOverlayVisible && (
        <div className="fixed inset-0 bg-slate-700 bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center z-[150] animate-fade-in p-4 text-center">
          <Icon path={X_MARK_ICON_PATH} className="w-24 h-24 text-red-400 mb-4 animate-pulse-once" viewBox="0 0 20 20" />
          <h2 className="text-4xl font-bold text-white mb-2">¡Tiempo Agotado!</h2>
          <p className="text-xl text-slate-100 mb-6">Presiona "Nuevo intento" para comenzar otra vez.</p>
          <Button 
            onClick={() => {
              resetQuizState(); // This sets quizStarted to false
              setIsTimeUpOverlayVisible(false);
            }} 
            variant="primary"
            size="lg"
          >
            Nuevo intento
          </Button>
        </div>
      )}

      {showIncorrectAnswerPenalty && (
        <div className="fixed inset-0 bg-slate-700 bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center z-[150] animate-fade-in p-4 text-center">
          <Icon path={X_MARK_ICON_PATH} className="w-24 h-24 text-red-400 mb-4 animate-pulse-once" viewBox="0 0 20 20" />
          <h2 className="text-4xl font-bold text-white mb-2">Respuesta Incorrecta</h2>
          <p className="text-xl text-slate-100 mb-6">El quiz se reiniciará...</p>
        </div>
      )}
      
      {!quizStarted && !isTimeUpOverlayVisible && !showIncorrectAnswerPenalty && (
        <Card className="text-center p-6 sm:p-8 animate-fade-in-down">
          {currentQuiz.iconPath && <Icon path={currentQuiz.iconPath} className="w-16 h-16 text-violet-500 mx-auto mb-4" />}
          <h2 className="text-3xl font-bold text-violet-700 mb-3">{currentQuiz.title}</h2>
          <p className="text-slate-600 mb-2">{currentQuiz.description}</p>
          <p className="text-sm text-slate-500 mb-6">
            Tienes {QUESTION_TIMER_DURATION} segundos para responder cada pregunta. ¡Mucha suerte!
          </p>
          <Button onClick={handleStartQuiz} variant="primary" size="lg" className="w-full sm:w-auto px-8">
            Iniciar Quiz
          </Button>
        </Card>
      )}

      {quizStarted && !isTimeUpOverlayVisible && !showIncorrectAnswerPenalty && (
        <>
          <Card className="mb-6 bg-white shadow-xl rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-violet-700">{currentQuiz.title}</h2>
              <div className="flex items-center text-violet-600 font-semibold bg-violet-100 px-3 py-1 rounded-full shadow-sm">
                <Icon path={TIMER_ICON_PATH} className="w-5 h-5 mr-2" viewBox="0 0 20 20"/>
                <span>{String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}</span>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 mb-6 shadow-inner">
              <div 
                className="bg-violet-500 h-2.5 rounded-full transition-all duration-300 ease-out" 
                style={{ width: `${progressPercentage}%` }}
                aria-valuenow={progressPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                role="progressbar"
                aria-label={`Progreso del quiz: ${progressPercentage.toFixed(0)}%`}
              ></div>
            </div>
          </Card>
          
          <QuizQuestionDisplay 
            key={questionKey} 
            question={currentQuestion} 
            onAnswer={handleAnswer} 
            selectedOptionId={selectedOptionId}
            isAnswered={isAnswered}
          />

          {isAnswered && (
            <Card className="my-4 p-4 animate-fade-in-down bg-opacity-90 bg-white">
              {isCurrentAnswerCorrect ? (
                <div className="flex items-start space-x-3 text-green-700">
                  <Icon path={CHECK_CIRCLE_SOLID_ICON_PATH} className="w-7 h-7 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20"/>
                  <div>
                    <p className="text-lg font-semibold">¡Muy Bien!</p>
                    <p className="text-sm mt-1">{currentQuestion.explanation}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start space-x-3 text-red-700">
                  <Icon path={X_MARK_ICON_PATH} className="w-7 h-7 text-red-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20"/>
                  <div>
                    <p className="text-lg font-semibold">Respuesta Incorrecta</p>
                    <p className="text-sm mt-1">{currentQuestion.explanation}</p>
                  </div>
                </div>
              )}
              {isCurrentAnswerCorrect && (
                  <Button onClick={handleNextQuestion} className="mt-4 w-full" variant="primary">
                  {currentQuestionIndex < currentQuiz.questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                  </Button>
              )}
            </Card>
          )}
        </>
      )}

      <Modal isOpen={showResultsModal} onClose={() => { setShowResultsModal(false); navigate('/quizzes'); }} title="¡Quiz Completado!">
        <div className="text-center">
          <Icon path={TROPHY_ICON_PATH} className="w-16 h-16 text-yellow-400 mx-auto mb-3 animate-pulse-once" viewBox="0 0 20 20"/>
          <h3 className="text-2xl font-semibold text-violet-700 mb-2">¡Felicidades, {userProfile.name}!</h3>
          <p className="text-slate-600 mb-1">Has completado el quiz "{currentQuiz?.title || ''}".</p>
          <p className="text-3xl font-bold text-violet-500 my-4">Puntaje: {score}</p>
          <div className="mt-6 space-y-3 sm:space-y-0 sm:flex sm:space-x-3 justify-center">
            {nextIncompleteQuiz && (
              <Button onClick={() => { setShowResultsModal(false); navigate(`/quiz/${nextIncompleteQuiz.id}`); }} variant="primary" className="w-full sm:w-auto">
                Siguiente Quiz
              </Button>
            )}
            <Button onClick={() => { setShowResultsModal(false); navigate('/quizzes'); }} variant="secondary" className="w-full sm:w-auto">
              Lista de Quizzes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ProfileView Component
interface ProfileViewProps {}
export const ProfileView: React.FC<ProfileViewProps> = () => {
  const { userProfile, updateName } = useUserProfile();
  const [nameInput, setNameInput] = useState(userProfile.name);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate(); 

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const handleSaveName = () => {
    updateName(nameInput.trim() === "" ? "Astro Bebé" : nameInput.trim());
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto text-center animate-fade-in">
      <Card className="bg-white shadow-xl rounded-xl p-8">
        <Icon path={PROFILE_ICON_PATH} className="w-20 h-20 sm:w-24 sm:h-24 text-violet-500 mx-auto mb-4" viewBox="0 0 20 20"/>
        {isEditing ? (
          <div className="mb-4 animate-fade-in-down">
            <input
              type="text"
              value={nameInput}
              onChange={handleNameChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all-smooth"
              placeholder="Tu nombre o apodo"
            />
            <Button onClick={handleSaveName} className="mt-3 w-full" variant="primary">
              Guardar Nombre
            </Button>
          </div>
        ) : (
          <h1 className="text-3xl font-bold text-violet-700 mb-2 cursor-pointer hover:text-violet-500 transition-colors" onClick={() => setIsEditing(true)} title="Haz clic para editar tu nombre">
            {userProfile.name}
             <span className="text-sm ml-2 text-slate-400 font-normal">(editar)</span>
          </h1>
        )}
        <p className="text-3xl sm:text-4xl font-bold text-blue-500 mb-6">{userProfile.xp} XP</p>
        
        <h2 className="text-xl font-semibold text-slate-700 mb-3">Quizzes Completados</h2>
        {userProfile.completedQuizIds.length > 0 ? (
          <ul className="space-y-2">
            {userProfile.completedQuizIds.map(quizId => {
              const quiz = QUIZZES_DATA.find(q => q.id === quizId);
              return (
                <li key={quizId} className="bg-green-100 text-green-700 p-2.5 rounded-md text-sm shadow-sm">
                  {quiz ? quiz.title : 'Quiz Desconocido'} ✔️
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-slate-500">Aún no has completado ningún quiz. ¡Anímate a empezar!</p>
        )}
      </Card>
       <Button onClick={() => navigate('/quizzes')} className="mt-8 w-full" variant="secondary">
          Volver a los Quizzes
        </Button>
    </div>
  );
};
