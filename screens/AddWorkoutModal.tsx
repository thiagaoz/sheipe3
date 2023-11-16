import { View, Text, Modal, TouchableWithoutFeedback, Keyboard, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import WorkoutDB from '../Database/WorkoutDB';
import { Workout } from '../models/types';

interface Props{
  workouts: Workout[] | undefined,
  setWorkouts: React.Dispatch<React.SetStateAction<Workout[] | undefined>>,
  setAddWorkoutOn: React.Dispatch<React.SetStateAction<boolean>>
}
export default function AddWorkoutModal({workouts, setWorkouts, setAddWorkoutOn}:Props) {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const inputRef = useRef<TextInput | null>(null);
  const [inputText, setInputText] = useState<string>('')

  const saveWorkoutOnDB = async () => { 
    if(inputText!==''){
      WorkoutDB.create({
        name: inputText, 
        position: workouts===undefined? 0 : workouts.length +1
      })
      const tempWorkouts = await WorkoutDB.getAll()
      setWorkouts(tempWorkouts)
      setAddWorkoutOn(false)
    }
    else{
      setAddWorkoutOn(false)
    }
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      onRequestClose={ () => setAddWorkoutOn(false)}
    >
      
      <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        <View style={styles.container}> 
          <TouchableWithoutFeedback>
            <View style={styles.content}>
              <Text style={styles.modal_title}> Novo treino </Text>
              <TextInput
                  ref={inputRef}
                  style={styles.input_field} 
                  placeholder='Nome do treino'
                  value={inputText}
                  onChangeText={(text) => setInputText(text)}
                  autoFocus={true}
                  //onFocus={()=> setIsInputOnFocus(true)}
                />
              <View style={styles.bottom_buttons}>
                <TouchableOpacity onPress={() => { saveWorkoutOnDB() }}>
                  <Entypo name="save" size={40} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setAddWorkoutOn(false) }}>
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
    height: 180,
    
  },
  modal_title:{
    margin: 10,
    fontSize: 20,
    
  },
  input_field:{
    fontSize: 18,
    margin: 5,
    paddingLeft:30,
    paddingRight: 30,
    paddingBottom:5,
    paddingTop: 5,
    backgroundColor: '#eee',
    width: '80%',
    textAlign: 'center',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  bottom_buttons:{
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 250,
  },
})