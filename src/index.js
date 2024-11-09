
import { initMongoDBConnection } from "./db/initMongoDBConnection.js";
import { setupServer } from "./server.js";

const bootstrap = async () => {
    await initMongoDBConnection();
    setupServer();
};

bootstrap();