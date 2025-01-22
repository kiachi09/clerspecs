import dotenv from "dotenv";
import mailgun from "mailgun-js";
dotenv.config();

const DOMAIN = process.env.MAILGUN_DOMAIN;
const API = process.env.MAILGUN_API;
const mg = mailgun({
  apiKey: API,
  domain: DOMAIN,
});

export default mg;
