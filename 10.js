// Total duration: 19 min (rounded to the nearest minute)
// Started at:     10:45
// First star at:  10:56
// Second star at: 11:04

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);

	// Part 1

	const findValueAtCycle = n => {
		let cycle = 2;
		let value = 1;
		for (const l of lines) {
			if (cycle >= n) {
				return value;
			}
			if (l == "noop") {
				cycle++
			}
			if (l.startsWith("addx")) {
				value += Number(l.slice(5))
				cycle += 2
			}
		}
		return value
	}
	let strength = 0;
	for (const n of [20, 60, 100, 140, 180, 220]) {
		strength += n * findValueAtCycle(n);
	}
	console.log(strength);
	console.log("");

	// Part 2

	const screen = Array(6).fill().map(() => Array(40).fill("."));
	const printScreen = () => {
		screen.forEach(line => {
			console.log(line.join(""));
		})
	}

	for (let n = 1; n < 241; n++) {
		const j = n % 40 - 1;
		const i = Math.floor((n - 1) / 40);
		const position = findValueAtCycle(n);
		const visible = Math.abs(position - j) <= 1;
		if (visible) {
			screen[i][j] = "#";
		}
	}
	printScreen()

	console.log("");
};


// Library code

const fs = require("fs");
const path = require('path');
const day = path.parse(__filename).name;

const files = [
	`${day}-test`,
	`${day}-test2`,
	`${day}`,
];

files.forEach(file => {
	fs.readFile(`./${file}.txt`, "utf8", (_, data) => {
		console.log(`Data from file ${file}.txt`);
		solveProblem(data);
	});
});
