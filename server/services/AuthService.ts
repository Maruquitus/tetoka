import { getByUsername } from "./UserService";
import { hashPassword } from "../utils/functions";

export async function authenticateUser(username: string, password: string) {
  const userDoc = await getByUsername(username);
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
