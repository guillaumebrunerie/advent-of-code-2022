// Total duration: xx min (rounded to the nearest minute)
// Started at:     hh:mm
// First star at:  hh:mm
// Second star at: hh:mm

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);
	const values = lines.map(line => line.split(",").map(x => Number(x)))

	// Part 1


	console.log("");

	// Part 2


	console.log("");
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
	});
});
