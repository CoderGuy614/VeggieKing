import React, { Fragment } from "react";

const ProfileDisplay = ({ profile }) => {
  console.log(profile);

  return (
    <Fragment>
      {/* <div>{profile.user._id}</div> */}
      {/* // To Display  */}
      <div>{profile.user.name}</div>
      {/* Input Fields */}
      <div>{profile.phone}</div>
      <div>{profile.location}</div>
      <div>{profile.deliveryNotes}</div>
    </Fragment>
  );
};

export default ProfileDisplay;
