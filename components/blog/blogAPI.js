const express = require('express');
const router = express.Router();
const axios = require('axios');
const createError = require('http-errors');
const { BLOG_API } = require('../../config');

router.get('/posts', (req, res, next) => {
    axios.get(`${BLOG_API}/posts`)
        .then(response => {
            res.send(response.data)
        })
        .catch(err => {
            next(createError(err.response.status, err.response.statusText))
        })
})

router.get('/posts/:id/comments', (req, res, next) => {
    axios.get(`${BLOG_API}/posts/${req.params['id']}/comments`)
        .then(response => {
            res.send(response.data)
        })
        .catch(err => {
            next(createError(err.response.status, err.response.statusText))
        })
})


router.get('/posts/:id', (req, res, next) => {
    axios.get(`${BLOG_API}/posts/${req.params['id']}`)
        .then(response => {
            res.send(response.data)
        })
        .catch(err => {
            next(createError(err.response.status, err.response.statusText))
        })
})

router.get('/comments', (req, res, next) => {
    let url = req.query.postId ? `${BLOG_API}/comments?postId=${req.query.postId}` : `${BLOG_API}/comments`
    axios.get(url)
        .then(response => {
            res.send(response.data)
        })
        .catch(err => {
            next(createError(err.response.status, err.response.statusText))
        })
})

router.get('/', (req, res) => {
    res.send({
        "api-path": "/blog",
        "api-version": "v1",
        "provider": "https://jsonplaceholder.typicode.com/",
        "available-apis": [
            {
                "api-path": "/posts",
                "available-apis": [
                    {
                        "api-path": "/:id"
                    },
                    {
                        "api-path": "/:id/comments"
                    }
                ]
            },
            {
                "api-path": "/comments",
                "parameters": [
                    { 
                        "name": "postId",
                        "type": "Integer"
                    }
                ]
            }
        ]
    })
})

module.exports = router;