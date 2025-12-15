const http = require("express");
const db = require("mongoose");

const server = http();
server.use(http.json());

const SERVER_PORT = 3000;

/* ---------- DATABASE CONNECTION ---------- */
(async function connectDB() {
    try {
        await db.connect(
            "mongodb+srv://myUser:myPassword@cluster0.abcde.mongodb.net/myDatabase"
        );
        console.log("Database connection successful");
    } catch (err) {
        console.error("Database connection failed");
    }
})();

/* ---------- SCHEMA & MODEL ---------- */
const productStructure = new db.Schema({
    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    category: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

const Product = db.model("Product", productStructure);

/* ---------- ROUTES ---------- */
server.get("/", (_, response) => {
    response.send("API is active");
});

/* CREATE */
server.post("/items", async (request, response) => {
    try {
        const newProduct = await Product.create(request.body);
        response.status(201).json(newProduct);
    } catch {
        response.status(400).json({ error: "Unable to create item" });
    }
});

/* READ ALL */
server.get("/items", async (_, response) => {
    const list = await Product.find({});
    response.json(list);
});

/* READ ONE */
server.get("/items/:id", async (request, response) => {
    const result = await Product.findOne({ _id: request.params.id });
    response.json(result);
});

/* UPDATE */
server.patch("/items/:id", async (request, response) => {
    const updated = await Product.findOneAndUpdate(
        { _id: request.params.id },
        request.body,
        { new: true }
    );
    response.json(updated);
});

/* DELETE */
server.delete("/items/:id", async (request, response) => {
    await Product.deleteOne({ _id: request.params.id });
    response.json({ status: "Removed successfully" });
});

/* ---------- SERVER ---------- */
server.listen(SERVER_PORT, () => {
    console.log(`Application started on port ${SERVER_PORT}`);
});
