import { Avatar } from '@material-ui/core';
import React from 'react';
import RecipeIndex from '../recipes/RecipeIndex';
import './post.css'

const Profile = ({ username, caption, imageUrl }) => {
    
    return (
        <div style= {{maxWidth: '550px', margin:'0px auto'}}>
            <div style={{
                display:'flex',
                justifyContent:'space-around',
                margin:'18px 0px',
                borderBottom: '1px solid grey'
            }}>
                <div>
                    <img style={{width:'160px', height:'160px', borderRadius:'80px'}}
                        src= ''
                    />
                </div>
                <div>
                    <h4>{username}</h4>
                    <div style={{display:'flex', justifyContent:'space-between', width: '108%'}}>
                        <h5>40 Posts</h5>
                        <h5>40 Following</h5>
                        <h5>40 Followers</h5>
                    </div>
                </div>
                <div className="gallery">
                    {RecipeIndex}
                </div>
            </div>
        </div>
    )}

export default Profile