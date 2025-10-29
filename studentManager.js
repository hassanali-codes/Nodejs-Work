const fs = require("fs");

function loadStd() {
    try {
        return JSON.parse(fs.readFileSync("students.json", "utf8"));
    } catch {
        return [];
    }
}

function saveStd(students) {
    fs.writeFileSync("students.json", JSON.stringify(students, null, 2));
}

function addStd(name, age, city) {
    const students = loadStd();
    students.push({ name, age, city });
    saveStd(students);
    console.log(` Added: ${name}`);
}

function listStd() {
    const students = loadStd();
    console.table(students);
}

function removeStd(name) {
    const students = loadStd();
    const updated = students.filter(s => s.name !== name);
    saveStd(updated);
    console.log(` RemoveD: ${name}`);
}

function searchStd(name) {
    const students = loadStd();
    const result = students.filter(s => s.name === name);
    console.table(result);
}

const command = process.argv[2];
const name = process.argv[3];
const age = process.argv[4];
const city = process.argv[5];

if (command === "add") addStd(name, age, city);
else if (command === "list") listStd();
else if (command === "remove") removeStd(name);
else if (command === "search") searchStd(name);
else console.log("Commands: add | list | search | remove");