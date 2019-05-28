import React, { Component } from 'react'
import Calendar from 'react-calendar'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import apiUrl from './apiConfig'

class CalendarComponent extends Component {
      constructor () {
        super()
    
        this.state = {
            date: new Date(),
            formTitle: '',
            text: ''
        }
      }

    onCalChange = date => this.setState({ date })

    handleQuillChange = (value) => {
        this.setState({ text: value })
    }

    handleTitle = (event) => {
        this.setState({ formTitle: event.target.value })
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
          })
    }

    render() {
        return (
            <div>
            <input
            type='text'
            className='form-control form-control-lg'
            placeholder='Posting Title'
            value={this.state.formTitle}
            onChange={this.handleTitle}
          />
              <Calendar onChange={this.onCalChange} value={this.state.date} />
              <ReactQuill theme='snow'
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
            </div>
        )
    }
}

export default CalendarComponent
