// 상하좌우
type Direction = "R" | "L" | "U" | "D";
const maxN = 5;
const directions: Direction[] = ["R", "R", "R", "U", "D", "D"];

function moving(n: number, list: Direction[]) {
  console.time("moving");
  const position = [1, 1];
  for (let i = 0; i < list.length; i++) {
    switch (list[i]) {
      case "L": {
        if (position[1] > 1) {
          position[1]--;
        }
        break;
      }
      case "R": {
        if (position[1] < n) {
          position[1]++;
        }
        break;
      }
      case "U": {
        if (position[0] > 1) {
          position[0]--;
        }
        break;
      }
      case "D": {
        if (position[0] < n) {
          position[0]++;
        }
        break;
      }
      default:
        break;
    }
  }
  const result = position.join(" ");
  console.timeEnd("moving");
  return result;
}

console.log(moving(maxN, directions));
