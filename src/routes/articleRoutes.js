import express from 'express';
import prisma from '../prismaClient.js';


// Create a new express router instance. Lets us define a group of routes separately from the main server file
const router = express.Router();

router.get('/', async (req, res) => {
    const fetchArticles = await prisma.articles.findMany();
    
    const parsedArticles = fetchArticles.map(article => ({
        ...article,
        tags: article.tags ? article.tags.split(',') : []
    }))
    try {
    // Send the articles as a JSON response
        res.json(fetchArticles);
        console.log('Articles successfully retrieved');
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
})

router.post('/', async (req, res) => {
    const { title, tags, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title, and content are required.' });
    }

    const publishTime = new Date().toISOString();

    const tagString = Array.isArray(tags) ? tags.join(',') : tags;

    try {
        const articles = await prisma.articles.create({
            data: {
                title,
                tags: tagString,
                content,
                publishTime: new Date().toISOString()
            }
        });

        res.status(201).json(articles)
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Failed to create article.' });
    }
});


export default router;