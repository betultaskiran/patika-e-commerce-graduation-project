const userService = require("../services/user");
const authService = require("../services/auth");
const jwt = require("jsonwebtoken");

const authController = {
  login: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: "email and password required" });
    }

    try {
      console.log("geldik");
      const response = await authService.login(req.body);
      res.status(200).send({ response: response });
    } catch (e) {
      console.log(e, "error");
      res.status(500).send({ error: "Giriş yapılırken hata oluştu" });
    }
  },
  register: async (req, res) => {
    try {
      const user = await userService.createUser(req.body);
      if (user) {
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(200).send({
          response: {
            user: user,
            token: token,
            message: "success",
          },
        });
      } else {
        res.status(400).send({ response: { message: "Kayıt başarısız" } });
      }
    } catch (e) {
      console.log(e, "error");
      res.status(500).send({ error: "Kayıt sırasında bir hata oluştu" });
    }
  },
};
module.exports = authController;
