import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const modules = [
  {
    title: 'Module 1: How to Review for Exams',
    parts: [
      '1. Create a clear study schedule and stick to it.',
      '2. Focus on understanding concepts rather than memorising facts.',
      '3. Use past papers to familiarise yourself with exam formats.',
      '4. Review notes regularly to reinforce learning.',
      '5. Teach someone else to test your knowledge.',
    ],
  },
  {
    title: 'Module 2: Emotional & Physical Prep',
    parts: [
      '1. Get enough sleep to maintain focus.',
      '2. Eat balanced meals for sustained energy.',
      '3. Take short breaks during study sessions.',
      '4. Practise relaxation techniques to reduce anxiety.',
    ],
  },
  {
    title: 'Module 3: Night Before, Exam Day & After',
    parts: [
      '1. Pack everything you need the night before.',
      '2. Arrive early to settle your nerves.',
      '3. Read instructions carefully during the exam.',
      '4. Review your performance afterwards to improve.',
    ],
  },
];

const AdviceScreen = () => {
  const [moduleIndex, setModuleIndex] = useState(0);
  const [partIndex, setPartIndex] = useState(0);

  const module = modules[moduleIndex];
  const isFirst = moduleIndex === 0 && partIndex === 0;
  const isLast =
    moduleIndex === modules.length - 1 && partIndex === module.parts.length - 1;

  const handleNext = () => {
    if (partIndex < module.parts.length - 1) {
      setPartIndex(partIndex + 1);
    } else if (moduleIndex < modules.length - 1) {
      setModuleIndex(moduleIndex + 1);
      setPartIndex(0);
    }
  };

  const handlePrev = () => {
    if (partIndex > 0) {
      setPartIndex(partIndex - 1);
    } else if (moduleIndex > 0) {
      const prevModule = moduleIndex - 1;
      setModuleIndex(prevModule);
      setPartIndex(modules[prevModule].parts.length - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{module.title}</Text>
      <Text style={styles.content}>{module.parts[partIndex]}</Text>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={handlePrev} disabled={isFirst}>
          <Text style={[styles.button, isFirst && styles.disabled]}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} disabled={isLast}>
          <Text style={[styles.button, isLast && styles.disabled]}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 16,
    color: '#2196F3',
  },
  disabled: {
    color: '#aaa',
  },
});

export default AdviceScreen;
