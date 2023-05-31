import fp from "fastify-plugin";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import connectPgSimple from "connect-pg-simple";
import pkg from "pg";
const { Pool } = pkg;
export default fp(async (fastify, opts) => {
  fastify.register(fastifyCookie);
  const pgSession = connectPgSimple(fastifySession);
  const pool = new Pool({
    connectionString:
      "postgres://iush:8502@localhost:5432/sequelize_authentication",
  });
  fastify.register(fastifySession, {
    secret: "thisismysecretkeywhichis32characterslong",
    cookie: {
      secure: false,
      maxAge: 6 * 1000,
      expires: Date.now() + 6 * 1000,
      httpOnly: true,
    },
    saveUninitialized: false,
    expires: Date.now() + 6000,
    store: new pgSession({
      pool,
      tableName: "session",
    }),
  });

  fastify.decorate("authenticate", async (req, reply) => {
    console.log(req.session.expire);
    if (!req.session.userId) {
      reply.code(401).send({ msg: "Please login" });
    }
    const user = await req.server.user.findOne({
      where: { id: req.session.userId },
    });
    if (user) {
      console.log("You are authenticated");
    } else {
      reply.code(401).send({ msg: "Please login" });
    }
  });
});
