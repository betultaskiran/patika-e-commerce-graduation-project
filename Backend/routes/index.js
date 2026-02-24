const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const productRouter = require("./product");
const categoryRouter = require("./category");
const brandRouter = require("./brand");
const contactRouter = require("./contact");
// const basketRouter = require("./basket");
// const orderRouter = require("./order");

const router = express.Router(); //express.Router()	Yeni bir küçük router oluşturur. Ana uygulamadan bağımsız olarak çalışabilir.
router.use("/auth", authRouter); //auth ile başlayan tüm yolları authRouter'a yönlendirir
router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/brand", brandRouter);
router.use("/contact", contactRouter);
// router.use("/basket", basketRouter);
// router.use("/order", orderRouter);
module.exports = router;
