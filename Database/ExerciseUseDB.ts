import { executeTransaction } from "./SQLite";
import { ExerciseBase, ExerciseUse, PreExerciseUse, toExerciseUse } from "../models/types";
import { SQLError } from "expo-sqlite";

const createTable = async () => {
    executeTransaction(
        `CREATE TABLE IF NOT EXISTS exercises_use(
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT, 
            primary_muscle TEXT, 
            secundary_muscle TEXT,
             equip TEXT, 
            sets INTEGER, 
            reps TEXT, 
            load TEXT, 
            position INTEGER,
            base_id INTEGER REFERENCES exercises_base (id),
            workout_id INTEGER REFERENCES workouts (id)
            );`
    )
}

const dropTable = async () => { 
    executeTransaction('DROP TABLE exercises_use;')
}

const create = async (exercise:PreExerciseUse) => {
    const result = await executeTransaction(
        `INSERT INTO exercises_use (name, primary_muscle, secundary_muscle, equip, sets, reps, load, position,
            base_id, workout_id)  values (?,?,?,?,?,?,?,?,?,?)`,
        [exercise.name, exercise.primary_muscle, exercise.secundary_muscle,exercise.equip, exercise.sets, exercise.reps.join('/'), 
            exercise.load.join('/'), exercise.position, exercise.base_id, exercise.workout_id],
    )
    return result.rowsAffected
}

const update = async (exercise:ExerciseUse) => { 
    const result = await executeTransaction(
        'UPDATE exercises_use SET sets=?, reps=?, load=?, position=? WHERE id=?;',
        [exercise.sets, exercise.reps.join('/'), exercise.load.join('/'), exercise.position, exercise.id],
    )
    return result.rowsAffected
}

const find = async (id:number) => {
    const result = await executeTransaction(
        'SELECT FROM exercises_use WHERE id=?',
        [id],
    )

    return toExerciseUse(result.rows._array)
}

const findByWorkout = async (workout_id:number) : Promise<ExerciseUse[]> => {
    const result = await executeTransaction(
        'SELECT * FROM exercises_use WHERE workout_id=?',
        [workout_id],
    )
    
    return toExerciseUse(result.rows._array)
}

const getAll = async () : Promise<ExerciseUse[]> => {
    const result = await executeTransaction('SELECT * FROM exercises_use;')
    return toExerciseUse(result.rows._array)}

const remove = async (exercise:ExerciseUse) => {
    const result = await executeTransaction(
        'DELETE FROM exercises_use WHERE id=?',
        [exercise.id],
    )
    return result.rowsAffected
}

export default { 
    createTable, 
    create,
    update,
    find,
    findByWorkout,
    getAll,
    remove,
    dropTable
}