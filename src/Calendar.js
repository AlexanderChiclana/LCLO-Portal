import React, { Component } from 'react'
import Calendar from 'react-calendar'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import apiUrl from './apiConfig'
import axios from 'axios'
import DOMPurify from 'dompurify'


class CalendarComponent extends Component {
      constructor () {
        super()
    
        this.state = {
            date: new Date(),
            formTitle: '',
            text: '',
            archive: []
        }
      }

    onCalChange = date => this.setState({ date })

    handleQuillChange = (value) => {
        this.setState({ text: value })
    }

    handleTitle = (event) => {
        this.setState({ formTitle: event.target.value })
    }

    handleArchive = () => {
      axios
      .get(`${apiUrl}/calendar`)
      .then(res => {
        this.setState({ archive: res.data.calendar })
      })
    }

    handleSubmit = () => {
        fetch(`${apiUrl}/calendar`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token token=${this.props.user.token}`
            },
            body: JSON.stringify({
              calendar: {
                heading: this.state.formTitle,
                text: this.state.text,
                date: this.state.date
              }
            })
          }).then(
            this.setState({ formTitle: '', text: '' })
          )
    }

    render() {
        return (
            <div>
         
              <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
              <Calendar onChange={this.onCalChange} value={this.state.date} />
              </div>
              <input
            type='text'
            className='form-control form-control-lg'
            placeholder='Event Title'
            value={this.state.formTitle}
            onChange={this.handleTitle}
          />
              <ReactQuill theme='snow'
            style={{ backgroundColor: 'white' }}
            value={this.state.text}
            onChange={this.handleQuillChange}/>

            
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
            Submit to Calendar
          </button>
        </div>
        
        { this.state.archive.map((event, index) => (<CalendarEvent key={ index }
        { ...event } />)) }

            </div>
        )
    }
}

class CalendarEvent extends Component {
  state = { editorOpen: false }

  toggleEditor = () => {
    this.setState(prevState => (
        { editorOpen: !prevState.editorOpen }))
    }
  


  render() {
    return (
      <div>
      <br />
    <div className="card">

       <div className="card-header d-flex justify-content-between">
        <h5>{this.props.heading}</h5>
        
        { new Date(this.props.date) > new Date() ? <h5 style={{ color: 'green', fontWeight: 'bold' }}>Upcoming Event 📅</h5> : <h5 style={{ fontStyle: 'italic', fontWeight: 200 }}>Past Event</h5>} 

       </div>     
      <div className="card-body">
        {/* <h5 className="card-title">Special title treatment</h5> */}
        { <p className="card-text" dangerouslySetInnerHTML= {{ __html: DOMPurify.sanitize(this.props.text) }} ></p> }


        {/* { this.state.editorOpen ? <ReactQuill theme="snow" value={this.state.text} onChange={this.handleChange} /> : null } */}
     

        <div className="d-flex flex-row-reverse">

        <a className="btn btn-outline-danger" onClick={this.toggleEditor}>Edit Post</a>
        { this.state.editorOpen ? <a className="btn btn-success text-white" onClick={this.handleUpdate}>Publish Changes</a> : null }
        { this.state.editorOpen ? <a className="btn btn-primary text-white" onClick={this.handleDeletePost}>Delete Post</a> : null }
          </div>
      </div>
    </div>           


</div>
    )
  }
} 

export default CalendarComponent
