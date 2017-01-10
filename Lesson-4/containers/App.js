import React, { PropTypes, Component } from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import { apiCall } from '../api/api';
import Scroll from '../components/Scroll';
import { connect } from 'react-redux';
import { setSearchTerm } from '../actions'

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchTerm(event.target.value))
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      isPending: true
    }
  }
  componentDidMount() {
    apiCall('https://jsonplaceholder.typicode.com/users')
      .then(response =>
        this.setState({
          robots: response,
          isPending: false
        })
      )
  }

  render() {
    const { robots, isPending } = this.state;
    const filteredRobots = robots.filter(robot =>
      robot.name.toLowerCase().includes(this.props.searchTerm.toLowerCase())
    );
    return (
      <div className='tc'>
        <h1>RoboDex</h1>
        <SearchBox onSearchChange={this.props.onSearchChange}/>
        <Scroll>
          {isPending ? <h2>Loading...</h2> : <CardList robots={filteredRobots} />}
        </Scroll>
      </div>
    );
  }
}

App.propTypes = {
  searchTerm: React.PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
