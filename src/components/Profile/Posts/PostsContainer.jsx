import React from 'react'
import {connect} from "react-redux"
import Posts from "./Posts"
import {addPost} from "../../../redux/profileReducer"

class PostsContainer extends React.Component {

    addPost(postText) {
        this.props.addPost(postText)
    }

    render() {
        return (
            <Posts posts={this.props.posts}
                   postText={this.props.postText}
                   addPost={this.addPost.bind(this)}/>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.profilePage.posts,
    postText: state.profilePage.postText
})

export default connect(
    mapStateToProps,
    {
        addPost
    })(PostsContainer)