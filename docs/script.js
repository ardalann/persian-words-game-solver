const input = document.getElementById("letters");
const resultDiv = document.getElementById("result");

input.addEventListener("keyup", (e) => {
  solve(e.target.value.split(""));
});

const solve = async (letters, minLength = 3, maxLength = letters.length) => {
  resultDiv.innerHTML = "";

  let words = [...(await wordsPromise)];

  words = words.filter((word) => {
    if (word)
      return !word.split("").find((letter) => !letters.includes(letter));
  });

  // console.log('remove duplicates...')
  // words = words.filter((word,index) => words.findIndex(w => w === word) === index);

  console.log("sort...");
  words.sort((a, b) => b.length - a.length);

  console.log("remove long or short words...");
  words = words.filter(
    (word) => word.length <= maxLength && word.length >= minLength
  );

  console.log("print...");

  let resultHTML = "";
  words.forEach((word) => {
    resultHTML += `<li>${word}</li>`;
  });
  resultDiv.innerHTML += '<ol dir="rtl">' + resultHTML + "</ol>";
};

const wordsPromise = new Promise((resolve) => {
  fetch("./databases/farsi-db.csv").then(async (collection1) => {
    const words1 = (await collection1.text())
      .split("\n")
      .map((line) => line.split(",")[1]);

    return fetch("./databases/farsi-Word_collection_1.txt").then(
      async (collection2) => {
        const words2 = (await collection2.text()).split("\n");
        resolve([...words1, ...words2]);
      }
    );
  });
});
