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

function calcularTMB(
  peso: number,
  altura: number,
  idade: number,
  sexo: string,
): number {
  if (sexo === 'masculino') {
    return 10 * peso + 6.25 * altura - 5 * idade + 5
  } else {
    return 10 * peso + 6.25 * altura - 5 * idade - 161
  }
}

export function calculateMacros(data: UserFormData): MacroNutrientNeeds {
  const { peso, altura, atividade, sexo, objetivo, idade } = data

  // Conversão de altura de metros para centímetros
  const alturaCm = altura * 100

  // Calcular a TMB
  const tmb = calcularTMB(peso, alturaCm, idade, sexo)

  // Calcular calorias de manutenção ajustadas pela atividade
  const caloriasManutencao = tmb * atividade

  // Definir superávit ou déficit calórico com base no objetivo
  let caloriasObjetivo
  if (objetivo === 'hipertrofia') {
    caloriasObjetivo = caloriasManutencao + 500 // Superávit para crescimento muscular
  } else if (objetivo === 'emagrecimento') {
    caloriasObjetivo = caloriasManutencao - 500 // Déficit para perda de peso
  } else {
    caloriasObjetivo = caloriasManutencao // Manutenção
  }

  // Calcular macronutrientes
  const proteinasGramas = peso * 2.2 // 2.2 gramas de proteína por kg de peso
  const gordurasCalorias = caloriasObjetivo * 0.25
  const gordurasGramas = gordurasCalorias / 9 // Cada grama de gordura tem 9 calorias
  const carboidratosCalorias =
    caloriasObjetivo - (proteinasGramas * 4 + gordurasGramas * 9)
  const carboidratosGramas = carboidratosCalorias / 4 // Cada grama de carboidrato tem 4 calorias

  return {
    calorias: parseFloat(caloriasObjetivo.toFixed(2)),
    proteinas: parseFloat(proteinasGramas.toFixed(2)),
    carboidratos: parseFloat(carboidratosGramas.toFixed(2)),
    gorduras: parseFloat(gordurasGramas.toFixed(2)),
  }
}
