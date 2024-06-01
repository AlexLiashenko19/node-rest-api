import bcrypt from "bcrypt";

const createHashPassword = async (password: string) => {
  const result = await bcrypt.hash(password, 10);
  const compareResult = await bcrypt.compare(password, result);
  console.log(compareResult);
};
