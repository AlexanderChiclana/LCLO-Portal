import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import apiUrl from './apiConfig'
// import axios from 'axios'

class Form extends Component {
    constructor () {
        super()
    
        this.state = {
          user: null,
          alerts: [],

          text: ''
        }
        this.handleChange = this.handleChange.bind(this)
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

    render() {
        return (
            <div>
                <br />
              <ReactQuill value={this.state.text} onChange={this.handleChange} />    
              <button type='button' className='btn btn-primary btn-lg' onClick={this.handleSubmit}>Submit to {this.props.page}</button>      
            </div>
        )
    }
}

export default Form


