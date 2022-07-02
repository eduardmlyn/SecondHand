import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {WelcomePage} from "./welcomePage";
import {Register} from "./register";
import {Login} from "./login";
import {Advertisements} from "./mainPage";
import {Profile} from "./editProfile";
import {AdvertisementForm} from "./advertisementCreate";
import {MyAdvertisements} from "./myAdvertisements";
import {Starred} from "./myStarred";
import {Advertisement} from "./advertisement";
import {AdminLogin} from "./adminLogin";


export const Pages = () => {
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        {/* welcome page (welcomePage.tsx) */}
        <Route path={"/"} element={<WelcomePage userId={userId}/>}/>
        {/* account creation (register.tsx) */}
        <Route path={"/user/form"} element={<Register setUserId={setUserId}/>}/>
        {/* login (login.tsx) */}
        <Route path={"/user"} element={<Login setUserId={setUserId}/>}/>
        {/* admin login (adminLogin.tsx */}
        <Route path={"/admin"} element={<AdminLogin setUserId={setUserId} setIsAdmin={setIsAdmin}/>}/>
        {/* lists advertisements (mainPage.tsx) */}
        <Route path={"/advertisement"} element={<Advertisements userId={userId} setUserId={setUserId} isAdmin={isAdmin}/>}/>
        {/* user profile (editProfile.tsx) */}
        <Route path={`/user/${userId}/profile`} element={<Profile userId={userId} setUserId={setUserId}/>}/>
        {/* create advertisement (advertisementCreate.tsx) */}
        <Route path={`/user/${userId}/advertisement/form`} element={<AdvertisementForm userId={userId} setUserId={setUserId}/>}/>
        {/* show user advertisements (myAdvertisements.tsx) */}
        <Route path={`/user/${userId}/advertisement`} element={<MyAdvertisements userId={userId} setUserId={setUserId}/>}/>
        {/* show user starred advertisements (myStarred.tsx) */}
        <Route path={`/user/${userId}/advertisement/starred`} element={<Starred userId={userId} setUserId={setUserId}/>}/>
        {/* opened advertisement (advertisement.tsx) */}
        <Route path={`/user/${userId}/advertisement/:id`} element={<Advertisement userId={userId} setUserId={setUserId} isAdmin={isAdmin}/>}/>
      </Routes>
    </BrowserRouter>
  )
}