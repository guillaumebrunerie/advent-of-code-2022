// Total duration: 28 min (rounded to the nearest minute)
// Started at:     19:05
// First star at:  19:26
// Second star at: 19:33

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);
	let minX = Infinity;
	let maxX = -Infinity;
	let minY = Infinity;
	let maxY = -Infinity;
	const paths = lines.map(line => line.split(" -> ").map(p => {
		const [x, y] = p.split(",")
		minX = Math.min(minX, x);
		maxX = Math.max(maxX, x);
		minY = Math.min(minY, y);
		maxY = Math.max(maxY, y);
		return [Number(x), Number(y)];
	}))
	// console.log(minX, maxX, minY, maxY)


	// Part 1

	const map = Array(maxY + 2).fill().map(() => Array(1000).fill("."));
	const drawLine = (from, to) => {
		if (from[0] > to[0] || from[1] > to[1]) {
			drawLine(to, from)
		}
		if (from[0] == to[0]) {
			for (let i = from[1]; i <= to[1]; i++) {
				map[i][from[0]] = "#";
			}
		} else {
			for (let j = from[0]; j <= to[0]; j++) {
				map[from[1]][j] = "#";
			}
		}
	}
	paths.forEach(path => {
		let lastPoint;
		path.forEach(point => {
			if (lastPoint) {
				drawLine(point, lastPoint);
			}
			lastPoint = point;
		})
	})

	let isPart2 = false;
	const processSandAt = (x, y) => {
		if (y == map.length - 1) {
			return isPart2 ? "resting" : "gone";
		}
		if (map[y+1][x] == ".") {
			map[y+1][x] = "+";
			map[y][x] = ".";
			return processSandAt(x, y+1);
		}
		if (x > 0 && map[y+1][x-1] == ".") {
			map[y+1][x-1] = "+";
			map[y][x] = ".";
			return processSandAt(x-1, y+1);
		}
		if (x < map[y+1].length - 1 && map[y+1][x+1] == ".") {
			map[y+1][x+1] = "+";
			map[y][x] = ".";
			return processSandAt(x+1, y+1);
		}
		return "resting";
	}
	let resting = 0;
	const processNewSand = () => {
		if (map[0][500] == "+") {
			return;
		}
		map[0][500] = "+";
		switch (processSandAt(500, 0)) {
			case "resting":
				resting++;
				processNewSand();
				break;
			case "gone":
				return;
		}
	}

	processNewSand()
	console.log(resting);
	console.log("");

	// Part 2

	isPart2 = true;
	processNewSand()
	resting++;
	console.log(resting);
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
