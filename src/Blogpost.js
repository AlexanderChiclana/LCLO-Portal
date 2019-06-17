import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
// import { WithContext as ReactTags } from 'react-tag-input'
import apiUrl from './apiConfig'
import ImageUploader from './ImageUploader'

// const KeyCodes = {
//     comma: 188,
//     enter: 13
// }

// const delimiters = [KeyCodes.comma, KeyCodes.enter]



class Blogpost extends Component {
    constructor () {
        super()
    
        this.state = {
            editorOpen: false,
            heading: '',
            text: '',
            pinned: false,

            tags: []
    
        }
      }
    
    componentDidMount() {
    this.setState({ text: this.props.text,
        heading: this.props.heading,
        tags: this.props.tags,
        pinned: this.props.pinned,
        featured: this.props.featured
    })
    }
    
    handleChange = (value) => {
     this.setState({ text: value })
    }

    toggleEditor = () => {
    this.setState(prevState => (
        { editorOpen: !prevState.editorOpen }))
    }

    handleTitle = (event) => {
        this.setState({ heading: event.target.value })
    }

    handleUpdate = () => {
        fetch(`${apiUrl}/blogposts/${this.props.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token token=${this.props.user.token}`
            },
            body: JSON.stringify({
                    blogpost: {
                      page: this.props.page,
                      heading: this.state.heading,
                      text: this.state.text,
                      pinned: this.state.pinned,
                      featured: this.state.featured
                    }  
            })
          })
            .then(this.props.getAllBlogPosts)
            .catch(console.log('error'))
      }

      handleDeletePost = () => {
         fetch(`${apiUrl}/blogposts/${this.props.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token token=${this.props.user.token}`
            }
          }).then(this.props.getAllBlogPosts)
          .catch(console.log('error'))
      }

      handleCheckboxChange = (event) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
    
        this.setState({
          [name]: value
        })
      }
    
    render() {
        // const { tags, suggestions } = this.state

        return (
            <div>
                <br />
              <div className="card">

                 { this.state.editorOpen ? <input type="text" className="form-control form-control-lg" placeholder="Posting Title" value={this.state.heading} onChange={this.handleTitle} /> : <h5 className="card-header">{this.props.heading}</h5> }    
                <div className="card-body">
                  {/* <h5 className="card-title">Special title treatment</h5> */}
                  { this.state.editorOpen ? null : <p className="card-text">{this.props.text}</p> }

                  { this.state.editorOpen ? null : <ImageUploader blogpostId={this.props.id} token={this.props.user.token}/> }


                  { this.state.editorOpen ? <ReactQuill theme="snow" value={this.state.text} onChange={this.handleChange} /> : null }
                  { this.state.editorOpen ? <label>
                                        <input
                                        name="pinned"
                                        type="checkbox"
                                        checked={this.state.pinned}
                                        onChange={this.handleCheckboxChange} />
                                        Pin Post?
                                         </label>
            
                    : null }
                  
                  { this.state.editorOpen ? <label>
                                        <input
                                        name="featured"
                                        type="checkbox"
                                        checked={this.state.featured}
                                        onChange={this.handleCheckboxChange} />
                                        Featured?
                                         </label>
            
                    : null }

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

export default Blogpost
