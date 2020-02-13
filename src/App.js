import React from "react";
import axios from "axios";
import "./Epinfo";
import "./App.css";
import Epinfo from "./Epinfo";
import InfiniteScroll from "react-infinite-scroll-component";

class App extends React.Component {
  state = {
    eplist: [],
    page: 1,
    limit: 30,
    DataCnt: 30,
    torrents_count: 0,
    hasMore: true
  };

  componentDidMount() {
    this.getEpList();
  }

  getEpList = async () => {
    const {
      data: { torrents, torrents_count }
    } = await axios.get(
      `https://eztv.io/api/get-torrents?imdb_id=0436992&page=${this.state.page}`
    );

    var hasMore = true;
    if (torrents_count < this.state.limit * this.state.page) hasMore = false;

    this.setState({
      eplist: [...this.state.eplist, ...torrents],
      torrents_count,
      DataCnt: this.state.limit * this.state.page,
      page: this.state.page + 1,
      hasMore
    });
  };

  render() {
    const { eplist, DataCnt, hasMore } = this.state;
    // console.log("Total Cnt : " + torrents_count);
    return (
      <InfiniteScroll
        className="container"
        dataLength={DataCnt}
        next={this.getEpList}
        hasMore={hasMore}
        loader={
          <div className="loader">
            <span className="loader__text">자료를 가져오고 있습니다...</span>
          </div>
        }
      >
        {/* <div>전체 파일 수 : {torrents_count}</div> */}
        {eplist.map((ep, index) => (
          <Epinfo key={index} ep={ep}></Epinfo>
        ))}
      </InfiniteScroll>
    );
  }
}

export default App;
