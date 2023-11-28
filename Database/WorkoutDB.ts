import { Workout } from "../models/types";
import ExerciseBaseDB from "./ExerciseBaseDB";
import { executeTransaction } from "./SQLite";
/*
export type Car = {
  id?: number;
  brand: string;
  model: string;
  hp: number;
};

export default class CarRepository {
  constructor() {
    this.up();
  }

  public async up() {
    await executeTransaction(
      "CREATE TABLE IF NOT EXISTS cars (id INTEGER PRIMARY KEY AUTOINCREMENT, brand TEXT, model TEXT, hp INT);"
    );
  }

  public async down() {
    await executeTransaction("DROP TABLE cars;");
  }

  public async create(car: Car) {
    const result = await executeTransaction(
      "INSERT INTO cars (brand, model, hp) values (?, ?, ?);",
      [car.brand, car.model, car.hp]
    );
    return result.insertId;
  }

  public async all() {
    const result = await executeTransaction("SELECT * FROM cars");
    return result.rows._array;
  }
}
*/
const createTable = async () => { 
    await executeTransaction(
        'CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, position INTEGER)'
    )
}

const dropTable = async () => { 
    await executeTransaction('DROP TABLE workouts;')
}

const create = async (obj:{name: string, position:number}) => { 
    const result = await executeTransaction(
        'INSERT INTO workouts (name, position) values (?,?);',
        [obj.name, obj.position],
    )
    return result.insertId
}

const update = async (workout:Workout) => { 
    const result = await executeTransaction(
        'UPDATE workouts SET name=?, position=? WHERE id=?;',
        [workout.name, workout.position, workout.id],
    )
    return result.rowsAffected
}

const find = async (id:number) => {
    const result = await executeTransaction(
        'SELECT FROM workouts WHERE id=?',
        [id],
    )
    return result.rows._array
}

const getAll = async (): Promise<Workout[]> => {
    const result = await executeTransaction('SELECT * FROM workouts;')
    return result.rows._array
}

const removeExercises = async(workout_id: number) => {
  await executeTransaction(
      'DELETE FROM exercises_use WHERE workout_id = ?', [workout_id]
  )
}

const remove = async (workout:Workout) => {
    await removeExercises(workout.id)
    await executeTransaction('DELETE FROM workouts WHERE id=?',
    [workout.id],)
}

export default { 
    createTable, 
    create,
    update,
    find,
    getAll,
    remove,
    dropTable
}
