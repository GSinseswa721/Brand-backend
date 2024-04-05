import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

// Enable CORS for all requests
app.use(cors());

// Define your '/blog' route handler
app.get('/blog', (req: Request, res: Response) => {
    // Handle your '/blog' route logic
    const blogData = { message: 'Blog data' };
    res.json(blogData);
});

// Start the server
const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
