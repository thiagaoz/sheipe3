import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
import WorkoutDB from '../Database/WorkoutDB';
import ExerciseBaseDB from '../Database/ExerciseBaseDB';
import ExerciseUseDB from '../Database/ExerciseUseDB';
import { createWorkouts } from '../teste.ts/workout';
import { useEffect, useState } from 'react';
import { Workout } from '../models/types';
import Header from '../components/Header';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { setExercisesUseOnDB } from '../teste.ts/exercisesUse';
import AddWorkoutModal from './AddWorkoutModal';
import { setExercisesBaseOnDB } from '../teste.ts/exerciciosBase';
import React from 'react';

export default function HomeScreen() {
  console.log(' ========================    START   ======================')
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const [workouts, setWorkouts] = useState<Workout[]>()
  const [addWorkoutOn, setAddWorkoutOn] = useState<boolean>(false)

  const criarDB = async () => { 
    await WorkoutDB.createTable()
    await ExerciseBaseDB.createTable()
    await ExerciseUseDB.createTable()
    // Populate DB
    
  }

  const deletarDB = async () => { 
    await WorkoutDB.dropTable()
    await ExerciseBaseDB.dropTable()
    await ExerciseUseDB.dropTable()
    setWorkouts([])
  }

  const renderItem = ({item} : {item:Workout}) => { 
    const numberOfExercises = item.exercises? item.exercises.length : 0
    return (
      <TouchableOpacity style={styles.workout_button} onPress={()=>navigation.navigate('DisplayWorkout', [item, item.exercises?.length])}>
        <Text style={styles.workout_label}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  const adicionarWorkouts = async () => { 
    await createWorkouts()
    await setExercisesBaseOnDB()
    await setExercisesUseOnDB()
    const tempWorkouts = await WorkoutDB.getAll()
    tempWorkouts.sort( (a,b) => a.position - b.position)
    setWorkouts(tempWorkouts)
  }

  const fetchData = async () => {
    await criarDB();
    const tempWorkouts = await WorkoutDB.getAll();
    tempWorkouts.sort((a, b) => a.position - b.position);
    setWorkouts(tempWorkouts);
  };

  useEffect(() => {
      fetchData();
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);
  
  return (
    <View style={styles.container}>
      <Header />
      <StatusBar style="auto" />
      <View style={styles.flatlist}>
        {workouts?.length!==0?
          <FlatList
            data={workouts}
            keyExtractor={(item) =>  item.id.toString() } 
            renderItem={renderItem}
          />
          : null
        }
      </View>
      <View style={styles.teste_buttons}>
      <TouchableOpacity style={styles.add_treino_view} onPress={() =>  criarDB()}>
          <Text>CRIAR DB</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.add_treino_view} onPress={() => adicionarWorkouts()}>
          <Text>ADD TREINOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.add_treino_view} onPress={() => deletarDB()}>
          <Text>DELETAR DB</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom_buttons_view} >
      <TouchableOpacity style={styles.bottom_button} onPress={() => setAddWorkoutOn(true)}>
          <Text>Novo treino</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bottom_button, styles.bottom_button_middle]} 
          onPress={() => { navigation.navigate('EditWorkouts') }}>
            <Text>Organizar treinos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottom_button} onPress={() => { navigation.navigate('ExercisesDB') }}>
          <Text style={styles.lista_text}>Lista de Exercícios</Text>
        </TouchableOpacity>
      </View>
      { addWorkoutOn&&
        <AddWorkoutModal workouts={workouts} setWorkouts={setWorkouts} setAddWorkoutOn={setAddWorkoutOn} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flatlist:{
    height: 400,
    width: 270,
    alignSelf:'center',
    marginBottom: 2
  },
  teste_buttons:{
    flexDirection: 'row',
    marginTop: 20,
    width: '90%'
  },
  add_treino_view:{
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    padding: 5,
    width: 110
  },
  workout_button:{
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 0.5
  },
  workout_label:{
    fontSize: 20,
    textAlign: 'center',
  },
  bottom_buttons_view:{
    flexDirection: 'row',
    width: '99%',
    height: 50,
   
  },
  bottom_button:{
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottom_button_middle:{
    borderRightWidth: 0,
    borderLeftWidth: 0,

  },
  lista_text:{
    width: '70%',
    textAlign: 'center'
  }
});


