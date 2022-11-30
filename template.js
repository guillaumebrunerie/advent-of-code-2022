// Total duration: xx min
// Started at:     hh:mm
// First star at:  hh:mm
// Second star at: hh:mm

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);

	// Solve problem
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
