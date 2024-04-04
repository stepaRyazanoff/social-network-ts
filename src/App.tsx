import './css/App.css'
import {Route, Routes} from 'react-router-dom'
import {getInitialize} from './redux/appReducer'
import React, {lazy, Suspense, useEffect} from 'react'
import {Navigate} from 'react-router'
import {useAppDispatch, useAppSelector} from './hooks/hooks'
import {NotFound} from './components/NotFound/NotFound'
import {Login} from './components/Login/Login'
import {Header} from './components/Header/Header'
import {Navbar} from './components/Navbar/Navbar'
import {Preloader} from './components/common/Preloader/Preloader'
import {Users} from './components/Users/Users'

const Profile = lazy(() => import( './components/Profile/Profile'))
const Dialogs = lazy(() => import( './components/Dialogs/Dialogs'))

export const App = () => {
    const dispatch = useAppDispatch()
    const initialized = useAppSelector(state => state.app.initialized)

    useEffect(() => {
        dispatch(getInitialize())
    }, [])

    return (
        <>
            {initialized
                ? <Preloader/>
                : <div className="App">
                    <div className="container">
                        <Header/>
                        <div className="wrapper">
                            <Navbar/>
                            <main className="main">
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Routes>
                                        <Route path="/" element={<Navigate to="/profile"/>}/>
                                        <Route path="/dialogs/*" element={<Dialogs/>}/>
                                        <Route path="/profile/:profileId?" element={<Profile/>}/>
                                        <Route path="/users" element={<Users/>}/>
                                        <Route path="/login" element={<Login/>}/>
                                        <Route path="*" element={<NotFound/>}/>
                                    </Routes>
                                </Suspense>
                            </main>
                        </div>
                    </div>
                </div>}
        </>
    )
}


