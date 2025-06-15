
import { Quiz } from './types';

export const GEMINI_API_MODEL_TEXT = "gemini-2.5-flash-preview-04-17"; // Kept in case other Gemini features are added later, though not used now.

// Heroicon SVG Paths (solid style, 20x20 viewBox or 24x24)
export const HOME_ICON_PATH = "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z";
export const QUIZ_ICON_PATH = "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.846 5.671a1 1 0 00.95.69h5.969c.969 0 1.371 1.24.588 1.81l-4.828 3.522a1 1 0 00-.364 1.118l1.846 5.671c.3.921-.755 1.688-1.54 1.118l-4.828-3.522a1 1 0 00-1.176 0l-4.828 3.522c-.784.57-1.838-.197-1.539-1.118l1.846-5.671a1 1 0 00-.364-1.118L2.28 11.098c-.783-.57-.38-1.81.588-1.81h5.969a1 1 0 00.95-.69l1.846-5.671z"; // Star icon as quiz
// export const CHAT_ICON_PATH = "M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"; // Removed
export const PROFILE_ICON_PATH = "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z";
export const BOOK_OPEN_ICON_PATH = "M12 6.25278C12 6.25278 4 6.25278 4 11.5028C4 16.7528 12 19.7528 12 19.7528C12 19.7528 20 16.7528 20 11.5028C20 6.25278 12 6.25278 12 6.25278Z M12 6.25278V19.7528"; 
export const NUTRITION_ICON_PATH = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM11 16H9v-2H7v-2h2v-2h2v2h2v2h-2v2zm7-5c0 .41-.08.8-.22 1.16l-3.37-3.37C14.2 8.08 14.59 8 15 8c1.66 0 3 1.34 3 3zM6.41 17.59L4.41 19.59C3.01 18.06 2 15.93 2 13.5c0-1.1.13-2.18.39-3.2L6.41 14.39v3.2zM8 5c0-.41.08-.8.22-1.16l3.37 3.37C11.8 7.92 11.41 8 11 8c-1.66 0-3-1.34-3-3zm9.18 10.84L13.81 12.5C14.53 11.95 15 11.05 15 10c0-1.66-1.34-3-3-3-.41 0-.8.08-1.16.22L7.47 3.81C8.02 3.29 8.92 3 10 3c1.66 0 3 1.34 3 3 .41 0 .8-.08 1.16-.22l3.37-3.37C18.33 3.13 19.4 4 20.13 5c.73 1 .98 2.21.78 3.4L17.18 15.84z";
export const EXERCISE_ICON_PATH = "M17.66 7.93L12 2.27 6.34 7.93a8 8 0 1011.32 0zM12 19.5a6 6 0 110-12 6 6 0 010 12zM12 12a2 2 0 100-4 2 2 0 000 4z";
export const MYTHS_ICON_PATH = "M7 11h2v2H7v-2zm12-4.1c0-.2-.1-.5-.3-.6l-1.7-1.7c-.2-.2-.4-.3-.6-.3s-.4.1-.6.3l-1.7 1.7c-.2.1-.3.4-.3.6V8h-2V6.9c0-.2-.1-.5-.3-.6l-1.7-1.7c-.2-.2-.4-.3-.6-.3s-.4.1-.6.3l-1.7 1.7c-.2.1-.3.4-.3.6V8H5V6.9c0-.2-.1-.5-.3-.6L3 4.6c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.7 1.7v.2c0 .2.1.5.3.6l1.7 1.7c.2.2.4.3.6.3s.4-.1.6-.3l1.7-1.7c.2-.1.3-.4.3-.6V10h2v.1c0 .2.1.5.3.6l1.7 1.7c.2.2.4.3.6.3s.4-.1.6-.3l1.7-1.7c.2-.1.3-.4.3-.6V10h2v.1c0 .2.1.5.3.6l1.7 1.7c.4.4 1 .4 1.4 0s.4-1 0-1.4l-1.7-1.7v-.2zM11 15H9v-2h2v2zm4 0h-2v-2h2v2z"; 

