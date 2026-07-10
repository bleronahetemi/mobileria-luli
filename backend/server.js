const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cors = require('cors');

const { PORT, MONGO_URI, JWT_SECRET } = require('./config');
const User = require('./models/User');
const Post = require('./models/Post');
const verifyToken = require('./middleware/verifyToken');
const requireAdmin = require('./middleware/requireAdmin');

const app = express();
const UPLOADS_DIR = path.join(__dirname, 'uploads');

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB u lidh me sukses!'))
  .catch(err => console.error(err));

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Lejohen vetem fotografi!'));
    }
    cb(null, true);
  }
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Te gjitha fushat duhet te plotesohen!' });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: 'Ky email ekziston!' });
    }

    const hashed = await bcrypt.hash(password, 10);
    // roli merret nga default-i i skemes: klienti nuk mund ta caktoje vete
    await new User({ username, email, password: hashed }).save();

    res.status(201).json({ message: 'Regjistrimi u krye me sukses!' });
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjate regjistrimit!' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dhe password jane te detyrueshem!' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: 'Te dhenat jane gabim!' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Te dhenat jane gabim!' });

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      userId: user._id,
      username: user.username,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjate loginit!' });
  }
});

app.post('/posts', verifyToken, requireAdmin, upload.single('image'), async (req, res) => {
  try {
    const title = req.body.title?.trim();
    const text = req.body.text?.trim();

    if (!title || !text) {
      return res.status(400).json({ message: 'Titulli dhe pershkrimi jane te detyrueshem!' });
    }

    const post = await new Post({
      userId: req.user.userId,
      title,
      text,
      image: req.file ? req.file.filename : null
    }).save();

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjate procesit te postimit!' });
  }
});

app.get('/allposts', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('userId', 'username')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Gabim gjate leximit te produkteve!' });
  }
});


app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message === 'Lejohen vetem fotografi!') {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: 'Gabim i papritur ne server!' });
});

app.listen(PORT, () =>
  console.log(`Serveri po punon ne portin ${PORT}`)
);
