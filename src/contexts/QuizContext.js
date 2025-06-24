import React, { createContext, useState } from 'react';

/**
 * Context managing the state for any quiz session.
 * Stores the ordered list of questions, the current index,
 * user answers keyed by question id, and the running score.
 */
export const QuizContext = createContext({
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: {},
  score: 0,
  startQuiz: () => {},
  submitAnswer: () => {},
  goToNextQuestion: () => {},
  resetQuiz: () => {},
});

export const QuizProvider = ({ children }) => {
  // Ordered list of questions for the active quiz session
  const [questions, setQuestions] = useState([]);
  // Index of the question currently shown to the user
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Mapping of question id -> selected answer
  const [userAnswers, setUserAnswers] = useState({});
  // Number of correct answers given so far
  const [score, setScore] = useState(0);

  /**
   * Initializes a fresh quiz session.
   * @param {Array} questionsArray List of question objects fetched from Firestore.
   */
  const startQuiz = (questionsArray) => {
    console.log('Starting quiz');
    setQuestions(questionsArray);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setScore(0);
  };

  /**
   * Stores the selected answer for the current question and updates the score.
   * @param {*} selectedOption Value representing the chosen option.
   */
  const submitAnswer = (selectedOption) => {
    const question = questions[currentQuestionIndex];
    if (!question) return;

    const questionId = question.id ?? currentQuestionIndex;

    console.log(`Submitting answer for question ${questionId}:`, selectedOption);
    setUserAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));

    const correctIndex = question.correctIndex;
    if (selectedOption === correctIndex) {
      setScore((prev) => {
        const newScore = prev + 1;
        console.log('Score updated:', newScore);
        return newScore;
      });
    }
  };

  /**
   * Advances to the next question if available.
   */
  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prev) => {
      const nextIndex = Math.min(prev + 1, questions.length - 1);
      console.log('Moving to question index:', nextIndex);
      return nextIndex;
    });
  };

  /**
   * Clears all quiz data allowing a new session to start.
   */
  const resetQuiz = () => {
    console.log('Resetting quiz');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setScore(0);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        userAnswers,
        score,
        startQuiz,
        submitAnswer,
        goToNextQuestion,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

// Convenience hook to use the QuizContext
export const useQuiz = () => React.useContext(QuizContext);
