export interface Workout {
    id:number,
    name:string,
    position:number,
    exercises?: ExerciseUse[]
}

export interface PreExerciseBase {
    name:string,
    primary_muscle: string,
    secundary_muscle: string,
    equip: string,
    max_reps: number,
    max_load: number,
    max_volume_set: number,
    max_volume_session: number
}

export interface ExerciseBase extends PreExerciseBase{
    id: number,
}

export interface PreExerciseUse extends PreExerciseBase{
    base_id: number,
    workout_id: number
    position:number,
    sets:number,
    reps:number[],
    load:number[],
}

export interface ExerciseUse extends PreExerciseUse{
    id: number
}

export interface ExerciseUseFromDb extends PreExerciseBase {
    id: number,
    base_id: number,
    workout_id: number
    position:number,
    sets:number,
    reps:string,
    load:string,
}

export const MUSCLES = [
    'Peito','Ombro','Costas','Abdômen','Oblíquo','Quadríceps','Posterior','Glúteos','Panturrilha','Bíceps','Tríceps',
    'Antebraço','Pescoço','Lombar'
]

export const EQUIPS = [
    'Barra','Barra fixa','Polia','Máquina','Halter','Caneleiras','Smith','Nenhum'
]

export const toExerciseUse = (exercises:ExerciseUseFromDb[]):ExerciseUse[] => {
    const convertedExercise:ExerciseUse[] = []
    exercises.forEach( oldExercise => {
        const exercise:ExerciseUse = {
            ...oldExercise,
            reps : strToNumArr(oldExercise.reps),
            load : strToNumArr(oldExercise.load)
        }
        convertedExercise.push(exercise)
    })
    return convertedExercise
}

const strToNumArr = (str:string) => {
    const subStr = str.split('/')
    const result = subStr.map( (st) => parseInt(st, 10))
    return result
}

