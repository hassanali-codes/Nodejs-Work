//----------------TASK 2-----------------   
const fs = require("fs");

function loadData(file) {
    try { return JSON.parse(fs.readFileSync(file, "utf8")); }
    catch { return []; }
}

function saveData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function addBook(title, author, category) {
    const books = loadData("books.json");
    books.push({ id: books.length + 1, title, author, category, available: true });
    saveData("books.json", books);
    console.log(`Added Book: ${title}`);
}

function listBooks() {
    const books = loadData("books.json");
    console.table(books.map(b => ({
        id: b.id,
        title: b.title,
        author: b.author,
        category: b.category,
        status: b.available ? "Available" : "Borrowed"
    })));
}

function addUser(name) {
    const users = loadData("users.json");
    users.push({ id: users.length + 1, name, borrowedBooks: [] });
    saveData("users.json", users);
    console.log(`Added User: ${name}`);
}

function borrowBook(userName, bookName) {
    const books = loadData("books.json");
    const users = loadData("users.json");
    const book = books.find(b => b.title === bookName);
    const user = users.find(u => u.name === userName);
    if (!book || !user || !book.available) return console.log("Not Allowed");
    book.available = false;
    user.borrowedBooks.push(bookName);
    saveData("books.json", books);
    saveData("users.json", users);
    console.log(`${userName} borrowed ${bookName}`);
}

function returnBook(userName, bookName) {
    const books = loadData("books.json");
    const users = loadData("users.json");
    const book = books.find(b => b.title === bookName);
    const user = users.find(u => u.name === userName);
    if (!book || !user) return console.log("Not Allowed");
    book.available = true;
    user.borrowedBooks = user.borrowedBooks.filter(b => b !== bookName);
    saveData("books.json", books);
    saveData("users.json", users);
    console.log(`${userName} returned ${bookName}`);
}

function showBorrowed() {
    const users = loadData("users.json");
    const data = [];
    users.forEach(u => u.borrowedBooks.forEach(b => data.push({ user: u.name, book: b })));
    console.table(data);
}

const cmd = process.argv[2];
const a = process.argv[3];
const b = process.argv[4];
const c = process.argv[5];

if (cmd === "addBook") addBook(a, b, c);
else if (cmd === "listBooks") listBooks();
else if (cmd === "addUser") addUser(a);
else if (cmd === "borrow") borrowBook(a, b);
else if (cmd === "return") returnBook(a, b);
else if (cmd === "borrowed") showBorrowed();
else console.log("Commands: addBook | listBooks | addUser | borrow | return | borrowed");