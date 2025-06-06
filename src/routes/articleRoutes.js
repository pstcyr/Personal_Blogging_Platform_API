import express from 'express';
import db from '../db.js';


// Create a new express router instance. Lets us define a group of routes separately from the main server file
const router = express.Router();

router.get('/', (req, res) => {
    // Fetch all articles from the database
    const fetchArticles = db.prepare('SELECT * FROM articles')
    // Execute the prepared statement to get all articles
    // .all() returns all rows as an array of objects
    const articles = fetchArticles.all();
    // Send the articles as a JSON response
    res.json(articles);
    console.log('Im here')
})

router.post('/', (req, res) => {
    const { title, author, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title, and content are required.' });
    }

    const publishTime = new Date().toISOString();

    const insert = db.prepare(`
        INSERT INTO articles (title, publishTime, author, content) 
        VALUES (?, ?, ?, ?)`
    );

    const result = insert.run(title, publishTime, author, content);

    res.status(201).json({
        id: result.lastInsertRowid,
        title,
        publishTime,
        author,
        content
    });
});


export default router;