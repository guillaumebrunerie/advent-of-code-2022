// Total duration: 23 min (rounded to the nearest minute)
// Started at:     00:48
// First star at:  01:02
// Second star at: 01:11

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);
	const steps = lines.flatMap(line => {
		const [dir, count] = line.split(" ");
		return Array(Number(count)).fill(dir);
	});

	// Part 1

	const visitedPositions = [[0, 0]];
	const head = [0, 0];
	const tail = [0, 0];
	const moveHead = (head, dir) => {
		switch (dir) {
			case "R":
				head[0]++;
				break;
			case "L":
				head[0]--;
				break;
			case "U":
				head[1]++;
				break;
			case "D":
				head[1]--;
				break;
		}
	}
	const moveTail = (head, tail) => {
		const dx = head[0] - tail[0];
		const dy = head[1] - tail[1];
		if (dx == 0 && Math.abs(dy) == 2) {
			tail[1] += Math.abs(dy) / dy;
		}
		if (dy == 0 && Math.abs(dx) == 2) {
			tail[0] += Math.abs(dx) / dx;
		}
		if (Math.abs(dx) == 1 && Math.abs(dy) == 2) {
			tail[0] += Math.abs(dx) / dx;
			tail[1] += Math.abs(dy) / dy;
		}
		if (Math.abs(dy) == 1 && Math.abs(dx) == 2) {
			tail[0] += Math.abs(dx) / dx;
			tail[1] += Math.abs(dy) / dy;
		}
		if (Math.abs(dy) == 2 && Math.abs(dx) == 2) {
			tail[0] += Math.abs(dx) / dx;
			tail[1] += Math.abs(dy) / dy;
		}
	}
	const followTail = (tail, visitedPositions) => {
		if (!visitedPositions.some(p => (p[0] == tail[0]) && (p[1] == tail[1]))) {
			visitedPositions.push([...tail]);
		}
	}
	steps.forEach(dir => {
		moveHead(head, dir);
		moveTail(head, tail);
		followTail(tail, visitedPositions);
	})
	console.log(visitedPositions.length);
	console.log("");

	// Part 2
	const visitedPositions2 = [[0, 0]];
	const rope = Array(10).fill().map(() => [0, 0]);
	steps.forEach(dir => {
		moveHead(rope[0], dir);
		rope.forEach((knot, i) => {
			if (i > 0) {
				moveTail(rope[i - 1], knot)
			}
		});
		followTail(rope[9], visitedPositions2);
	})
	console.log(visitedPositions2.length);
	console.log("");
};


// Library code

const fs = require("fs");
const path = require('path');
const day = path.parse(__filename).name;

const files = [
	`${day}-test`,
	`${day}-test2`,
	`${day}`,
];

files.forEach(file => {
	fs.readFile(`./${file}.txt`, "utf8", (_, data) => {
		console.log(`Data from file ${file}.txt`);
		solveProblem(data);
	});
});
