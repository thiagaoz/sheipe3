import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { ExerciseBase } from '../models/types'
import Header from '../components/Header'
import { Ionicons, MaterialIcons, AntDesign, Entypo  } from '@expo/vector-icons';
import ExerciseBaseDB from '../Database/ExerciseBaseDB';


interface Props {
    exercise: ExerciseBase
}

export default function DisplayExerciseBaseScreen({exercise}:Props) {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleDelete = async () => { 
        await ExerciseBaseDB.remove(exercise)
        navigation.goBack()
    }

    const deletionAlert = async () => {
        const exercisesUsing = await ExerciseBaseDB.getInUseNumber(exercise.id)
        if(exercisesUsing === 0){
            handleDelete()
            return true
        }
        Alert.alert(
          'Cuidado!',
           exercisesUsing===1?
          `Existe ${exercisesUsing} ocorrência desse exercício em um treino. Deletar mesmo assim?`
          :
          `Existem ${exercisesUsing} ocorrências desse exercício em treino(s). Deletar mesmo assim?`
          ,
          
          [
            {
              text: 'Não',
              style: 'cancel',
            },
            {
              text: 'Sim',
              onPress: () => handleDelete(),
            },
          ],
          { cancelable: false }
        );
      };

  return (
    <View style={styles.container}>
        <Header />
        <Text style={styles.exercise_title_text}>{exercise.name}</Text>
        <View style={styles.exercise_view}>
            <Text style={styles.exercise_label}>Músculo Primário</Text>
            <Text>{exercise.primary_muscle}</Text>
        </View>
        <View style={styles.exercise_view}>
            <Text style={styles.exercise_label}>Músculo Secundário</Text>
            <Text>{exercise.secundary_muscle}</Text>
        </View>
        <View style={styles.exercise_view}>
            <Text style={styles.exercise_label}>Equipamento</Text>
            <Text>{exercise.equip}</Text>
        </View>
        <View style={styles.records_view}>
            <Text style={[styles.exercise_title_text, styles.records_label]}>Recordes</Text>
            <Text>Repetições: {exercise.max_reps}</Text>
            <Text>Carga máxima: {exercise.max_load}</Text>
            <Text>Volume por série: {exercise.max_volume_set}</Text>
            <Text>Volume por sessão: {exercise.max_volume_session}</Text>
        </View>
        <TouchableOpacity style={styles.trash_button} onPress={() => { deletionAlert() }}>
            <Ionicons name="trash-sharp" size={24} color="white" style={styles.icon_circle} />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        },
    exercise_title_text:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5
    },
    exercise_label:{
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 15
    },
    exercise_view:{
        alignItems: 'center'
    },
    records_view:{
        alignItems:'center',
    },
    records_label:{
        fontSize: 18
    },
    trash_button:{
        marginTop: 40
    },
    icon_circle:{
        backgroundColor: 'black',
        borderRadius: 30,
        padding: 4,
        marginRight: 4,
        zIndex: 5
      },
})