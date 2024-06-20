//If your want to run my code follow instruction below

//1. Init the project in your IDE with "npm init -y"
//2. Run "npm install pako" for access to any type of your data
//3.

const fetch = require("node-fetch");
const pako = require("pako");
const fs = require("fs").promises;

async function fetchAndDecompress(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const arrayBuffer = await response.arrayBuffer();
    const decompressedData = pako.inflate(new Uint8Array(arrayBuffer));
    const decompressedString = new TextDecoder().decode(decompressedData);
    return decompressedString;
  } catch (error) {
    console.error("Error fetching or decompressing file:", error);
    return null;
  }
}

async function readAndDecompressFile(filePath) {
  try {
    const fileBuffer = await fs.readFile(filePath);
    const decompressedData = pako.inflate(fileBuffer);
    const decompressedString = new TextDecoder().decode(decompressedData);
    return decompressedString;
  } catch (error) {
    console.error("Error reading or decompressing file:", error);
    return null;
  }
}

function calculateDigits(contents) {
  const lines = contents.split("\n").filter(Boolean);
  const numbers = lines.map((line) => parseFloat(line));

  if (numbers.length === 0) {
    document.getElementById("output").innerText = "Файл не містить чисел.";
    return;
  }
  let max = -Infinity;
  let min = Infinity;
  let sum = 0;

  //the smallest and the bigest digits
  for (let num of numbers) {
    if (num > max) max = num;
    if (num < min) min = num;
    sum += num;
  }
  //mediana
  numbers.sort((a, b) => a - b);
  const middleIndex = Math.floor(numbers.length / 2);
  let mediana;
  numbers.length % 2 === 0
    ? (mediana = (numbers[middleIndex - 1] + numbers[middleIndex]) * 0.5)
    : (mediana = numbers[middleIndex]);

  //average arrifmetic
  const average = sum / numbers.length;

  //optional: increasing
  let longestIncreasing = [];
  let currentIncreasing = [numbers[0]];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > numbers[i - 1]) {
      currentIncreasing.push(numbers[i]);
    } else {
      if (currentIncreasing.length > longestIncreasing.length) {
        longestIncreasing = currentIncreasing;
      }
      currentIncreasing = [numbers[i]];
    }
  }
  if (currentIncreasing.length > longestIncreasing.length) {
    longestIncreasing = currentIncreasing;
  }

  //optional: decreasing
  let longestDecreasing = [];
  let currentDecreasing = [numbers[0]];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < numbers[i - 1]) {
      currentDecreasing.push(numbers[i]);
    } else {
      if (currentDecreasing.length > longestDecreasing.length) {
        longestDecreasing = currentDecreasing;
      }
      currentDecreasing = [numbers[i]];
    }
  }
  if (currentDecreasing.length > longestDecreasing.length) {
    longestDecreasing = currentDecreasing;
  }

  document.getElementById("output").innerText = `
  Максимум: ${max}
  Мінімум: ${min}
  Медіана: ${mediana}
  Середнє: ${average}
  Найбільша зростаюча послідовність: ${longestIncreasing.join(", ")}
  Найбільша спадна послідовність: ${longestDecreasing.join(", ")}
`;

  console.log(`
Максимум: ${max}
Мінімум: ${min}
Медіана: ${mediana}
Середнє: ${average}
Найбільша зростаюча послідовність: ${longestIncreasing.join(", ")}
Найбільша спадна послідовність: ${longestDecreasing.join(", ")}
`);
}

// console.log(
//   calculateDigits(
//     "https://drive.google.com/file/d/1LxSB6UEAVK0NLgU0ah5y0CBbD0gL_oO9/edit"
//   )
// );

const fileUrl = 'https://drive.google.com/uc?export=download&id=1LxSB6UEAVK0NLgU0ah5y0CBbD0gL_oO9';
fetchAndDecompress(fileUrl).then((data) => {
    if (data) {
        calculateDigits(data);
    }
});

const filePath = 'path/to/your/file.bz2'; // Замініть шлях на шлях до вашого файлу
readAndDecompressFile(filePath).then((data) => {
    if (data) {
        calculateDigits(data);
    }
});
