import { View, Text , StyleSheet, TouchableOpacity, FlatList, TouchableWithoutFeedback} from 'react-native'
import React, { useEffect, useState } from 'react'
import { ExerciseUse, Workout } from '../models/types'
import Header from '../components/Header'
import ExerciseUseDB from '../Database/ExerciseUseDB'
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';
import ExerciseBox from '../components/ExerciseBox'
import EditExerciseBox from '../components/EditExerciseBox'
import { useFocusEffect } from '@react-navigation/native'
import AddExerciseTypeModal from './AddExerciseTypeModal'


interface Props{
    workout: Workout,
    numOfExercises: number | undefined
}

export default function DisplayWorkoutScreen({workout, numOfExercises}:Props) {

    const [exercises, setExercises] = useState<ExerciseUse[]>([])
    const [editIsOn, setEditIsOn] = useState<boolean[]>(Array(numOfExercises).fill(false))
    const [addExercise, setAddExercise]  = useState<boolean>(false);
    //const [boxState, setBoxState] = useState<string[]> (Array(numOfExercises).fill('close'))

    const toggleEditIsOn = (index:number) => { 
      if(editIsOn){
        const tempArr:boolean[] = [...editIsOn]
        tempArr[index]=!tempArr[index]
        setEditIsOn(tempArr)
      }
    }

    const updateExercises = (exercise:ExerciseUse) => { 
      const exercisesTemp = [...exercises]
      exercisesTemp[exercise.position] = exercise
      setExercises([...exercisesTemp ])
    }

    const fetchData = async () => { 
      const tempExercises = await ExerciseUseDB.findByWorkout(workout.id)
      setExercises(tempExercises)
    }

    const renderItem = ({item} : {item:ExerciseUse}) => { 
      return <ExerciseBox exercise={item} toggleEditIsOn={toggleEditIsOn} beingEdited={editIsOn[item.position]}
                updateExercises={updateExercises}/>
    }

    useEffect(() => {
      (async()=> {
        const tempExercises = await ExerciseUseDB.findByWorkout(workout.id)
        setExercises(tempExercises)
      })()
    }, [])

    useEffect(() => {
      fetchData()
    }, [editIsOn])
      
  return (
    <View style={styles.container}>
        <Header />
        <View style={styles.body}>
          <Text style={styles.workout_name_label}>{workout.name}</Text>
          <View style={styles.flatlist}>
          {exercises?.length!==0?
            <FlatList
              data={exercises}
              keyExtractor={(item) =>  item.id.toString() } 
              renderItem={renderItem}
            />
            : null
          }
          </View>
      </View>
      <View style={styles.bottom_buttons_view} >
            <TouchableOpacity style={styles.bottom_button}>
                <Text>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bottom_button, styles.bottom_button_middle]} onPress={() => { setAddExercise(true) }}>
                <Text>{'Adicionar\n exercício'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottom_button}>
                <Text>Estatísticas</Text>
            </TouchableOpacity>
      </View>
      {
        addExercise&& <AddExerciseTypeModal workout={workout} setAddExercise={setAddExercise}/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  body:{
    alignItems: 'center',
    marginTop: 10
  },
  workout_name_label:{
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: -10,
    marginBottom: 20
  },
  flatlist:{
    height: '85%',
    width: 350,
    alignSelf: 'center',
    marginBottom: 2,
  },
  exercise_box_view:{
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 5,
  },
  bottom_icons_view:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingTop: 3,
    paddingBottom: 3,
    borderTopWidth: 1,
    borderColor:'black'
  },
  icon_circle:{
    backgroundColor: 'black',
    borderRadius: 30,
    padding: 5,
    marginRight: 50,
  },
  bottom_buttons_view:{
    flexDirection: 'row',
    width: '99%',
    height: 50,
    position: 'absolute',
    bottom: 0,
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
  invisible:{
    display: 'none'
  }
})