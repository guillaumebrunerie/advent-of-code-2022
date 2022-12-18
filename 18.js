// Total duration: 16 min
// Started at:     11:16
// First star at:  11:20
// Second star at: 11:32

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);
	const values = lines.map(line => line.split(",").map(x => Number(x)))

	// Part 1

	let adjacent = 0;
	values.forEach(v1 => {
		values.forEach(v2 => {
			if (v1 == v2) {
				return;
			}
			const distance = Math.abs(v1[0] - v2[0]) + Math.abs(v1[1] - v2[1]) + Math.abs(v1[2] - v2[2]);
			if (distance == 1) {
				adjacent++;
			}
		})
	})
	console.log(values.length * 6 - adjacent)
	console.log("");

	// Part 2

	const min = Math.min(...values.map(v => v[0]), ...values.map(v => v[1]), ...values.map(v => v[2])) - 1;
	const max = Math.max(...values.map(v => v[0]), ...values.map(v => v[1]), ...values.map(v => v[2])) + 1;
	const DIR = [
		[1, 0, 0],
		[-1, 0, 0],
		[0, 1, 0],
		[0, -1, 0],
		[0, 0, 1],
		[0, 0, -1],
	];
	const exteriorPoints = [];
	const determineExterior = (point) => {
		exteriorPoints.push(point);
		DIR.forEach(dir => {
			const newPoint = [point[0] + dir[0], point[1] + dir[1], point[2] + dir[2]];
			if (newPoint[0] < min || newPoint[0] > max || newPoint[1] < min || newPoint[1] > max || newPoint[2] < min || newPoint[2] > max) {
				return;
			}
			const equal = (p) => p[0] == newPoint[0] && p[1] == newPoint[1] && p[2] == newPoint[2]
			if (exteriorPoints.some(equal)) {
				return;
			}
			if (values.some(equal)) {
				return;
			}
			determineExterior(newPoint);
		})
	}
	determineExterior([min, min, min]);
	let result2 = 0;
	values.forEach(v1 => {
		exteriorPoints.forEach(v2 => {
			const distance = Math.abs(v1[0] - v2[0]) + Math.abs(v1[1] - v2[1]) + Math.abs(v1[2] - v2[2]);
			if (distance == 1) {
				result2++;
			}
		})
	})
	console.log(result2)
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
