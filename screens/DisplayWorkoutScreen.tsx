import { View, Text , StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { ExerciseUse, Workout } from '../models/types'
import Header from '../components/Header'
import WorkoutDB from '../Database/WorkoutDB'
import ExerciseUseDB from '../Database/ExerciseUseDB'

interface Props{
    workout: Workout
}

export default function DisplayWorkoutScreen({workout}:Props) {
    const [exercises, setExercises] = useState<ExerciseUse[]>([])

    const renderItem = ({item} : {item:ExerciseUse}) => { 
        return (
          <TouchableOpacity style={styles.exercise_box}>
            <View style={styles.exercise_title_view}>
              <Text style={styles.exercise_label}>{item.name}</Text>
              <View style={styles.muscle_equip}>
                <Text>{item.primary_muscle}</Text>
                <Text>{item.equip}</Text>
              </View>
            </View>
            <View style={styles.sets_view}>
              <View style={styles.sets_column}>
                <Text>SETS</Text>
                <Text>{item.sets}</Text>
              </View>
              <View style={styles.sets_column}>
                <Text>REPS</Text>
                <Text>{item.reps}</Text>
              </View>
              <View style={styles.sets_column}>
                <Text>CARGA</Text>
                <Text>{item.load}kg</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      }

    useEffect(() => {
      (async()=> {
        console.log('useeffect')
        const tempExercises = await ExerciseUseDB.findByWorkout(workout.id)
        setExercises(tempExercises)
      })()
    }, [])
    

  return (
    <View style={styles.container}>
        <Header />
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
        <View style={styles.bottom_buttons_view} >
            <TouchableOpacity style={styles.bottom_button}>
                <Text>Editar</Text>
                </TouchableOpacity>
            <TouchableOpacity style={[styles.bottom_button, styles.bottom_button_middle]}>
                <Text>{'Adicionar\n exercício'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottom_button}>
                <Text>Estatísticas</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    workout_name_label:{
      fontWeight: 'bold',
      fontSize: 25,
      top: -65
    },
    flatlist:{
        height: 400,
        width: 300,
        alignSelf:'center',
        marginBottom: 2,
        top: -120
  },
  exercise_box:{
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    //height:  80,
    marginBottom: 5
  },
  exercise_title_view:{
    flexDirection: 'column',
    alignItems: 'center',
    borderColor: 'black',
    borderBottomWidth: 1,
    width: '100%'
  },
  exercise_label:{
    fontSize: 18,
    fontWeight: '500'
  },
  muscle_equip:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  sets_view:{
    flexDirection:'row',
    width: '90%',
    justifyContent:'space-between',
    paddingBottom: 5
  },
  sets_column:{
    flexDirection: 'column',
    alignItems: 'center'
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
})