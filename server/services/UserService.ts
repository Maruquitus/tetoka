import { users } from "../config/db";
import { validateUser, validatePassword } from "../utils/functions";
import { hashPassword } from "../utils/functions";

export async function get(user: string) {
  return users.findOne({ user: user });
}

export async function create(user: string, password: string) {
  if (validateUser(user) == false)
    return Error(
      "Nome de usuário inválido! Use apenas letras, números ou underscores."
    );
  if (validatePassword(password) == false)
    return Error("Sua senha não pode conter espaços!");
  if ((await get(user)) == null) {
    const result = await hashPassword(password);
    if (result instanceof Error) {
      return Error("Erro no hash da senha!");
    }
    await users.insertOne({ user: user, password: result });
    return { message: "Usuário criado com sucesso!" };
  } else {
    return Error("Já existe um usuário com esse nome!");
  }
}
