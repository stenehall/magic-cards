import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Icon, Menu, Modal } from 'semantic-ui-react'
import { flowRight as compose } from 'lodash'
import Konami from 'react-konami-code'

import './styles/Index.css'

import Cards from './components/Cards'
import CardEditor from './components/CardEditor'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { cards: [], showAddCardModal: false, showAdmin: false }
  }

  handleRequestClose = (event) => {
    if (event) {
      event.preventDefault()
    }
    this.setState({ showAddCardModal: false })
  }

  addCard = () => {
    this.setState({ showAddCardModal: true })
  }

  easterEgg = () => {
    this.setState({ showAdmin: true })
  }

  render() {
    const { loading, error, cards } = this.props.data

    if (loading) {
      return <div>Loading...</div>
    } else if (error) {
      return <div>{error}</div>
    }

    const newCard = {}

    return (
      <div className="container">
        <Konami action={this.easterEgg} code={[38, 38, 40, 40]} />
        {this.state.showAdmin && (
          <Menu fixed="top" icon="labeled">
            <Menu.Item>
              <Icon name="magic" />
              <p>Magic Cards</p>
            </Menu.Item>
            <Menu.Item position="right" onClick={this.addCard}>
              <Icon name="plus" />
              Add Card
            </Menu.Item>
          </Menu>
        )}
        <Cards cards={cards} showAdmin={this.state.showAdmin} />

        <Modal
          open={this.state.showAddCardModal}
          onClose={this.handleRequestClose}
          size="large"
          dimmer={'blurring'}
        >
          <Modal.Header>Manage Card</Modal.Header>
          <Modal.Content>
            <CardEditor
              card={newCard}
              handleRequestClose={this.handleRequestClose}
            />
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

const cardsQuery = gql`
  query {
    cards {
      id
      code
      type
      action
      title
      subtitle
      artURL
      uri
    }
  }
`

export default compose(graphql(cardsQuery))(App)
