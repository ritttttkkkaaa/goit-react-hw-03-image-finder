import axios from "axios";

export const findImage = async (query, page) => {
    const My_API_key = '35942774-c248ff19570495ecc1d8f115d';
    const response = await axios.get(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${My_API_key}&image_type=photo&orientation=horizontal&per_page=12
      `
      );
      return response.data.hits;
};

  