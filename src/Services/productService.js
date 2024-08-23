import axios from 'axios';

const apiUrl = `${process.env.REACT_APP_API_URL}/products`; // Ensure this variable is set in your .env file

class ProductService {
  static async getProducts() {
    try {
      const response = await axios.get(apiUrl);
      return response.data.map(product => ({
        ...product,
        price: Number(product.price) // Convert price to number if it's not already
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error; // Re-throw error to handle it in the component
    }
  }
}

export default ProductService;
