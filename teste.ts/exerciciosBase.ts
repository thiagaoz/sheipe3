import ExerciseBaseDB from "../Database/ExerciseBaseDB";
import { ExerciseBase } from "../models/types";

export const supino:ExerciseBase = {
    id:1,
    name: 'Supino',
    primary_muscle: 'Peito',
    secundary_muscle: 'Tríceps',
    equip: 'Barra',
    max_reps: 0,
    max_load: 0,
    max_volume_set: 0,
    max_volume_session: 0
}

export const flexao:ExerciseBase = {
    id:2,
    name: 'Flexão',
    primary_muscle: 'Peito',
    secundary_muscle: 'Tríceps',
    equip: 'Peso corporal',
    max_reps: 0,
    max_load: 0,
    max_volume_set: 0,
    max_volume_session: 0
  }

export const voadorPolBaixa:ExerciseBase = {
    id:3,
    name: 'Voador polia baixa',
    primary_muscle: 'Peito',
    secundary_muscle: 'Deltóide anterior',
    equip: 'Polia',
    max_reps: 0,
    max_load: 0,
    max_volume_set: 0,
    max_volume_session: 0
}

export const barra:ExerciseBase = {
    id:4,
    name: 'Barra Pronada',
    primary_muscle: 'Costas',
    secundary_muscle: 'Bíceps',
    equip: 'Barra fixa',
    max_reps: 0,
    max_load: 0,
    max_volume_set: 0,
    max_volume_session: 0
  }
  export const remada:ExerciseBase = {
    id:5,
    name: 'Remada curvada',
    primary_muscle: 'Costas',
    secundary_muscle: 'Bíceps',
    equip: 'Barra',
    max_reps: 0,
    max_load: 0,
    max_volume_set: 0,
    max_volume_session: 0
  }

  export const puxadaAlta:ExerciseBase = {
    id:6,
    name: 'Puxada alta',
    primary_muscle: 'Costas',
    secundary_muscle: '',
    equip: 'Polia',
    max_reps: 0,
    max_load: 0,
    max_volume_set: 0,
    max_volume_session: 0
  }

  export const setExercisesBaseOnDB = async () => {
    await ExerciseBaseDB.create(supino)
    await ExerciseBaseDB.create(flexao)
    await ExerciseBaseDB.create(voadorPolBaixa)
    await ExerciseBaseDB.create(barra)
    await ExerciseBaseDB.create(remada)
    await ExerciseBaseDB.create(puxadaAlta)
  }
