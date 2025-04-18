import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TimerContext } from '../contexts/TimerContext';

const HistoryScreen = () => {
  const { state } = useContext(TimerContext);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Completed Timers</Text>
      {state.history.length === 0 ? (
        <Text style={styles.noHistory}>No history available.</Text>
      ) : (
        state.history.map((entry, index) => (
          <View key={index} style={styles.entry}>
            <Text style={styles.timerName}>{entry.name}</Text>
            <Text style={styles.time}>Completed at: {entry.time}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  noHistory: { fontStyle: 'italic', color: 'gray' },
  entry: { marginBottom: 15 },
  timerName: { fontSize: 16, fontWeight: '600' },
  time: { color: 'gray' },
});
