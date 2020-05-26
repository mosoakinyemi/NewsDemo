import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import ImageSlider from '../components/ImageSlider';
import {hp, wp, deviceWidth, deviceHeight, colors} from '../common/constants';
import moment from 'moment';
import {Button} from '../components/Button';
import {ButtonOutlined} from '../components/ButtonOutlined';
import {CommentItem} from '../components/CommentItem';
import {HeaderRightButton} from '../components/HeaderRightButton';
import {CreateNewsForm} from '../components/CreateNewsForm';

class ViewNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommentsForm: false,
      isEditingComment: false,
      commentIdToEdit: null,
      commentValue: '',
      authorValue: '',
      titleValue: '',
    };

    this.props.navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          onPress={() => {
            this.setState({showCreateNewsForm: true});
            this.populateEditNewsFields();
          }}
          buttonText="edit"
        />
      ),
    });
  }
  populateEditNewsFields = () => {
    const newsData = this.props.route.params.fullData;
    this.setState({authorValue: newsData.author, titleValue: newsData.title});
  };

  componentDidMount() {
    const {newsId} = this.props.route.params;
    this.props.fetchNewsImages(newsId);
    this.props.fetchNewsComments(newsId);
  }

  submitComment = (commentId) => {
    const {newsId} = this.props.route.params;
    const {commentValue, authorValue, commentIdToEdit} = this.state;
    this.setState({showCommentsForm: false});
    if (this.state.commentValue.trim() == '') {
      alert('please type in something');
    } else if (this.state.isEditingComment) {
      var data = {
        newsId,
        commentIdToEdit,
        comment: commentValue,
      };
      this.props.updateComment(data);
    } else {
      var data = {
        newsId,
        comment: commentValue,
        name: authorValue,
      };
      this.props.postComment(data);
    }
  };

  deleteComment = (commentId) => {
    const {newsId} = this.props.route.params;
    var data = {newsId, commentId};
    this.props.deleteComment(data);
  };

  editComment = (commentId, name, comment) => {
    this.setState({
      showCommentsForm: true,
      isEditingComment: true,
      commentIdToEdit: commentId,
      authorValue: name,
      commentValue: comment,
    });
  };

  addComment = () => {
    this.setState({
      showCommentsForm: true,
      isEditingComment: false,
      authorValue: '',
      commentValue: '',
    });
  };

  submitNews = (newsId) => {
    this.setState({showCreateNewsForm: false});
    if (
      this.state.authorValue.trim() == '' ||
      this.state.titleValue.trim() == ''
    ) {
      alert('please type in something');
    } else {
      var data = {
        author: this.state.authorValue,
        title: this.state.titleValue,
        newsId: newsId,
      };
      this.props.updateNews(data);
    }
  };

  render() {
    const newsData = this.props.route.params.fullData;

    return (
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <ImageSlider images={this.props.news.newsImages} />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{newsData.title}</Text>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.authorText}>author: {newsData.author}</Text>
            <Text style={styles.timeText}>
              {moment(newsData.createdAt, 'YYYYMMDD').fromNow()}
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.newsText}>{newsData.body}</Text>
        </View>
        {this.renderCommentsSection()}
        {this.renderCommentsForm()}
        {this.renderEditNewsForm()}
      </ScrollView>
    );
  }
  renderCommentsSection = () => {
    var newsComments = this.props.news.newsComments;
    var hasComments = newsComments.length > 0;
    var commentsCount = hasComments ? `${newsComments.length} ` : '';
    var getCommentWord = newsComments.length > 1 ? 'Comments' : 'Comment';

    return (
      <View style={styles.commentsContainer}>
        <View style={styles.commentsHeader}>
          <Text style={styles.commentsHeaderText}>
            {commentsCount}
            {getCommentWord}
          </Text>
          <Button
            onPress={() => this.addComment()}
            buttonText="Add"
            style={styles.addCommentButton}
            textStyle={styles.addCommentButtonText}
          />
        </View>
        {hasComments ? (
          this.renderComments(newsComments)
        ) : (
          <View style={styles.noCommentsContainer}>
            <Text style={styles.noCommentsText}>
              No comments yet, be the first to add
            </Text>
          </View>
        )}
      </View>
    );
  };
  renderComments = (newsComments) => {
    return (
      <View style={{flex: 1}}>
        {newsComments.map((comment, index) => {
          return (
            <CommentItem
              key={comment.item}
              commentData={comment}
              onPressEdit={this.editComment}
              onPressDelete={this.deleteComment}
            />
          );
        })}
      </View>
    );
  };

  renderCommentsForm = () => {
    var modalTitle = this.state.isEditingComment
      ? 'Edit Comment'
      : 'Add Comment';

    var submitButtonTitle = this.state.isEditingComment ? 'Update' : 'Add';

    return (
      <CreateNewsForm
        handleAuthorInput={(text) => this.setState({authorValue: text})}
        handleTitleInput={(text) => this.setState({commentValue: text})}
        authorValue={this.state.authorValue}
        titleValue={this.state.commentValue}
        hideForm={() => this.setState({showCommentsForm: false})}
        showForm={this.state.showCommentsForm}
        submitNews={() => this.submitComment()}
        showCreateNewsForm={this.state.showCommentsForm}
        modalTitle={modalTitle}
        submitButtonTitle={submitButtonTitle}
      />
    );
  };
  renderEditNewsForm = () => {
    const newsData = this.props.route.params.fullData;
    return (
      <CreateNewsForm
        handleAuthorInput={(text) => this.setState({authorValue: text})}
        handleTitleInput={(text) => this.setState({titleValue: text})}
        authorValue={this.state.authorValue}
        titleValue={this.state.titleValue}
        hideForm={() => this.setState({showCreateNewsForm: false})}
        showForm={this.state.showCreateNewsForm}
        submitNews={() => this.submitNews(newsData.id)}
        showCreateNewsForm={this.state.showCreateNewsForm}
        modalTitle="Edit News"
        submitButtonTitle="Update"
      />
    );
  };
}

