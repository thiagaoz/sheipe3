import db from './SQLite'
import { Workout } from '../models/types'
import { SQLError, SQLResultSetRowList } from 'expo-sqlite';

const createWorkoutsTable = async () => { 
    try{
        db.transaction((tx)=>{
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, position INTEGER)',
                [],
                ()=>{
                    console.log('tabela workouts criada')
                },
                (_: any, error: SQLError) => {
                    // Handle the error
                    console.error('SQL Erro criando TABLE:', error);
                    return true; // Rollback the transaction
                }
            )
        })
    }
    catch{

    }
}

const dropWorkoutsTable = async () => { 
    db.transaction((tx) => {
        tx.executeSql('DROP TABLE workouts;');
        console.log('tabela workouts deletada')
      })
}

export default { 
    createWorkoutsTable, 
    dropWorkoutsTable
}
