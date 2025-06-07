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


router.put('/:id', async (req, res) =>{
    const {id} = req.params // get id from URL path
    const { title, tags, content } = req.body;

    // convert tags array to comma-seperated string
    const tagString = Array.isArray(tags) ? tags.join(',') : tags;

    try { 
        const updatedArticle = await prisma.articles.update({
            where: {id: Number(id) },
            data: {
                title,
                tags: tagString,
                content
            }

        })

        res.json(updatedArticle)

    } catch (error) {
        console.error('Error updating article:', error)

        if (error.code === 'P2025') {
            res.status(404).json({error: 'Article not found'});
        } else {
            res.status(500).json({error: 'Failed to update article'})
        }

    }


    
})

router.delete('/:id', async (req,res) => {
    const {id} = req.params 

    try {
        const deleteArticle = await prisma.articles.delete({
            where: {id: Number(id)}
        })

        res.json(deleteArticle)

    } catch (error) {
        console.error('Error updating article:', error)
    }

})

export default router;