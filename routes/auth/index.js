import {
  signUpHandler,
  signInHandler,
  signOutHandler,
} from "../../controller/authController.js";
export default function authRoutes(fastify, opts, done) {
  const signUpOptns = {
    schema: {
      body: {
        type: "object",
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
      },
    },
    handler: signUpHandler,
  };
  const signInOptns = {
    schema: {
      body: {
        type: "object",
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
      },
    },
    handler: signInHandler,
  };

  const signOutOptns = {
    handler: signOutHandler,
  };

  fastify.post("/signup", signUpOptns);
  fastify.post("/signin", signInOptns);
  fastify.post("/signout", signOutOptns);
  done();
}
