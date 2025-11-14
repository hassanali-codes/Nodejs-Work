const fs = require("fs") //importing the file system module

const args = process.argv.slice(2);
const fileName = args[0];
const content = args.slice(1).join(" ");

if(!fileName || !content) {
    console.log("Usage: node file.js <filename> <content>");
    process.exit(1);
}

fs.writeFileSync(fileName, content); //writing content to the file
console.log(`File ${fileName} created successfully`)

const data = fs.readFileSync(fileName, "utf-8");
console.log(`📄 File content: \n ${data}`)