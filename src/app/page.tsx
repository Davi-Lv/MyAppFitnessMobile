"use client";

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, CheckCircle, Clock, Dumbbell, Target, Calendar } from 'lucide-react';
import ThemeColorUpdater from './components/ThemeColorUpdater';

export default function Home() {

  const [currentDay, setCurrentDay] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const [completedSets, setCompletedSets] = useState<Record<string, boolean | undefined>>({});
  const [timerActive, setTimerActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weights, setWeights] = useState<Record<string, string>>({});
  const [inputWeight, setInputWeight] = useState<Record<string, string>>({});
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);

  const workoutPlan = [
    {
      day: "SEGUNDA",
      name: "PUSH - Ênfase Peitoral Superior",
      color: "bg-red-500",
      emoji: "🔥",
      exercises: [
        { name: "Supino Inclinado com Halteres", sets: 4, reps: "8-12", rest: 90, image1: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/supino-inclinado-com-halteres.gif", tips: "Ênfase no peitoral superior. Amplitude completa." },
        { name: "Desenvolvimento de Ombros com Halteres (sentado)", sets: 4, reps: "8-10", rest: 90, image1: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/desenvolvimento-para-ombros-com-halteres.gif", tips: "Posição sentada para melhor estabilização." },
        { name: "Supino Reto na Máquina ou com Halteres", sets: 3, reps: "10-12", rest: 60, image1: "https://www.hipertrofia.org/blog/wp-content/uploads/2020/06/dumbbell-bench-press.gif", tips: "Foco na contração do peitoral." },
        { name: "Elevação Lateral com Halteres", sets: 4, reps: "12-15", rest: 60, image1: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/ombros-elevacao-lateral-de-ombros-com-halteres.gif", tips: "Essencial para a largura dos ombros. Foque na execução, não na carga." },
        { name: "Crossover na Polia (de cima para baixo)", sets: 3, reps: "12-15", rest: 60, image1: "https://i0.wp.com/meutreinador.com/wp-content/uploads/2024/04/Crossover-polia-alta.gif?fit=1080%2C1080&ssl=1", tips: "Esmague o peitoral no final do movimento para criar definição." },
        { name: "Tríceps Francês (Overhead Extension)", sets: 3, reps: "10-15", rest: 60, image1: "https://media.tenor.com/V3J-mg9gH0kAAAAM/seated-dumbbell-triceps-extension.gif", tips: "Cotovelos fixos, movimento controlado." },
        { name: "Tríceps na Polia com Corda", sets: 3, reps: "12-15", rest: 60, image1: "https://i0.wp.com/omelhortreino.com.br/wp-content/uploads/2025/04/Triceps-na-polia-com-corda.gif?resize=550%2C550&ssl=1", tips: "No final do movimento, afaste as mãos para maximizar a contração do tríceps. Até a falha na última série." }
      ]
    },
    {
      day: "TERÇA",
      name: "PULL - Ênfase Largura de Costas",
      color: "bg-blue-500",
      emoji: "🎯",
      exercises: [
        { name: "Puxador Frontal (Pegada Aberta)", sets: 4, reps: "8-12", rest: 90, image1: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/costas-puxada-aberta-com-barra-no-pulley.gif", tips: "Foco na largura das costas. Puxar até o peito." },
        { name: "Remada Curvada com Barra", sets: 4, reps: "6-10", rest: 90, image1: "https://www.hipertrofia.org/blog/wp-content/uploads/2017/11/remada-curvada-no-cross.gif", tips: "Espessura das costas. Joelhos levemente flexionados." },
        { name: "Remada Serrote com Halter", sets: 3, reps: "10-12/lado", rest: 60, image1: "https://media.tenor.com/oGaZzkaXnSIAAAAM/db-tripod-row.gif", tips: "Joelho apoiado no banco. Movimento controlado." },
        { name: "Face Pull na Polia", sets: 3, reps: "15-20", rest: 60, image1: "https://i.pinimg.com/originals/64/b8/65/64b865cac817f257f94bb26eab1f9531.gif", tips: "Fundamental para a saúde dos ombros e para trabalhar a parte de trás dos deltoides." },
        { name: "Rosca Direta com Barra W", sets: 4, reps: "8-12", rest: 60, image1: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/rosca-biceps-direta-na-barra-ez.gif", tips: "Massa bíceps. Barra W protege os punhos." },
        { name: "Rosca Martelo com Halteres", sets: 3, reps: "10-12", rest: 60, image1: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/rosca-biceps-martelo-com-halteres.gif", tips: "Trabalha o músculo braquial, dando uma aparência mais densa ao braço." },
        { name: "Encolhimento de Ombros com Halteres", sets: 4, reps: "12-15", rest: 60, image1: "https://www.hipertrofia.org/blog/wp-content/uploads/2024/01/dumbbell-shrug.gif", tips: "Foque em encolher os ombros verticalmente, sem girá-los." }
      ]
    },
    {
      day: "QUARTA",
      name: "LEGS - Ênfase Posteriores e Glúteos",
      color: "bg-green-500",
      emoji: "🦵",
      exercises: [
        { name: "Agachamento Livre com Barra", sets: 4, reps: "6-10", rest: 180, image1: "https://media.tenor.com/Re3T3B66V9UAAAAM/barbellsquats-gymexercisesmen.gif", tips: "Rei dos exercícios. Descer até paralelo ou abaixo." },
        { name: "Stiff ou Levantamento Terra Romeno", sets: 4, reps: "8-12", rest: 90, image1: "https://media.tenor.com/U-KW3hhwhxcAAAAM/gym.gif", tips: "Ênfase nos posteriores de coxa e glúteos. Quadril para trás." },
        { name: "Leg Press 45º", sets: 4, reps: "10-15", rest: 90, image1: "https://i.makeagif.com/media/10-20-2024/HB7aRZ.gif", tips: "Use para adicionar volume seguro às pernas após os exercícios livres." },
        { name: "Afundo Búlgaro com Halteres", sets: 3, reps: "10-12/perna", rest: 60, image1: "https://cdn.fisiculturismo.com.br/monthly_2021_09/agachamento-bulgaro-com-halter-animacao.gif.d751e04a34ecbeb73fecdfea4560a896.gif", tips: "Pé traseiro elevado. Foco no glúteo da perna da frente." },
        { name: "Mesa Flexora", sets: 3, reps: "12-15", rest: 60, image1: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/04/pernas-flexao-de-pernas-na-maquina.gif", tips: "Isolamento dos posteriores de coxa. Movimento controlado." },
        { name: "Cadeira Extensora", sets: 3, reps: "15-20", rest: 60, image1: "https://media.tenor.com/fNeMiJuGmEcAAAAM/cadeira-extensora-extensora.gif", tips: "Excelente para finalizar o quadríceps. Segure a contração por 1 segundo no topo." },
        { name: "Panturrilha em Pé na Máquina", sets: 5, reps: "10-15", rest: 60, image1: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/03/Panturrilha-em-pe-no-aparelho.gif", tips: "Gastrocnêmio. Amplitude máxima e contração no topo." },
        { name: "Panturrilha Sentado", sets: 3, reps: "15-20", rest: 60, image1: "https://www.hipertrofia.org/blog/wp-content/uploads/2018/10/lever-seated-calf-raise-.gif", tips: "Trabalha o músculo sóleo, dando uma aparência mais completa à panturrilha." }
      ]
    },
    {
      day: "QUINTA",
      name: "UPPER BODY - Foco em Hipertrofia",
      color: "bg-purple-500",
      emoji: "💪",
      exercises: [
        { name: "Supino Reto com Halteres", sets: 4, reps: "10-15", rest: 60, image1: "https://www.hipertrofia.org/blog/wp-content/uploads/2020/06/dumbbell-bench-press.gif", tips: "Foco na hipertrofia do peito. Movimento controlado." },
        { name: "Remada na Polia Baixa (Pegada Neutra/Triângulo)", sets: 4, reps: "10-15", rest: 60, image1: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/09/remada-sentado-com-cabos-e-triangulo-para-costas.gif", tips: "Pegada neutra trabalha bem o meio das costas." },
        { name: "Desenvolvimento de Ombros na Máquina", sets: 3, reps: "10-15", rest: 60, image1: "https://media.tenor.com/vFJSvh8AvhAAAAAM/a1.gif", tips: "A máquina permite focar totalmente na contração dos ombros sem se preocupar com a estabilização." },
        { name: "Elevação Lateral com Halteres", sets: 4, reps: "12-15", rest: 60, image1: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/ombros-elevacao-lateral-de-ombros-com-halteres.gif", tips: "Largura dos ombros. Execução perfeita." },
        { name: "Crucifixo Invertido na Máquina ou com Halteres", sets: 3, reps: "15-20", rest: 60, image1: "https://i0.wp.com/omelhortreino.com.br/wp-content/uploads/2025/06/Voador-invertido.gif?resize=550%2C550&ssl=1", tips: "Foco na parte de trás dos ombros (deltoide posterior)." },
        { name: "Rosca Alternada com Halteres", sets: 3, reps: "10-12/braço", rest: 60, image1: "https://treinoemalta.com.br/wp-content/uploads/2023/07/Rosca-Alternada-com-Halteres.gif", tips: "Alternando os braços. Controle total do movimento." },
        { name: "Tríceps na Polia com Barra Reta", sets: 3, reps: "12-15", rest: 60, image1: "https://media.tenor.com/GpvUxIvyOZ0AAAAM/tr%C3%ADceps-pulley-corda.gif", tips: "Barra reta para variação no tríceps." }
      ]
    },
    {
      day: "SEXTA",
      name: "FULL BODY - Foco em Pontos Fracos",
      color: "bg-orange-500",
      emoji: "🔥",
      exercises: [
        { name: "Elevação Pélvica (Hip Thrust)", sets: 4, reps: "10-15", rest: 90, image1: "https://newlife.com.cy/wp-content/uploads/2019/11/10601301-Barbell-Hip-Thrust_Hips_360.gif", tips: "O melhor exercício para construir glúteos fortes." },
        { name: "Crossover Baixo para Alto (na polia)", sets: 3, reps: "12-15", rest: 60, image1: "https://i0.wp.com/meutreinador.com/wp-content/uploads/2024/04/Crossover-polia-alta.gif?fit=1080%2C1080&ssl=1", tips: "Movimento de baixo para alto trabalha o peitoral superior." },
        { name: "Pullover com Halter", sets: 3, reps: "12-15", rest: 60, image1: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/04331301-Dumbbell-Straight-Arm-Pullover_Chest-FIX_360_logo.gif", tips: "Trabalha serrátil e amplia a caixa torácica." },
        { name: "Elevação Frontal com Halteres (alternado)", sets: 3, reps: "10-12/lado", rest: 60, image1: "https://i0.wp.com/omelhortreino.com.br/wp-content/uploads/2025/03/Elevacao-Frontal-Alternada-Com-Halteres.gif?resize=550%2C550&ssl=1", tips: "Para a parte da frente dos ombros. Eleve o halter até a altura do ombro, de forma controlada." },
        { name: "Super-série: Rosca Martelo + Tríceps Polia", sets: 3, reps: "10-15 cada", rest: 90, image1: "https://www.hipertrofia.org/blog/wp-content/uploads/2024/08/cable-hammer-curl-with-rope.gif", image2: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/07/triceps-puxada-no-pulley.gif", tips: "Super-série de braços. Sem descanso entre os exercícios." },
        { name: "Cadeira Flexora", sets: 4, reps: "12-15", rest: 60, image1: "https://www.hipertrofia.org/blog/wp-content/uploads/2024/12/cadeira-flexora.gif", tips: "Um volume extra para os posteriores, que respondem bem a mais frequência." },
        { name: "Prancha Abdominal", sets: 4, reps: "Até a falha", rest: 60, image1: "https://lh3.googleusercontent.com/proxy/gyHoFwrUjqEjVOtKN5yvlDDm08v355PbidwiUm9g7pabGtdOYxxp5C77p3gR9WCBDejutmOi3lswk82lShHNqHKuGKZZzn1_AXJUVdkRCbWRGtUkx1A", tips: "Core forte. Manter alinhamento perfeito." }
      ]
    }
  ];


  useEffect(() => {
    const today = new Date().getDay(); // Domingo = 0, Segunda = 1, etc.
    const dayIndex = today === 0 ? 6 : today - 1; // Ajusta para o array (Segunda = 0)
    setCurrentDay(dayIndex);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (timerActive && restTime > 0) {
      interval = setInterval(() => {
        setRestTime(prev => prev - 1);
      }, 1000);
    } else if (restTime === 0 && timerActive) {
      setTimerActive(false);
      setIsResting(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, restTime]);

  useEffect(() => {
    try {
      const savedWeights = localStorage.getItem('exerciseWeights');
      if (savedWeights) {
        const parsedWeights = JSON.parse(savedWeights);
        setWeights(parsedWeights);
        setInputWeight(parsedWeights);
      }
    } catch (error) {
      console.error("Failed to parse weights from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(weights).length > 0) {
      localStorage.setItem('exerciseWeights', JSON.stringify(weights));
    }
  }, [weights]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRest = (duration: number) => {
    setRestTime(duration);
    setIsResting(true);
    setTimerActive(true);
  };

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setRestTime(0);
    setIsResting(false);
  };

  const markSetComplete = (dayIndex: number, exerciseIndex: number, setIndex: number) => {
    const key = `${dayIndex}-${exerciseIndex}-${setIndex}`;
    setCompletedSets(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleWeightChange = (exerciseName: string, value: string) => {
    setInputWeight(prev => ({ ...prev, [exerciseName]: value }));
  };

  const saveWeight = (exerciseName: string) => {
    if (inputWeight[exerciseName]) {
      setWeights(prev => ({ ...prev, [exerciseName]: inputWeight[exerciseName] }));
    }
  };

  const openWeightModal = () => {
    setInputWeight(prev => ({
      ...prev,
      [currentEx.name]: weights[currentEx.name] || ''
    }));
    setIsWeightModalOpen(true);
  };

  const closeWeightModal = () => {
    setIsWeightModalOpen(false);
  };

  const saveWeightAndCloseModal = (exerciseName: string) => {
    saveWeight(exerciseName);
    closeWeightModal();
  };

  const currentWorkout = workoutPlan[currentDay];
  const currentEx = currentWorkout.exercises[currentExercise];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ThemeColorUpdater colorClass={currentWorkout.color} />
      {/* Header */}
      <div className={`${currentWorkout.color} p-4 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl">{currentWorkout.emoji}</span>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">{currentWorkout.day}</h1>
              <p className="text-xs sm:text-sm opacity-90">{currentWorkout.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs sm:text-sm opacity-90">Exercício</p>
              <p className="text-lg sm:text-xl font-bold">{currentExercise + 1}/{currentWorkout.exercises.length}</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="p-2 bg-white/20 rounded-lg">
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Rest Timer is now integrated into the button below */}

      {/* Exercise Details */}
      <div className="p-2 sm:p-4">
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-4">

          {/* Exercise Navigation */}
          <div className="flex gap-2 sm:gap-4 mb-4">
            <button
              onClick={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
              disabled={currentExercise === 0}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            <button
              onClick={() => setCurrentExercise(Math.min(currentWorkout.exercises.length - 1, currentExercise + 1))}
              disabled={currentExercise === currentWorkout.exercises.length - 1}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              <span className="hidden sm:inline">Próximo</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">{currentEx.name}</h2>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{currentEx.sets} séries</span>
            </div>
          </div>

          {/* Exercise Image */}
          <div className="mb-4">
            <img
              src={currentEx.image1}
              alt={`${currentEx.name}`}
              className="w-full sm: object-cover rounded-lg"
            />
          </div>

          {/* Exercise Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4">
            <div className="bg-gray-700 p-3 rounded-lg text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-400">{currentEx.sets}</div>
              <div className="text-xs sm:text-sm text-gray-300">Séries</div>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-400">{currentEx.reps}</div>
              <div className="text-xs sm:text-sm text-gray-300">Repetições</div>
            </div>
            <button onClick={openWeightModal} className="bg-gray-700 p-3 rounded-lg text-center hover:bg-gray-600 transition-colors">
              <div className="text-xl sm:text-2xl font-bold text-purple-400">{weights[currentEx.name] ? `${weights[currentEx.name]}` : '-'}</div>
              <div className="text-xs sm:text-sm text-gray-300">Peso (kg)</div>
            </button>
            <div className="bg-gray-700 p-3 rounded-lg text-center">
              <div className="text-xl sm:text-2xl font-bold text-yellow-400">{formatTime(currentEx.rest)}</div>
              <div className="text-xs sm:text-sm text-gray-300">Descanso</div>
            </div>
          </div>

          {/* Rest Button */}
          {isResting ? (
            <div className="w-full py-2 rounded-lg font-semibold transition-all bg-yellow-600 text-white flex items-center justify-center mb-2">
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                <div>
                  <p className="text-base sm:text-xl font-bold">{formatTime(restTime)}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={toggleTimer} className="p-2 bg-yellow-700 rounded-lg">
                    {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button onClick={resetTimer} className="p-2 bg-yellow-700 rounded-lg">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => startRest(currentEx.rest)}
              className='w-full py-3 rounded-lg font-semibold transition-all bg-yellow-600 hover:bg-yellow-700 text-white mb-2'
            >
              {`Iniciar Descanso (${formatTime(currentEx.rest)})`}
            </button>
          )}

          {/* Sets Tracker */}
          <div className="mb-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Controle de Séries
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Array.from({ length: currentEx.sets }, (_, setIndex) => {
                const key = `${currentDay}-${currentExercise}-${setIndex}`;
                const isCompleted = completedSets[key];
                return (
                  <button
                    key={setIndex}
                    onClick={() => markSetComplete(currentDay, currentExercise, setIndex)}
                    className={`p-3 rounded-lg border-2 transition-all ${isCompleted
                      ? 'bg-green-600 border-green-500 text-white'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                  >
                    <div className="text-center">
                      <div className="font-bold text-sm">Série {setIndex + 1}</div>
                      <div className="text-xs mt-1">
                        {isCompleted ? '✓ Feito' : `${currentEx.reps} reps`}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-900 bg-opacity-50 p-3 rounded-lg mb-4">
          <div className="flex items-start gap-2">
            <Target className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-300 mb-1">Dicas de Execução:</h4>
              <p className="text-sm text-gray-300 min-h-[2.5rem]">{currentEx.tips}</p>
            </div>
          </div>
        </div>

        {/* Exercise List */}
        <div className="mt-6">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Exercícios do Dia</h3>
          <div className="space-y-2">
            {currentWorkout.exercises.map((exercise, index) => {
              const completedSetsCount = Array.from({ length: exercise.sets }, (_, setIndex) =>
                completedSets[`${currentDay}-${index}-${setIndex}`]
              ).filter(Boolean).length;

              return (
                <button
                  key={index}
                  onClick={() => setCurrentExercise(index)}
                  className={`w-full p-3 sm:p-4 rounded-lg text-left transition-all ${index === currentExercise
                    ? `${currentWorkout.color} shadow-lg`
                    : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <img src={exercise.image1} alt={exercise.name} className="h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm sm:text-base">{exercise.name}</div>
                      <div className="text-xs sm:text-sm opacity-75">
                        {exercise.sets}s • {exercise.reps}r • {formatTime(exercise.rest)}d
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs sm:text-sm opacity-75">Progresso</div>
                      <div className="font-bold text-sm sm:text-base">
                        {completedSetsCount}/{exercise.sets}
                      </div>
                    </div>
                  </div>
                  {completedSetsCount > 0 && completedSetsCount < exercise.sets && (
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                      <div
                        className={`${currentWorkout.color} h-1.5 rounded-full`}
                        style={{ width: `${(completedSetsCount / exercise.sets) * 100}%` }}
                      ></div>
                    </div>
                  )}
                  {completedSetsCount === exercise.sets && (
                    <div className="mt-2 flex items-center gap-1 text-green-400 text-xs sm:text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Exercício Completo!
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Workout Summary */}
        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold mb-3">Resumo do Treino</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                {currentWorkout.exercises.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-300">Exercícios</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">
                {currentWorkout.exercises.reduce((total, ex) => total + ex.sets, 0)}
              </div>
              <div className="text-xs sm:text-sm text-gray-300">Séries Totais</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs sm:text-sm text-gray-300 mb-2">
              <span>Progresso Geral</span>
              <span>
                {Object.keys(completedSets).filter(key =>
                  key.startsWith(`${currentDay}-`) && completedSets[key]
                ).length} / {currentWorkout.exercises.reduce((total, ex) => total + ex.sets, 0)}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5 sm:h-3">
              <div
                className={`${currentWorkout.color} h-2.5 sm:h-3 rounded-full transition-all duration-300`}
                style={{
                  width: `${(Object.keys(completedSets).filter(key =>
                    key.startsWith(`${currentDay}-`) && completedSets[key]
                  ).length / currentWorkout.exercises.reduce((total, ex) => total + ex.sets, 0)) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Day Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Escolha o dia do treino</h3>
            <div className="space-y-2">
              {workoutPlan.map((day, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentDay(index);
                    setCurrentExercise(0);
                    resetTimer();
                    setIsModalOpen(false);
                  }}
                  className={`w-full p-3 sm:p-4 rounded-lg text-left transition-all ${index === currentDay
                    ? `${day.color} shadow-lg`
                    : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{day.emoji}</span>
                    <div>
                      <div className="font-bold">{day.day}</div>
                      <div className="text-sm opacity-80">{day.name}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-semibold"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Weight Input Modal */}
      {isWeightModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Atualizar Peso para {currentEx.name}</h3>
            <div className="flex gap-2">
              <input
                type="number"
                value={inputWeight[currentEx.name] || ''}
                onChange={(e) => handleWeightChange(currentEx.name, e.target.value)}
                className="w-full p-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none"
                placeholder="Digite o peso em kg"
                autoFocus
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={closeWeightModal}
                className="flex-1 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={() => saveWeightAndCloseModal(currentEx.name)}
                className="flex-1 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-semibold text-white"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
