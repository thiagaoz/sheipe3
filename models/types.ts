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
}

export interface ExerciseBase extends PreExerciseBase{
    id: number,
}

export interface PreExerciseUse extends PreExerciseBase{
    base_id: number,
    workout_id: number
    position:number,
    sets:number,
    reps:number,
    load:number,
}

export interface ExerciseUse extends PreExerciseUse{
    id: number
}

export const MUSCLES = [
    'Peito','Ombro','Costas','Abdômen','Oblíquo','Quadríceps','Posterior','Glúteos','Panturrilha','Bíceps','Tríceps',
    'Antebraço','Pescoço','Lombar'
]

export const EQUIPS = [
    'Barra','Barra fixa','Polia','Máquina','Halter','Caneleiras','Smith','Nenhum'
]