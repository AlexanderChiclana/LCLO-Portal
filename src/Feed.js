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
        // this.setState({loading: true})
        
        axios.get(`${apiUrl}/${this.props.page}s`)
        // axios.get('http://localhost:4741/' + this.props.resourceName)
  
          .then(res => {
            this.setState({ blogposts: res.data.blogposts })
          })
      }

    render() {
        const BlogpostList = () => this.state.blogposts.map(blogpost => 
        
            <div key={blogpost._id}>
              <Blogpost heading={blogpost.heading} tags={blogpost.tags} text={blogpost.text} /> 
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
