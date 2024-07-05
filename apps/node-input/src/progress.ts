import readline from "readline";

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function logProgress(percentage: number) {
  const progressCount = Math.floor(percentage / 10);
  let progressBar = "";
  for (let i = 0; i < progressCount; i++) {
    progressBar += "▓";
  }
  for (let i = 0; i < 10 - progressCount; i++) {
    progressBar += "░";
  }
  progressBar += ` | ${percentage}%`;

  readline.cursorTo(process.stdout, 0);
  process.stdout.write(progressBar);
}

export async function drawProgress() {
  for (let i = 0; i <= 10; i++) {
    logProgress(i * 10);
    if (i !== 10) {
      await delay(500);
    }
    if (i === 10) {
      console.log("\n");
    }
  }
}
