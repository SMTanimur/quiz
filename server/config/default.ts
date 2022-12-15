import "dotenv/config";

const key = process.env.DB_KEY;
const user = process.env.DB_USER;
const publicK = process.env.ACCESS_TOKEN_PUBLIC_KEY;
const privateK = process.env.ACCESS_TOKEN_PRIVATE_KEY;

export default {
  port: 1337,
  origin: 'http://localhost:3000',
  dbUri: `mongodb+srv://${user}:${key}@izabela.41hbr.mongodb.net/?retryWrites=true&w=majority`,
  saltWorkFactor: 10,
  accessTokenTtl: '15m',
  refreshTokenTtl: '1y',
  publicKey: publicK,
  privateKey: privateK,
};
