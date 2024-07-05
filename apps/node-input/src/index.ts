import readline from "readline";
import { drawProgress } from "./progress";

const inputs: string[] = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("공백으로 구분하여 숫자를 입력해주세요.\n", (input) => {
  input.split(" ").forEach((i) => {
    inputs.push(i);
  });
  rl.close();
});

rl.on("close", async () => {
  await drawProgress();
  inputs.forEach((i) => {
    console.log(i);
  });
  process.exit();
});
