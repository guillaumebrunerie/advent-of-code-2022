// Total duration: 22 min (rounded to the nearest minute)
// Started at:     19:34
// First star at:  19:39
// Second star at: 19:56

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);
	let monkeys = Object.fromEntries(lines.map(line => line.split(": ")));

	// Part 1

	const runMonkey = name => {
		const number = Number(monkeys[name]);
		let result;
		if (!isNaN(number)) {
			result = number;
		} else {
			const [m1, o, m2] = monkeys[name].split(" ");
			const n1 = runMonkey(m1);
			const n2 = runMonkey(m2);
			switch (o) {
				case "+": result = n1 + n2; break;
				case "-": result = n1 - n2; break;
				case "*": result = n1 * n2; break;
				case "/": result = n1 / n2; break;
			}
		}
		monkeys[name] = result;
		return result;
	}
	console.log(runMonkey("root"))
	console.log("");

	// Part 2

	monkeys = Object.fromEntries(lines.map(line => line.split(": ")));
	const runMonkey2 = (name, showSides = false) => {
		if (name == "humn") {
			return NaN;
		}
		if (showSides) {
			const [m1, o, m2] = monkeys[name].split(" ");
			const n1 = runMonkey2(m1);
			const n2 = runMonkey2(m2);
			return [m1, n1, o, m2, n2];
		}

		const number = Number(monkeys[name]);
		let result;
		if (!isNaN(number)) {
			result = number;
		} else {
			const [m1, o, m2] = monkeys[name].split(" ");
			const n1 = runMonkey2(m1);
			const n2 = runMonkey2(m2);
			switch (o) {
				case "+": result = n1 + n2; break;
				case "-": result = n1 - n2; break;
				case "*": result = n1 * n2; break;
				case "/": result = n1 / n2; break;
			}
		}
		return result;
	}
	const computeHumnFrom = (name, expected) => {
		if (name == "humn") {
			return expected;
		}
		const [m1, n1, o, m2, n2] = runMonkey2(name, true);
		const nan1 = isNaN(n1);
		const nan2 = isNaN(n2);
		if (nan1 === nan2) {
			console.error("NaN error");
		}
		if (nan1) {
			switch (o) {
				case "+": return computeHumnFrom(m1, expected - n2);
				case "-": return computeHumnFrom(m1, expected + n2);
				case "*": return computeHumnFrom(m1, expected / n2);
				case "/": return computeHumnFrom(m1, expected * n2);
			}
		} else {
			switch (o) {
				case "+": return computeHumnFrom(m2, expected - n1);
				case "-": return computeHumnFrom(m2, n1 - expected);
				case "*": return computeHumnFrom(m2, expected / n1);
				case "/": return computeHumnFrom(m2, n1 / expected);
			}
		}
	};
	const [m1, n1, _, m2, n2] = runMonkey2("root", true);
	const nan1 = isNaN(n1);
	const nan2 = isNaN(n2);
	if (nan1 === nan2) {
		console.error("NaN error");
	}
	const result = nan1 ? computeHumnFrom(m1, n2) : computeHumnFrom(m2, n1);
	console.log(result)
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
