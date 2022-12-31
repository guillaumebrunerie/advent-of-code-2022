// Total duration: 10 min (rounded to the nearest minute)
// Started at:     10:35
// First star at:  10:45
// Second star at: 10:45

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);

	// Part 1

	let result = 0;
	lines.forEach(line => {
		let num = 0;
		line.split("").forEach((char, i) => {
			num += {"=": -2, "-": -1, "0": 0, "1": 1, "2": 2}[char] * Math.pow(5, line.length - i - 1)
		})
		// console.log(num);
		result += num;
	})
	const toSNAFU = (num, acc = "") => {
		if (num == 0) {
			return acc
		}
		switch (num % 5) {
			case 0:
				return toSNAFU(num / 5, "0" + acc);
			case 1:
				return toSNAFU((num - 1) / 5, "1" + acc);
			case 2:
				return toSNAFU((num - 2) / 5, "2" + acc);
			case 3:
				return toSNAFU((num + 2) / 5, "=" + acc);
			case 4:
				return toSNAFU((num + 1) / 5, "-" + acc);
		}
	}
	console.log("result:", toSNAFU(result));
	console.log("");

	// Part 2


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
