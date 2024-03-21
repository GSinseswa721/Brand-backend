import { Express, Request, Response } from "express"
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import { version } from "../../package.json"
import log from "./logger";


const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: 'REST API Docs',
            version
        },
        components:{
            securitySchemas:{
                bearerAuth:{
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app: Express, port: number){
// swagger page
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

//Docs in JSON format
app.get("docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

log.info(`Docs available at http://localhost:4000/docs`);

};
 export default swaggerDocs;