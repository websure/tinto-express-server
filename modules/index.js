import IdeasRoutes from './idea/idea.routes';

export default app => {
    app.use('/api/v1/idea', IdeasRoutes);
    app.get('/test', (req, res) => {        
        res.send('This is a TEST route!!!!');
    });
};