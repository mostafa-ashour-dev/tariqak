import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version } from "../../package.json";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Tariqak API Docs",
            version: version,
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            security: {
                bearerAuth: [],
            }
        }
    },
    apis: ["./src/router/routes/**/*.js", "./src/router/routes/main.routes.js", "./src/index.js","./src/models/**/*.js","./src/controllers/**/*.js"],
};


const swaggerSpech = swaggerJsdoc(options)

const swaggerDocs = (app, port) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpech));
    app.get("/api-docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpech);
    });
    console.log(`Docs available at http://localhost:${port}/api-docs`);
}

export default swaggerDocs