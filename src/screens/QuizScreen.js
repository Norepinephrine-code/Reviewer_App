import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';

const questions = [
  {
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctIndex: 1,
    explanation: '2 + 2 equals 4.'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctIndex: 1,
    explanation: 'Mars is often called the Red Planet because of its reddish appearance.'
  }
];

const QuizScreen = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const question = questions[current];

  const handleSelect = (index) => {
    if (selected !== null) return;
    setSelected(index);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setCurrent(0);
    }
    setSelected(null);
  };

  const isCorrect = selected === question.correctIndex;

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      {question.options.map((option, idx) => {
        let icon = '';
        if (selected !== null) {
          if (idx === question.correctIndex) icon = ' ✅';
          if (idx === selected && idx !== question.correctIndex) icon = ' ❌';
        }
        return (
          <TouchableOpacity
            key={idx}
            style={styles.option}
            onPress={() => handleSelect(idx)}
            disabled={selected !== null}
          >
            <Text>{option}{icon}</Text>
          </TouchableOpacity>
        );
      })}
      {selected !== null && (
        <View style={styles.feedbackContainer}>
          <Text style={isCorrect ? styles.correct : styles.incorrect}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </Text>
          <Text style={styles.explanation}>{question.explanation}</Text>
          <CustomButton title="Next Question" onPress={handleNext} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center'
  },
  question: {
    fontSize: 18,
    marginBottom: 12
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  feedbackContainer: {
    marginTop: 20
  },
  correct: {
    color: 'green',
    marginBottom: 8,
    fontWeight: 'bold'
  },
  incorrect: {
    color: 'red',
    marginBottom: 8,
    fontWeight: 'bold'
  },
  explanation: {
    marginBottom: 12
  }
});

export default QuizScreen;
