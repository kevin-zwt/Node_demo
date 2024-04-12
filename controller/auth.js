const Joi = require("joi");
const { sendEmail } = require("../mails/mail");
const { saveUser, findUserByKey } = require("../services/user.service");
const {
  generateAuthToken,
  comparePassword,
  createPassword,
  generateOTP,
  generateExpireTime,
} = require("../utils/auth");
const { withErrorHandling } = require("../utils/try-catch");
const { authValidation } = require("../validation");

let resJSon;

const register = withErrorHandling(async (req, res) => {
  await authValidation.registerSchema.validateAsync(req.body, {
    abortEarly: false,
  });
  const { username, email, password } = req.body;
  const hashedPassword = await createPassword(password, 10);
  const savedUser = await saveUser({
    username: username,
    email: email,
    password: hashedPassword,
  });
  resJSon = {
    data: savedUser,
    status: 200,
    message: "User registered successfully!",
  };
  res.promise(resJSon);
});

const login = withErrorHandling(async (req, res) => {
  let isFail = false;
  let accessToken;
  await authValidation.loginSchema.validateAsync(req.body, {
    abortEarly: false,
  });
  const { email, password } = req.body;
  const user = await findUserByKey({
    ["email"]: email,
  });
  if (!user) {
    isFail = true;
  } else {
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      isFail = true;
    } else {
      accessToken = await generateAuthToken({
        id: user.id,
        email: user.email,
      });
    }
  }
  if (isFail) {
    resJSon = {
      error: "Authentication failed!",
      status: 401,
      message: "Authentication failed!",
    };
  } else {
    resJSon = {
      data: {
        user: await user.getWithoutPassword(user),
        accessToken: accessToken,
      },
      status: 200,
      message: "User registered successfully!",
    };
  }
  res.promise(resJSon);
});

const forgotPassword = withErrorHandling(async (req, res) => {
  const userData = await authValidation.forgotPasswordSchema.validateAsync(
    req.body,
    {
      abortEarly: false,
    }
  );
  const { email } = req.body;
  const otp = await generateOTP();
  const otpExpire = await generateExpireTime(1);
  const updateUser = await saveUser(
    { otp: otp, otp_expire: otpExpire },
    email,
    userData.email
  );
  let mailOptions = {
    from: "test1@mailinator.com",
    to: updateUser.email,
    subject: "Verification OTP for reset password",
    text: `Your OTP (It is expired after 1 min) : ${otp}`,
  };
  const mailResponse = await sendEmail(mailOptions);
  if (mailResponse.messageId) {
    resJSon = {
      status: 200,
      message: "OTP sent successfully!",
    };
  } else {
    resJSon = {
      status: 500,
      message: "Something went wrong with OTP send!",
    };
  }
  res.promise(resJSon);
});

const resetPassword = withErrorHandling(async (req, res) => {
  const { otp, password, confirm_password } = req.body;
  const userData = await authValidation.resetPasswordSchema.validateAsync(
    req.body,
    {
      abortEarly: false,
    }
  );
  const hashedPassword = await createPassword(password, 10);
  await saveUser(
    { password: hashedPassword, otp: null, otp_expire: null },
    userData.otp.email,
    userData.otp
  );
  resJSon = {
    status: 200,
    message: "Password reset successfully!",
  };
  res.promise(resJSon);
});

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
