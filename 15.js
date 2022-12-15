// Total duration: 25 min 10 seconds (would have been 72nd on the leaderboard)
// Started at:     19:23
// First star at:  19:43
// Second star at: 19:48:10

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);
	const values = lines.map(line => {
		const comma = line.indexOf(",");
		const colon = line.indexOf(":");
		const at = line.indexOf("at", colon);
		const comma2 = line.indexOf(",", comma + 1);
		const sx = Number(line.slice(12, comma));
		const sy = Number(line.slice(comma + 4, colon));
		const bx = Number(line.slice(at + 5, comma2));
		const by = Number(line.slice(comma2 + 4));
		return {sx, sy, bx, by};
	});

	// Part 1

	const processRow = row => {
		const intervals = [];
		values.forEach(({sx, sy, bx, by}) => {
			const distance = Math.abs(sx - bx) + Math.abs(sy - by);
			const rowDistance = Math.abs(sy - row);
			if (rowDistance > distance) {
				return;
			}
			intervals.push({from: sx - (distance - rowDistance), to: sx + (distance - rowDistance)})
		});
		intervals.sort((i, j) => i.from - j.from)

		const disjointIntervals = [];
		intervals.forEach(({from, to}) => {
			if (disjointIntervals.length == 0) {
				disjointIntervals.push({from, to});
				return;
			}
			const lastInterval = disjointIntervals[disjointIntervals.length - 1];
			if (from <= lastInterval.to) {
				lastInterval.to = Math.max(lastInterval.to, to);
			} else {
				disjointIntervals.push({from, to})
			}
		});
		return disjointIntervals;
	}

	const disjointIntervals = processRow(2000000);
	let count = 0;
	disjointIntervals.forEach(({from, to}) => {
		count += to - from + 1;
	});
	const countedBeacons = []
	values.forEach(({bx, by}) => {
		if (by == 2000000 && !countedBeacons.includes(bx)) {
			count--;
			countedBeacons.push(bx);
		}
	})
	console.log(count);
	console.log("");

	// Part 2

	let x, y;
	for (let i = 0; i < 4000000; i++) {
		const disjointIntervals = processRow(i);
		if (disjointIntervals.length > 1) {
			y = i;
			x = disjointIntervals[0].to + 1;
		}
	}
	console.log(x * 4000000 + y);

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
