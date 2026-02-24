const express = require("express");
const routes = require("./routes/index");
const mongoose = require("mongoose");
const config = require("./config/db");
require("dotenv").config(); //.env içeriğini process.env içine yükler.
//process.env.XXX	.env'den gelen değerleri okur.
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// CORS ayarları (özelleştirilmiş bir yapılandırma ile)
const corsOptions = {
  origin: "http://localhost:5173", // İzin verilen frontend adresi
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // İzin verilen HTTP yöntemleri
  credentials: true, // Cookies gibi erişimleri içerir mi
};

// Middleware'ler
app.use(cors(corsOptions));
//app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik dosya servisi (uploads klasörünü statik olarak sunmak için)
app.use("/uploads", express.static("uploads"));

config.connectDB();

// API rotaları
app.use("/api", routes);

// Sunucuyu başlat
app.listen(3000, () => {
  console.log("Sunucu ayakta, JWT_SECRET:", process.env.JWT_SECRET);
});
