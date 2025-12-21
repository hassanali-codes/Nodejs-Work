const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://bsai24108161_db_user:hassanalicodes@cluster0.lz0m91p.mongodb.net/?appName=Cluster0)")
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection failed", err));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, default: "user", enum: ["user", "admin"] },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

app.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || name.length < 3)
    return res.status(400).json({ error: "Name is too short" });

  if (!password || password.length < 6)
    return res.status(400).json({ error: "Password is too weak" });

  User.findOne({ email })
    .then(userFound => {
      if (userFound)
        return res.status(400).json({ error: "Email already exists" });

      return User.create({ name, email, password, role });
    })
    .then(createdUser => {
      if (createdUser)
        res.status(201).json({ message: "User registered successfully" });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(dbUser => {
      if (!dbUser)
        return res.status(404).json({ error: "User not found" });

      if (!dbUser.isActive)
        return res.status(403).json({ error: "User account is disabled" });

      if (dbUser.password !== password)
        return res.status(401).json({ error: "Invalid login credentials" });

      res.json({
        message: "Login successful",
        user: {
          name: dbUser.name,
          email: dbUser.email,
          role: dbUser.role
        }
      });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get("/users", (_, res) => {
  User.find({}, { password: 0 })
    .then(allUsers => res.json(allUsers))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.put("/users/:id/toggle", (req, res) => {
  User.findById(req.params.id)
    .then(currentUser => {
      if (!currentUser)
        return res.status(404).json({ error: "User not found" });

      currentUser.isActive = !currentUser.isActive;
      return currentUser.save();
    })
    .then(updatedUser => {
      if (updatedUser)
        res.json(updatedUser);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.delete("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then(found => {
      if (!found)
        return res.status(404).json({ error: "User not found" });

      if (found.role === "admin")
        return res.status(403).json({ error: "Admin cannot be deleted" });

      return User.findByIdAndDelete(req.params.id);
    })
    .then(deleted => {
      if (deleted)
        res.json({ message: "User deleted successfully" });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(6000, () => console.log("Server started on port 6000"));