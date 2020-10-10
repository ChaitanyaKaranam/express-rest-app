const express = require('express');
const router = express.Router();
const blog = require('../components/blog/blogAPI');

router.use('/v1/blog', blog);

router.get('/v1', (req, res) => {
    res.send({
        "api-path": "/",
        "api-version": "v1",
        "available-apis": [
            {
                "api-path": "/blog",
                "available-apis": []
            }
        ]
    })
})

router.get('/', (req, res) => {
    res.send({
        "api-path": "/",
        "api-version": "v1",
        "available-apis": [
            {
                "api-path": "/blog",
                "available-apis": []
            }
        ]
    })
})

module.exports = router;