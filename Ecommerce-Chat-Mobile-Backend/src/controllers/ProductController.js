import Product from "../models/ProductModel.js";

const ProductController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find(); // Busca todos os produtos no banco de dados
            res.status(200).json(products); // Retorna os produtos
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            res.status(500).json({ error: 'Erro ao buscar produtos.' });
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