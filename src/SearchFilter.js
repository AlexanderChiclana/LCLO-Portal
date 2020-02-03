import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig.js'

class BlogPost extends Component {
  handleAddClick = event => {
    event.preventDefault()
    this.props.handleBlogpostLink(this.props.id, this.props.heading)
    this.props.setSelectedHeading(this.props.heading)
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: '#F0F0F0',
          height: '40px',
          zIndex: 6000,
          borderBottom: '1px solid black',
          width: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5px'
        }}
      >
        <div>{this.props.heading}</div>
        <div>
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={this.handleAddClick}
          >
            Add Link
          </button>
        </div>
      </div>
    )
  }
}

class SearchFilter extends Component {
  state = {
    value: '',
    blogposts: []
  }

  handleChange = value => {
    this.setState({ value: event.target.value })

    axios.get(`${apiUrl}/search/${event.target.value}`).then(res => {
      this.setState({ blogposts: res.data.blogposts })
    })
  }

  handleClear = () => {
    this.setState({
      value: '',
      blogposts: []
    })
  }

  setSelectedHeading = heading => {
    this.setState({
      value: heading,
      blogposts: []
    })
  }

  render() {
    const match =
      this.state.value && this.props.linkedBlogpostHeading === this.state.value
    return (
      <div style={{ zIndex: 10 }}>
        <input
          style={{
            color: match && 'green',
            fontWeight: match && 'bold'
          }}
          type="text"
          className="form-control form-control-lg"
          placeholder="Link Article"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <div
          style={{
            position: 'absolute',
            zIndex: 100,
            width: 'inherit',
            border: '1px solid gray'
          }}
        >
          {this.state.blogposts.map((blogpost, index) => (
            <BlogPost
              key={index}
              heading={blogpost.heading}
              id={blogpost._id}
              setSelectedHeading={this.setSelectedHeading}
              handleBlogpostLink={this.props.handleBlogpostLink}
            />
          ))}
          {this.state.blogposts.length > 0 && (
            <div
              style={{
                backgroundColor: 'white',
                height: '40px',
                zIndex: 6000,
                borderBottom: '1px solid black',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around'
              }}
            >
              <div>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={this.handleClear}
                >
                  Clear List
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default SearchFilter
