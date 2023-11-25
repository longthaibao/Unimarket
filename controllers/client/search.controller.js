const Product = require("../../models/product.model");

const filterPriceHelper = require("../../helpers/filterPrice");
const productsHelper = require("../../helpers/products");

// [GET] /search
module.exports.index = async (req, res) => {
  let match = {};
  let newProducts = [];

  if (req.query.keyword) {
    match.$or = [
      { title: new RegExp(req.query.keyword, "i") },
      { school: new RegExp(req.query.keyword, "i") },
    ];
  }

  if (req.query.school) {
    match.school = new RegExp(req.query.school, "i");
  }

  if (req.query.facet) {
    match.product_category_id = req.query.facet;
  }
  match.deleted = false;
  match.status = "active";

  const products = await Product.find(match);

  if (req.query.minPrice || req.query.maxPrice) {
    let filterPrice = filterPriceHelper(products, req.query.minPrice, req.query.maxPrice);
    newProducts = productsHelper.priceNewProducts(filterPrice)
  } else newProducts = productsHelper.priceNewProducts(products); 
  
  res.render("client/pages/search/index", {
    pageTitle: "Kết quả tìm kiếm",
    keyword: req.query.keyword,
    products: newProducts
  });
}