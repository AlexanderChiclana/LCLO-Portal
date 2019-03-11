import React, { Component } from 'react'

class Blogpost extends Component {
    render() {
        return (
            <div>
                <br />
<div className="card">
  <h5 className="card-header">{this.props.heading}</h5>
  <div className="card-body">
    <h5 className="card-title">Special title treatment</h5>
    <p className="card-text">{this.props.text}</p>
    <a href="#" className="btn btn-primary">Edit Post</a>
  </div>
</div>            </div>
        )
    }
}

export default Blogpost
