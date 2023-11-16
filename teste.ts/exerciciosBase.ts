import ExerciseBaseDB from "../Database/ExerciseBaseDB";
import { ExerciseBase } from "../models/types";

export const supino:ExerciseBase = {
    id:1,
    name: 'Supino',
    primary_muscle: 'Peito',
    secundary_muscle: 'Tríceps',
    equip: 'Barra'
}

export const flexao:ExerciseBase = {
    id:2,
    name: 'Flexão',
    primary_muscle: 'Peito',
    secundary_muscle: 'Tríceps',
    equip: 'Peso corporal'
  }

export const voadorPolBaixa:ExerciseBase = {
    id:3,
    name: 'Voador polia baixa',
    primary_muscle: 'Peito',
    secundary_muscle: 'Deltóide anterior',
    equip: 'Polia'
}

export const barra:ExerciseBase = {
    id:4,
    name: 'Barra Pronada',
    primary_muscle: 'Costas',
    secundary_muscle: 'Bíceps',
    equip: 'Barra fixa'
  }
  export const remada:ExerciseBase = {
    id:5,
    name: 'Remada curvada',
    primary_muscle: 'Costas',
    secundary_muscle: 'Bíceps',
    equip: 'Barra'
  }

  export const puxadaAlta:ExerciseBase = {
    id:6,
    name: 'Puxada alta',
    primary_muscle: 'Costas',
    secundary_muscle: '',
    equip: 'Polia'
  }

  export const setExercisesBaseOnDB = async () => {
    await ExerciseBaseDB.create(supino)
    await ExerciseBaseDB.create(flexao)
    await ExerciseBaseDB.create(voadorPolBaixa)
    await ExerciseBaseDB.create(barra)
    await ExerciseBaseDB.create(remada)
    await ExerciseBaseDB.create(puxadaAlta)
  }
