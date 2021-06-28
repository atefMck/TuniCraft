import './index.css'
import React from 'react';

import avatar from 'assets/avatar_ph.png'
import coverPhotoPh from 'assets/cover_photo_ph.png'

const memberProfilePh = {
    memberId: "dsqfsdqfdsq",
    coverPhoto: coverPhotoPh,
    avatar: avatar,
    about: "BigBrainer will conqueor world soon",
    ranks: [{name: "Owner", rankId: "owner_rank"}, {name: "Admin", rankId: "admin_rank"}, {name: "Moderator", rankId: "moderator_rank"}],
    discordUsername: "Duma",
    forumActivity: {
        posts: 142,
        comments: 1432,
        honors: 6434,
    },
    serverActivity: {
        onlineHours: 165,
        profileViews: 7435,
    }
}

function MemberOnline(props) {
    const id = props.memberId
    const avatar = props.avatar
    const username = props.username
    const about = props.about
    
    return (
        <li key={id} className="member">
            <img src={avatar} alt="avatar"></img>
            <div>
              <h2>{username}</h2>
              <p>{about}</p>
            </div>
        </li>
    )
}

function MemberProfile(props) {
    const coverPhoto = memberProfilePh.coverPhoto
    const avatar = memberProfilePh.avatar
    const username = props.user.userName
    const about = memberProfilePh.about ? memberProfilePh.about : <a href="/">Add Bio</a>
    const ranks = memberProfilePh.ranks.map((rank) => <p key={rank.rankId}>{rank.name}</p>)
    const discordUsername = memberProfilePh.discordUsername
    const forumPosts = memberProfilePh.forumActivity.posts
    const forumComments = memberProfilePh.forumActivity.comments
    const forumHonors = memberProfilePh.forumActivity.honors
    const onlineHours = memberProfilePh.serverActivity.onlineHours
    const profileViews = memberProfilePh.serverActivity.profileViews
    
    return (
        <div className="member_profile">
            <div>
                <img src={coverPhoto} alt="Cover" className="cover_photo" />
                <img src={avatar} alt="Avatar" className="avatar_photo"  />
                <h1>{username}</h1>
                <p>{about}</p>
            </div>
            <ul>
                <li key={"Ranks_profile"}>
                    <h2>Ranks:</h2>
                    {ranks}
                </li>
                <li key={"Discord_profile"}>
                    <h2>Discord:</h2>
                    <p>{discordUsername}</p>
                </li>
                <li key={"Forum_profile"}>
                    <h2>Forum activity:</h2>
                    <p>{forumPosts} Posts</p>
                    <p>{forumComments} Comments</p>
                    <p>{forumHonors} Honors</p>
                </li>
                <li key={"Server_profile"}>
                    <h2>Server activity:</h2>
                    <p>{onlineHours} Hours online</p>
                    <p>{profileViews} Profile views</p>
                </li>
            </ul>
        </div>
    )
}

export { MemberOnline, MemberProfile }