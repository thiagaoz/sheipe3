import { View, Text , StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import React from 'react'
import Header from '../components/Header'
import ExerciseBaseForm from '../components/ExericseBaseForm'

export default function AddExerciseBaseScreen() {
  return (
    <View style={styles.container}>
        <Header />
        <Text style={styles.screen_title}>Adicionar novo exercício</Text>
        <ExerciseBaseForm />
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
        width: '70%',
        textAlign:'center'
    },
})