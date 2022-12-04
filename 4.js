// Total duration: 5 min (rounded to the nearest minute)
// Started at:     9:40
// First star at:  9:44
// Second star at: 9:45

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);
	const values = lines.map(line => line.split(",").map(xx => xx.split("-").map(x => Number(x))))

	// Solve problem

	let sum = 0;

	values.forEach(([[a, b], [c, d]]) => {
		if ((a >= c && b <= d) || (c >= a && d <= b)) {
			sum++
		}
	})
	console.log(sum)

	// Part 2
	sum = 0;

	values.forEach(([[a, b], [c, d]]) => {
		if (b >= c && a <= d) {
			sum++
		}
	})
	console.log(sum)
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
