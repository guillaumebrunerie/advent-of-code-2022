// Total duration: 6 min (rounded to the nearest minute)
// Started at:     18:33
// First star at:  18:36
// Second star at: 18:39

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);

	// Part 1

	for (const line of lines) {
		for (let i = 0; i < line.length; i++) {
			const [a, b, c, d] = [line[i], line[i+1], line[i+2], line[i+3]]
			if (a == b || a == c || a == d || b == c || b == d || c == d) {
				continue
			}
			console.log(i + 4);
			break
		}
	}

	console.log("\n")

	// Part 2

	const amount = 14;

	for (const line of lines) {
		for (let i = 0; i < line.length; i++) {
			let ok = true;
			for (let k = 0; k < amount; k++) {
				for (let l = k + 1; l < amount; l++) {
					if (line[i + k] == line[i + l]) {
						ok = false
					}
				}
			}
			if (!ok) {
				continue
			}
			console.log(i + amount);
			break
		}
	}
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
