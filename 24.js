// Total duration: 35 min (rounded to the nearest minute)
// Started at:     9:13
// First star at:  9:38
// Second star at: 9:48

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);
	const blizzards = [];
	let possiblePositions = [{i: 0, j: 1, reachedGoal: false, reachedStart: false}];
	let height = lines.length - 2;
	let width = lines[0].length - 2;
	lines.forEach((line, i) => {
		if (i == 0 || i == lines.length - 1) {
			return;
		}
		line.split("").forEach((char, j) => {
			let dir = {">": 0, "v": 1, "<": 2, "^": 3}[char];
			if (dir !== undefined) {
				blizzards.push({i, j, dir})
			}
		})
	})

	// Part 1

	const simulateBlizzards = () => {
		blizzards.forEach((b) => {
			const {dir} = b;
			switch (dir) {
				case 0:
					b.j++;
					if (b.j == width + 1) b.j = 1;
					break;
				case 1:
					b.i++;
					if (b.i == height + 1) b.i = 1;
					break;
				case 2:
					b.j--;
					if (b.j == 0) b.j = width;
					break;
				case 3:
					b.i--;
					if (b.i == 0) b.i = height;
					break;
			}
		})
	}

	const isAvailable = (i, j) => j > 0 && j <= width && (i > 0 || (i == 0 && j == 1)) && (i <= height || (i == height + 1 && j == width)) && !blizzards.some(b => b.i == i && b.j == j);
	const moveElf = () => {
		const newPossiblePositions = [];
		const addIfAvailable = (i, j, reachedGoal, reachedStart) => {
			const rG = reachedGoal || (i == height + 1);
			const rS = reachedStart || (reachedGoal && i == 0);
			if (isAvailable(i, j) && !newPossiblePositions.some(p => p.i == i && p.j == j && p.reachedGoal == rG && p.reachedStart == rS)) {
				newPossiblePositions.push({
					i,
					j,
					reachedGoal: rG,
					reachedStart: rS,
				});
			}
		}
		possiblePositions.forEach(({i, j, reachedGoal, reachedStart}) => {
			addIfAvailable(i, j, reachedGoal, reachedStart);
			addIfAvailable(i, j + 1, reachedGoal, reachedStart);
			addIfAvailable(i, j - 1, reachedGoal, reachedStart);
			addIfAvailable(i + 1, j, reachedGoal, reachedStart);
			addIfAvailable(i - 1, j, reachedGoal, reachedStart);
		})
		possiblePositions = newPossiblePositions;
	}

	const print = () => {
		let r = "";
		for (let i = 0; i <= height + 1; i++) {
			r += "#";
			for (let j = 1; j <= width; j++) {
				const p = possiblePositions.find(p => p.i == i && p.j == j)
				if (p) {
					r += p.reachedGoal ? "G" : "E";
					continue;
				}
				if (i == 0) {
					if (j == 1) {
						r += ".";
					} else {
						r += "#";
					}
					continue
				}
				if (i == height + 1) {
					if (j == width) {
						r += ".";
					} else {
						r += "#";
					}
					continue
				}
				const bs = blizzards.filter(b => b.i == i && b.j == j);
				if (bs.length == 0) {
					r += ".";
				} else if (bs.length > 1) {
					r += bs.length;
				} else {
					r += [">", "v", "<", "^"][bs[0].dir]
				}
			}
			r += "#\n";
		}
		console.log(r);
	}
	// print();
	let i = 0;
	let part1Solved = false;
	while (true) {
		simulateBlizzards();
		moveElf();
		// console.log(i),
		// console.log("all:", possiblePositions.length);
		// console.log("reachedGoal:", possiblePositions.filter(p => p.reachedGoal).length);
		// console.log("reachedStart:", possiblePositions.filter(p => p.reachedStart).length);
		// console.log();
		// print();
		i++;
		if (!part1Solved && possiblePositions.some(p => p.i == height + 1)) {
			part1Solved = true;
			console.log("Part 1: ", i);
		}
		if (possiblePositions.some(p => p.i == height + 1 && p.reachedStart)) {
			break;
		}
	}
	console.log("Part 2: ", i);
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
