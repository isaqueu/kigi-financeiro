
import axios from 'axios';

// Define a URL base do webservice
const URL_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3005/api';

// Cria uma instância do Axios com configurações padrão
const api = axios.create({
  baseURL: URL_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
