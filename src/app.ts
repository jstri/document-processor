import express from "express";
import errorHandlingMiddleware from "./infrastructure/middleware/errorHandling.middleware";
import notFoundRoute from "./infrastructure/routes/notFound.route";
import Routes from "./api/routes";

class App {
	public readonly app: express.Application;
	public readonly port: string | number;
	public readonly env: string;

	constructor() {
		this.app = express();
		this.port = process?.env?.['PORT'] || 3000;
		this.env = process?.env?.['NODE_ENV'] || 'development';
	}

	public async initialize() {
		this.initializeMiddlewares();
		this.initializeRoutes();
		this.initializeErrorHandling();
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log("Server is running on port", this.port);
		});
	}

	private initializeMiddlewares() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	private initializeRoutes() {
		this.app.use('/api/v1', Routes);
		this.app.use(notFoundRoute());
	}

	private initializeErrorHandling() {
		this.app.use(errorHandlingMiddleware());
	}
}

export default App;
