// Total duration: 36 min (rounded to the nearest minute)
// Started at:     8:53
// First star at:  9:25
// Second star at: 9:29

const solveProblem = (data) => {
	// Parse data

	const map = data.split("\n").slice(0, -1);
	const elves = [];
	map.forEach((line, i) => line.split("").forEach((c, j) => {
		if (c == "#") {
			elves.push({i, j});
		}
	}))

	// Part 1

	const hasElfAt = (i, j) => {
		return elves.some(e => e.i == i && e.j == j)
	};
	const proposeMoves = (k) => {
		elves.forEach((elf) => {
			const {i, j} = elf;
			const n = hasElfAt(i - 1, j);
			const ne = hasElfAt(i - 1, j + 1);
			const e = hasElfAt(i, j + 1);
			const se = hasElfAt(i + 1, j + 1);
			const s = hasElfAt(i + 1, j);
			const sw = hasElfAt(i + 1, j - 1);
			const w = hasElfAt(i, j - 1);
			const nw = hasElfAt(i - 1, j - 1);
			if (!n && !ne && !e && !se && !s && !sw && !w && !nw) {
				elf.proposed = {i, j};
				return;
			}
			let proposed;
			for (let l = k; l < k + 4; l++) {
				if (proposed) {
					break;
				}
				switch (l % 4) {
					case 0: // N
						if (!n && !ne && !nw) {
							proposed = {i: i - 1, j};
						}
						break;
					case 1: // S
						if (!s && !se && !sw) {
							proposed = {i: i + 1, j};
						}
						break;
					case 2: // W
						if (!w && !nw && !sw) {
							proposed = {i, j: j - 1};
						}
						break;
					case 3: // E
						if (!e && !ne && !se) {
							proposed = {i, j: j + 1};
						}
						break;
				}
			}
			if (proposed) {
				elf.proposed = proposed;
			} else {
				elf.proposed = {i, j};
			}
		})
	}
	let didMove = false;
	const processMoves = () => {
		elves.forEach(elf => {
			if (elves.some(elf2 => elf2 != elf && elf2.proposed.i == elf.proposed.i && elf2.proposed.j == elf.proposed.j)) {
				return;
			} else {
				if (elf.i != elf.proposed.i || elf.j != elf.proposed.j) {
					didMove = true;
				}
				elf.i = elf.proposed.i;
				elf.j = elf.proposed.j;
			}
		})
		elves.forEach(elf => {
			delete elf.proposed;
		})
	}

	const elfBounds = () => {
		let minI = Math.min(...elves.map(elf => elf.i));
		let maxI = Math.max(...elves.map(elf => elf.i));
		let minJ = Math.min(...elves.map(elf => elf.j));
		let maxJ = Math.max(...elves.map(elf => elf.j));
		return {minI, maxI, minJ, maxJ};
	}
	const countEmpty = () => {
		let count = 0;
		const {minI, maxI, minJ, maxJ} = elfBounds();
		for (let i = minI; i <= maxI; i++) {
			for (let j = minJ; j <= maxJ; j++) {
				if (elves.every(elf => elf.i != i || elf.j != j)) {
					count++
				}
			}
		}
		return count;
	}
	let min = 0;
	let max = 10;
	const print = () => {
		let r = "";
		for (let i = min; i < max; i++) {
			for (let j = min; j < max; j++) {
				if (elves.some(elf => elf.i == i && elf.j == j)) {
					r += "#";
				} else {
					r += ".";
				}
			}
			r += "\n";
		}
		console.log(r);
	}

	for (let k = 0; k < 10; k++) {
		proposeMoves(k);
		processMoves();
	}
	console.log(countEmpty())
	console.log("");

	// Part 2

	let k = 10;
	for (k = 10; k < 1000000; k++) {
		// console.log("current: ", k);
		didMove = false;
		proposeMoves(k);
		processMoves();
		if (!didMove) {break;}
	}
	console.log(k + 1);
	console.log("");
};


// Library code

const fs = require("fs");
const path = require('path');
const day = path.parse(__filename).name;

const files = [
	// `${day}-test`,
	`${day}-test2`,
	`${day}`,
];

files.forEach(file => {
	fs.readFile(`./${file}.txt`, "utf8", (_, data) => {
		console.log(`Data from file ${file}.txt`);
		solveProblem(data);
	});
});
