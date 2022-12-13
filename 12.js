// Total duration: 21 min (rounded to the nearest minute)
// Started at:     20:29
// First star at:  20:43
// Second star at: 20:50

const NSEW = [
	{i: 0, j: 1},
	{i: 0, j: -1},
	{i: 1, j: 0},
	{i: -1, j: 0},
]

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);

	let start;
	let end;
	let values = lines.map((line, i) => line.split("").map((x, j) => {
		if (x == "S") {
			start = {i, j};
			return {height: 0};
		} else if (x == "E") {
			end = {i, j};
			return {height: 25};
		} else {
			return {height: x.charCodeAt(0) - 97};
		}
	}))

	// Part 1

	const findSteps = (start) => {
		let steps = 0;
		let toExplore = [start];
		while (true) {
			const nextSteps = [];
			toExplore.forEach(({i, j}) => {
				const height = values[i][j].height;
				NSEW.forEach((deltas) => {
					const newI = i + deltas.i;
					const newJ = j + deltas.j;
					if (newI < 0 || newJ < 0 || newI >= values.length || newJ >= values[0].length) {
						return;
					}
					if (values[newI][newJ].visited) {
						return;
					}
					if (values[newI][newJ].height > height + 1) {
						return;
					}
					nextSteps.push({i: newI, j: newJ});
					values[newI][newJ].visited = true;
				})
			})
			steps++;
			if (nextSteps.some(step => step.i == end.i && step.j == end.j)) {
				break;
			}
			toExplore = nextSteps;
			if (toExplore.length == 0) {
				return Infinity
			}
		}
		values.forEach(line => line.forEach(x => x.visited = false));
		return steps
	};
	console.log(findSteps(start));
	console.log("");

	// Part 2

	let best = Infinity;
	values.forEach((line, i) => line.forEach((v, j) => {
		if (v.height == 0) {
			const steps = findSteps({i, j});
			best = Math.min(best, steps);
		}
	}))
	console.log(best);
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
