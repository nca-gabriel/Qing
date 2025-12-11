import { Questions } from "./types";

// export function shuffleQuestions(array: Questions[]): Questions[] {
//   const arr: Questions[] = [...array];
//   for (let i: number = arr.length - 1; i > 0; i--) {
//     const j: number = Math.floor(Math.random() * (i + 1));
//     [arr[i], arr[j]] = [arr[j], arr[i]];
//   }
//   return arr;
// }

// shuffle any array
export function shuffleQuestions<T>(array: T[]): T[] {
  const arr: T[] = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
