// Total duration: 55 min (rounded to the nearest minute)
// Started at:     10:50
// First star at:  11:23
// Second star at: 11:45

const rocks = [
	[
		"####"
	], [
		".#.",
		"###",
		".#.",
	], [
		"###",
		"..#",
		"..#",
	], [
		"#",
		"#",
		"#",
		"#",
	], [
		"##",
		"##",
	]
]

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);
	const directions = lines[0];
	let offset = 0;

	// Part 1

	const width = 7;
	const field = Array(4).fill().map(() => Array(width).fill("."))
	const print = () => {
		console.log([...field].reverse().map(line => line.join("")).join("\n"))
	}

	let rockIndex = 0;
	let rock = rocks[rockIndex];
	let rockX = 2;
	let rockY = 3;
	let rockWidth = rock[0].length
	const checkRock = () => {
		if (rockX < 0 || rockX > width - rockWidth) {
			return false;
		}
		if (rockY < 0) {
			return false;
		}
		for (let i = 0; i < rock.length; i++) {
			for (let j = 0; j < rockWidth; j++) {
				if (rock[i][j] == "#" && field[rockY + i][rockX + j] == "#") {
					return false;
				}
			}
		}
		return true;
	}
	const moveSideways = () => {
		const direction = directions[offset];
		offset++;
		if (offset >= directions.length) {
			offset = 0;
		}
		// console.log("moving ", direction)
		switch (direction) {
			case ">":
				rockX++;
				if (!checkRock()) {
					// console.log("actually not")
					rockX--;
				}
				break;
			case "<":
				rockX--;
				if (!checkRock()) {
					// console.log("actually not")
					rockX++;
				}
				break;
			default:
				console.log("wrong direction", direction);
		}
	}
	const moveDown = () => {
		rockY--;
		if (!checkRock()) {
			rockY++;
			return false;
		}
		return true;
	}
	const processRockOnce = () => {
		// console.log(rockX, rockY)
		moveSideways();
		return moveDown();
	}
	let highestY = 0;
	const processRock = () => {
		while (processRockOnce()) {}
		for (let i = 0; i < rock.length; i++) {
			for (let j = 0; j < rockWidth; j++) {
				if (rock[i][j] == "#") {
					field[rockY + i][rockX + j] = "#";
					highestY = Math.max(highestY, rockY + i);
				}
			}
		}
		// console.log("Highest Y", highestY)
		// print()
		rockIndex++;
		if (rockIndex == rocks.length) {
			rockIndex = 0
		}
		rock = rocks[rockIndex];
		rockX = 2;
		rockY = highestY + 4;
		rockWidth = rock[0].length;
		for (let k = 0; k < 3 + rock.length; k++) {
			field.push(Array(width).fill("."));
		}
	}
	// for (let i = 0; i < 2022; i++) {
	// 	processRock();
	// 	// console.log(rockIndex, offset);
	// }
	// print()
	console.log(highestY + 1);
	console.log("");

	// Part 2

	for (let i = 0; i < 1000000; i++) {
		if (rockIndex == 0) {
			console.log(offset, "i=", i, "highestY=", highestY);
		}
		processRock();
	}
	// Completed by hand, looking at the period at which it is repeating and
	// then some modulo computations. It is not guaranteed correct, but it
	// really looked like it was repeating and it ended up giving the correct
	// answer.

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
