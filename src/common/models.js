import axios from 'axios';

const baseURL = 'https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane';

export const news = {
  state: {
    isLoading: false,
    currentPage: 1,
    newsData: [],
    newsImages: [],
    newsComments: [],
  },
  reducers: {
    toggleLoader(state, status) {
      return {
        ...state,
        isLoading: status,
      };
    },
    saveNewsData(state, data) {
      return {
        ...state,
        newsData: data,
      };
    },
    saveNewsImages(state, data) {
      return {
        ...state,
        newsImages: data,
      };
    },
    saveNewsComments(state, data) {
      return {
        ...state,
        newsComments: data,
      };
    },
    addComment(state, data) {
      return {
        ...state,
        newsComments: state.newsComments.concat(data),
      };
    },
    increaseCurrentPage(state) {
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    },
    decreaseCurrentPage(state) {
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    },
  },

  effects: {
    async fetchNewsData(_, state) {
      const {currentPage} = state.news;
      this.toggleLoader(true);
      axios
        .request({
          method: 'get',
          url: `${baseURL}/news?page=${currentPage}&limit=10`,
          timeout: 5000,
        })
        .then((response) => {
          this.toggleLoader(false);
          this.saveNewsData(response.data);
        })
        .catch((e) => {
          this.toggleLoader(false);
          console.log(e);
        });
    },

    async fetchNewsImages(newsId) {
      this.toggleLoader(true);
      axios
        .request({
          method: 'get',
          url: `${baseURL}/news/${newsId}/images`,
          timeout: 5000,
        })
        .then((response) => {
          this.toggleLoader(false);
          this.saveNewsImages(response.data);
        })
        .catch((e) => {
          this.toggleLoader(false);
          console.log(e);
        });
    },

    async fetchNewsComments(newsId) {
      this.toggleLoader(true);
      axios
        .request({
          method: 'get',
          url: `${baseURL}/news/${newsId}/comments`,
          timeout: 5000,
        })
        .then((response) => {
          this.toggleLoader(false);
          this.saveNewsComments(response.data);
        })
        .catch((e) => {
          this.toggleLoader(false);
          console.log(e);
        });
    },
    async deleteComment(data) {
      const {newsId, commentId} = data;
      this.toggleLoader(true);
      axios
        .request({
          method: 'delete',
          url: `${baseURL}/news/${newsId}/comments/${commentId}`,
          timeout: 5000,
        })
        .then((response) => {
          this.toggleLoader(false);
          this.fetchNewsComments(newsId);
        })
        .catch((e) => {
          this.toggleLoader(false);
          console.log(e);
        });
    },
    async postComment(data, state) {
      const {newsId, name, comment} = data;
      this.toggleLoader(true);
      var commentData = {
        newsId,
        name: name,
        avatar: 'https://picsum.photos/200',
        comment: comment,
      };
      axios
        .request({
          method: 'post',
          url: `${baseURL}/news/${newsId}/comments`,
          data: commentData,
          timeout: 5000,
        })
        .then((response) => {
          this.toggleLoader(false);
          this.addComment(response.data);
        })
        .catch((e) => {
          this.toggleLoader(false);
          console.log(e);
        });
    },
    async updateComment(data) {
      const {newsId, commentIdToEdit, comment} = data;
      this.toggleLoader(true);
      var updatedComment = {
        comment: comment,
      };
      axios
        .request({
          method: 'put',
          url: `${baseURL}/news/${newsId}/comments/${commentIdToEdit}`,
          data: updatedComment,
          timeout: 5000,
        })
        .then((response) => {
          this.toggleLoader(false);
          this.fetchNewsComments(newsId);
        })
        .catch((e) => {
          this.toggleLoader(false);
          console.log(e);
        });
    },
    async createNews(data) {
      const {author, title} = data;
      this.toggleLoader(true);
      var newNews = {
        author: author,
        title: title,
      };
      axios
        .request({
          method: 'post',
          url: `${baseURL}/news`,
          data: newNews,
          timeout: 5000,
        })
        .then((response) => {
          this.toggleLoader(false);
          this.fetchNewsData();
          alert('Congrats, you have created a news!');
        })
        .catch((e) => {
          this.toggleLoader(false);
          console.log(e);
        });
    },
    async updateNews(data) {
      const {newsId, author, title} = data;
      this.toggleLoader(true);
      var updatedNews = {
        author: author,
        title: title,
      };
      axios
        .request({
          method: 'put',
          url: `${baseURL}/news/${newsId}`,
          data: updatedNews,
          timeout: 5000,
        })
        .then((response) => {
          this.toggleLoader(false);
          this.fetchNewsData();
        })
        .catch((e) => {
          this.toggleLoader(false);
          console.log(e);
        });
    },
  },
};
