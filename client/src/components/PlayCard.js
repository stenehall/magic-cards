import React from 'react'

import Card from './Card'
import { Icon } from 'semantic-ui-react'

import '../styles/PlayCard.css'

class PlayCard extends React.Component {
  constructor(props) {
    super(props)
  }

  testCard = (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (!this.props.card.code) {
      alert('Card has no card code. Test aborted.')
      return
    }

    const baseURL =
      process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : ''
    const testerURL = baseURL + '/test/' + this.props.card.code

    fetch(testerURL, { method: 'post' })
  }

  render() {
    const { card } = this.props

    return (
      <div>
        <div className="PlayCard">
          <span onClick={this.testCard}>
            <span class="active">
              <Icon name="play circle outline" size="huge" />
            </span>
            <Card card={card} />
          </span>
        </div>
      </div>
    )
  }
}

export default PlayCard
