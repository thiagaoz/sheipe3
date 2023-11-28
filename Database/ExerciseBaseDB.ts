import { executeTransaction } from "./SQLite";
import { ExerciseBase, PreExerciseBase } from "../models/types";
import { SQLError } from "expo-sqlite";

const createTable = async () => {
    await executeTransaction(
        `CREATE TABLE IF NOT EXISTS exercises_base(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, 
            primary_muscle TEXT, 
            secundary_muscle TEXT, 
            equip TEXT,
            max_reps INTEGER,
            max_load INTEGER,
            max_volume_set  INTEGER,
            max_volume_session  INTEGER 
            )`
    )
}

const dropTable = async () => { 
    await executeTransaction('DROP TABLE exercises_base;')
}

const create = async (exercise:PreExerciseBase) => {
    const result = await executeTransaction(`INSERT INTO exercises_base (name, primary_muscle, secundary_muscle, equip,
        max_reps, max_load, max_volume_set, max_volume_session) values (?, ?, ?, ?,?,?,?,?)`,
    [exercise.name, exercise.primary_muscle, exercise.secundary_muscle, exercise.equip, exercise.max_reps, exercise.max_load, 
    exercise.max_volume_set, exercise.max_volume_session],)
    return result.insertId
}

const update = async (exercise:ExerciseBase) => { 
    const result = await executeTransaction(
        'UPDATE exercises_base SET name=?, primary_muscle=?, secundary_muscle=?, equip=? WHERE id=?;',
        [exercise.name, exercise.primary_muscle, exercise.secundary_muscle, exercise.equip, exercise.id],
    )
    return result.rowsAffected
}

const updateChildren = async (exercise:ExerciseBase) => { 
    const result = await executeTransaction(
        'UPDATE exercises_use SET name=?, primary_muscle=?, secundary_muscle=?, equip=? WHERE base_id=?;',
        [exercise.name, exercise.primary_muscle, exercise.secundary_muscle, exercise.equip, exercise.id],
    )

    return result.rowsAffected
        
}

const find = async (id:number) => {
    const result = await executeTransaction(
        'SELECT FROM exercises_base WHERE id=?',
        [id],
    )
    return result.rows._array
}

const getAll = async () : Promise<ExerciseBase[]> => {
    const result = await executeTransaction(
        'SELECT * FROM exercises_base'
    )
    return result.rows._array
}

const getInUseNumber = async (base_id:number) => {
    const result = await executeTransaction(
        'SELECT * FROM exercises_use WHERE base_id=?', [base_id]
    )
    return result.rows.length
}

const removeExercises = async(base_id: number) => {
    await executeTransaction(
        'DELETE FROM exercises_use WHERE base_id=?', [base_id]
    )
}

const remove = async (exercise:ExerciseBase) => {
    await removeExercises(exercise.id)
    const result = await executeTransaction(
        'DELETE FROM exercises_base WHERE id=?',
        [exercise.id],
    )
    return result.rowsAffected
}

export default { 
    createTable, 
    create,
    update,
    updateChildren,
    find,
    getAll,
    getInUseNumber,
    remove,
    dropTable
}