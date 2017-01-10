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
    onRequestRobots: () => dispatch(requestRobots())
  }
}

const mergeProps = (stateProps, dispatchProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    filteredRobots: stateProps.robots.filter(robot =>
      robot.name.toLowerCase().includes(stateProps.searchTerm.toLowerCase()))
  }
}

class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots()
  }

  render() {
    const { filteredRobots, isPending, onSearchChange } = this.props;
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App)
