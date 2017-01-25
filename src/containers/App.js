import React, { PropTypes, Component } from "react";
import "./App.css";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import { connect } from "react-redux";
import { setSearchTerm1, setSearchTerm2, requestRobots } from "../actions";
import { filterRobotsSelector } from '../reducers';

const mapStateToProps = state => {
  return {
    searchTerm1: state.robotsSearch.searchTerm1,
    searchTerm2: state.robotsSearch.searchTerm2,
    robots: filterRobotsSelector(state),
    isPending: state.robotsRequest.isPending
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange1: event => dispatch(setSearchTerm1(event.target.value)),
    onSearchChange2: event => dispatch(setSearchTerm2(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  };
};

//You can use mergeProps as a third parameter in the connect()
// const mergeProps = (stateProps, dispatchProps) => {
//   return {
//     ...stateProps,
//     ...dispatchProps,
//     filteredRobots: stateProps.robots.filter(
//       robot =>
//         robot.name.toLowerCase().includes(stateProps.searchTerm.toLowerCase())
//     )
//   };
// };

class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const { robots, isPending, onSearchChange1, onSearchChange2 } = this.props;
    return (
      <div className="tc">
        <h1>RoboDex</h1>
        <SearchBox onSearchChange={onSearchChange1} />
        <SearchBox onSearchChange={onSearchChange2} />
        <Scroll>
          {
            isPending
              ? <h2>Loading...</h2>
              : <CardList robots={robots} />
          }
        </Scroll>
      </div>
    );
  }
}

App.propTypes = {
  searchTerm1: PropTypes.string.isRequired,
  searchTerm2: PropTypes.string.isRequired,
  robots: PropTypes.array.isRequired,
  isPending: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App)