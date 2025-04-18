import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Timer } from '../contexts/TimerContext';

type TimerCardProps = {
  timer: Timer;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
};

const TimerCard = ({ timer, onStart, onPause, onReset }: TimerCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{timer.name}</Text>
      <Text>{timer.remaining}s left</Text>
      <Text>Status: {timer.status}</Text>
      <View style={styles.controls}>
        <Button title="Start" onPress={onStart} />
        <Button title="Pause" onPress={onPause} />
        <Button title="Reset" onPress={onReset} />
      </View>
    </View>
  );
};

export default TimerCard;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
