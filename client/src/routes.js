import React from "react"
import {Route, Routes, Navigate} from 'react-router-dom'
import {About} from "./common_components/About"
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


export const useRoutes = (isAuthenticated) => {
    //Кастомный хук для маршрутизации
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/greeting" element={<LandingPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/admin/:id" element={<Admin />} />
            <Route path="/ads" element={<AdsPage />} />
            <Route exact path="/cloud" element={<FileStorage />} />
            <Route exact path="/cloud/file/:id" element={<File />} />
            <Route path="/home" element={<HomePage/>} />
            <Route path="/my/:id" element={<User />} />
            <Route path="/news" element={<News />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/createfoto" element={<CreateFoto />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/fotography/:id" element={<Fotography/>} />
            <Route path="/video/:id" element={<UserVideoPage/>} />
            <Route path="/messages" element={<RoomsList />} />
            <Route path="/cloud" element={<FileStorage />} />
            <Route exact path="/users" element={<Users />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/messages/:id" element={<Room />} />
            <Route path="/messages/:id/:link" element={<Room />} />
            <Route path="/blog_about" element={<About />} />
            <Route path="/article/:id" element={<UserArticle />} />
            <Route path="/article/:id/:comment" element={<UserArticle />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}
