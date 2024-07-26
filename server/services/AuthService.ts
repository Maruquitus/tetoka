import { get } from "./UserService";
import { hashPassword } from "../utils/functions";

export async function authenticateUser(user: string, password: string) {
  const userDoc = await get(user);
  const usuárioExiste = userDoc != null;
  const msg = "Usuário e/ou senha inválidos!";
  if (usuárioExiste) {
    const hash = await hashPassword(password);
    const hashOnDB = userDoc.password;
    if (hash === hashOnDB) {
      return userDoc;
    } else {
      return Error(msg);
    }
  } else {
    return Error(msg);
  }
}
