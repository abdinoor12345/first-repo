import React, { useReducer, useEffect } from 'react';
import { usePage } from '@inertiajs/inertia-react';

// Define the reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return { ...state, posts: action.payload };
        default:
            return state;
    }
};

const PostsIndex = ({ props }) => {
    const initialState = {
        posts: [],
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        // Ensure props.posts is defined before dispatching
        if (props.posts) {
            // Fetch posts data from the server using Inertia.js
            dispatch({ type: 'SET_POSTS', payload: props.posts });
        }
    }, [props.posts]);

    return (
        <div>
            <h1>Posts</h1>
            {state.posts.length > 0 ? (
                <ul>
                    {state.posts.map(post => (
                        <li key={post.id}>
                            <h2>{post.name}</h2>
                            <p>{post.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PostsIndex;
