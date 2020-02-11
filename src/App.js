import React from "react";
import axios from "axios";
import "./Epinfo";
import "./App.css";
import Epinfo from "./Epinfo";

class App extends React.Component {
  state = {
    eplist: [],
    page: 1,
    limit: 30,
    DataCnt: 30,
    torrents_count: 0
  };

  componentDidMount() {
    this.getEpList();
  }

  getEpList = async () => {
    const {
      data: { torrents, torrents_count }
    } = await axios.get("https://eztv.io/api/get-torrents?imdb_id=0436992");
    this.setState({
      eplist: [...this.state.eplist, ...torrents],
      torrents_count
    });
    console.log(this.state.eplist);
  };

  render() {
    const { eplist, page, limit, DataCnt, torrents_count } = this.state;
    return (
      <div>
        <div>전체 파일 수 : {torrents_count}</div>
        {eplist.map(ep => (
          <Epinfo ep={ep}></Epinfo>
        ))}
      </div>
    );
  }
}

export default App;
