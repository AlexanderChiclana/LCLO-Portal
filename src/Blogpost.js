import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import apiUrl from './apiConfig'
import axios from 'axios'


class Blogpost extends Component {
    constructor () {
        super()
    
        this.state = {
            selectedFile: null,
            editorOpen: false,
            heading: '',
            text: '',
            image: '',
            pinned: false,
            tags: []
    
        }
      }
    
    componentDidMount() {
    this.setState({ 
        text: this.props.text,
        heading: this.props.heading,
        tags: this.props.tags,
        image: this.props.image,
        pinned: this.props.pinned,
        featured: this.props.featured
    })
    }
    
    
    fileSelectedHandler = event => {
      console.log(event.target.files[0])
      this.setState({
          selectedFile: event.target.files[0]
      })
    }

    fileUploadHandler = () => {
      const fd = new FormData()
      fd.append('image', this.state.selectedFile)
      axios.post('http://localhost:4741/image-upload', fd, {
          onUploadProgress: progressEvent => {
              console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
          }
      })
          .then(res => {
              fetch(`${apiUrl}/blogposts/${this.props.id}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token token=${this.props.user.token}`
                  },
                  body: JSON.stringify({
                          blogpost: {
                            image: res.data.imageUrl
                          }  
                  })
                })
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
            
             this.state.selectedFile && this.fileUploadHandler()
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

                  { this.state.editorOpen && <input className="form-control-file" type="file" onChange={ this.fileSelectedHandler }/> }

                  { this.state.editorOpen && <img src={this.state.image} alt="" /> }


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