export const QUIZZES_DATA: Quiz[] = [
  {
    id: 'nutricion-prenatal',
    title: 'Nutrición Esencial en el Embarazo',
    category: 'Nutrición',
    description: 'Aprende sobre los nutrientes clave para ti y tu bebé.',
    iconPath: NUTRITION_ICON_PATH,
    questions: [
      {
        id: 'q1n',
        text: '¿Cuál de estos nutrientes es crucial para prevenir defectos del tubo neural en el bebé?',
        options: [
          { id: 'a', text: 'Vitamina C' },
          { id: 'b', text: 'Ácido fólico' },
          { id: 'c', text: 'Calcio' },
          { id: 'd', text: 'Hierro' },
        ],
        correctOptionId: 'b',
        explanation: 'El ácido fólico (vitamina B9) es vital antes y durante las primeras semanas del embarazo para el correcto desarrollo del tubo neural del bebé.',
        points: 10,
      },
      {
        id: 'q2n',
        text: '¿Por qué es importante el hierro durante el embarazo?',
        options: [
          { id: 'a', text: 'Para el desarrollo óseo del bebé.' },
          { id: 'b', text: 'Ayuda a prevenir la anemia y transporta oxígeno.' },
          { id: 'c', text: 'Fortalece el sistema inmunológico de la madre.' },
          { id: 'd', text: 'Esencial para la visión del bebé.' },
        ],
        correctOptionId: 'b',
        explanation: 'El hierro es fundamental para producir hemoglobina, que transporta oxígeno. Su deficiencia puede causar anemia, común en el embarazo.',
        points: 10,
      },
      {
        id: 'q3n',
        text: '¿Qué tipo de grasas son especialmente beneficiosas para el desarrollo cerebral del bebé?',
        options: [
            { id: 'a', text: 'Grasas saturadas' }, 
            { id: 'b', text: 'Grasas trans' }, 
            { id: 'c', text: 'Ácidos grasos Omega-3 (DHA)' }, 
            { id: 'd', text: 'Grasas monoinsaturadas solamente' }
        ],
        correctOptionId: 'c',
        explanation: 'Los ácidos grasos Omega-3, especialmente el DHA, son cruciales para el desarrollo del cerebro y la vista del bebé. Se encuentran en pescados grasos (bajos en mercurio), nueces y semillas de lino.',
        points: 10,
      },
      {
        id: 'q4n',
        text: '¿Cuál es la recomendación general sobre el consumo de cafeína durante el embarazo?',
        options: [
            { id: 'a', text: 'Evitarla completamente' }, 
            { id: 'b', text: 'Limitarla a una cantidad moderada (ej. menos de 200 mg/día)' }, 
            { id: 'c', text: 'Se puede consumir sin límites' }, 
            { id: 'd', text: 'Solo se permite té verde' }
        ],
        correctOptionId: 'b',
        explanation: 'La mayoría de las organizaciones de salud recomiendan limitar la cafeína a menos de 200 mg al día (aproximadamente una taza de café de 12 oz) durante el embarazo, ya que un consumo excesivo se ha asociado con algunos riesgos.',
        points: 10,
      },
      {
        id: 'q5n',
        text: '¿Qué importancia tiene la hidratación adecuada durante el embarazo?',
        options: [
            { id: 'a', text: 'Solo para evitar la sed' }, 
            { id: 'b', text: 'Previene estrías exclusivamente' }, 
            { id: 'c', text: 'Es vital para la formación del líquido amniótico, la circulación y previene el estreñimiento y las ITU' }, 
            { id: 'd', text: 'Aumenta la producción de leche materna antes del parto' }
        ],
        correctOptionId: 'c',
        explanation: 'Una buena hidratación es fundamental durante el embarazo. Ayuda a formar el líquido amniótico, aumenta el volumen sanguíneo, facilita la digestión, previene el estreñimiento y las infecciones del tracto urinario (ITU).',
        points: 10,
      }
    ],
  },
  {
    id: 'ejercicio-bienestar',
    title: 'Ejercicio y Bienestar Prenatal',
    category: 'Ejercicio',
    description: 'Descubre formas seguras y beneficiosas de mantenerte activa.',
    iconPath: EXERCISE_ICON_PATH,
    questions: [
      {
        id: 'q1e',
        text: '¿Cuál de las siguientes actividades suele considerarse segura durante un embarazo sin complicaciones?',
        options: [
          { id: 'a', text: 'Esquí acuático de alta velocidad.' },
          { id: 'b', text: 'Kickboxing intenso.' },
          { id: 'c', text: 'Caminatas y natación.' },
          { id: 'd', text: 'Levantamiento de pesas olímpico.' },
        ],
        correctOptionId: 'c',
        explanation: 'Actividades de bajo impacto como caminar, nadar, yoga prenatal y esferodinamia suelen ser seguras y recomendadas, siempre con aprobación médica.',
        points: 10,
      },
      {
        id: 'q2e',
        text: '¿Qué es la esferodinamia en el contexto prenatal?',
        options:
        [
          {id: 'a', text: 'Un tipo de meditación guiada.'},
          {id: 'b', text: 'Ejercicios realizados con una pelota de Pilates grande.'},
          {id: 'c', text: 'Una técnica de respiración para el parto.'},
          {id: 'd', text: 'Un baile aeróbico de alta intensidad.'},
        ],
        correctOptionId: 'b',
        explanation: 'La esferodinamia utiliza pelotas grandes para realizar ejercicios que mejoran la postura, flexibilidad y fuerza, adaptados para el embarazo.',
        points: 10
      },
      {
        id: 'q3e',
        text: '¿Cuáles son algunos beneficios del ejercicio regular durante el embarazo?',
        options: [
            { id: 'a', text: 'Solo ayuda a controlar el peso' }, 
            { id: 'b', text: 'Reduce el riesgo de complicaciones como diabetes gestacional y preeclampsia, mejora el ánimo y el sueño' }, 
            { id: 'c', text: 'Asegura un parto más rápido y sin dolor' }, 
            { id: 'd', text: 'No tiene beneficios reales, es mejor el reposo absoluto' }
        ],
        correctOptionId: 'b',
        explanation: 'El ejercicio regular (aprobado por el médico) puede reducir el riesgo de diabetes gestacional, preeclampsia, mejorar el estado de ánimo, aliviar dolores de espalda, mejorar el sueño y preparar el cuerpo para el parto.',
        points: 10,
      },
      {
        id: 'q4e',
        text: '¿Qué tipo de ejercicios se deben evitar generalmente durante el embarazo?',
        options: [
            { id: 'a', text: 'Yoga prenatal y Pilates adaptado' }, 
            { id: 'b', text: 'Deportes de contacto, actividades con alto riesgo de caídas o que impliquen acostarse boca arriba por periodos prolongados en etapas avanzadas' }, 
            { id: 'c', text: 'Caminar a paso ligero' }, 
            { id: 'd', text: 'Todos los ejercicios abdominales' }
        ],
        correctOptionId: 'b',
        explanation: 'Se deben evitar deportes de contacto (fútbol, boxeo), actividades con alto riesgo de caídas (esquí, equitación), y ejercicios que requieran acostarse boca arriba por mucho tiempo después del primer trimestre (puede comprimir la vena cava).',
        points: 10,
      },
      {
        id: 'q5e',
        text: '¿Cuándo se debería detener el ejercicio y consultar a un médico durante el embarazo?',
        options: [
            { id: 'a', text: 'Solo si te sientes un poco cansada' }, 
            { id: 'b', text: 'Ante cualquier sangrado vaginal, mareos, dolor de cabeza intenso, dolor en el pecho, o contracciones regulares' }, 
            { id: 'c', text: 'Si sudas demasiado' }, 
            { id: 'd', text: 'Nunca, hay que seguir adelante' }
        ],
        correctOptionId: 'b',
        explanation: 'Es crucial detener el ejercicio y contactar al médico si experimentas sangrado vaginal, mareos, dolor de cabeza severo, dolor en el pecho, debilidad muscular, dolor o hinchazón en la pantorrilla, o contracciones uterinas regulares.',
        points: 10,
      }
    ],
  },
  {
    id: 'mitos-realidad',
    title: 'Mitos y Realidades del Embarazo',
    category: 'Mitos',
    description: 'Desmontando creencias populares sobre el embarazo.',
    iconPath: MYTHS_ICON_PATH,
    questions: [
      {
        id: 'q1m',
        text: 'Mito o Realidad: "Si tienes acidez, tu bebé nacerá con mucho pelo."',
        options: [
          { id: 'a', text: 'Mito total' },
          { id: 'b', text: 'Realidad comprobada científicamente' },
          { id: 'c', text: 'Algunos estudios sugieren una correlación, pero no es una regla.' },
        ],
        correctOptionId: 'c',
        explanation: 'Sorprendentemente, algunos estudios han encontrado una ligera correlación entre la acidez severa y la cantidad de pelo del bebé, posiblemente debido a niveles hormonales. Sin embargo, no es una regla absoluta.',
        points: 10,
      },
      {
        id: 'q2m',
        text: 'Mito o Realidad: "No se puede comer pescado durante el embarazo."',
        options: [
            { id: 'a', text: 'Mito. Se deben evitar ciertos pescados, pero muchos son beneficiosos.' },
            { id: 'b', text: 'Realidad. Todo el pescado es peligroso.' },
        ],
        correctOptionId: 'a',
        explanation: 'Mito. Muchos pescados son una excelente fuente de omega-3. Se deben evitar los pescados con alto contenido de mercurio (como el pez espada o el tiburón), pero pescados como el salmón o la sardina (bien cocidos) son recomendables.',
        points: 10,
      },
      {
        id: 'q3m',
        text: 'Mito o Realidad: "La forma de la panza puede predecir el sexo del bebé."',
        options: [
            { id: 'a', text: 'Realidad, panza puntiaguda es niño, redonda es niña' }, 
            { id: 'b', text: 'Mito. La forma de la panza depende de la musculatura de la madre, la posición del bebé y otros factores.' }, 
            { id: 'c', text: 'Solo funciona si es el primer embarazo' }
        ],
        correctOptionId: 'b',
        explanation: 'Mito. La forma de la barriga está determinada por el tono muscular de la madre, la posición del bebé, la cantidad de líquido amniótico y la estructura corporal, no por el sexo del bebé.',
        points: 10,
      },
      {
        id: 'q4m',
        text: 'Mito o Realidad: "Tener antojos de ciertos alimentos indica una deficiencia nutricional específica."',
        options: [
            { id: 'a', text: 'Realidad, siempre es una señal del cuerpo pidiendo nutrientes.' }, 
            { id: 'b', text: 'Mito. Los antojos son comunes y a menudo relacionados con cambios hormonales, aunque a veces pueden coincidir con necesidades, no es una regla.' }, 
            { id: 'c', text: 'Solo los antojos de cosas no comestibles (pica) indican deficiencias.' }
        ],
        correctOptionId: 'b',
        explanation: 'Mito. Si bien algunos antojos podrían reflejar una necesidad (ej. antojo de carne roja por hierro), la mayoría son impulsados por cambios hormonales y factores psicológicos. La pica (antojo de sustancias no nutritivas) sí puede indicar deficiencias.',
        points: 10,
      },
      {
        id: 'q5m',
        text: 'Mito o Realidad: "Si la madre no come por dos, el bebé no crecerá bien."',
        options: [
            { id: 'a', text: 'Realidad, hay que duplicar las porciones de todo.' }, 
            { id: 'b', text: 'Mito. Se necesita un aumento calórico moderado (unas 300-500 calorías extra al día en el segundo y tercer trimestre), priorizando la calidad nutricional, no la cantidad excesiva.' }, 
            { id: 'c', text: 'Solo aplica para madres con bajo peso.' }
        ],
        correctOptionId: 'b',
        explanation: 'Mito. "Comer por dos" es una exageración. Se requiere un aumento moderado de calorías de alimentos nutritivos, no el doble de comida. La calidad de los alimentos es más importante que la cantidad excesiva.',
        points: 10,
      }
    ],
  },
  {
    id: 'desarrollo-fetal',
    title: 'Maravillas del Desarrollo Fetal',
    category: 'Desarrollo',
    description: 'Sigue el increíble viaje de crecimiento de tu bebé.',
    iconPath: BOOK_OPEN_ICON_PATH, 
    questions: [
      {
        id: 'q1d',
        text: 'Alrededor de las 8 semanas de gestación, ¿con qué fruta se compara comúnmente el tamaño del embrión?',
        options: [
          { id: 'a', text: 'Una sandía' },
          { id: 'b', text: 'Una frambuesa o una judía (frijol)' },
          { id: 'c', text: 'Un pomelo' },
          { id: 'd', text: 'Una uva' },
        ],
        correctOptionId: 'b',
        explanation: 'A las 8 semanas, el embrión mide aproximadamente 1.6 cm, similar al tamaño de una frambuesa o una judía (frijol).',
        points: 10,
      },
      {
        id: 'q2d',
        text: '¿En qué trimestre suelen empezar a sentirse los primeros movimientos fetales (pataditas)?',
        options: [
            { id: 'a', text: 'Primer trimestre (semanas 1-13)' },
            { id: 'b', text: 'Segundo trimestre (semanas 14-27)' },
            { id: 'c', text: 'Tercer trimestre (semanas 28-40+)' },
        ],
        correctOptionId: 'b',
        explanation: 'Generalmente, las madres primerizas sienten los primeros movimientos entre las semanas 18 y 25, y las madres con embarazos previos pueden sentirlos un poco antes, usualmente dentro del segundo trimestre.',
        points: 10,
      },
      {
        id: 'q3d',
        text: '¿Aproximadamente en qué semana de gestación el bebé comienza a oír sonidos?',
        options: [
            { id: 'a', text: 'Semana 5' }, 
            { id: 'b', text: 'Semana 10' }, 
            { id: 'c', text: 'Alrededor de la semana 18-20, y reacciona más consistentemente a partir de la semana 25-27' }, 
            { id: 'd', text: 'Solo después de nacer' }
        ],
        correctOptionId: 'c',
        explanation: 'El sistema auditivo del bebé comienza a desarrollarse temprano, y alrededor de la semana 18-20 puede empezar a oír. Hacia la semana 25-27, es más probable que reaccione a los sonidos, como la voz de la madre.',
        points: 10,
      },
      {
        id: 'q4d',
        text: '¿Qué es el lanugo y cuál es su función?',
        options: [
            { id: 'a', text: 'La primera comida del bebé.' }, 
            { id: 'b', text: 'Un vello fino que cubre el cuerpo del feto, ayudando a regular su temperatura y a que se adhiera la vérnix caseosa.' }, 
            { id: 'c', text: 'El término médico para las pataditas del bebé.' }, 
            { id: 'd', text: 'Un tipo de célula madre.' }
        ],
        correctOptionId: 'b',
        explanation: 'El lanugo es un vello muy fino y suave que cubre el cuerpo del feto. Ayuda a mantener la vérnix caseosa (una sustancia cerosa protectora) sobre la piel y contribuye a la regulación de la temperatura.',
        points: 10,
      },
      {
        id: 'q5d',
        text: '¿Qué importante función cumple la placenta durante el embarazo?',
        options: [
            { id: 'a', text: 'Solo sirve para amortiguar golpes.' }, 
            { id: 'b', text: 'Proporciona oxígeno y nutrientes al bebé, elimina desechos y produce hormonas esenciales para el embarazo.' }, 
            { id: 'c', text: 'Es donde el bebé duerme.' }, 
            { id: 'd', text: 'Determina el sexo del bebé.' }
        ],
        correctOptionId: 'b',
        explanation: 'La placenta es un órgano vital que conecta a la madre con el bebé. Transfiere oxígeno y nutrientes, elimina productos de desecho del bebé, y produce hormonas cruciales para mantener el embarazo.',
        points: 10,
      }
    ],
  },
];

export const APP_NAME = "ObsteriX Play";
export const USER_PROFILE_KEY = "obsterixPlayUserProfile";

export const INITIAL_USER_PROFILE = {
  xp: 0,
  completedQuizIds: [],
  name: "Otro Level",
};
