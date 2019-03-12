import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { WithContext as ReactTags } from 'react-tag-input'

const KeyCodes = {
    comma: 188,
    enter: 13
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]



class Blogpost extends Component {
    constructor () {
        super()
    
        this.state = {
            editorOpen: false,
            heading: '',
            tags: [],
            text: '',
            suggestions: [
                { id: 'USA', text: 'USA' },
                { id: 'Germany', text: 'Germany' },
                { id: 'Austria', text: 'Austria' },
                { id: 'Costa Rica', text: 'Costa Rica' },
                { id: 'Sri Lanka', text: 'Sri Lanka' },
                { id: 'Thailand', text: 'Thailand' }
             ]
        }
      }
    
    componentDidMount() {
    this.setState({ text: this.props.text,
        heading: this.props.heading,
        tags: this.props.tags
    })
    }
    
    handleChange = (value) => {
     this.setState({ text: value })
      }

    toggleEditor = () => {
    this.setState(prevState => (
        { editorOpen: !prevState.editorOpen }))
    }

    // for tags

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
              <div className="card">

                 { this.state.editorOpen ? <input type="text" className="form-control form-control-lg" placeholder="Posting Title" value={this.state.heading} onChange={this.handleTitle} /> : <h5 className="card-header">{this.props.heading}</h5> }    
                <div className="card-body">
                  {/* <h5 className="card-title">Special title treatment</h5> */}
                  { this.state.editorOpen ? null : <p className="card-text">{this.props.text}</p> }
                  { this.state.editorOpen ? <ReactTags  
                    tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} /> : null }
                    
                  { this.state.editorOpen ? <ReactQuill theme="snow" value={this.state.text} onChange={this.handleChange} /> : null }

                  <a className="btn btn-primary" onClick={this.toggleEditor}>Edit Post</a>
                </div>
              </div>           
        

 </div>
        )
    }
}

export default Blogpost
