import { View, Text, Modal, TouchableWithoutFeedback, Keyboard, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import WorkoutDB from '../Database/WorkoutDB';
import { Workout } from '../models/types';

interface Props{
  filter: string,
  setFilter: React.Dispatch<React.SetStateAction<string>>,
  filterOptions: string[],
  setFilterModalOn: React.Dispatch<React.SetStateAction<boolean>>
}
export default function FiltersModal({filter, setFilter, filterOptions, setFilterModalOn}:Props) {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const renderItem = ({item} : {item:string}) => { 
    return(
        <TouchableOpacity style={ styles.option_box} onPress={() => handleSelection(item)}>
            <Text style={item === filter? [styles.option_label, styles.option_selected] : styles.option_label}>{item}</Text>
        </TouchableOpacity>
    )
}
    const handleSelection = (item:string) => { 
        setFilter(item)
        setFilterModalOn(false)
        //query database for filter parente compoenent flatlist
    }
  return (
    <Modal
      animationType='fade'
      transparent={true}
      onRequestClose={ () => setFilterModalOn(false)}
    >
      
      <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        <View style={styles.container}> 
          <TouchableWithoutFeedback>
            <View style={styles.content}>
              <TouchableOpacity style={styles.modal_title}    onPress={()=> handleSelection('')}>
                <Text style={filter===''? [styles.option_label, styles.option_selected] : styles.option_label}> TODOS </Text>
              </TouchableOpacity>
              <View style={styles.flatlist}>
                <FlatList
                    data={filterOptions}
                    keyExtractor={(item) =>  item } 
                    renderItem={renderItem}
                    numColumns={2}
                />
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

    top: 100,
    width: '90%',
    height: 400,
    
  },
  modal_title:{
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    width: 160,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
  },
  todos_selected:{
    
  },
  flatlist:{
    flexDirection: 'row',
    //justifyContent: 'center',
    //marginBottom: 2,
    //top: -120
    //height: '80%'
  },
  option_box:{
    flex: 0.5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    //width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
  },
  option_label:{
    fontSize: 18
  },
  option_selected:{
    backgroundColor: 'black',
    color: 'white',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
})