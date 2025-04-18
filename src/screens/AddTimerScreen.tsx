import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TimerContext, Timer } from '../contexts/TimerContext';

type AddTimerScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function AddTimerScreen({ navigation }: AddTimerScreenProps) {
  const { dispatch } = useContext(TimerContext);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  const handleAdd = () => {
    if (!name || !duration || !category) return;

    const timer: Timer = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration),
      remaining: parseInt(duration),
      category,
      status: 'Paused',
    };

    dispatch({ type: 'ADD_TIMER', payload: timer });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text>Duration (seconds)</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <Text>Category</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} />
      <Button title="Add Timer" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
});
