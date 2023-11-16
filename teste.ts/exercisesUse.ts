import ExerciseUseDB from "../Database/ExerciseUseDB";
import { ExerciseUse } from "../models/types";
import * as base from './exerciciosBase'

export const supinoUse :ExerciseUse ={
    ...base.supino,
    id: 1,
    sets: 3,
    reps: 12,
    load: 50,
    position: 0,
    base_id: base.supino.id,
    workout_id: 1 
}

export const voadorUse :ExerciseUse ={
    ...base.voadorPolBaixa,
    id: 3,
    sets: 3,
    reps: 12,
    load: 20,
    position: 1,
    base_id: base.voadorPolBaixa.id,
    workout_id: 1
}

export const flexaoUse:ExerciseUse ={
    ...base.flexao,
    id: 2,
    sets: 3 ,
    reps: 20,
    load: 0,
    position: 2,
    base_id: base.flexao.id,
    workout_id: 1
}

export const setExercisesUseOnDB = async () => {
    await ExerciseUseDB.create(supinoUse)
    await ExerciseUseDB.create(flexaoUse)
    await ExerciseUseDB.create(voadorUse)
}

/*
export const :ExerciseUse ={
    id: 
    sets: 
    reps: 
    load: 
    position:
    base_id: 
    workout_id: 
}
*/


const printExerciseUse = (exercises: ExerciseUse[]) => {
    exercises.forEach( exercise => {
      console.log(
        `----------------------------------------
          ID: ${exercise.id}
          POSIÇÃO: ${exercise.position}
          NOME: ${exercise.name}
          EQUIP: ${exercise.equip}
          PRIMARY: ${exercise.primary_muscle}
          SECUNDARY: ${exercise.secundary_muscle}
          SETS: ${exercise.sets}
          REPS: ${exercise.reps}
          LOAD: ${exercise.load} kg
         \n
        `)
    })
  }