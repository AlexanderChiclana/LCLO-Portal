import React, { Component } from 'react'
import Blogpost from './Blogpost'
import axios from 'axios'
import apiUrl from './apiConfig'

class Feed extends Component {
    constructor () {
        super()
    
        this.state = {
            blogposts: []
        }
      }

    componentDidMount() {
       this.getAllBlogPosts()
      }

      getAllBlogPosts = () => {
        axios.get(`${apiUrl}/${this.props.page}`)
  
          .then(res => {
            this.setState({ blogposts: res.data.blogposts })
          })
      }

    render() {
        const BlogpostList = () => this.state.blogposts.map(blogpost => 
            <div key={blogpost._id}>
              <Blogpost getAllBlogPosts={this.getAllBlogPosts} page={blogpost.page} heading={blogpost.heading} text={blogpost.text} id={blogpost._id} user={this.props.user} /> 
            </div>
          )  

        return (
            <div>
                <BlogpostList />
            </div>
        )
    }
}

export default Feed
