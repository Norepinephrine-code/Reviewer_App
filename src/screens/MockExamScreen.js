import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../components/CustomButton';

const SUBJECTS = ['Filipino', 'English', 'Science', 'Math', 'Abstract/Logical'];
const QUESTIONS_PER_SUBJECT = 20; // 100 total for 5 subjects

const MockExamScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        let list = [];
        for (const subject of SUBJECTS) {
          const snapshot = await firestore()
            .collection('questions')
            .where('subject', '==', subject)
            .orderBy('subtopic')
            .orderBy('order')
            .limit(QUESTIONS_PER_SUBJECT)
            .get();
          snapshot.forEach(doc => {
            list.push({ id: doc.id, ...doc.data() });
          });
        }
        setQuestions(list.slice(0, 100));
      } catch (error) {
        console.log('Error fetching questions:', error);
      }
    };
    loadQuestions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(interval);
          finishExam();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [questions]);

  const finishExam = () => {
    navigation.replace('Result', { score, total: questions.length });
  };

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[current].correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
    } else {
      finishExam();
      return;
    }
    setSelected(null);
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(c => c - 1);
      setSelected(null);
    }
  };

  const question = questions[current];

  const formatTime = sec => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!question) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const isCorrect = selected === question.correctIndex;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.timer}>Time Left: {formatTime(timeLeft)}</Text>
      <Text style={styles.question}>{current + 1}. {question.question}</Text>
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
        </View>
      )}
      <View style={styles.navButtons}>
        <CustomButton title="Previous" onPress={handlePrev} />
        <CustomButton
          title={current === questions.length - 1 ? 'Finish' : 'Next'}
          onPress={handleNext}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  timer: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    marginBottom: 12,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  feedbackContainer: {
    marginTop: 20,
  },
  correct: {
    color: 'green',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  incorrect: {
    color: 'red',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  explanation: {
    marginBottom: 12,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default MockExamScreen;
