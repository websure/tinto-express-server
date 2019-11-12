import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';

export default app => {   
    app.use(compression());
    app.use(helmet());
    app.use(bodyParser.json({limit: '50mb', extended: true}));
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: '50mb'
    }));    
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"); 
        res.setHeader("Access-Control-Allow-Methods","GET, PUT, POST, DELETE, OPTIONS")
        next();
    });
    
};