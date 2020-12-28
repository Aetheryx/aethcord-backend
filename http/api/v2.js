/*
 * Copyright (c) 2018-2020 aetheryx & Bowser65
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

function logout (_, reply) {
  return reply.setCookie('token', null, { maxAge: 0, path: '/' }).redirect('/')
}

module.exports = async function (fastify) {
  fastify.get('/login', (_, reply) => reply.redirect('/api/v2/oauth/discord'))
  fastify.get('/logout', { preHandler: fastify.auth([ fastify.verifyTokenizeToken ]) }, logout)
  fastify.register(require('./backoffice'), { prefix: '/backoffice' })
  fastify.register(require('./advisories'), { prefix: '/advisories' })
  fastify.register(require('./store'), { prefix: '/store' })
  fastify.register(require('./users'), { prefix: '/users' })
  fastify.register(require('./guilds'), { prefix: '/guilds' })
  fastify.register(require('./stats'), { prefix: '/stats' })
  fastify.register(require('./docs'), { prefix: '/docs' })
  fastify.register(require('./honks'), { prefix: '/honks' })
  fastify.register(require('./oauth'), { prefix: '/oauth' })
  fastify.register(require('./misc'))
  fastify.register(require('./legacyLinking')) // todo: remove (v3)
  fastify.setNotFoundHandler((_, reply) => reply.code(404).send({ error: 404, message: 'Not Found' }))
}
