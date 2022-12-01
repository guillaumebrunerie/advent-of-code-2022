// Total duration: 5 min (rounded to the nearest minute)
// Started at:     18:52
// First star at:  18:56
// Second star at: 18:57

const solveProblem = (data) => {
	// Parse data

	const elfes = data.slice(0, -1).split("\n\n");
	const calories = elfes.map(e => e.split("\n").map(x => Number(x)))

	// Solve problem

	console.log(Math.max(...calories.map(cs => cs.reduce((s, a) => s + a))))

	const results = calories.map(cs => cs.reduce((s, a) => s + a)).sort((a, b) => b - a)
	console.log(results[0] + results[1] + results[2])
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