const mapState = (state) => ({
  news: state.news,
});

const mapDispatch = (dispatch) => ({
  fetchNewsImages: (newsId) => dispatch.news.fetchNewsImages(newsId),
  fetchNewsComments: (newsId) => dispatch.news.fetchNewsComments(newsId),
  updateComment: (data) => dispatch.news.updateComment(data),
  postComment: (data) => dispatch.news.postComment(data),
  deleteComment: (data) => dispatch.news.deleteComment(data),
  updateNews: (data) => dispatch.news.updateNews(data),
});

export default connect(mapState, mapDispatch)(ViewNews);

const styles = StyleSheet.create({
  //Comment Modal
  buttonContainers: {
    flexDirection: 'row',
    paddingTop: hp(20),
    width: '100%',
    justifyContent: 'space-evenly',
  },
  commentInput: {
    width: wp(250),
    paddingHorizontal: wp(10),
    height: hp(70),
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  modalTitle: {
    fontSize: hp(18),
    fontWeight: 'bold',
    color: '#707070',
    marginBottom: hp(15),
  },
  modalBody: {
    width: wp(340),
    paddingVertical: hp(30),
    borderRadius: wp(15),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
  },
  addCommentButton: {
    height: hp(25),
    width: wp(60),
    marginLeft: wp(40),
  },
  noCommentsText: {
    fontSize: hp(14),
    color: 'rgb(100,100,100)',
    marginBottom: hp(15),
  },
  noCommentsContainer: {
    flex: 1,
  },
  addCommentButtonText: {
    fontSize: hp(15),
  },
  commentsHeaderText: {
    fontSize: hp(18),
    color: 'rgb(70,70,70)',
    fontWeight: 'bold',
  },
  commentsHeader: {
    marginBottom: hp(15),
    flexDirection: 'row',
  },
  commentsContainer: {
    flex: 1,
    paddingVertical: hp(10),
    paddingHorizontal: wp(20),
  },
  timeText: {
    fontSize: hp(15),
    color: colors.timeTextColor,
  },
  newsText: {
    fontSize: hp(17),
    color: '#aaaaaa',
  },
  body: {
    marginLeft: wp(20),
  },
  authorText: {
    fontSize: hp(15),
    color: 'black',
    marginRight: wp(15),
  },
  titleText: {
    fontSize: hp(18),
    color: 'black',
    // marginBottom :hp(10)
  },
  titleContainer: {
    borderTopWidth: hp(1),
    borderBottomWidth: hp(1),
    borderColor: '#ddd',
    flexWrap: 'wrap',
    marginLeft: wp(20),
    paddingVertical: hp(10),
    marginBottom: hp(10),
  },
});
