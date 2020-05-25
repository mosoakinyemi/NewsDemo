import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchNewsData(1);
  }

  navigateTo=(data)=>{
    this.props.navigation.navigate(data)
  }

  render() {
    return (
      <View>
        <Text> Home </Text>
        {this.props.news.newsData.length > 0 &&
          this.props.news.newsData.map((item, index) => {
            return (
                <NewsItem author={item.author} id={item.id} title={item.title} navigateTo={this.navigateTo} />
            );
          })}
      </View>
    );
  }
}

const NewsItem =({id,author,title,navigateTo})=>{
    return(
        <TouchableOpacity onPress={()=>navigateTo('ViewNews',{
          newsId:id
        })} key={id} style={styles.newsItem}>
        <Text style={styles.newsItemAuthor}>{author}</Text>
        <Text style={styles.newsItemTitle}>{title}</Text>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  newsItemAuthor: {
    fontSize: 30,
    color: 'black',
  },
  newsItem: {
    width: 300,
    //   height:20,
    backgroundColor: 'grey',
    marginBottom: 10,
  },
});
const mapState = (state) => ({
  news: state.news,
});

const mapDispatch = (dispatch) => ({
  fetchNewsData: (currentPage) => dispatch.news.fetchNewsData(currentPage),
});

export default connect(mapState, mapDispatch)(Home);
