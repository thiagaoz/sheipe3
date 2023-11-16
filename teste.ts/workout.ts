import WorkoutDB from "../Database/WorkoutDB"
import { Workout } from "../models/types"

const printWorkout = (workout:Workout) => {
    console.log(
      `---------
        ID: ${workout.id}
        NOME: ${workout.name}
        POSIÇÃO: ${workout.position}
        EXERCÍCIOS: ${workout.exercises === undefined ? `0` : workout.exercises.length}
            
        ----------
        \n
      `)
}

export const createWorkouts = async () => { 
  await WorkoutDB.create({name:'Push',position:0})
  await WorkoutDB.create({name:'Pull',position:1})
  await WorkoutDB.create({name:'Legs',position:2})
}