// const axios = require('axios').default;
import axios from 'axios'


export default class GalleryService {
  constructor() {
    this.URL = 'https://pixabay.com/api/';
    this.API_KEY = '36443440-862a7ce0430fc541f34c4596c';
    this.perPage = 40;
    this.page = 1;
    this.searchQuery = ''
  }
  async getImages() {
    const params = {
      key: this.API_KEY,
      //  q: query,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
       per_page: this.perPage,
       page: this.page
    }
    try {
      const response = await axios.get(`${this.URL}`, { params });
      const { hits, totalHits } = response.data
      // console.log(response.data)
      // this.incrementPage()
      return { hits, totalHits };
    } catch (error) {
      console.log(error);
    }
  }
  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}
