import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ExerciseBase, ExerciseUse, Workout, defaultExerciseUse } from '../models/types'

interface Props{
    workout: Workout,
    exerciseBase: ExerciseBase | undefined;
}

export default function AddExerciseUseScreen({workout, exerciseBase}:Props) {

    const [exerciseUse, setExerciseUse] = useState<ExerciseUse>(defaultExerciseUse);

    useEffect(() => {
      if(exerciseBase){
        setExerciseUse({
            ...exerciseBase,
            ...exerciseUse
        })
      }
    }, [])
    
  return (
    <View>
      <Text>AddExerciseUseScreen</Text>
    </View>
  )
}