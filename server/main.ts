import { AuthenticatedUser } from "./interfaces";
import { run } from "./config/db";
import { authenticateUser } from "./services/AuthService";
import authRoutes from "./routes/AuthRoutes";
import userRoutes from "./routes/UserRoutes";
import postRoutes from "./routes/PostRoutes";
import next from "next";
import { IncomingMessage, ServerResponse } from "http";

const DEV = true;

/*===========IMPORTS===========*/
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
export const app = express();
export var passport = require("passport");
const session = require("express-session");
var LocalStrategy = require("passport-local");

const nextApp = next({
  dev: false,
  dir: path.resolve(__dirname, "../client"),
});
const handle = nextApp.getRequestHandler();

/*===========CONFIGURAÇÕES INICIAIS===========*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Autenticação
app.use(passport.initialize());

// Configurar session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.authenticate("session"));

// Setup de autenticação
passport.use(
  new LocalStrategy(async function verify(
    username: string,
    password: string,
    cb: Function
  ) {
    const result = await authenticateUser(username, password);
    if (result instanceof Error) {
      return cb(null, false, result.message);
    } else {
      return cb(null, {
        _id: result._id,
        username: result.username,
      } as AuthenticatedUser);
    }
  })
);

// Serialização e deserialização
passport.serializeUser(function (user: AuthenticatedUser, cb: Function) {
  process.nextTick(function () {
    cb(null, { _id: user._id, username: user.username });
  });
});

passport.deserializeUser(function (user: AuthenticatedUser, cb: Function) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// Inicializar o servidor
const port = 3001;
async function init() {
  const db = await run(); // Aguardar inicialização da bd
  if (!db) throw Error("Erro ao inicializar bd!");

  if (!DEV) await nextApp.prepare();

  app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
  });
}
init();

/*===========ROTAS===========*/
app.use("/api/auth/", authRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/posts/", postRoutes);

// Todos os outros requests vão para o Next.js
if (!DEV)
  app.all("*", (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    return handle(req, res);
  });

export default app;
