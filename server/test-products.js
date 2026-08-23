import "dotenv/config";
import aiService from "./services/ai.service.js";
import searchProducts from "./services/product.service.js";
async function test() {
  // const result = await aiService.understandShoppingQuery(
  //   "I want black Nike running shoes under 3000"
  // );

  // console.log(result);
  const filters = await aiService.understandShoppingQuery(
    "I want black Nike running shoes under 3000"
  );

  console.log("Filters:", filters);
  const products = searchProducts(filters);
  console.log(products);
}
test()