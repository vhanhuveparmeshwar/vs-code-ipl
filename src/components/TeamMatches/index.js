// Write your code here

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

import LatestMatch from '../LatestMatch'

import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {matchesData: [], isLoading: true}

  componentDidMount() {
    this.getTeamsMatches()
  }

  getTeamsMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchData = await response.json()
    console.log(fetchData)

    const updatedData = {
      teamBannerUrl: fetchData.team_banner_url,
      latestMatchDetails: {
        id: fetchData.latest_match_details.id,
        competingTeam: fetchData.latest_match_details.competing_team,
        competingTeamLogo: fetchData.latest_match_details.competing_team_logo,
        date: fetchData.latest_match_details.date,
        firstInnings: fetchData.latest_match_details.first_innings,
        manOfTheMatch: fetchData.latest_match_details.man_of_the_match,
        matchStatus: fetchData.latest_match_details.match_status,
        result: fetchData.latest_match_details.result,
        secondInnings: fetchData.latest_match_details.second_innings,
        umpires: fetchData.latest_match_details.umpires,
        venue: fetchData.latest_match_details.venue,
      },

      recentMatches: fetchData.recent_matches.map(eachMatch => ({
        id: eachMatch.id,
        competingTeam: eachMatch.competing_team,
        competingTeamLogo: eachMatch.competing_team_logo,
        date: eachMatch.date,
        manOfTheMatch: eachMatch.man_of_the_match,
        matchStatus: eachMatch.match_status,
        result: eachMatch.result,
        secondInnings: eachMatch.second_innings,
        umpires: eachMatch.umpires,
        venue: eachMatch.venue,
      })),
    }

    this.setState({matchesData: updatedData, isLoading: false})
  }

  renderTeamMatches = () => {
    const {matchesData} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = matchesData

    return (
      <div className="team-matches-container">
        <img src={teamBannerUrl} className="team-banner" alt="team banner" />
        <LatestMatch latestMatch={latestMatchDetails} />
        <ul className="recent-matches-list">
          {recentMatches.map(eachMatch => (
            <MatchCard key={eachMatch.id} matchData={eachMatch} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params

    return (
      <div className={`app-team-matches-container ${id}`}>
        {isLoading ? (
          <div data-testid="loader" className="loader-container">
            <Loader
              type="BallTriangle"
              color="#00BFFF"
              height={80}
              width={80}
            />
          </div>
        ) : (
          this.renderTeamMatches()
        )}
      </div>
    )
  }
}

export default TeamMatches
