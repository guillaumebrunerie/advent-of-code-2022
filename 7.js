// Total duration: 21 min (rounded to the nearest minute)
// Started at:     19:09
// First star at:  19:26
// Second star at: 19:30

const solveProblem = (data) => {
	// Parse data

	const lines = data.split("\n").slice(0, -1);

	const fileSystem = {};
	let currentStack = [fileSystem];

	lines.forEach(line => {
		if (line == "$ cd /") {
			currentDirectory = [];
			return;
		}
		if (line == "$ cd ..") {
			currentStack = currentStack.slice(0, -1);
			return
		}
		if (line.startsWith("$ cd ")) {
			const name = line.slice(5);
			directory = currentStack.at(-1)[name];
			currentStack.push(directory);
			return;
		}
		if (line.startsWith("$ ls")) {
			return;
		}
		if (line.startsWith("dir ")) {
			const name = line.slice(4);
			currentStack.at(-1)[name] = {}
			return;
		}
		if (true) {
			const [sizeStr, name] = line.split(" ");
			const size = Number(sizeStr);
			currentStack.at(-1)[name] = size;
		}
	})

	// Part 1

	const directories = [];
	const traverseDir = (name, dir) => {
		let size = 0;
		Object.keys(dir).forEach(name => {
			const file = dir[name];
			if (typeof file == "number") {
				size += file;
				return;
			}
			size += traverseDir(name, file);
		});
		directories.push({name, size})
		return size
	}
	traverseDir("/", fileSystem);

	let sum = 0;
	directories.forEach(dir => {
		if (dir.size <= 100_000) {
			sum += dir.size;
		}
	})
	console.log(sum);
	console.log("");

	// Part 2

	const totalSize = directories.find(d => d.name == "/").size;
	const spaceToRemove = totalSize - 40_000_000;
	let bestSize = Infinity;
	directories.forEach(dir => {
		if (dir.size >= spaceToRemove && dir.size < bestSize) {
			bestSize = dir.size;
		}
	})
	console.log(bestSize);
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
