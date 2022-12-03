// Total duration: 11 min (rounded to the nearest minute)
// Started at:     10:09
// First star at:  10:16
// Second star at: 10:20

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);
	const values = lines.map(line => [line.slice(0, line.length / 2), line.slice(line.length / 2)])

	// Solve problem

	const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	const priority = c => (
		alphabet.indexOf(c) + 1
	)

	let sum = 0;
	values.forEach(([left, right]) => {
		let found = false
		left.split("").forEach(c => {
			if (!found && right.includes(c)) {
				found = true
				sum += priority(c);
			}
		})
	});
	console.log(sum)

	// Part 2

	sum = 0;
	for (let i = 0; i < lines.length; i += 3) {
		alphabet.split("").forEach(c => {
			if (lines[i].includes(c) && lines[i+1].includes(c) && lines[i+2].includes(c)) {
				sum += priority(c)
			}
		})
	}
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
