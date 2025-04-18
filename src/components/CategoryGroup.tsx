import React, { JSX, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Timer } from '../contexts/TimerContext';

type CategoryGroupProps = {
  category: string;
  timers: Timer[];
  onStartAll: (category: string) => void;
  onPauseAll: (category: string) => void;
  onResetAll: (category: string) => void;
  renderTimer: (timer: Timer) => JSX.Element;
};

const CategoryGroup = ({ category, timers, onStartAll, onPauseAll, onResetAll, renderTimer }: CategoryGroupProps) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <View style={styles.group}>
      <View style={styles.header}>
        <Text style={styles.title}>{category}</Text>
        <Button title={expanded ? 'Hide' : 'Show'} onPress={() => setExpanded(!expanded)} />
      </View>
      {expanded && (
        <View>
          {timers.map(renderTimer)}
          <View style={styles.bulkControls}>
            <Button title="Start All" onPress={() => onStartAll(category)} />
            <Button title="Pause All" onPress={() => onPauseAll(category)} />
            <Button title="Reset All" onPress={() => onResetAll(category)} />
          </View>
        </View>
      )}
    </View>
  );
};

export default CategoryGroup;

const styles = StyleSheet.create({
  group: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bulkControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});
