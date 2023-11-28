import { View, Text , StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { EQUIPS, ExerciseBase, ExerciseUse, MUSCLES, Workout } from '../models/types'
import Header from '../components/Header'
import ExerciseBaseDB from '../Database/ExerciseBaseDB'
import FiltersModal from './FiltersModal'
import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';



export default function ExercisesDBScreen() {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const [exercises, setExercises] = useState<ExerciseBase[]>()
    const [originalExercises, setOriginalExercises] = useState<ExerciseBase[]>()
    const [filterPrimary, setFilterPrimary] = useState<string>('')
    const [filterSecundary, setFilterSecundary] = useState<string>('')
    const [filterEquip, setFilterEquip] = useState<string>('')
    const [filterModalOn, setFilterModalOn] = useState<boolean>(false)
    const [filterType, setFilterType] = useState<string>('primary')

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

    const renderItem = ({item}:{item:ExerciseBase}) => { 
        return(
            <TouchableOpacity style={styles.exercise_box} onPress={() => { navigation.navigate('DisplayExerciseBase', item) }}>
                <Text style={styles.exercise_label}>{item.name}</Text>
            </TouchableOpacity>
        )
     }

     const filterExercises = () => {
        const filteredExercises = originalExercises?.filter(exercise =>
            (filterPrimary === '' || exercise.primary_muscle === filterPrimary) &&
            (filterSecundary === '' || exercise.secundary_muscle === filterSecundary) &&
            (filterEquip === '' || exercise.equip === filterEquip)
        ) || [];
    
        return filteredExercises;
    };

    const fetchData = async() => {
        const data = await ExerciseBaseDB.getAll()
        data.sort((a,b) => a.name.localeCompare(b.name))
        setExercises(data)
        setOriginalExercises(data)
    }

    useEffect(() => {
      fetchData()
    }, [])

    useEffect(() => {
        setExercises(filterExercises())
    }, [filterPrimary, filterSecundary, filterEquip])
    
    useFocusEffect(
        React.useCallback(() => {
          fetchData()
        }, [])
      );

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.screen_title}>Exercícios</Text>
      <View style={styles.filters_view}>
        <Text style={styles.filters_label}>Filtros</Text>
        <View style={styles.filters_types_row}>
            <View style={styles.filter_types_column}>
                <Text>Primário</Text>
                <TouchableOpacity style={styles.filter_button} onPress={() => { handleFilter('primary') }}>
                    <Text>{filterPrimary==='' ? 'TODOS' : filterPrimary}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.filter_types_column} >
                <Text>Secundário</Text>
                <TouchableOpacity style={styles.filter_button} onPress={() => { handleFilter('secundary') }}>
                    <Text>{filterSecundary==='' ? 'TODOS' : filterSecundary}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.filter_types_column}>
                <Text>Equipamento</Text>
                <TouchableOpacity style={styles.filter_button} onPress={() => { handleFilter('equip') }}>
                    <Text>{filterEquip==='' ? 'TODOS' : filterEquip}</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.add_button} onPress={()=> navigation.navigate('AddExerciseBase')}>
            <Text style={styles.add_button_label}>Adicionar exercício</Text>
            <AntDesign name="pluscircle" size={28} color="black" />
        </TouchableOpacity>
      </View>
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
      {filterModalOn&&
        renderFilterModal()
      }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'space-between',
    },
    screen_title:{
        fontWeight: 'bold',
        fontSize: 24,
    },
    filters_view:{
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 20,
    },
    filters_label:{
        fontWeight: '500',
        fontSize: 18
    },
    filters_types_row:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '98%',
        marginTop: 5
    },
    filter_types_column:{
        flexDirection: 'column',
        alignItems: 'center'
    },
    filter_button:{
        alignItems: 'center',
        borderWidth:1,
        borderRadius: 20,
        borderColor: 'black',
        width: 120,
        padding: 2
    },
    add_button:{
        flexDirection: 'row',
        borderWidth:1,
        borderRadius: 20,
        borderColor: 'black',
        padding: 5,
        width: 200,
        justifyContent: 'space-around',
        marginBottom: 10
    },
    add_button_label:{
        textAlignVertical: 'center'
    },
    flatlist:{
        //height: 400,
        width: 300,
        //alignSelf:'center',
        marginBottom: 2,
        //top: -120
    },
    exercise_box:{
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
        height: 40,
        borderWidth:1,
        borderRadius: 20,
        borderColor: 'black'
    },
    exercise_label:{
        fontSize: 17
    },

    
})