import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { iconStyle, buttonStyle} from '../styles/feed_styles'
import axios from 'axios';


const VotingButtons = ({ objectId, userId }) => {
    const [upvoted, setUpvoted] = React.useState(false);
    const [downvoted, setDownvoted] = React.useState(false);
    const [voteCount, setVoteCount] = React.useState(0); // currently only voteCount implemented


    useEffect(() => {
        fetchVoteCount();
    }, [objectId]);

    const fetchVoteCount = async () => {
            try {
                console.log("fetching vote count")
                const response = await axios.get(`http://127.0.0.1:8000/core/votes/article/${objectId}/`);
                setVoteCount(response.data.length);
            } catch (error) {
                console.error('Error fetching vote count:", error')
            }
        };

    const handleVote = async (voteType) => {
        try {
            console.log('Attempting vote')
            const response = await axios.post('http://127.0.0.1:8000/core/votes/', {
                author: userId,
                object_id: objectId,
                vote_type: voteType,
                content_type: 9,
            });
            if (response.status === 201) {
                console.log("Vote successful!")
                fetchVoteCount();
            }
        } catch (error) {
            console.error('Error submitting vote:', error)
        };
    };

    const handleUpvote = () => {
        setUpvoted(true);
        setDownvoted(false);
        handleVote(1);
    };

    const handleDownvote = () => {
        setDownvoted(true);
        setUpvoted(false);
        handleVote(-1);
    };

    return (
        <div className='m-3 align-items-center'>
            <Button onClick={handleUpvote}
                    variant={upvoted ? "success" : "light"}
                    style={{...buttonStyle, backgroundColor: upvoted ? '#28a745' : ''}}>
                <i className="material-icons" style={iconStyle}>arrow_upward</i>
            </Button>
            <span className="fw-bold"> {voteCount} </span>
            <Button onClick={handleDownvote}
                    variant={downvoted ? "danger" : "light"}
                    style={{...buttonStyle, backgroundColor: downvoted ? '#dc3545' : ''}}>
                <i className="material-icons" style={iconStyle}>arrow_downward</i>
            </Button>
        </div>
    );
};

export default VotingButtons;
