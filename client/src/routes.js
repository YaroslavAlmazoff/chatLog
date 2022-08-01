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
import PublicsPage from './publics/components/pages/PublicsPage'
import CreatePage from "./publics/components/pages/CreatePage"
import PublicPage from './publics/components/pages/PublicPage'
import Popular from "./photographer/components/pages/Popular"
import New from "./photographer/components/pages/New"
import Photo from "./photographer/components/pages/Photo"
import Create from "./inner_ad/components/pages/Create"
import InnerAd from "./inner_ad/components/pages/InnerAd"
import Cabinet from "./inner_ad/components/pages/Cabinet"
import CreateAd from "./ads/pages/CreateAd"
import AdMain from "./ads/pages/AdMain"
import AdNew from "./ads/pages/AdNew"
import AdCity from "./ads/pages/AdCity"
import Ad from "./ads/pages/Ad"
import Category from "./ads/pages/Category"
import Search from "./ads/pages/Search"
import VideohostMain from "./videohost/components/pages/VideohostMain"
import Channel from "./videohost/components/pages/Channel"
import Video from './videohost/components/pages/Video'
import NewVideos from "./videohost/components/pages/lists/NewVideos"
import PopularVideos from "./videohost/components/pages/lists/PopularVideos"
import RecommendedVideos from "./videohost/components/pages/lists/RecommendedVideos"
import RecommendedChannels from "./videohost/components/pages/lists/RecommendedChannels"
import CreateChannel from './videohost/components/pages/CreateChannel'
import EditChannel from './videohost/components/pages/EditChannel'
import CreateVideo from './videohost/components/pages/CreateVideo'
import EditVideo from './videohost/components/pages/EditVideo'
import Same from "./videohost/components/pages/Same"


export const useRoutes = (isAuthenticated, isVerified) => {
    //Кастомный хук для маршрутизации
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route exact path="/" element={<Main isAuthenticated={isAuthenticated} isVerified={isVerified} />} />
            <Route exact path="/services" element={<Services />} />
            <Route exact path="/admin/:id" element={<Admin />} />
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
            <Route exact path="/photo/create" element={<Create />} />

            <Route exact path="/innerad/create" element={<Create />} />
            <Route exact path="/innerad/cabinet" element={<Cabinet />} />
            <Route exact path="/innerad/:id" element={<InnerAd />} />

            <Route exact path="/ad/main" element={<AdMain />} />
            <Route exact path="/ad/create" element={<CreateAd />} />
            <Route exact path="/ad/new" element={<AdNew />} />
            <Route exact path="/ad/city" element={<AdCity />} />
            <Route exact path="/ad/category/:category" element={<Category />} />
            <Route exact path="/ad/search" element={<Search />} />
            <Route exact path="/ad/:id" element={<Ad />} />

            <Route exaxt path="/videohost" element={<VideohostMain />} />
            <Route exaxt path="/videohost/channel/:id" element={<Channel />} />
            <Route exaxt path="/videohost/video/:id" element={<Video />} />
            <Route exaxt path="/videohost/new" element={<NewVideos />} />
            <Route exaxt path="/videohost/popular" element={<PopularVideos />} />
            <Route exaxt path="/videohost/recommended/videos" element={<RecommendedVideos />} />
            <Route exaxt path="/videohost/recommended/channels" element={<RecommendedChannels />} />
            <Route exaxt path="/videohost/same/:category" element={<Same />} />
            <Route exaxt path="/videohost/create/channel" element={<CreateChannel />} />
            <Route exaxt path="/videohost/edit/channel/:id" element={<EditChannel />} />
            <Route exaxt path="/videohost/create/video" element={<CreateVideo />} />
            <Route exaxt path="/videohost/edit/video/:id" element={<EditVideo />} />
        </Routes>
    )
}
