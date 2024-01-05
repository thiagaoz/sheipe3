import { View, Text, Modal, TouchableWithoutFeedback, Keyboard, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import WorkoutDB from '../Database/WorkoutDB';
import { Workout } from '../models/types';

interface Props{
  workout: Workout,
  setAddExercise: React.Dispatch<React.SetStateAction<boolean>>
}
export default function AddWorkoutModal({workout, setAddExercise}:Props) {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNewExercise = () => { 
    setAddExercise(false);
    navigation.navigate('AddExerciseUse',[ workout, undefined]);
  }

  const handleAddFromDB = () => {
    setAddExercise(false);
    navigation.navigate('SelectExerciseBase', workout);
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
    >
      
      <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        <View style={styles.container}> 
          <TouchableWithoutFeedback>
            <View style={styles.content}>
              <Text style={styles.modal_title}> Adicionar Exercício </Text>
              <View style={styles.buttons_view}>
                <TouchableOpacity style={styles.button} onPress={()=> handleNewExercise()}>
                  <Text style={styles.text}>Novo exercício</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=> handleAddFromDB()} >
                    <Text style={styles.text}>Exercício do banco</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={()=> setAddExercise(false)}>
                  <MaterialIcons name="cancel" size={42} color="black" /> 
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>   
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'  
  },
  content:{
    backgroundColor: 'white',
    //justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    top: 100,
    width: '90%',
    height: 240,
    
  },
  modal_title:{
    margin: 10,
    fontSize: 20,
    
  },
  buttons_view:{
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent:'center',
    alignItems: 'center',
    width: 250,
  },
  button:{
    backgroundColor: 'black',
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  text:{
    fontSize: 18,
    color: 'white',
  },
  icon:{
    marginTop: 20
  },
})