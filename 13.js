// Total duration: 26 min (rounded to the nearest minute)
// Started at:     21:23
// First star at:  21:45
// Second star at: 21:49

const solveProblem = (data) => {
	// Parse data

	const pairs = data.slice(0, -1).split("\n\n");
	const values = pairs.map(pair => {
		return pair.split("\n").map(l => eval(l));
	})

	// Part 1

	const compare = (a, b) => {
		if (typeof a == "number" && typeof b == "number") {
			return (a == b ? "eq" : a < b ? "lt" : "gt");
		}
		if (Array.isArray(a) && Array.isArray(b)) {
			for (let i = 0; i < a.length; i++) {
				if (i >= b.length) {
					return "gt";
				}
				const order = compare(a[i], b[i]);
				if (order !== "eq") {
					return order;
				}
			}
			if (a.length == b.length) return "eq";
			return "lt";
		}
		if (typeof a == "number") {
			return compare([a], b);
		}
		if (typeof b == "number") {
			return compare(a, [b]);
		}
	}
	let result = 0;
	values.forEach((pair, i) => {
		if (compare(pair[0], pair[1]) != "gt") {
			result += i + 1;
		}
	})
	console.log(result);
	console.log("");

	// Part 2

	const d1 = [[2]];
	const d2 = [[6]];
	const allPackets = [
		...values.flatMap(v => [v[0], v[1]]),
		d1,
		d2,
	];
	allPackets.sort((a, b) => {
		switch (compare(a, b)) {
			case "lt":
				return -1;
			case "eq":
				return 0;
			case "gt":
				return 1;
		}
	})

	console.log((allPackets.indexOf(d1) + 1) * (allPackets.indexOf(d2) + 1));

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
