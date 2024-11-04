const {Router} = require("express")
const { getProduct, addProduct, deleteProduct, updateProduct, get_one, git } = require("../controller/market_ctl")

const marketRouter = Router()

marketRouter.get("/get", getProduct)
marketRouter.get("/get_one/:id", get_one)
marketRouter.post("/add", addProduct)
marketRouter.delete("/delete/:id", deleteProduct)
marketRouter.put("/update/:id", updateProduct)
marketRouter.get("/", git)

module.exports = marketRouter 