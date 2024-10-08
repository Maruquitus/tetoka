import { ObjectId } from "mongodb";
import { users } from "../config/db";
import { validateUser, validatePassword } from "../utils/functions";
import { hashPassword } from "../utils/functions";

export async function getByUsername(username: string) {
  return users.findOne({ username: username });
}

export async function getByID(_id: ObjectId) {
  return users.findOne({ _id: _id });
}

export async function deleteByID(_id: ObjectId) {
  return users.deleteOne({ _id: _id });
}

export async function clear() {
  return users.deleteMany({});
}

export async function setPostProgress(
  userID: ObjectId,
  postID: ObjectId,
  stepsCompleted: number,
  totalSteps: number
) {
  const updateField = `postData.${postID}`;
  return users.updateOne(
    { _id: userID },
    { $set: { [updateField]: stepsCompleted / totalSteps } }
  );
}

export async function setLastViewedPost(userID: ObjectId, postID: ObjectId) {
  return users.updateOne({ _id: userID }, { $set: { lastViewedPost: postID } });
}

export async function create(
  username: string,
  email: string,
  password: string,
  interests: string[]
) {
  if (validateUser(username) == false)
    return Error(
      "Nome de usuário inválido! Use apenas letras, números ou underscores."
    );
  if (validatePassword(password) == false)
    return Error("Sua senha não pode conter espaços!");
  if ((await getByUsername(username)) == null) {
    const result = await hashPassword(password);
    if (result instanceof Error) {
      return Error("Erro no hash da senha!");
    }
    await users.insertOne({
      username: username,
      email: email,
      password: result,
      lastViewedPost: "",
      interests: interests,
    });
    return "Usuário criado com sucesso!";
  } else {
    return Error("Já existe um usuário com esse nome!");
  }
}
