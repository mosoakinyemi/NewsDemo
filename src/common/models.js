import axios from 'axios';

// const baseURL = "https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/"

export const news = {
  state: {
    isLoading: false,
    newsData:[]
  },
  reducers: {
    toggleLoader(state,status) {
      return {
        ...state,
        isLoading: status
      };
    },
    saveNewsData(state,data) {
      return {
        ...state,
        newsData: state.newsData.concat(data)
      };

    }
  },
  effects: {
    async fetchNewsData(currentPage, state) {
      this.toggleLoader(true);
      axios
      .request({
        method: 'get',
        url: `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news?page=${currentPage}&limit=10`,
        timeout: 5000,
      })
      .then(response => {
        this.toggleLoader(false);
        this.saveNewsData(response.data)
      })
      .catch(e => {
        this.toggleLoader(false);
        console.log(e);
      })
    },

    async fetchNewsImages(newsId, state) {
      this.toggleLoader(true);
      axios
      .request({
        method: 'get',
        url: `https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news/${newsId}/images`,
        timeout: 5000,
      })
      .then(response => {
        this.toggleLoader(false);
        this.saveNewsData(response.data)
      })
      .catch(e => {
        this.toggleLoader(false);
        console.log(e);
      })
    }
  }
};