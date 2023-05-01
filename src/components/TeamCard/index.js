// Write your code here

import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {teamData} = props
  const {id, name, imageUrl} = teamData

  return (
    <Link to={`/team-matches/${id}`} className="link-item" data-testid="loader">
      <li className="team-card">
        <img src={imageUrl} className="team-card-image" alt={name} />
        <p className="team-card-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
