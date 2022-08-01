import React from 'react'

export const ChannelContext = React.createContext({
    name: '',
    description: '',
    avatarUrl: '',
    bannerUrl: '',
    subscribers: 0,
    admin: ''
})