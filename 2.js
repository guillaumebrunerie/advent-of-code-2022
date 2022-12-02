// Total duration: 9 min (rounded to the nearest minute)
// Started at:     21:00
// First star at:  21:06
// Second star at: 21:09

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);

	// Solve problem

	let score = 0;
	lines.forEach(line => {
		switch (line) {
			case "A X":
				score += 1 + 3;
				break;
			case "A Y":
				score += 2 + 6;
				break;
			case "A Z":
				score += 3 + 0;
				break;
			case "B X":
				score += 1 + 0;
				break;
			case "B Y":
				score += 2 + 3;
				break;
			case "B Z":
				score += 3 + 6;
				break;
			case "C X":
				score += 1 + 6;
				break;
			case "C Y":
				score += 2 + 0;
				break;
			case "C Z":
				score += 3 + 3;
				break;
		}
	})
	console.log(score)

	score = 0;
	lines.forEach(line => {
		switch (line) {
			case "A X":
				score += 0 + 3;
				break;
			case "A Y":
				score += 3 + 1;
				break;
			case "A Z":
				score += 6 + 2;
				break;
			case "B X":
				score += 0 + 1;
				break;
			case "B Y":
				score += 3 + 2;
				break;
			case "B Z":
				score += 6 + 3;
				break;
			case "C X":
				score += 0 + 2;
				break;
			case "C Y":
				score += 3 + 3;
				break;
			case "C Z":
				score += 6 + 1;
				break;
		}
	})
	console.log(score)
};


// Library code

const fs = require("fs");
const path = require('path');
const day = path.parse(__filename).name;

const files = [
	`${day}-test`,
	`${day}`,
];

files.forEach(file => {
	fs.readFile(`./${file}.txt`, "utf8", (_, data) => {
		console.log(`Data from file ${file}.txt`);
		solveProblem(data);
		console.log("");
	});
});
