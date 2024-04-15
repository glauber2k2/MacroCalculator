interface MacroNutrientNeeds {
  calorias: number
  proteinas: number
  carboidratos: number
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
  const { peso, altura, idade, sexo, atividade, objetivo } = data

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

  let metaProteinasGramas: number
  if (atividade > 1.375) {
    metaProteinasGramas = peso * 2
  } else {
    metaProteinasGramas = peso * 1.5
  }

  let metaCarboGramas: number
  if (objetivo == 'hipertrofia') {
    metaCarboGramas = peso * 8
  } else if (objetivo == 'manutenção') {
    metaCarboGramas = totalGastoEnergetico * 0.5
  } else {
    metaCarboGramas = totalGastoEnergetico * 0.45
  }

  return {
    calorias: parseFloat(metaCalorias.toFixed(2)),
    proteinas: parseFloat(metaProteinasGramas.toFixed(2)),
    carboidratos: parseFloat(metaCarboGramas.toFixed(2)),
  }
}
