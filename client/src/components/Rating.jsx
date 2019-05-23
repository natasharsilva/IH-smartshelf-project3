import React, { Component } from 'react'

let style = {
  fontSize: 20,
}

export default class Rating extends Component {
  constructor(props) {
    super(props)
    this.state =  {
      isHovered: false
    }
    this.toggleIsHovered = this.toggleIsHovered.bind(this)
  }
  toggleIsHovered() {
    this.setState({
      isHovered: !this.state.isHovered
    })
  }
  render() {
    let nbOfStars = Math.round(this.props.children)
    return (
      <div 
        style={style} 
        className="Rating"
        onMouseEnter={this.toggleIsHovered}
        onMouseLeave={this.toggleIsHovered}
      >
        {"★".repeat(nbOfStars)}
        {"☆".repeat(5 - nbOfStars)}
        {/* If the element is hovered, display a box with the rating */}
        {this.state.isHovered && <div className="pop-up">{Number(this.props.children).toFixed(2)}</div>}
      </div>
    )
  }
}