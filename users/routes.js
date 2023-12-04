import * as dao from "./dao.js";

function UserRoutes(app) {
  const createUser = async (req, res) => { 
    const user = await dao.createUser(req.body);
    res.json(user);
  };
//   const deleteUser = async (req, res) => { };
  const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
      };
  const findUserById = async (req, res) => { 
        const { userId } = req.params;
        const user = await dao.findUserById(userId);
        if (!user) {
          res.status(404).send("User not found");
          return;
        }
        res.json(user);
  };

  const findUserByUsername = async (req, res) => { 
        const { username } = req.params;
        const user = await dao.findUserByUsername(username);
        if (!user) {
          res.status(404).send("User not found");
          return;
        }
        res.json(user);
  };
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(status);
  };



  const signin = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    req.session["currentUser"] = user;
    if (!user) {
      res.status(401).send("Invalid credentials");
      return;
    }
    // currentUser = user;
    res.json(user);
  };

  const findUserByCredentials = async (req, res) => { 
    const { username, password } = req.params;
    const user = await dao.findUserByCredentials(username, password);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const account = (req, res) => {
    console.log(req.session["currentUser"])
    res.json(req.session["currentUser"]);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(
      req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    console.log(req.session)
    console.log(currentUser)
    res.json(currentUser);
  };


  const signout = (req, res) => { 
    req.session.destroy();
    res.json(200);
  };
//   const account = async (req, res) => { };
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.get("/api/users/username/:username", findUserByUsername);
  app.get("/api/users/:username/:password", findUserByCredentials);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/account", account);
  app.post("/api/users/signout", signout);
//   app.post("/api/users/account", account);
    }

export default UserRoutes;