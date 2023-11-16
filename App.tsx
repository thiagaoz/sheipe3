import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import AddWorkoutScreen from './screens/AddWorkoutModal';
import DisplayWorkoutScreen from './screens/DisplayWorkoutScreen';
import { Workout } from './models/types';
import EditWorkoutScreen from './screens/EditWorkoutsScreen';
import ExercisesDBScreen from './screens/ExercisesDBScreen';


export type RootStackParamList = {
  Home: undefined;
  DisplayWorkout: Workout;
  EditWorkouts: undefined;
  ExercisesDB: undefined;
  
  // Add other screen names and their corresponding params if needed
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  
  console.log(' ---------------- START ----------------')
  
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerShown: false // Hide the header for all screens
          }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name='DisplayWorkout'>
          {props => <DisplayWorkoutScreen {...props} workout={props.route.params} />}
        </Stack.Screen>
        <Stack.Screen name='EditWorkouts' component={EditWorkoutScreen} />
        <Stack.Screen name='ExercisesDB' component={ExercisesDBScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


