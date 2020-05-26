import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {hp, wp, deviceWidth, deviceHeight} from '../common/constants';
import {NewsItem} from '../components/NewsItem';
import {ButtonOutlined} from '../components/ButtonOutlined';
import {Button} from '../components/Button';
import {HeaderRightButton} from '../components/HeaderRightButton';
import {CreateNewsForm} from '../components/CreateNewsForm';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateNewsForm: false,
      authorValue: '',
      titleValue: '',
    };

    this.props.navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          onPress={() => this.setState({showCreateNewsForm: true})}
          buttonText="create"
        />
      ),
    });
  }

  componentDidMount() {
    this.props.fetchNewsData();
  }

  gotoNextPage = () => {
    this.props.increaseCurrentPage();
    this.props.fetchNewsData();
  };

  gotoPreviousPage = () => {
    this.props.decreaseCurrentPage();
    this.props.fetchNewsData();
  };

  navigateTo = (data) => {
    this.props.navigation.navigate(data);
  };

  handleAuthorInput = (text) => {
    this.setState({authorValue: text});
  };
  handleTitleInput = (text) => {
    this.setState({titleValue: text});
  };

  submitNews = () => {
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
      };
      this.props.createNews(data);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {this.props.news.newsData.length > 0 &&
            this.props.news.newsData.map((item, index) => {
              return (
                <NewsItem
                  author={item.author}
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  createdAt={item.createdAt}
                  body={item.body}
                  navigation={this.props.navigation}
                  fullData={item}
                />
              );
            })}
        </ScrollView>

        {this.renderBackAndNextButton()}
        <CreateNewsForm
          handleAuthorInput={this.handleAuthorInput}
          handleTitleInput={this.handleTitleInput}
          authorValue={this.state.authorValue}
          titleValue={this.state.titleValue}
          hideForm={() => this.setState({showCreateNewsForm: false})}
          showForm={this.state.showCreateNewsForm}
          submitNews={() => this.submitNews()}
          modalTitle={'Add News'}
          submitButtonTitle="Add"
          showCreateNewsForm={this.state.showCreateNewsForm}
        />
      </View>
    );
  }
  renderBackAndNextButton = () => {
    const {currentPage} = this.props.news;
    console.log(currentPage);
    return (
      <View style={styles.buttonContainer}>
        {currentPage > 1 && (
          <ButtonOutlined
            onPress={() => this.gotoPreviousPage()}
            buttonText={'Back'}
          />
        )}
        <Button onPress={() => this.gotoNextPage()} buttonText={'Next'} />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: hp(30),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: deviceWidth,
    height: hp(80),
  },
  //screen styles
  scrollView: {
    width: deviceWidth,
    height: deviceHeight,
    paddingTop: hp(15),
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
const mapState = (state) => ({
  news: state.news,
});

const mapDispatch = (dispatch) => ({
  fetchNewsData: () => dispatch.news.fetchNewsData(),
  increaseCurrentPage: () => dispatch.news.increaseCurrentPage(),
  decreaseCurrentPage: () => dispatch.news.decreaseCurrentPage(),
  gotoNextPage: () => dispatch.news.gotoNextPage(),
  createNews: (data) => dispatch.news.createNews(data),
});

export default connect(mapState, mapDispatch)(Home);
