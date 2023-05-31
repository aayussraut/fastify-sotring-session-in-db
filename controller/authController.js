export const signUpHandler = async (req, reply) => {
  try {
    const user = await req.server.user.create({
      username: req.body.username,
      password: req.body.password,
    });
    reply.send(user);
  } catch (err) {
    console.log(err);
    reply.send(err);
  }
};

export const signInHandler = async (req, reply) => {
  try {
    const user = await req.server.user.findOne({
      where: { username: req.body.username },
    });

    if (user && user.password === req.body.password) {
      req.session.userId = user.id;
      reply.send({ msg: "You are logged in" });
    } else {
      reply.send({ msg: "Incorrect username or password" });
    }
  } catch (err) {
    reply.send(err);
  }
};

export const signOutHandler = async (req, reply) => {
  try {
    await req.session.destroy();
    reply.send({ msg: "You are logged out" });
  } catch (err) {
    reply.send(err);
  }
};
