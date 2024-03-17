import React from 'react'
import {connect} from "react-redux"
import Posts from "./Posts"
import {actions, IPosts} from "../../../redux/profileReducer"
import {RootState} from "../../../redux/redux-store"

interface StateProps {
    posts: IPosts[]
}

interface DispatchProps {
    addPost: (postText: string) => void
}

class PostsContainer extends React.Component<StateProps & DispatchProps> {

    addPost(postText: string) {
        this.props.addPost(postText)
    }

    render() {
        return (
            <Posts posts={this.props.posts} addPost={this.addPost.bind(this)}/>
        )
    }
}

const mapStateToProps = (state: RootState): StateProps => ({
    posts: state.profilePage.posts,
})

export default connect<StateProps, DispatchProps, unknown, RootState>(
    mapStateToProps,
    {
        addPost: actions.addPost
    })(PostsContainer)