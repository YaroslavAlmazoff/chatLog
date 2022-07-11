import React from "react"
import {Route, Routes, Navigate} from 'react-router-dom'
import {RoomsList} from './messenger/components/pages/RoomsList'
import {Room} from './messenger/components/pages/Room'
import Register from "./auth/Register"
import Login from "./auth/Login"
import Users from "./auth/Users"
import User from "./auth/User"
import Main from "./Main"
import EditProfile from "./auth/EditProfile"
import UserArticle from "./auth/UserArticle"
import Fotography from "./auth/parts/Fotography"
import UserVideoPage from "./auth/UserVideoPage"
import News from "./auth/News/News"
import HomePage from "./homepage/HomePage"
import FileStorage from "./file_storage/components/pages/FileStorage"
import File from "./file_storage/components/pages/File"
import CreatePost from "./auth/CreatePost"
import Notifications from "./auth/parts/Mobile/Notifications"
import CreateFoto from "./auth/parts/Mobile/CreateFoto"
import LandingPage from "./landing_page/LandingPage"
import SupportPage from "./landing_page/SupportPage"
import Admin from "./admin/Admin"
import Services from "./homepage/Services"
import AdsPage from "./ads/AdsPage"
import PublicsPage from './publics/components/pages/PublicsPage'
import CreatePage from "./publics/components/pages/CreatePage"
import PublicPage from './publics/components/pages/PublicPage'
import Popular from "./photographer/components/pages/Popular"
import New from "./photographer/components/pages/New"
import Photo from "./photographer/components/pages/Photo"


export const useRoutes = (isAuthenticated, isVerified) => {
    //Кастомный хук для маршрутизации
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route exact path="/" element={<Main isAuthenticated={isAuthenticated} isVerified={isVerified} />} />
            <Route exact path="/services" element={<Services />} />
            <Route exact path="/admin/:id" element={<Admin />} />
            <Route exact path="/ads" element={<AdsPage />} />
            <Route exact path="/cloud" element={<FileStorage />} />
            <Route exact path="/cloud/file/:id" element={<File />} />
            <Route exact path="/home" element={<HomePage/>} />
            <Route exact path="/my/:id" element={<User />} />
            <Route exact path="/news" element={<News />} />
            <Route exact path="/editprofile" element={<EditProfile />} />
            <Route exact path="/createpost" element={<CreatePost />} />
            <Route exact path="/createfoto" element={<CreateFoto />} />
            <Route exact path="/notifications" element={<Notifications />} />
            <Route exact path="/fotography/:id" element={<Fotography/>} />
            <Route exact path="/video/:id" element={<UserVideoPage/>} />
            <Route exact path="/messages" element={<RoomsList />} />
            <Route exact path="/cloud" element={<FileStorage />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/user/:id" element={<User />} />
            <Route exact path="/messages/:id" element={<Room />} />
            <Route exact path="/messages/:id/:link" element={<Room />} />
            <Route exact path="/article/:id" element={<UserArticle />} />
            <Route path="/greeting" element={<LandingPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route exact path="/publics" element={<PublicsPage />} />
            <Route exact path="/public/:id" element={<PublicPage />} />
            <Route exact path="/createpublic" element={<CreatePage />} />

            <Route exact path="/photos/popular" element={<Popular />} />
            <Route exact path="/photos/new" element={<New />} />
            <Route exact path="/photo/:id" element={<Photo />} />
            
        </Routes>
    )
}
