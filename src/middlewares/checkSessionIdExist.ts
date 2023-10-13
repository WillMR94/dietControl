import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database';

export async function checkSessionIdExist(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    return reply.status(401).send({
      error: 'unauthorized.',
    })
  }
}

export async function checkUserMatch(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = request.params;
  const userId = request.cookies.sessionId

  try{ let { session_id } = await knex('meals').where("id", id).select('session_id').first()}
 catch(e){
  reply.status(404).send({
    error: 'meal not found in your registration',
  })
 }
 let { session_id } = await knex('meals').where("id", id).select('session_id').first()

  if ( userId != session_id ) {
    return reply.status(401).send({
      error: 'you only can update your own meals',
    })
  }
}



