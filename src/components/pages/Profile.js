import { Avatar } from '@material-ui/core';
import React, { useEffect } from 'react'
import RecipeIndex from '../recipes/RecipeIndex';
import './post.css'

const Profile = () => {
    
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
                        src= 'https://ca.slack-edge.com/T0351JZQ0-U04D1MDPGCU-82c0e118abea-512'
                    />
                </div>
                <div>
                    <h4>testing...</h4>
                    <div style={{display:'flex', justifyContent:'space-between', width: '110%'}}>
                        <h5><strong>40</strong> Posts</h5>
                        <h5><strong>40</strong> Following</h5>
                        <h5><strong>40</strong> Followers</h5>
                    </div>
                </div>
                <div className="gallery">
                    { RecipeIndex }
                </div>
            </div>
        </div>
    )}

export default Profile