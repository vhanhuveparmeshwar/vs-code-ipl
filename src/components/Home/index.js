// Write your code here

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamsList: [], isLoading: true}

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const fetchData = await response.json()
    console.log(fetchData)
    const {teams} = fetchData

    const updatedData = teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      imageUrl: eachTeam.team_image_url,
    }))

    this.setState({teamsList: updatedData, isLoading: false})
  }

  renderTeamsList = () => {
    const {teamsList} = this.state

    return (
      <ul className="team-list-items">
        {teamsList.map(eachTeam => (
          <TeamCard key={eachTeam.id} teamData={eachTeam} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container" data-testid="loader">
        <div className="ipl-container">
          <div className="header-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="header-heading">IPL Dashboard</h1>
          </div>

          {isLoading ? (
            <div data-testid="loader" className="loader-container">
              <Loader type="Rings" color="#00BFFF" height={80} width={80} />
            </div>
          ) : (
            this.renderTeamsList()
          )}
        </div>
      </div>
    )
  }
}

export default Home
