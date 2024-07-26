import { Request, Response } from "express";
import { AuthenticatedUser } from "./interfaces";
import { run } from "./config/db";
import { authenticateUser } from "./services/AuthService";

/*===========IMPORTS===========*/
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
export const app = express();
export var passport = require("passport");
const session = require("express-session");
var LocalStrategy = require("passport-local");

/*===========CONFIGURAÇÕES INICIAIS===========*/
//Inicializar a bd
run();

//Usar o body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Autenticação
app.use(passport.initialize());

//Configurar session
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

//Setup de autenticação
passport.use(
  new LocalStrategy(async function verify(
    username: string,
    password: string,
    cb: Function
  ) {
    const result = await authenticateUser(username, password);
    if (result instanceof Error) {
      return cb(null, false, { message: result.message });
    } else {
      return cb(null, {
        id: result._id,
        username: result.user,
      } as AuthenticatedUser);
    }
  })
);

//Serialização e deserialização
passport.serializeUser(function (user: AuthenticatedUser, cb: Function) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user: AuthenticatedUser, cb: Function) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}`);
});


/*===========ROTAS===========*/
app.use("/", /* router da rota */);

// Fazer com que o Node sirva os arquivos do app em React criado
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Todas as outras solicitações GET não tratadas retornarão o app em React
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
