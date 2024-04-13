interface MacroNutrientNeeds {
  calorias: number
  proteinas: number
  carboidratos: number
  gorduras: number
}

interface UserFormData {
  altura: number
  peso: number
  atividade: number
  sexo: string
  objetivo: string
  idade: number
}

export function calculateMacros(data: UserFormData): MacroNutrientNeeds {
  const { peso, altura, atividade, sexo, objetivo, idade } = data

  let gastoEnergeticoBasal: number
  if (sexo === 'masculino') {
    gastoEnergeticoBasal = 66 + 13.7 * peso + 5.0 * altura - 6.8 * idade
  } else {
    gastoEnergeticoBasal = 665 + 9.6 * peso + 1.8 * altura - 4.7 * idade
  }

  const totalGastoEnergetico = gastoEnergeticoBasal * atividade

  let metaCalorias: number
  if (objetivo === 'hipertrofia') {
    metaCalorias = totalGastoEnergetico + 500
  } else if (objetivo === 'emagrecimento') {
    metaCalorias = totalGastoEnergetico - 500
  } else {
    metaCalorias = totalGastoEnergetico
  }

  return {
    calorias: parseFloat(metaCalorias.toFixed(2)),
  }
}
