// Total duration: 19 min 40 seconds (would have been 83rd on the leaderboard)
// Started at:     19:29
// First star at:  19:46
// Second star at: 19:48:20

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);
	let values = lines.map((line, i) => ({i, value: Number(line)}));

	// Part 1

	const mixValue = (i) => {
		const index = values.findIndex(v => v.i == i)
		const [value] = values.splice(index, 1);
		let newIndex = (index + value.value + values.length) % values.length;
		// console.log({value, newIndex})
		// console.log(values);
		values.splice(newIndex, -1, value);
	}
	for (let i = 0; i < values.length; i++) {
		mixValue(i);
	}
	const computeResult = () => {
		const zeroIndex = values.findIndex(v => v.value == 0);
		return (
			values[(zeroIndex + 1000) % values.length].value +
				values[(zeroIndex + 2000) % values.length].value +
				values[(zeroIndex + 3000) % values.length].value
		);
	}
	console.log(computeResult());
	console.log("");

	// Part 2
	const key = 811589153;
	values = lines.map((line, i) => ({i, value: Number(line) * key}));
	for (let k = 0; k < 10; k++) {
		for (let i = 0; i < values.length; i++) {
			mixValue(i);
		}
	}

	console.log(computeResult());
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
