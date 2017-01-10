import React, { PropTypes, Component } from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import { connect } from 'react-redux';
import { setSearchTerm, requestRobots } from '../actions'

const mapStateToProps = (state) => {
  return {
    searchTerm: state.robotsSearch.searchTerm,
    robots: state.robotsRequest.robots,
    isPending: state.robotsRequest.isPending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchTerm(event.target.value)),
    onRequestRobots: () => requestRobots(dispatch)
  }
}

class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots()
  }

  render() {
    const { robots, isPending, searchTerm, onSearchChange } = this.props;
    const filteredRobots = robots.filter(robot =>
      robot.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
      <div className='tc'>
        <h1>RoboDex</h1>
        <SearchBox onSearchChange={onSearchChange}/>
        <Scroll>
          {isPending ? <h2>Loading...</h2> : <CardList robots={filteredRobots} />}
        </Scroll>
      </div>
    );
  }
}

App.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  robots: PropTypes.array.isRequired,
  isPending: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
