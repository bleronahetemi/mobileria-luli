require('dotenv').config();

const { JWT_SECRET, MONGO_URI, PORT } = process.env;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET mungon. Kopjo .env.example ne .env dhe plotesoje.');
}

module.exports = {
  PORT: Number(PORT) || 4000,
  MONGO_URI: MONGO_URI || 'mongodb://localhost:27017/jwtReact',
  JWT_SECRET
};
