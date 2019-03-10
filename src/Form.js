import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import apiUrl from './apiConfig'
import { WithContext as ReactTags } from 'react-tag-input'


// import axios from 'axios'
const KeyCodes = {
    comma: 188,
    enter: 13
  }

  const delimiters = [KeyCodes.comma, KeyCodes.enter]


class Form extends Component {
    constructor () {
        super()
    
        this.state = {
          user: null,
          alerts: [],

          text: '',
        
          
          tags: [],

        suggestions: [
            { id: 'USA', text: 'USA' },
            { id: 'Germany', text: 'Germany' },
            { id: 'Austria', text: 'Austria' },
            { id: 'Costa Rica', text: 'Costa Rica' },
            { id: 'Sri Lanka', text: 'Sri Lanka' },
            { id: 'Thailand', text: 'Thailand' }
         ]
        }
        // binding the rich text editor
        this.handleChange = this.handleChange.bind(this)

        // binding the tags
        this.handleDelete = this.handleDelete.bind(this)
        this.handleAddition = this.handleAddition.bind(this)
        this.handleDrag = this.handleDrag.bind(this)
      }
      handleChange(value) {
        this.setState({ text: value })
      }
      
      handleSubmit = () => {
        return fetch(`${apiUrl}/blogposts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token token=${this.props.user.token}`
            },
            body: JSON.stringify({
                    blogpost: {
                      page: this.props.page,
                      heading: 'new encounter',
                      text: this.state.text,
                      tags: ['YES']
                    }  
            })
          })
      }

      handleDelete(i) {
        const { tags } = this.state
        this.setState({
         tags: tags.filter((tag, index) => index !== i)
        })
    }
 
    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }))
    }
 
    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags]
        const newTags = tags.slice()
 
        newTags.splice(currPos, 1)
        newTags.splice(newPos, 0, tag)
 
        // re-render
        this.setState({ tags: newTags })
    }
 

    render() {
        const { tags, suggestions } = this.state

        return (
            <div>
                <br />
                <ReactTags  
                    tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} />
              <ReactQuill value={this.state.text} onChange={this.handleChange} />    
              <button type='button' className='btn btn-primary btn-lg' onClick={this.handleSubmit}>Submit to {this.props.page}</button>      
            </div>
        )
    }
}

export default Form


