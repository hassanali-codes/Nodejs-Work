console.log(`you are running Node ${process.version}`);
console.log(`current working directory: ${process.cwd()}`);


const argv = process.argv.slice(2);
const name = argv[0] || 'Guest';

console.log(`Hello, ${name}!`);



