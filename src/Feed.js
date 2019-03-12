import React, { Component } from 'react'
import Blogpost from './Blogpost'
// import axios from 'axios'
// import apiUrl from './apiConfig'

class Feed extends Component {
    constructor () {
        super()
    
        this.state = {
        }
      }

  

    
    render() {
        const BlogpostList = () => this.props.blogposts.map(blogpost => 
            <div key={blogpost._id}>
              <Blogpost getAllBlogPosts={this.props.getAllBlogPosts} page={blogpost.page} heading={blogpost.heading} text={blogpost.text} id={blogpost._id} user={this.props.user} /> 
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
