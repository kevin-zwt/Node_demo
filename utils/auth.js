const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const decodeAuthToken = (req) => {
  const { authorization } = req.headers;
  if (!authorization || authorization.trim().length === 0) {
    res.promise({ status: 401, error: "The authentication token is required" });
  }
  const token = authorization.replace("Bearer ", "");
  return jwt.verify(token, process.env.SECRET_KEY);
};

const generateAuthToken = async(user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const secret = process.env.SECRET_KEY;
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secret, options);
};

const comparePassword = async(password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

const createPassword = async(password, length) =>{
  return await bcrypt.hash(password, length);
};

const generateOTP = async() =>{
  return Math.floor(1000 + Math.random() * 9000);
}

const generateExpireTime = async(min) =>{
  const otpExpire = new Date();
  return otpExpire.setMinutes(otpExpire.getMinutes() + min);
}

module.exports = {
  decodeAuthToken,
  generateAuthToken,
  comparePassword,
  createPassword,
  generateOTP,
  generateExpireTime
};
