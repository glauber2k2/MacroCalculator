'use client'

import React, { useState } from 'react'
import { Card } from './ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { calculateMacros } from '@/lib/calculateMacros'

interface resultadoMacros {
  calorias: number
  proteinas: number
  carboidratos: number
  gorduras: number
}

const formSchema = z.object({
  peso: z.string(),
  altura: z.string(),
  idade: z.string(),
  atividade: z.string(),
  sexo: z.string(),
  objetivo: z.string(),
})

export default function MacroCalculator() {
  const [resultado, setResultado] = useState<resultadoMacros | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const valores = {
      ...values,
      atividade: +values.atividade,
      idade: +values.idade,
      peso: +values.peso,
      altura: +values.altura,
    }

    const macros = calculateMacros(valores)
    setResultado(macros)
  }

  return (
    <Card className="w-full sm:w-auto p-10 h-fit dark:border-opacity-0 sm:dark:border-opacity-100 border-opacity-0 sm:border-opacity-100">
      <h1 className="text-4xl font-bold mb-4 pb-4 border-b border-neutral-300 dark:border-neutral-800">
        Macro Calculator
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <FormField
            control={form.control}
            name="objetivo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objetivo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Não selecionado." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
                    <SelectItem value="emagrecimento">Emagrecimento</SelectItem>
                    <SelectItem value="manutenção">Manutenção</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sexo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seu sexo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Não selecionado." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="Feminino">Feminino</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="atividade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nivel de atividade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Não selecionado." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1.2">Sedentário</SelectItem>
                    <SelectItem value="1.55">Moderado</SelectItem>
                    <SelectItem value="1.9">Ativo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="peso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peso</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="00.00" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="altura"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Altura</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="0.00" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="idade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Idade</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="00" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {resultado && (
            <div className="col-span-2 rounded text-xs mt-4">
              Para {form.getValues('objetivo')} você precisará de:
              <Card className="p-4 mt-1">
                <li>{resultado.proteinas} proteinas,</li>
                <li>{resultado.carboidratos} carboidratos,</li>
                <li>{resultado.calorias} calorias,</li>
                <li>{resultado.gorduras} de gordura.</li>
              </Card>
            </div>
          )}
          <Button type="submit" className="col-span-2 w-full mt-4">
            Calcular
          </Button>
        </form>
      </Form>
    </Card>
  )
}
