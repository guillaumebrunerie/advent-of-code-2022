// Total duration: 16 min (rounded to the nearest minute)
// Started at:     00:27
// First star at:  00:35
// Second star at: 00:43

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);
	const values = lines.map(line => line.split("").map(x => Number(x)))

	// Part 1

	const w = values.length;
	const h = values[0].length;
	const mask = values.map(line => line.map(v => 0))

	let max;

	// Left to right
	for (let i = 0; i < h; i++) {
		max = -1;
		for (let j = 0; j < w; j++) {
			if (values[i][j] > max) {
				mask[i][j] = 1;
				max = values[i][j];
			} else {
				continue;
			}
		}
	}

	// Right to left
	for (let i = 0; i < h; i++) {
		max = -1;
		for (let j = w - 1; j >= 0; j--) {
			if (values[i][j] > max) {
				mask[i][j] = 1;
				max = values[i][j];
			} else {
				continue;
			}
		}
	}

	// Top to bottom
	for (let j = 0; j < w; j++) {
		max = -1;
		for (let i = 0; i < h; i++) {
			if (values[i][j] > max) {
				mask[i][j] = 1;
				max = values[i][j];
			} else {
				continue;
			}
		}
	}

	// Bottom to top
	for (let j = 0; j < w; j++) {
		max = -1;
		for (let i = h - 1; i >= 0; i--) {
			if (values[i][j] > max) {
				mask[i][j] = 1;
				max = values[i][j];
			} else {
				continue;
			}
		}
	}

	let count = 0;
	for (let j = 0; j < w; j++) {
		for (let i = 0; i < h; i++) {
			count += mask[i][j];
		}
	}

	console.log(count)
	console.log("");

	// Part 2

	const scores = values.map(line => line.map(v => -1))

	const scoreAt = (i, j) => {
		const height = values[i][j];
		let a = 0;
		for (let di = 1; di < w; di++) {
			if (i + di >= w) {
				break;
			}
			a++;
			if (values[i + di][j] >= height) {
				break;
			}
		}
		let b = 0;
		for (let di = -1; di > -w; di--) {
			if (i + di < 0) {
				break;
			}
			b++;
			if (values[i + di][j] >= height) {
				break;
			}
		}
		let c = 0;
		for (let dj = 1; dj < h; dj++) {
			if (j + dj >= h) {
				break;
			}
			c++;
			if (values[i][j + dj] >= height) {
				break;
			}
		}
		let d = 0;
		for (let dj = -1; dj > -h; dj--) {
			if (j + dj < 0) {
				break;
			}
			d++;
			if (values[i][j + dj] >= height) {
				break;
			}
		}
		return a * b * c * d;
	}

	let bestScore = 0;
	for (let i = 0; i < w; i++) {
		for (let j = 0; j < h; j++) {
			bestScore = Math.max(bestScore, scoreAt(i, j));
		}
	}
	console.log(bestScore)
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
