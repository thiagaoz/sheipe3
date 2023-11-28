import { View, Text , StyleSheet, TouchableOpacity, TextInput,FlatList} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { EQUIPS, ExerciseBase, ExerciseUse, MUSCLES, Workout } from '../models/types'
import FiltersModal from '../screens/FiltersModal'
import { Ionicons, MaterialIcons, AntDesign, Entypo  } from '@expo/vector-icons';
import ExerciseBaseDB from '../Database/ExerciseBaseDB';



export default function ExericseBaseForm() {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  const [filterPrimary, setFilterPrimary] = useState<string>('')
  const [filterSecundary, setFilterSecundary] = useState<string>('')
  const [filterEquip, setFilterEquip] = useState<string>('')
  const [filterModalOn, setFilterModalOn] = useState<boolean>(false)
  const [filterType, setFilterType] = useState<string>('primary')
  const inputRef = useRef<TextInput | null>(null);
  const [inputText, setInputText] = useState<string>('')

  const handleSave = async () => { 
    await ExerciseBaseDB.create({
      name: inputText,
      primary_muscle: filterPrimary,
      secundary_muscle: filterSecundary,
      equip:filterEquip
    })
    navigation.navigate('ExercisesDB')
  }

  const handleFilter = (str:string) => { 
    setFilterType(str)
    setFilterModalOn(true)
}

const renderFilterModal = () => { 
    if(filterType==='primary'){
        return(
            <FiltersModal filter={filterPrimary} setFilter={setFilterPrimary} filterOptions={MUSCLES} 
            setFilterModalOn={setFilterModalOn} />
        )
    }
    else if(filterType==='secundary'){
        return(
            <FiltersModal filter={filterSecundary} setFilter={setFilterSecundary} filterOptions={MUSCLES} 
            setFilterModalOn={setFilterModalOn} />
        )
    }
    else if(filterType==='equip'){
        return(
            <FiltersModal filter={filterEquip} setFilter={setFilterEquip} filterOptions={EQUIPS} 
            setFilterModalOn={setFilterModalOn} />
        )
    }
}
  return (
    <View style={styles.container}>
      <View style={styles.row_view}>
        <Text>Nome </Text>
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
      </View>
      <View style={styles.row_view}>
        <Text>Músculo primário</Text>
        <TouchableOpacity  style={styles.filter_button} onPress={() => { handleFilter('primary') }}>
                    <Text>{filterPrimary==='' ? 'Nenhum' : filterPrimary}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row_view}>
        <Text>Músculo secundário</Text>
        <TouchableOpacity  style={styles.filter_button} onPress={() => { handleFilter('secundary') }}>
                    <Text>{filterSecundary==='' ? 'Nenhum' : filterSecundary}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row_view}>
        <Text>Equipamento</Text>
        <TouchableOpacity style={styles.filter_button} onPress={() => { handleFilter('equip') }}>
          <Text>{filterEquip==='' ? 'Nenhum' : filterEquip}</Text>
        </TouchableOpacity>
      </View>
      {filterModalOn&&
        renderFilterModal()
      }
      <View style={styles.bottom_buttons}>
        <TouchableOpacity onPress={ () => { handleSave() }}>
          <Entypo name="save" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <MaterialIcons name="cancel" size={42} color="black" /> 
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
      flexDirection: 'column',
      width: '100%',
      marginTop: 15
      
  },
  row_view:{
    alignItems: 'center',
    marginTop: 10, 
    marginBottom: 20
  },
  filter_button:{
    alignItems: 'center',
    borderWidth:1,
    borderRadius: 20,
    borderColor: 'black',
    width: 120,
    padding: 2,
    marginTop: 8
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
    marginBottom: -10
    //minHeight: 40, // Set a minimum height for multiline input
  },
  bottom_buttons:{
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 250,
  },
})