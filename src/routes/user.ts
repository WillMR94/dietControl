import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import crypto, { randomUUID } from 'node:crypto'
import { checkSessionIdExist } from '../middlewares/checkSessionIdExist'

export async function userRoutes(app: FastifyInstance) {

  app.post('/create',
    async (request, reply) => {
      const createDietBodySchema = z.object({
      nameUser: z.string(),
      })
      const { nameUser } = createDietBodySchema.parse(
      request.body,
      )

      let userId = crypto.randomUUID()

      const validate = await knex('users').select('id').where({'nameUser':nameUser})
      console.log(validate.length)
    
      if(validate.length === 0){    
        await knex('users').insert({
        id: userId,
        nameUser,
        })
      
        return reply.status(201).send(`usuário criado com sucesso, ${nameUser}`)
      }else{
        return reply.status(400).send(`usuário já cadastrado`)
      } 
    }
  )


  app.post('/login',
    async (request, reply) => {
      const createDietBodySchema = z.object({
      nameUser: z.string(),
      })
      const { nameUser } = createDietBodySchema.parse(
      request.body,
      )

      let userId = await knex('users').select('id').where({'nameUser':nameUser}).first()
       
      if(!userId){
        reply.cookie('sessionId', '',{
          path: '/',
          maxAge: 10, 
        })
        return reply.status(404).send(`usuário não encontrado`)
      }else{
        let { id } = userId
        reply.cookie('sessionId', id, {
          path: '/',
          maxAge: 1000 * 60 * 60 * 7, // 7 dias
        })
        return reply.status(201).send(`Bem vindo ${nameUser}`)
      } 
    }
  )



  app.get('/summary', {
    preHandler: [ checkSessionIdExist ],
  },
    async (request, reply) => {
      const id = request.cookies.sessionId
      const summary = await knex('meals').select('type')
      .where('session_id', id)
      
      let summaryDiet = summary.filter(summary => summary.type === 'dietFood')
      let summaryJunk = summary.filter(summary => summary.type === 'junkFood')

      //summary = total
      //summaryDiet = total diet food
      //summaryJunk = total junk food
      console.log (summary)
      return reply.status(201).send(`
      total de refeições registradas: ${summary.length}
      total de refeições dentro da dieta: ${summaryDiet.length}
      total de refeições fora da dieta: ${summaryJunk.length}`)
     
    }
  )



} 






/* 

  app.get(
    '/',
    {
      preHandler: [checkSessionIdExist],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const meals = await knex('diet')
        .where('session_id', sessionId)
        .select('*')
      return { meals }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExist],
    },
    async (request) => {
      const getTranasctionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTranasctionParamsSchema.parse(request.params)

      const transaction = await knex('transactions').where('id', id).first()
      return { transaction }
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExist],
    },
    async () => {
      const summary = await knex('transactions')
        .sum('amount', { as: 'Result' })
        .first()

      return summary
    }, */