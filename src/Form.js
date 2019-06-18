import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import apiUrl from './apiConfig'
// import { WithContext as ReactTags } from 'react-tag-input'
import Feed from './Feed'
import axios from 'axios'

class Form extends Component {
  constructor() {
    super()

    this.state = {
      user: null,
      alerts: [],
      formTitle: '',
      imageURL: '',
      text: '',
      pinned: false,
      featured: false,
      tags: [],
      currentTagValue: '',
      blogposts: [],
      archiveVisibility: false
    }
    // binding the rich text editor
  }
  handleChange = (value) => {
    this.setState({ text: value })
  }

  componentDidMount() {
    this.getAllBlogPosts()
  }

  getAllBlogPosts = () => {
    axios
      .get(`${apiUrl}/${this.props.page}`)

      .then(res => {
        this.setState({ blogposts: res.data.blogposts })
      })
  }

  handleSubmit = () => {
    fetch(`${apiUrl}/blogposts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token=${this.props.user.token}`
      },
      body: JSON.stringify({
        blogpost: {
          page: this.props.page,
          heading: this.state.formTitle,
          text: this.state.text,
          tags: this.state.tags,
          image: this.state.imageURL,
          pinned: this.state.pinned,
          featured: this.state.featured
        }
      })
    })
      .then(this.getAllBlogPosts)
      .then(
        this.setState({
          text: '',
          formTitle: '',
          image: '',
          tags: [],
          currentTagValue: ''
        })
      )
  }

  handleTitle = event => {
    this.setState({ formTitle: event.target.value })
  }

  handleArchive = () => {
    this.setState({ archiveVisibility: true })
  }

  handleCheckboxChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleTagChange = event => {
    this.setState({ currentTagValue: event.target.value })
  }

  handleTagSubmit = event => {
    this.setState(state => {
      const tags = state.tags.concat(state.currentTagValue)

      return {
        tags,
        currentTagValue: ''
      }
    })

    event.preventDefault()
  }

  handleImageURL = event => {
    this.setState({ imageURL: event.target.value }) 
  }

  render() {
    return (
      <div>
        <br />
        <div className='d-flex justify-content-center'>
          <h1>{this.props.pageName}</h1>
        </div>

        <form onSubmit={this.handleTagSubmit}>
          <label>
            <input
              type='text'
              value={this.state.currentTagValue}
              onChange={this.handleTagChange}
            />
          </label>
          <input type='submit' value='Add Tag' />
          Tags: {this.state.tags.join(', ')}
        </form>

        <br />
        <div className='formStyle'>
          <input
            type='text'
            className='form-control form-control-lg'
            placeholder='Posting Title'
            value={this.state.formTitle}
            onChange={this.handleTitle}
          />
             <input
            type='text'
            className='form-control form-control-lg'
            placeholder='Image URL'
            value={this.state.imageURL}
            onChange={this.handleImageURL}
          />

          <ReactQuill
            theme='snow'
            value={this.state.text}
            onChange={this.handleChange}
          />
        </div>
        <br />
        <label>
          <input
            name='pinned'
            type='checkbox'
            checked={this.state.pinned}
            onChange={this.handleCheckboxChange}
          />
          Pin Post?
        </label>

        <label>
          <input
            name='featured'
            type='checkbox'
            checked={this.state.featured}
            onChange={this.handleCheckboxChange}
          />
          Featured?
        </label>

        <div className='d-flex flex-row-reverse'>
          <button
            type='button'
            className='btn btn-success btn-lg col-2'
            onClick={this.handleArchive}
          >
            View Archive
          </button>

          <button
            type='button'
            className='btn btn-primary btn-lg col-3'
            onClick={this.handleSubmit}
          >
            Submit to {this.props.pageName.toLowerCase()}
          </button>
        </div>

        {this.state.archiveVisibility ? (
          <Feed
            page={this.props.page}
            blogposts={this.state.blogposts}
            getAllBlogPosts={this.getAllBlogPosts}
            user={this.props.user}
          />
        ) : null}
      </div>
    )
  }
}

export default Form
