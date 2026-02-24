const productService = require("../services/product");

const productController = {
  /*createProduct: async (req, res) => {
    try {
      const response = await productService.createProduct(req.body);
      res.status(201).send({ success: true, response });
    } catch (e) {
      console.log(e, "error");
      res.status(500).send({ error: "Ürün oluşturulurken bir hata oluştu" });
    }
  },*/
  createProduct: async (req, res) => {
    try {
      const { productName, description, price, stock, categoryId, brandId } =
        req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Resim yolu
      // Resim yolu dahil diğer ürün bilgilerini al
      // const productData = {
      //   ...req.body,
      //   image: req.file ? `/uploads/${req.file.filename}` : null, // Resim yolu
      // };

      const response = await productService.createProduct({
        image: imagePath,
        productName,
        description,
        price,
        stock,
        categoryId,
        brandId,
      });
      res.status(201).send({ success: true, response });
    } catch (e) {
      console.log(e, "error");
      res.status(500).send({ error: "Ürün oluşturulurken bir hata oluştu" });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const response = await productService.updateProduct(req.body);
      res.status(200).send({ success: true, response });
    } catch (e) {
      console.log(e, "error");
      res.status(500).send({ error: "Ürün güncellenirken bir hata oluştu" });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const response = await productService.deleteProduct(req.params);
      res.status(200).send({ success: true, response });
    } catch (e) {
      console.log(e, "error");
      res.status(500).send({ error: "Ürün silinirken bir hata oluştu" });
    }
  },

  getProduct: async (req, res) => {
    try {
      const response = await productService.getProduct(req.params);
      console.log(response, "result");
      if (!response) {
        return res.status(404).send({ error: "Ürün bulunamadı" });
      }
      res.status(200).send({ success: true, response });
    } catch (e) {
      console.log(e, "error");
      res.status(500).send({ error: "Ürün getirilirken bir hata oluştu" });
    }
  },

  getProducts: async (req, res) => {
    try {
      console.log(req.query.categoryIds);
      const response = await productService.getProducts(req.query);
      res.status(200).send({ success: true, response });
    } catch (e) {
      console.log(e, "error");
      res.status(500).send({ error: "Ürünler getirilirken bir hata oluştu" });
    }
  },
  rateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { rating } = req.body;
      const response = await productService.rateProduct(id, rating);
      res.status(200).send({ success: true, response });
    } catch (e) {
      console.log(e, "error");
      res.status(500).send({ error: "Puan verilirken bir hata oluştu" });
    }
  },
};

module.exports = productController;
