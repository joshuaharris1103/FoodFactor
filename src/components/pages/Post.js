import { Avatar } from '@material-ui/core';
import React from 'react';
import './post.css'

const Post = ({ username, caption, imageUrl }) => {
    
    return (
        <div className='post'>
            {/* header -> profile pic & username */}
            <div className="post_header">
                <Avatar
                    className='post_avatar'
                    alt='UserPhoto'
                    src=''
                    />
                <h3>{username}</h3>
            </div>
            
            {/* image */}
            <img className='post_image' src={ imageUrl } />
            
            {/* username & caption */}
            <h4 className='post_text'><strong>{username}{/*username*/}:</strong> { caption }</h4>

        </div>
    );
};

export default Post;