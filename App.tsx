import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WorkoutDB from './Database/WorkoutDB';

export default function App() {

  WorkoutDB.createWorkoutsTable()
  WorkoutDB.dropWorkoutsTable()

  return (
    <View style={styles.container}>
      <Text>Olhe o console!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
