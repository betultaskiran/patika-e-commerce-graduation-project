const Product = require("../models/product");

const productService = {
  createProduct: async (productData) => {
    const newProduct = new Product(productData);
    return await newProduct.save();
  },

  updateProduct: async (productData) => {
    const {
      _id,
      productName,
      description,
      price,
      stock,
      categoryId,
      brandId,
      image,
    } = productData;
    return await Product.findByIdAndUpdate(
      _id,
      { productName, description, price, stock, categoryId, image, brandId },
      { new: true }
    );
  },

  deleteProduct: async (params) => {
    const { id } = params;
    return await Product.findByIdAndDelete(id);
  },

  getProduct: async (params) => {
    const { id } = params;
    return await Product.findById(id);
  },

  getProducts: async (query) => {
    try {
      // Filtreleme için categoryIds var mı kontrolü yapıyoruz
      const filter = {};

      if (query.categoryIds) {
        // categoryIds varsa, virgülle ayrılmış ID'leri alıp bir array'e çeviriyoruz
        filter.categoryId = {
          $in: query.categoryIds.split(","), // Virgülle ayrılmış categoryId'lere göre filtreleme
        };
      }
      if (query.brandIds) {
        filter.brandId = {
          $in: query.brandIds.split(","), // Virgülle ayrılmış categoryId'lere göre filtreleme
        };
      }

      if (query.search) {
        filter.productName = {
          $regex: query.search, // search terimi içeren ürün adlarını filtreler
          $options: "i", // Büyük/küçük harf duyarsız arama için
        };
      }

      if (query.priceRanges) {
        const ranges = query.priceRanges.split(",");
        const priceFilters = ranges
          .map((range) => {
            const cleanRange = range.replace(/\$/g, ""); // Remove $ if present
            if (cleanRange === "200+") {
              return { price: { $gte: 200 } };
            }
            const parts = cleanRange.split("-");
            if (parts.length === 2) {
              const min = Number(parts[0]);
              const max = Number(parts[1]);
              if (!isNaN(min) && !isNaN(max)) {
                return { price: { $gte: min, $lte: max } };
              }
            }
            return null;
          })
          .filter((f) => f !== null);

        if (priceFilters.length > 0) {
          filter.$or = priceFilters;
        }
      }
      // Ürünleri filtrele, categoryName'i populate et
      const products = await Product.find(filter)
        .populate({
          path: "categoryId", // categoryId alanını populate et
          select: "categoryName", // Sadece categoryName alanını almak istiyoruz
        })
        .populate({
          path: "brandId",
          select: "brandName",
        })
        .exec(); // populate işlemi için exec kullan

      // Kategori bilgisini 'categoryName' olarak döndürüp, 'categoryId'yi kaldırıyoruz
      return products.map((product) => ({
        ...product._doc, // Ürün bilgilerini al
        brandName: product.brandId?.brandName || "Brand Bulunamadı", // categoryName ekle
        categoryName: product.categoryId?.categoryName || "Kategori Bulunamadı", // categoryName ekle
        categoryId: undefined, // Kategori ID'sini kaldırıyoruz
        brandId: undefined,
      }));
    } catch (error) {
      console.error("Error fetching products with category name:", error);
      throw error;
    }
  },
  rateProduct: async (id, rating) => {
    const r = Number(rating);
    console.log("Rating attempt for ID:", id, "with rating:", r);
    const product = await Product.findById(id);
    if (!product) {
      console.log("Product not found for ID:", id);
      throw new Error("Product not found");
    }

    const newRatingCount = (product.ratingCount || 0) + 1;
    const newRating =
      ((product.rating || 0) * (product.ratingCount || 0) + r) /
      newRatingCount;

    product.rating = newRating;
    product.ratingCount = newRatingCount;

    return await product.save();
  },
};

module.exports = productService;
