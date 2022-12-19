// Total duration: 1h44min (rounded to the nearest minute)
// Started at:     20:44
// First star at:  21:59
// Second star at: 22:28

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);
	const blueprints = lines.map(line => {
		const id = Number(line.slice(10, line.indexOf(":")));
		let i = line.indexOf("ore robot costs");
		const oreOre = Number(line.slice(i + 16, line.indexOf("ore.", i) - 1));
		i = line.indexOf("clay robot costs");
		const clayOre = Number(line.slice(i + 17, line.indexOf("ore.", i) - 1));
		i = line.indexOf("obsidian robot costs");
		const obsidianOre = Number(line.slice(i + 20, line.indexOf("ore and", i) - 1));
		i = line.indexOf("ore and", i);
		const obsidianClay = Number(line.slice(i + 8, line.indexOf("clay.", i) - 1));
		i = line.indexOf("geode robot costs");
		const geodeOre = Number(line.slice(i + 18, line.indexOf("ore and", i) - 1));
		i = line.indexOf("ore and", i);
		const geodeObsidian = Number(line.slice(i + 8, line.indexOf("obsidian.", i) - 1));
		return {id, oreOre, clayOre, obsidianOre, obsidianClay, geodeOre, geodeObsidian};
	});

	// Part 1

	// Same as below, but we assume infinite ore and clay, sorry for the horrible code
	let cacheA = {};
	let bestSoFarA = 0;
	const processMinuteApprox = (blueprint, robots, resources, timeLeft) => {
		const cacheKey = JSON.stringify({robots, resources, timeLeft});
		if (timeLeft == 0) {
			bestSoFar = Math.max(bestSoFarA, resources.geode);
			return resources.geode;
		}
		const cachedValue = cacheA[cacheKey];
		if (cachedValue !== undefined) {
			return cachedValue;
		}

		const bestPossible = resources.geode + robots.geode * timeLeft + timeLeft * (timeLeft - 1) / 2;
		if (bestPossible <= bestSoFarA) {
			return 0;
		}

		// Determine possible robots
		const possibleRobots = [];
		if (resources.obsidian >= blueprint.geodeObsidian) {
			possibleRobots.push("geode");
		}
		possibleRobots.push("obsidian");

		const result = Math.max(...possibleRobots.map(robot => {
			const newRobots = robot == "none" ? robots : {...robots, [robot]: robots[robot] + 1};
			const newResources = {
				obsidian: resources.obsidian + robots.obsidian,
				geode: resources.geode + robots.geode,
			};
			switch (robot) {
				case "obsidian":
					break;
				case "geode":
					newResources.obsidian -= blueprint.geodeObsidian;
					break;
			}
			return processMinuteApprox(blueprint, newRobots, newResources, timeLeft - 1)
		}));
		cacheA[cacheKey] = result;
		return result;
	}

	// Proper function to compute the result
	let cache = {};
	let bestSoFar = 0;
	const processMinute = (blueprint, robots, resources, timeLeft) => {
		const cacheKey = JSON.stringify({robots, resources, timeLeft});
		if (timeLeft == 0) {
			bestSoFar = Math.max(bestSoFar, resources.geode);
			return resources.geode;
		}
		const cachedValue = cache[cacheKey];
		if (cachedValue !== undefined) {
			return cachedValue;
		}

		// const bestPossible = resources.geode + robots.geode * timeLeft + timeLeft * (timeLeft - 1) / 2;
		const bestPossible = processMinuteApprox(blueprint, {geode: robots.geode, obsidian: robots.obsidian}, {geode: resources.geode, obsidian: resources.obsidian}, timeLeft);
		if (bestPossible <= bestSoFar) {
			return 0;
		}

		// Determine possible robots
		const possibleRobots = [];
		if (resources.ore >= blueprint.geodeOre && resources.obsidian >= blueprint.geodeObsidian) {
			possibleRobots.push("geode");
		}
		if (resources.ore >= blueprint.obsidianOre && resources.clay >= blueprint.obsidianClay) {
			possibleRobots.push("obsidian");
		}
		if (resources.ore >= blueprint.clayOre) {
			possibleRobots.push("clay");
		}
		if (resources.ore >= blueprint.oreOre) {
			possibleRobots.push("ore");
		}
		possibleRobots.push("none");

		const result = Math.max(...possibleRobots.map(robot => {
			const newRobots = robot == "none" ? robots : {...robots, [robot]: robots[robot] + 1};
			const newResources = {
				ore: resources.ore + robots.ore,
				clay: resources.clay + robots.clay,
				obsidian: resources.obsidian + robots.obsidian,
				geode: resources.geode + robots.geode,
			};
			switch (robot) {
				case "ore":
					newResources.ore -= blueprint.oreOre;
					break;
				case "clay":
					newResources.ore -= blueprint.clayOre;
					break;
				case "obsidian":
					newResources.ore -= blueprint.obsidianOre;
					newResources.clay -= blueprint.obsidianClay;
					break;
				case "geode":
					newResources.ore -= blueprint.geodeOre;
					newResources.obsidian -= blueprint.geodeObsidian;
					break;
			}
			return processMinute(blueprint, newRobots, newResources, timeLeft - 1)
		}));
		cache[cacheKey] = result;
		return result;
	}

	const robots = {
		ore: 1,
		clay: 0,
		obsidian: 0,
		geode: 0,
	};
	const resources = {
		ore: 0,
		clay: 0,
		obsidian: 0,
		geode: 0,
	}

	// let total = 0;
	// blueprints.forEach(blueprint => {
	// 	cache = {};
	// 	bestSoFar = 0;
	// 	const geode = processMinute(blueprint, robots, resources, 24)
	// 	console.log(blueprint.id, geode)
	// 	total += geode * blueprint.id;
	// })
	// console.log(total)
	console.log("");

	// Part 2

	let result = 1;
	for (let i = 0; i < 3; i++) {
		cache = {};
		bestSoFar = 0;
		const geodes = processMinute(blueprints[i], robots, resources, 32);
		result *= geodes
		console.log("Next!", geodes);
	}

	console.log(result);
	console.log("");
};


// Library code

const fs = require("fs");
const path = require('path');
const day = path.parse(__filename).name;

const files = [
	// `${day}-test`,
	`${day}`,
];

files.forEach(file => {
	fs.readFile(`./${file}.txt`, "utf8", (_, data) => {
		console.log(`Data from file ${file}.txt`);
		solveProblem(data);
	});
});
