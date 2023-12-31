import { View, Text , StyleSheet, TouchableOpacity, FlatList, TouchableWithoutFeedback} from 'react-native'
import React, { useEffect, useState } from 'react'
import { ExerciseUse, Workout } from '../models/types'
import Header from '../components/Header'
import WorkoutDB from '../Database/WorkoutDB'
import ExerciseUseDB from '../Database/ExerciseUseDB'
import { v4 as uuidv4 } from 'uuid';
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';

interface Props{
    exercise: ExerciseUse,
    toggleEditIsOn: (index: number) => void
    beingEdited?: boolean,
    updateExercises?: (exercise: ExerciseUse) => void
}

export default function ExerciseBox({exercise, toggleEditIsOn, beingEdited, updateExercises}:Props) {

  const opButton = (category:string, oldExercise:ExerciseUse, index:number, op:string) => { 
    
    if (category === 'reps') {
      const newReps = [...oldExercise.reps]
      if(op === '+') newReps[index] = oldExercise.reps[index] + 1
      if(op === '-') newReps[index] = oldExercise.reps[index] - 1
      exercise = ( {
        ...oldExercise,
        reps: newReps
      })
      updateExercises!(exercise)
    }

    if (category === 'load') {
      const newLoad = [...oldExercise.load]
      if(op === '+') newLoad[index] = oldExercise.load[index] + 1
      if(op === '-') newLoad[index] = oldExercise.load[index] - 1
      exercise =( {
        ...oldExercise,
        load: newLoad
      })
      updateExercises!(exercise)
    }
  }

  
  const handleSaveButton = async () => {
    if(exercise){
      //updateExercises(exercise)
      await ExerciseUseDB.update(exercise)
      toggleEditIsOn(exercise.position)
    }
  }

    const renderColumn = (exercise:ExerciseUse, property: string) => {

        if (property === 'sets'){
          const arr = Array.from({length: exercise.sets})
          const id = exercise.id +'_sets_'
          return( 
            <View >
              {arr.map((_, index) => (
                <View style={styles.sets_row}   key={id + index} >
                  <Text style={styles.number_row_text}>{index+1}</Text>
                </View>
              ))}
            </View>
          )
        }
  
        if (property === 'reps') {
          const id = exercise.id + '_reps_'
          return(
            <View>
              {exercise.reps.map( (value, index) => (
                beingEdited?
                  <View style={styles.reps_load_row} key={id + index}>
                    <TouchableOpacity  onPress={() => { opButton('reps', exercise, index, '-') }} 
                    style={beingEdited? null : styles.invisible}>
                      <AntDesign name="minuscircle" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.number_row_text}>{value}</Text>
                    <TouchableOpacity onPress={() => { opButton('reps', exercise, index, '+') }}   
                    style={beingEdited? null : styles.invisible}>
                      <AntDesign name="pluscircle" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                  :
                  <View style={styles.reps_load_row} key={id + index}>
                    <AntDesign name="minuscircle" size={24} color="white" />
                    <Text style={styles.number_row_text}>{value}</Text>
                    <AntDesign name="pluscircle" size={24} color="white" />
                  </View>
              ))
              }
            </View>
          )
        }
  
        if (property === 'load') {
          const id = exercise.id + '_load_'
          return(
            <View>
              {exercise.load.map( (value, index) => (
              beingEdited?
                <View style={styles.reps_load_row} key={id + index}>
                  <TouchableOpacity  onPress={() => { opButton('load', exercise, index, '-') }} >
                    <AntDesign name="minuscircle" size={24} color="black" />
                  </TouchableOpacity>
                  <Text style={styles.number_row_text}>{value}</Text>
                  <TouchableOpacity onPress={() => { opButton('load', exercise, index,'+') }} >
                    <AntDesign name="pluscircle" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              :
                <View style={styles.reps_load_row} key={id + index}>
                  <AntDesign name="minuscircle" size={24} color="white" />
                    <Text style={styles.number_row_text}>{value}</Text>
                  <AntDesign name="minuscircle" size={24} color="white" />
                </View>
              ))
              }
            </View>
          )
        }

        else{
          const id = exercise.id + '_done_'
          return(
            <View>
              {exercise.load.map( (value, index) => (
              <View style={beingEdited? [styles.reps_load_row, styles.invisible]: [styles.reps_load_row]} key={id + index}>
                <Entypo name="check" size={18} color="white" style={styles.icon_check}/>                
              </View>
              ))
              }
            </View>
          )
        }
  
      }

  return (
    <TouchableWithoutFeedback>
      <View style={styles.exercise_box_view}>
        <View  style={styles.exercise_box}>
          <View style={styles.exercise_title_view}>
            <Text style={styles.exercise_label}>{exercise.name}</Text>
            <View style={styles.muscle_equip}>
              <Text>{exercise.primary_muscle}</Text>
              <Text>{exercise.equip}</Text>
            </View>
          </View>
          <View style={styles.sets_view}>
            <View style={styles.sets_column}>
              <Text>SETS</Text>
              {renderColumn(exercise, 'sets')}
            </View>
            <View style={styles.sets_column}>
              <Text>REPS</Text>
              {renderColumn(exercise, 'reps')}
            </View>
            <View style={styles.sets_column}>
              <Text>CARGA</Text>
              {renderColumn(exercise, 'load')}
            </View>
            <View style={styles.sets_column}>
              <Text>FEITO</Text>
              {renderColumn(exercise, 'done')}
            </View>
          </View>
          {beingEdited?
            <View style={styles.bottom_icons_view}>
              <TouchableOpacity onPress={ ()=> toggleEditIsOn(exercise.position) }>
                <MaterialIcons name="cancel" size={39} color="black" style={styles.cancel_icon}/>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={ ()=> handleSaveButton()}>
                <Entypo name="save" size={24} color="white" style={styles.icon_circle}/>
              </TouchableOpacity>
            </View>
          :
            <View style={styles.bottom_icons_view}>
              <TouchableOpacity onPress={ ()=> toggleEditIsOn(exercise.position) }>
                <MaterialIcons name="edit" size={22} color="white" style={styles.icon_circle}/>
              </TouchableOpacity>
            </View>
          }
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  exercise_box_view:{
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 5,
  },
    workout_name_label:{
      fontWeight: 'bold',
      fontSize: 25,
      marginTop: -10,
      marginBottom: 10
    },
    flatlist:{
      //height: 400,
      width: 300,
      alignSelf:'center',
      marginBottom: 2,
      top: -20
    },
    exercise_box:{
      alignItems: 'center',
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
    sets_row:{
      alignItems: 'center',
      marginBottom: 4
    },
    reps_load_row:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5
    },
    number_row_text:{
      fontSize: 22,
      marginLeft: 3,
      marginRight: 3,
    },
    icon_circle:{
      backgroundColor: 'black',
      borderRadius: 30,
      padding: 5,
      marginTop: 1,
      marginBottom: 2
    },
    icon_check:{
      backgroundColor: 'black',
      borderRadius: 30,
      padding: 5,
      marginTop:2
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
    bottom_icons_view:{
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      paddingTop: 3,
      paddingBottom: 3,
      borderTopWidth: 1,
      borderColor:'black'
    },
    cancel_icon:{
      marginTop: -4
    },
    invisible:{
      opacity: 0,
      PointerEvent: 'none'
    }
  })