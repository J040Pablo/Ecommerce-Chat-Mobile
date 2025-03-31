import Product from "../models/ProductModel.js";

const ProductController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getProductsById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default ProductController;