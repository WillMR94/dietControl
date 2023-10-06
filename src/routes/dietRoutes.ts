import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';
import crypto from 'node:crypto';
import { checkSessionIdExist, checkUserMatch } from '../middlewares/checkSessionIdExist';


export async function dietRoutes(app: FastifyInstance) {

  app.post('/', {
    preHandler: [checkSessionIdExist],
  },
    async (request, reply) => {
      const createDietBodySchema = z.object({
        nameMeal: z.string(),
        description: z.string(),
        type: z.enum(['dietFood', 'junkFood']),
      });
      const { nameMeal, description, type } = createDietBodySchema.parse(
        request.body
      );

      let sessionId = request.cookies.sessionId;

      await knex('meals').insert({
        id: crypto.randomUUID(),
        nameMeal,
        description,
        type,
        session_id: sessionId,
      });
      return reply.status(201).send('refeiçao cadastrada com sucesso');

    }
  );

  app.put('/:id', {
    preHandler: [ checkUserMatch ],
  },
    async (request, reply) => {
      const { id } = request.params;
      let userId = request.cookies.sessionId;
      const createDietBodySchema = z.object({
        nameMeal: z.string(),
        description: z.string(),
        type: z.enum(['dietFood', 'junkFood']),
      });
      const { nameMeal, description, type } = createDietBodySchema.parse(
        request.body
      );

     await knex('meals').where("id", id).update({
        nameMeal,
        description,
        type,
       })
      return reply.status(201).send('refeiçao alterada com sucesso') 
    }
  );

}
