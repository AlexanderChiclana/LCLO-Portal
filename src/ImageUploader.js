import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'

class ImageUploader extends Component {
    state = {
        selectedFile: null
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
                fetch(`${apiUrl}/blogposts/${this.props.blogpostId}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Token token=${this.props.token}`
                    },
                    body: JSON.stringify({
                            blogpost: {
                              image: res.data.imageUrl
                            }  
                    })
                  })
            })
    }

    render() {
        return (
            <div>
                <input type="file" onChange={ this.fileSelectedHandler }/>
                <button onClick={this.fileUploadHandler}> Upload Photo </button>
            </div>
        )
    }
}

export default ImageUploader
