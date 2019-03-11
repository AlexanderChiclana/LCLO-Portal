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
          formTitle: '',
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
                      heading: this.state.formTitle,
                      text: this.state.text,
                      tags: this.state.tags
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
    
    handleTitle = (event) => {
        this.setState({ formTitle: event.target.value })
      }

    render() {
        const { tags, suggestions } = this.state

        return (
            <div>
                <br />
                <div className="d-flex justify-content-center">
                <h2>{this.props.pageName}</h2>
                </div>
                <ReactTags  
                    tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} />

    <br /> 
<input type="text" className="form-control form-control-lg" placeholder="Posting Title" value={this.state.value} onChange={this.handleTitle} />

              <ReactQuill theme="snow" value={this.state.text} onChange={this.handleChange} />  
              <br />  

              <div className="d-flex flex-row-reverse">
              <button type='button' className='btn btn-primary btn-lg col-3' onClick={this.handleSubmit}>Submit to {(this.props.pageName).toLowerCase()}</button>      
            </div>
            </div>
        )
    }
}

export default Form


