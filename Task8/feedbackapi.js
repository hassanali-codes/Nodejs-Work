const express = require('express');
const app = express();

app.use(express.json());

let feedbackList = [];

app.post('/feedback', (req, res) => {
    const {name, message} = req.body;

    if(!name || !message) {
        return res.json({
            status: 'error',
            message: 'data is missing'
        })
    }

    feedbackList.push({name, message});

    res.json({
        status: 'success',
        message: 'feedback received'
    })
})

app.get('/feedback', (req, res) => {
    res.json({
        status: 'success',
        feedbacks: feedbackList
    })
})

app.listen(5000, () => {
    console.log('Feedback API is running on port 5000');

})