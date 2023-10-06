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
  let { session_id } = await knex('meals').where("id", id).select('session_id').first()
  console.log(session_id)

  if ( userId != session_id ) {
    return reply.status(401).send({
      error: 'you only can update your own meals',
    })
  }
}


