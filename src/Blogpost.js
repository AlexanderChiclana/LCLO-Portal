import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

class Blogpost extends Component {
    constructor () {
        super()
    
        this.state = {
            editorOpen: false,
            heading: '',
            text: ''
        }
      }
    
    componentDidMount() {
    this.setState({ text: this.props.text,
        heading: this.props.heading
    })
    }
    
    handleChange = (value) => {
     this.setState({ text: value })
      }

    toggleEditor = () => {
    this.setState(prevState => (
        { editorOpen: !prevState.editorOpen }))
    }

    render() {
        return (
            <div>
                <br />
              <div className="card">

                 { this.state.editorOpen ? <input type="text" className="form-control form-control-lg" placeholder="Posting Title" value={this.state.heading} onChange={this.handleTitle} /> : <h5 className="card-header">{this.props.heading}</h5> }    
                <div className="card-body">
                  {/* <h5 className="card-title">Special title treatment</h5> */}
                  { this.state.editorOpen ? null : <p className="card-text">{this.props.text}</p> }
                  { this.state.editorOpen ? <ReactQuill theme="snow" value={this.state.text} onChange={this.handleChange} /> : null }

                  <a className="btn btn-primary" onClick={this.toggleEditor}>Edit Post</a>
                </div>
              </div>           
        

 </div>
        )
    }
}

export default Blogpost
