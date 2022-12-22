// Total duration: 2h 44 min (rounded to the nearest minute)
// Started at:     19:34
// First star at:  20:08
// Second star at: 22:18

const solveProblem = async (data) => {
	// Parse data

	const [mapData, password] = data.slice(0, -1).split("\n\n");
	const map = mapData.split("\n");

	// Part 2

	let row = 0;
	let col = map[0].indexOf(".");
	let dir = 0;
	let i = 0;
	const size = 50;
	const move = () => {
		// console.log(row, col, dir);
		let nextRow = row;
		let nextCol = col;
		let nextDir = dir;
		const inField = () => nextRow >= 0 && nextRow < map.length && nextCol >= 0 && nextCol < map[nextRow].length && map[nextRow][nextCol] !== " ";
		switch (dir) {
			case 0: // Right
				nextCol++;
				if (!inField()) {
					// console.log("wrap");
					// nextCol = map[nextRow].split("").filter(x => x == " ").length;
					if (row < size) {
						nextRow = size * 3 - 1 - row;
						nextCol = size * 2 - 1;
						nextDir = 2;
					} else if (row < size * 2) {
						// console.log("before", nextRow, nextCol, nextDir)
						nextCol = row + size;
						nextRow = size - 1;
						nextDir = 3;
						// console.log("after", nextRow, nextCol, nextDir)
					} else if (row < size * 3) {
						nextRow = size * 3 - 1 - row;
						nextCol = size * 3 - 1;
						nextDir = 2;
					} else if (row < size * 4) {
						nextCol = row - size * 2;
						nextRow = size * 3 - 1;
						nextDir = 3;
					} else {
						console.error("error 0");
					}
				}
				break;
			case 2: // Left
				nextCol--;
				if (!inField()) {
					// console.log("wrap");
					// nextCol = map[nextRow].length - 1;
					if (row < size) {
						nextRow = size * 3 - 1 - row;
						nextCol = 0;
						nextDir = 0;
					} else if (row < size * 2) {
						nextCol = row - size;
						nextRow = size * 2;
						nextDir = 1;
					} else if (row < size * 3) {
						nextRow = size * 3 - 1 - row;
						nextCol = size;
						nextDir = 0;
					} else if (row < size * 4) {
						nextCol = row - size * 2;
						nextRow = 0;
						nextDir = 1;
					} else {
						console.error("error 2");
					}
				}
				break;
			case 1: // Down
				nextRow++;
				if (!inField()) {
					// console.log("wrap");
					// while (true) {
					// 	nextRow--;
					// 	if (!inField()) {
					// 		nextRow++;
					// 		break;
					// 	}
					// }
					if (col < size) {
						nextRow = 0;
						nextCol = col + size * 2;
						nextDir = 1;
					} else if (col < size * 2) {
						nextRow = col + size * 2;
						nextCol = size - 1;
						nextDir = 2;
					} else if (col < size * 3) {
						nextRow = col - size;
						nextCol = size * 2 - 1;
						nextDir = 2;
					} else {
						console.error("error 1");
					}
				}
				break;
			case 3: // Up
				nextRow--;
				if (!inField()) {
					// console.log("wrap");
					// while (true) {
					// 	nextRow++;
					// 	if (!inField()) {
					// 		nextRow--;
					// 		break;
					// 	}
					// }
					if (col < size) {
						nextRow = col + size;
						nextCol = size;
						nextDir = 0;
					} else if (col < size * 2) {
						nextRow = col + size * 2;
						nextCol = 0;
						nextDir = 0;
					} else if (col < size * 3) {
						nextRow = size * 4 - 1;
						nextCol = col - size * 2;
						nextDir = 3;
					} else {
						console.error("error 3");
					}
				}
				break;
		}
		if (map[nextRow][nextCol] == ".") {
			row = nextRow;
			col = nextCol;
			dir = nextDir;
		}
	};
	const print = () => {
		let r = "";
		for (let i = 0; i < map.length; i++) {
			for (let j = 0; j < map[i].length; j++) {
				if (i == row && j == col) {
					r += [">", "v", "<", "^"][dir];
				} else {
					r += map[i][j];
				}
			}
			r += "\n"
		}
		console.log(r);
		console.log("\n");
		// let dirS = [">", "v", "<", "^"][dir];
		// console.log(`${row}, ${col}, ${dirS}`);
	}
	while (i < password.length) {
		// print();
		if (password[i] == "R") {
			// console.log("R")
			dir++;
			dir = dir%4;
			i++;
		} else if (password[i] == "L") {
			// console.log("L")
			dir += 3;
			dir = dir%4;
			i++;
		} else {
			const li = password.indexOf("L", i);
			const ri = password.indexOf("R", i);
			const nextI = li == -1 ? (ri == -1 ? password.length : ri) : (ri == -1 ? li : Math.min(li, ri));
			const num = Number(password.slice(i, nextI));
			i = nextI;
			for (let k = 0; k < num; k++) {
				// print();
				move();
			}
			// console.log(num);
		}
	}
	// print();
	console.log(1000 * (row + 1) + 4 * (col + 1) + dir);
	console.log("");
};


// Library code

const fs = require("fs");
const path = require('path');
const day = path.parse(__filename).name;

const files = [
	// `${day}-test2`,
	`${day}`,
];

files.forEach(file => {
	fs.readFile(`./${file}.txt`, "utf8", (_, data) => {
		console.log(`Data from file ${file}.txt`);
		solveProblem(data);
	});
});
