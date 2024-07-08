import React from "react";
import UserProfile from "./Components/UserProfile";
import ProfileStats from "./Components/ProfileStats";
import ActionBar from "./Components/ActionBar";

const Profile = () => {
  return (
    <section className=" w-full min-h-screen bg-custom-dark-white">
      <UserProfile />
      <ProfileStats />
      <ActionBar />
    </section>
  );
};

export default Profile;
