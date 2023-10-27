import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';
import VotingButtons from "../components/VotingButtons";
import CommentButton from "../components/CommentButton";
import ShareButton from "../components/ShareButton";
import AbstractToggle from "../components/AbstractToggle";
import UserContext from '../context/UserContext';

const FeedItem = (props) => {
    const [showRealAbstract, setShowRealAbstract] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [articleComments, setArticleComments] = useState([]);
    const textareaRef = useRef(null);
    const { currentUser } = useContext(UserContext);

    useEffect(() => adjustTextareaHeight(), [newComment]);
    useEffect(() => {fetchComments()}, []);

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'inherit';
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = `${scrollHeight}px`
        }
    };

    const handleToggleAbstract = () => setShowRealAbstract(prev => !prev);

    const handleCommentToggle = () => {
        setShowCommentInput(prev => !prev);
        if (!showCommentInput) fetchComments();
    };

    const handleSubmitComment = async () => {
        try {
            const response = await axios.post('/core/comments/', {
                author: currentUser.id,
                content: newComment,
                object_id: props.article.id
            });
            if (response.status === 201) {
                setNewComment('');
                fetchComments();
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    }

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/core/comments/article/${props.article.id}/`);
            setArticleComments(response.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    return (
        <Card className='m-3'>
            <Card.Header>
                <div className="row">
                    <div className="col d-flex justify-content-start text-nowrap">{props.article.article_type}</div>
                    <div className="col d-flex justify-content-end fw-bold text-nowrap">{props.article.journal}</div>
                </div>
            </Card.Header>
            <Card.Body>
                <h4>{props.article.title}</h4>
                <div className="row align-items-center mt-2">
                    <div className="col d-flex justify-content-start">
                        Published on: {props.article.published_on}
                    </div>
                    <div className="col d-flex justify-content-end">
                        <AbstractToggle showRealAbstract={showRealAbstract} handleToggle={handleToggleAbstract} />
                    </div>
                </div>
                <hr />
                <Card.Text>
                    {showRealAbstract ? props.article.abstract : props.article.summary}
                </Card.Text>
            </Card.Body>
            <div className="row align-items-center">
                <div className="col d-flex justify-content-start">
                    <VotingButtons objectId={props.article.id} userId={currentUser ? currentUser.id : null} />
                </div>
                <div className="col d-flex justify-content-center">
                    <CommentButton
                        onCommentButtonClick={handleCommentToggle}
                        commentCount={articleComments.length}
                    /></div>
                <div className="col d-flex justify-content-end"><ShareButton /></div>
            </div>
            {showCommentInput && renderCommentSection()}
        </Card>
    );

    function renderCommentSection() {
        return (
            <>
                <div className='bg-body-tertiary'>
                    <Form.Group controlId="floatingInputComment" className="mx-3 mt-3 mb-2">
                        <Form.Control
                            as="textarea"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            ref={textareaRef}
                            style={{ overflowY: 'hidden' }}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button className="mx-3 mb-3" onClick={handleSubmitComment}>Reply</Button>
                    </div>
                </div>
                {articleComments.map(comment => renderSingleComment(comment))}
            </>
        );
    }

    function renderSingleComment(comment) {
        return (
            <div key={comment.id} className='m-3 p-3 bg-body-tertiary'>
                <p><strong>UserID: {comment.author} @ <span>{comment.created_at}</span></strong></p>
                <p className="m-3">{comment.content}</p>
                <div className="col d-flex justify-content-start">
                    <VotingButtons objectId={comment.id} userId={currentUser ? currentUser.id : null} />
                    <div className="col d-flex justify-content-center"><CommentButton /></div>
                    <div className="col d-flex justify-content-end"><ShareButton /></div>
                </div>
            </div>
        );
    }
}

export default FeedItem;
