import "@fastify/jwt"

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: { 
      sub: string // user token
      
      } // user type is return type of `request.user` object
  }
}