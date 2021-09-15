import React, { Component } from 'react'
import Card from './Card'
import CommSection from '../../../components/CommSection';

interface Props {

}

interface State {

}

export default class MyLevel2 extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <CommSection title="我的Level-2">
        <Card />
      </CommSection>
    )
  }
}