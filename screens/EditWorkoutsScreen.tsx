import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Alert  } from 'react-native';
import WorkoutDB from '../Database/WorkoutDB';
import ExerciseBaseDB from '../Database/ExerciseBaseDB';
import ExerciseUseDB from '../Database/ExerciseUseDB';
import { createWorkouts } from '../teste.ts/workout';
import { useEffect, useRef, useState } from 'react';
import { Workout } from '../models/types';
import Header from '../components/Header';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { setExercisesUseOnDB } from '../teste.ts/exercisesUse';
import AddWorkoutModal from './AddWorkoutModal';
import { Ionicons, MaterialIcons, AntDesign, Entypo  } from '@expo/vector-icons';

export default function EditWorkoutScreen() {
  
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [workouts, setWorkouts] = useState<Workout[]>()
  const inputRef = useRef<TextInput | null>(null);
  const [inputText, setInputText] = useState<string>('')
  const [beingEdited, setBeingEdited] = useState<string>('')
  const [isPositionEdited, setIsPositionEdited] = useState<boolean>(false)

  const handleNameEdition = (name:string) => {
    setBeingEdited(name)
    setInputText(name);
  }

  const handleSaveEdition = async (workout:Workout) => { 
    const updatedWorkout = {...workout, name:inputText}
    await WorkoutDB.update(updatedWorkout)
    const updatedWorkoutsArr = workouts
    updatedWorkoutsArr![workout.position] = updatedWorkout
    setWorkouts(updatedWorkoutsArr)
    setBeingEdited('')
    setInputText('')
  }

  const handleDelete = async (workout:Workout) => { 
    await WorkoutDB.remove(workout)
    const filteredWorkouts = workouts?.filter( item => item.id !== workout.id)
    setWorkouts(filteredWorkouts)
  }

  const deletionAlert = async (workout:Workout) => {
    Alert.alert(
      'Cuidado!',
      `Esse treino será excluído para sempre. Deseja continuar?`,
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => handleDelete(workout),
        },
      ],
      { cancelable: false }
    );
  };

  //ArrowUP = subtract (-1) index position
  const handleArrowUp = async (oldPosition:number) => { 
    if (!workouts) return true
    if (oldPosition === 0) return true //doesnt work if the index is zero
    else{
      await WorkoutDB.update({
        ...workouts[oldPosition], position:oldPosition-1
      })
      await WorkoutDB.update({
        ...workouts[oldPosition-1], position: oldPosition
      })
      fetchData()
    }
  }

  //ArrowDown = add (+1) to index position
  const handleArrowDown = async (oldPosition:number) => { 
    if (!workouts) return true
    if (oldPosition === workouts.length-1) return true //does not work if workout is the last in the array
    else{
      await WorkoutDB.update({
        ...workouts[oldPosition], position:oldPosition+1
      })
      await WorkoutDB.update({
        ...workouts[oldPosition+1], position: oldPosition
      })
      fetchData()
    }
  }

  const fetchData = async () => { 
    const tempWorkouts = await WorkoutDB.getAll()
    tempWorkouts.sort( (a,b) => a.position - b.position)
    setWorkouts(tempWorkouts)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderItem = ({item} : {item:Workout}) => { 
    
    return (
      <TouchableWithoutFeedback key={item.id+item.name}>
        <View style={styles.workout_box}>
          <TouchableOpacity onPress={() => { handleArrowUp(item.position) }}>
            <Ionicons name="arrow-up-circle-sharp" size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { handleArrowDown(item.position) }}>
            <Ionicons name="arrow-down-circle-sharp" size={40} color="black" />
          </TouchableOpacity>
          
          <View style={styles.workout_button} >
            {item.name === beingEdited ?
              <TextInput
              ref={inputRef}
              style={styles.input_field} 
              placeholder='Nome do treino'
              value={inputText}
              onChangeText={(text) => setInputText(text)}
              autoFocus={true}
              multiline={true}
              //onFocus={()=> setIsInputOnFocus(true)}
            />
              :
              <Text style={styles.workout_label}>{item.name}</Text>
            }  
          </View>
        
          {item.name === beingEdited ?
            <TouchableOpacity  onPress={() => handleSaveEdition(item)}>
              <Entypo name="save" size={24} color="white" style={styles.icon_circle}/>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=>handleNameEdition(item.name)}>
              <MaterialIcons name="edit" size={24} color="white" style={styles.icon_circle}/> 
            </TouchableOpacity>
          }
          <TouchableOpacity onPress={()=>deletionAlert(item)}>
            <Ionicons name="trash-sharp" size={24} color="white" style={styles.icon_circle} />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  
  return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header />
        <StatusBar style="auto" />

        <View style={styles.flatlist}>
        {workouts?.map((item) => renderItem({ item }))}
          {/*workouts?.length!==0?
            
              { 
            <FlatList
              data={workouts}
              keyExtractor={(item) =>  item.id.toString() } 
              renderItem={renderItem}
            />
            : null
          */}
        </View>
          { isPositionEdited?
            <View style={styles.bottom_buttons}>
              <TouchableOpacity >
                <Entypo name="save" size={40} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { navigation.goBack() }}>
                <MaterialIcons name="cancel" size={42} color="black" /> 
              </TouchableOpacity>
            </View>
            :
            null
          }
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'space-between',
  },
  flatlist:{
    height: 400,
    alignSelf:'center',
    top: 50
  },
  workout_box:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
  },
  workout_button:{
    alignItems: 'center',
    //height: 40,
    width: 200,
    justifyContent: 'center',
  },
  workout_label:{
    fontSize: 20,
    textAlign: 'center',
  },
  icon_circle:{
    backgroundColor: 'black',
    borderRadius: 30,
    padding: 4,
    marginRight: 4,
    zIndex: 5
  },
  input_field:{
    fontSize: 18,
    margin: 5,
    backgroundColor: '#eee',
    width: 190,
    textAlign: 'center',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    //minHeight: 40, // Set a minimum height for multiline input
  },
  bottom_buttons:{
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 250,
  },
});
