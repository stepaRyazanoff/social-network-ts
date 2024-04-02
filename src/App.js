import './css/App.css'
import {Route, Routes} from 'react-router-dom'
import UsersContainer from "./components/Users/UsersContainer"
import HeaderContainer from "./components/Header/HeaderContainer"
import LoginContainer from "./components/Login/LoginContainer"
import NavbarContainer from "./components/Navbar/NavbarContainer"
import {connect} from "react-redux"
import Preloader from "./components/common/Preloader/Preloader"
import {getInitialize} from "./redux/appReducer"
import React, {lazy, Suspense} from "react"
import {compose} from "redux"
import {withRouter} from "./hoc/withRouter"
import {Navigate} from "react-router"

const ProfileContainer =
    lazy(() =>
        import( './components/Profile/ProfileContainer'))

const DialogsContainer =
    lazy(() =>
        import( './components/Dialogs/DialogsContainer'))

class App extends React.Component {

    componentDidMount() {
        this.props.getInitialize()
    }

    render() {
        return (
            <>
                {!this.props.initialized
                    ? <Preloader/>
                    : <div className='App'>
                        <div className='container'>
                            <HeaderContainer/>
                            <div className='wrapper'>
                                <NavbarContainer/>
                                <main className='main'>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Routes>
                                            <Route path='/' element={<Navigate to='/profile'/>}/>
                                            <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                                            <Route path='/profile/:profileId?' element={<ProfileContainer/>}/>
                                            <Route path='/users' element={<UsersContainer/>}/>
                                            <Route path='/login' element={<LoginContainer/>}/>
                                            <Route path='*'
                                                   element={
                                                       <div className='not-found'>
                                                           <h1>404 NOT FOUND</h1>
                                                       </div>
                                                   }/>
                                        </Routes>
                                    </Suspense>
                                </main>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}

const mapStateToProps = state => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        {
            getInitialize,
        }))(App)
