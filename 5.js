// Total duration: 12 min (rounded to the nearest minute)
// Started at:     18:18
// First star at:  18:26
// Second star at: 18:30

const solveProblem = (data) => {
	// Parse data (code was preprocessed by hand first)

	const blocks = data.slice(0, -1).split("\n\n");
	let stacks = blocks[0].split("\n");
	const instructions = blocks[1].split("\n").map(line => {
		const s = line.split(" ");
		return {count: s[1], from: s[3], to: s[5]}
	});

	// Part 1

	instructions.forEach(({count, from, to}) => {
		for (let i = 0; i < count; i++) {
			stacks[to - 1] = stacks[to - 1] + stacks[from - 1].at(-1);
			stacks[from - 1] = stacks[from - 1].slice(0, -1);
		}
	});
	console.log(stacks.map(s => s.at(-1)).join(""));

	// Part 2

	stacks = blocks[0].split("\n");
	instructions.forEach(({count, from, to}) => {
		stacks[to - 1] = stacks[to - 1] + stacks[from - 1].slice(stacks[from - 1].length - count)
		stacks[from - 1] = stacks[from - 1].slice(0, -count);
	});
	console.log(stacks.map(s => s.at(-1)).join(""));
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
