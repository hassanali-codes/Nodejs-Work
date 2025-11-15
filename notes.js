const fs = require("fs");
const filePath = "notes.json";

// ---------------------
// Load notes from file
// ---------------------
function loadNotes() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

// ---------------------
// Save notes to file
// ---------------------
function saveNotes(notes) {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}

// ---------------------
// Command-line arguments
// ---------------------
const args = process.argv.slice(2);
const command = args[0];

// ---------------------
// Handle commands
// ---------------------
switch (command) {

  // 1️⃣ Add a note
  case "add": {
    const [title, ...bodyParts] = args.slice(1);
    const body = bodyParts.join(" ");

    if (!title || !body) {
      console.log("Usage: node notes.js add <title> <body>");
      process.exit(1);
    }

    const notes = loadNotes();
    if (notes.some(note => note.title.toLowerCase() === title.toLowerCase())) {
      console.log(`❌ Note with title '${title}' already exists!`);
      process.exit(1);
    }

    notes.push({ title, body });
    saveNotes(notes);
    console.log(`✅ Note '${title}' added successfully.`);
    break;
  }

  // 2️⃣ List all notes
  case "list": {
    const notes = loadNotes();
    if (notes.length === 0) console.log("ℹ️ No notes found.");
    else {
      console.log("\n🗒️ Your Notes:");
      console.table(notes.map(note => ({ Title: note.title, Body: note.body })));
    }
    break;
  }

  // 3️⃣ Read a note
  case "read": {
    const title = args[1];
    if (!title) {
      console.log("Usage: node notes.js read <title>");
      process.exit(1);
    }

    const notes = loadNotes();
    const note = notes.find(n => n.title.toLowerCase() === title.toLowerCase());
    if (note) {
      console.log(`\n📖 ${note.title}\n${note.body}`);
    } else {
      console.log(`❌ No note found with title '${title}'.`);
    }
    break;
  }

  // 4️⃣ Remove a note
  case "remove": {
    const title = args[1];
    if (!title) {
      console.log("Usage: node notes.js remove <title>");
      process.exit(1);
    }

    const notes = loadNotes();
    const filtered = notes.filter(n => n.title.toLowerCase() !== title.toLowerCase());
    if (filtered.length === notes.length) {
      console.log(`❌ No note found with title '${title}'.`);
    } else {
      saveNotes(filtered);
      console.log(`🗑️ Note '${title}' removed successfully.`);
    }
    break;
  }

  //  Default: show help
  default:
    console.log(`
Usage:
  node notes.js add "Title" "Body"
  node notes.js list
  node notes.js read "Title"
  node notes.js remove "Title"
`);
}
