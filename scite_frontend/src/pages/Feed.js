import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "../components/Header.js";
import FeedItem from "../components/FeedItem.js";
import 'bootstrap/dist/css/bootstrap.min.css';

const Feed = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('/core/articles/')
            .then(response => {
                setArticles(response.data);
            })
            .catch(error => {
                console.error("Error fetching articles:", error);
            });

    }, []);

    return (
        <div>
            <Header />
            <div className='d-flex justify-content-center'>
                <div className="w-50 flex-column">
                    {articles.map(article => (
                    <FeedItem key={article.id} article={article}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Feed;