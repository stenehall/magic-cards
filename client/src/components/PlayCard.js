import React from 'react'

import Card from './Card'

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
        <div className="PlayCard" onClick={this.testCard}>
          <Card card={card} />
        </div>
      </div>
    )
  }
}

export default PlayCard
