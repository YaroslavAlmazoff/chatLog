import React from "react";
import "../styles/users.css"
import Search from "./Universal/Search";

const UsersSearchSide = ({searchValue, setSearchValue}) => {
    return (
        <div className="users-search-side">
            <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
    )
}

export default UsersSearchSide