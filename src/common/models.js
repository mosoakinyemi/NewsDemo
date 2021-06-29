import axios from 'axios';
import handleApi from '../network/Network';

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

      let endpoint = `${baseURL}/news?page=${currentPage}&limit=10`;
      handleApi(
        endpoint,
        'get',
        null,
        function (response) {
          this.toggleLoader(false);
          this.saveNewsData(response.data);
        },
        function (e) {
          this.toggleLoader(false);
          console.log(e);
        },
      );
    },

    async fetchNewsImages(newsId) {
      this.toggleLoader(true);

      let endpoint = `${baseURL}/news/${newsId}/images`;
      handleApi(
        endpoint,
        'get',
        null,
        function (response) {
          this.toggleLoader(false);
          this.saveNewsImages(response.data);
        },
        function (e) {
          this.toggleLoader(false);
          console.log(e);
        },
      );
    },

    async fetchNewsComments(newsId) {
      this.toggleLoader(true);

      let endpoint = `${baseURL}/news/${newsId}/comments`;
      handleApi(
        endpoint,
        'get',
        null,
        function (response) {
          this.toggleLoader(false);
          this.saveNewsComments(response.data);
        },
        function (e) {
          this.toggleLoader(false);
          console.log(e);
        },
      );
    },
    async deleteComment(data) {
      const {newsId, commentId} = data;
      this.toggleLoader(true);

      let endpoint = `${baseURL}/news/${newsId}/comments/${commentId}`;
      handleApi(
        endpoint,
        'delete',
        null,
        function (res) {
          this.toggleLoader(false);
          this.fetchNewsComments(newsId);
        },
        function (e) {
          this.toggleLoader(false);
          console.log(e);
        },
      );
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
      let endpoint = `${baseURL}/news/${newsId}/comments`;
      handleApi(
        endpoint,
        'post',
        commentData,
        function (response) {
          this.toggleLoader(false);
          this.addComment(response.data);
        },
        function (e) {
          this.toggleLoader(false);
          console.log(e);
        },
      );
    },
    async updateComment(data) {
      const {newsId, commentIdToEdit, comment} = data;
      this.toggleLoader(true);
      var updatedComment = {
        comment: comment,
      };
      let endpoint = `${baseURL}/news/${newsId}/comments/${commentIdToEdit}`;
      handleApi(
        endpoint,
        'put',
        updatedComment,
        function (res) {
          this.toggleLoader(false);
          this.fetchNewsComments(newsId);
        },
        function (e) {
          this.toggleLoader(false);
          console.log(e);
        },
      );
    },
    async createNews(data) {
      const {author, title} = data;
      this.toggleLoader(true);
      var newNews = {
        author: author,
        title: title,
      };
      let endpoint = `${baseURL}/news`;
      handleApi(
        endpoint,
        'post',
        newNews,
        function (response) {
          this.toggleLoader(false);
          this.fetchNewsData();
          alert('Congrats, you have created a news!');
        },
        function (e) {
          this.toggleLoader(false);
          console.log(e);
        },
      );
    },
    async updateNews(data) {
      const {newsId, author, title} = data;
      this.toggleLoader(true);
      var updatedNews = {
        author: author,
        title: title,
      };
      let endpoint = `${baseURL}/news/${newsId}`;
      handleApi(
        endpoint,
        'put',
        updatedNews,
        function (response) {
          this.toggleLoader(false);
          this.fetchNewsData();
        },
        function (e) {
          this.toggleLoader(false);
          console.log(e);
        },
      );
    },
  },
};
