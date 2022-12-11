// Total duration: 31 min (rounded to the nearest minute)
// Started at:     11:08
// First star at:  11:24
// Second star at: 11:39

const solveProblem = (data) => {
	// Parse data

	let monkeys = eval(data); // preprocessed by hand
	const totalModulo = monkeys.reduce((a, m) => a * m.test, 1n);

	// Part 1

	let doDivide = true;

	const playMonkey = (i) => {
		const monkey = monkeys[i];
		monkey.items.forEach((item) => {
			item = monkey.operation(item);
			if (doDivide) {
				item = item / 3n;
			}
			item %= totalModulo;
			const divisible = (item % monkey.test) == 0n;
			monkeys[divisible ? monkey.iftrue : monkey.iffalse].items.push(item);
		})
		monkey.inspections ||= 0;
		monkey.inspections += monkey.items.length;
		monkey.items = [];
	}

	const playRound = () => {
		monkeys.forEach((_, i) => playMonkey(i));
	}

	const show = () => {
		monkeys.forEach((m, i) => console.log(`Monkey ${i}: ${m.items.join(", ")} (${m.inspections} inspections)`))
	}

	const computeResult = (rounds) => {
		for (let i = 0; i < rounds; i++) {
			playRound();
			if (i % 100 == 0) {
				// console.log(i)
			}
		}
		const inspections = monkeys.map(m => m.inspections).sort((a, b) => b - a)
		return inspections[0] * inspections[1]
	}

	console.log(computeResult(20))
	console.log("");

	// Part 2

	monkeys = eval(data); // reset
	doDivide = false;
	console.log(computeResult(10000));
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
