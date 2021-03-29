import './Forum.css';
import ForumContainer from './ForumContainer'
import React from 'react';

class Forum extends React.Component {
    render() {
        return (
            <div className="Forum">
                <header>
                    <div className="ForumProfile FlexRow">
                        <h2>Welcome, lDuma.</h2>
                    </div>
                    <div className="ForumStats FlexRow">
                        <div className="DisplayBox BoxShadow FlexRow">
                            <p>125 Likes</p>
                        </div>
                        <div className="DisplayBox BoxShadow FlexRow">
                            <p>43 Points</p>
                        </div>
                    </div>
                </header>
                <ForumContainer />
            </div>
        );
    }
}

export default Forum;
