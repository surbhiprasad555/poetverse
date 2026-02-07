const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Persistent Storage Files
const POEMS_FILE = path.join(__dirname, 'poems.json');
const USERS_FILE = path.join(__dirname, 'users.json');

// Initial Data
const INITIAL_POEMS = [
    { id: 1, title: "Whispers of the Dawn", content: "The sun greets the sky\nWith a gentle, warm embrace\nA new day begins...", authorId: "emrys_uid", authorName: "Emrys", authorUsername: "emrys_poet", color: "bg-pastel-purple", tags: ["nature", "hope"], comments: [], likes: 12, createdAt: new Date().toISOString() },
];

const INITIAL_USERS = [
    {
        uid: "emrys_uid",
        username: "emrys_poet",
        displayName: "Emrys",
        email: "emrys@example.com",
        password: "password123", // In a real app, hash this!
        bio: "Weaving words into worlds. 🌙✨\nLover of pastel skies and quiet mornings.",
        profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emrys",
        bannerPic: "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?q=80&w=1000&auto=format&fit=crop",
        followers: [],
        following: [],
        socialLinks: {
            instagram: "https://instagram.com",
            youtube: "https://youtube.com",
            discord: "https://discord.com"
        }
    }
];

// Helper: Read Data
const readData = (file, initialData) => {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify(initialData, null, 2));
        return initialData;
    }
    const data = fs.readFileSync(file);
    return JSON.parse(data);
};

// Helper: Write Data
const writeData = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// --- AUTH ROUTES ---

app.post('/api/auth/signup', (req, res) => {
    const { username, displayName, email, password } = req.body;
    const users = readData(USERS_FILE, INITIAL_USERS);

    if (users.find(u => u.username === username)) {
        return res.status(400).json({ error: "Username already exists" });
    }
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: "Email already registered" });
    }

    const newUser = {
        uid: Date.now().toString(),
        username,
        displayName,
        email,
        password,
        bio: "Just a poet in a vast world.",
        profilePic: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        bannerPic: "",
        followers: [],
        following: [],
        socialLinks: {}
    };

    users.push(newUser);
    writeData(USERS_FILE, users);
    res.status(201).json(newUser);
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const users = readData(USERS_FILE, INITIAL_USERS);
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json(user);
});

// --- USER & PROFILE ROUTES ---

app.get('/api/users/:uid', (req, res) => {
    const users = readData(USERS_FILE, INITIAL_USERS);
    const user = users.find(u => u.uid === req.params.uid);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
});

app.put('/api/users/:uid', (req, res) => {
    const { displayName, bio, profilePic, bannerPic, socialLinks, username } = req.body;
    const users = readData(USERS_FILE, INITIAL_USERS);
    const index = users.findIndex(u => u.uid === req.params.uid);

    if (index === -1) return res.status(404).json({ error: "User not found" });

    // Check username uniqueness if changed
    if (username && username !== users[index].username) {
        if (users.find(u => u.username === username)) {
            return res.status(400).json({ error: "Username already taken" });
        }
    }

    users[index] = {
        ...users[index],
        displayName: displayName || users[index].displayName,
        username: username || users[index].username,
        bio: bio !== undefined ? bio : users[index].bio,
        profilePic: profilePic || users[index].profilePic,
        bannerPic: bannerPic || users[index].bannerPic,
        socialLinks: socialLinks || users[index].socialLinks
    };

    writeData(USERS_FILE, users);
    res.json(users[index]);
});

// --- POEM ROUTES ---

app.get('/api/poems', (req, res) => {
    const poems = readData(POEMS_FILE, INITIAL_POEMS);
    res.json(poems);
});

app.post('/api/poems', (req, res) => {
    const { title, content, tags, authorId, authorName, authorUsername } = req.body;
    const poems = readData(POEMS_FILE, INITIAL_POEMS);
    const newPoem = {
        id: Date.now(),
        title,
        content,
        authorId: authorId || "anonymous",
        authorName: authorName || "Anonymous Poet",
        authorUsername: authorUsername || "anonymous",
        color: ['bg-pastel-purple', 'bg-pastel-pink', 'bg-pastel-blue', 'bg-pastel-yellow', 'bg-pastel-green'][Math.floor(Math.random() * 5)],
        tags: tags ? tags.split(',').map(t => t.trim()) : [],
        comments: [],
        likes: 0,
        createdAt: new Date().toISOString()
    };
    poems.unshift(newPoem);
    writeData(POEMS_FILE, poems);
    res.status(201).json(newPoem);
});

app.delete('/api/poems/:id', (req, res) => {
    const { id } = req.params;
    let poems = readData(POEMS_FILE, INITIAL_POEMS);
    const initialLength = poems.length;
    poems = poems.filter(p => p.id != id);

    if (poems.length === initialLength) {
        return res.status(404).json({ error: "Poem not found" });
    }
    writeData(POEMS_FILE, poems);
    res.json({ success: true });
});

app.post('/api/poems/:id/like', (req, res) => {
    const { id } = req.params;
    const poems = readData(POEMS_FILE, INITIAL_POEMS);
    const index = poems.findIndex(p => p.id == id);

    if (index !== -1) {
        poems[index].likes = (poems[index].likes || 0) + 1;
        writeData(POEMS_FILE, poems);
        res.json({ success: true, likes: poems[index].likes });
    } else {
        res.status(404).json({ error: "Poem not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
