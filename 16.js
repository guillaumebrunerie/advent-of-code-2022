// Total duration: 2h10 (rounded to the nearest minute)
// Started at:     18:25
// First star at:  19:32
// Second star at: 20:35 (before my program finished running, to test whether
//                        the current best was the actual best, it actually
//                        finished at 20:40)

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);
	const valves = {};
	const flowValves = ["AA"];
	lines.map(line => {
		const valve = line.slice(6, 8);
		const flow = Number(line.slice(23, line.indexOf(";")));
		let tunnelsI = line.indexOf("valves") + 7;
		if (tunnelsI == 6) {
			tunnelsI = line.indexOf("to valve") + 9;
		}
		const tunnels = line.slice(tunnelsI).split(", ")
		valves[valve] = {flow, tunnels};
		if (flow > 0) {
			flowValves.push(valve);
		}
	})
	flowValves.sort((v1, v2) => valves[v2].flow - valves[v1].flow);

	const distances = {};
	flowValves.forEach(from => {
		flowValves.forEach(to => {
			if (from == to) {
				return;
			}
			const visited = [from];
			let candidates = [from]
			let distance = 0;
			while (true) {
				if (candidates.includes(to)) {
					break
				}
				distance++
				const newCandidates = [];
				candidates.forEach(c => {
					valves[c].tunnels.forEach(t => {
						if (!visited.includes(t) && !candidates.includes(t)) {
							newCandidates.push(t);
							visited.push(t);
						}
					})
				})
				candidates = newCandidates;
			}
			distances[from + " " + to] = distance;
		})
	})

	// Part 1

	const processValve = (v, timeLeft, position) => {
		const duration = distances[position + " " + v] + 1;
		timeLeft -= duration;
		timeLeft = Math.max(timeLeft, 0)
		const score = timeLeft * valves[v].flow;
		return {timeLeft, position: v, score};
	}

	const estimateBestLeft = (vs, timeLeft, position) => {
		let score = 0;
		vs.forEach(v => {
			const duration = distances[position + " " + v] + 1;
			score += Math.max(timeLeft - duration, 0) * valves[v].flow;
		})
		return score;
	}

	const partialProcess = (order, initialTime = 30, otherValves = flowValves.filter(v => !order.includes(v) && v !== "AA")) => {
		let timeLeft = initialTime;
		let position = "AA";
		let score = 0;
		order.forEach(v => {
			const r = processValve(v, timeLeft, position);
			timeLeft = r.timeLeft;
			position = r.position;
			score += r.score;
		})
		score += estimateBestLeft(otherValves, timeLeft, position);
		return {score, timeLeft, position};
	}

	let bestSoFar = 0;
	const testNextSteps = (prefix) => {
		flowValves.filter(v => !prefix.includes(v) && v !== "AA").forEach(v => {
			const newPrefix = [...prefix, v];
			const {score: estimate, timeLeft} = partialProcess(newPrefix);
			if (estimate < bestSoFar) {
				return;
			}
			if (timeLeft <= 0 || newPrefix.length == flowValves.length - 1) {
				bestSoFar = estimate;
			} else {
				testNextSteps(newPrefix)
			}
		})
	}
	testNextSteps([])
	console.log(bestSoFar)
	console.log("");

	// Part 2

	const estimateBestLeft2 = (vs, timeLeft1, position1, timeLeft2, position2) => {
		let score = 0;
		vs.forEach(v => {
			const duration1 = distances[position1 + " " + v] + 1;
			const score1 = Math.max(timeLeft1 - duration1, 0) * valves[v].flow;
			const duration2 = distances[position2 + " " + v] + 1;
			const score2 = Math.max(timeLeft2 - duration2, 0) * valves[v].flow;
			score += Math.max(score1, score2);
		})
		return score;
	}

	// Heuristically determined, tested 3000, 2800, 2700, 2500
	// Found: 2189, Less than: 2300
	bestSoFar = 2250;
	const testNextSteps2 = (prefix1, prefix2, skip1 = false, skip2 = false) => {
		flowValves.filter(v => !prefix1.includes(v) && !prefix2.includes(v) && v !== "AA").forEach(v => {
			const otherValves = flowValves.filter(x => !prefix1.includes(x) && !prefix2.includes(x) && x !== "AA" && x !== v)
			if (!skip1) {
				// Test adding it to the first prefix
				const newPrefix1 = [...prefix1, v];
				const {score: estimate1, timeLeft: timeLeft1, position: position1} = partialProcess(newPrefix1, 26, []);
				const {score: estimate2, timeLeft: timeLeft2, position: position2} = partialProcess(prefix2, 26, []);
				const estimate = estimate1 + estimate2 + estimateBestLeft2(otherValves, timeLeft1, position1, timeLeft2, position2);
				// console.log("estimate", estimate, newPrefix1, prefix2)
				if (estimate > bestSoFar) {
					if ((timeLeft1 <= 0 && timeLeft2 <= 0) || newPrefix1.length + prefix2.length == flowValves.length - 1) {
						console.log("best", estimate, newPrefix1, prefix2)
						bestSoFar = estimate;
					} else {
						testNextSteps2(newPrefix1, prefix2, timeLeft1 <= 0, timeLeft2 <= 0);
					}
				}
			}
			if (!skip2) {
				// Test adding it to the second prefix
				const newPrefix2 = [...prefix2, v];
				const {score: estimate1, timeLeft: timeLeft1, position: position1} = partialProcess(prefix1, 26, []);
				const {score: estimate2, timeLeft: timeLeft2, position: position2} = partialProcess(newPrefix2, 26, []);
				const estimate = estimate1 + estimate2 + estimateBestLeft2(otherValves, timeLeft1, position1, timeLeft2, position2);
				// console.log("estimate", estimate, prefix1, newPrefix2)
				if (estimate > bestSoFar) {
					if ((timeLeft1 <= 0 && timeLeft2 <= 0) || prefix1.length + newPrefix2.length == flowValves.length - 1) {
						console.log("best", estimate, prefix1, newPrefix2)
						bestSoFar = estimate;
					} else {
						testNextSteps2(prefix1, newPrefix2, timeLeft1 <= 0, timeLeft2 <= 0);
					}
				}
			}
		})
	}

	testNextSteps2([], [])
	console.log(bestSoFar);

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
