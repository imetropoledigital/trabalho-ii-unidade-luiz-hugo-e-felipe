import { MongoClient, Db, Collection } from "mongodb";

export class MongoConnection {
    private static instance: MongoConnection = null;
    private client: MongoClient = null;
    private db: Db = null;

    private constructor() {}

    public static async getInstance(): Promise<MongoConnection> {
        if (!this.instance) {
            this.instance = new MongoConnection();

            await this.instance.connect();
        }
        return this.instance;
    }

    public async connect(): Promise<void> {
        if (!this.client) {
            const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
            const dbName = process.env.MONGO_DB_NAME || "api-mongo";

            const mongoClient = new MongoClient(uri, {
                //useNewUrlParser: true,
                //useUnifiedTopology: true,
            });

            await mongoClient.connect();

            this.client = mongoClient;
            this.db = mongoClient.db(dbName);
        }
    }

    public async disconnect(): Promise<void> {
        if (this.client) {
            await this.client.close();
            this.client = null;
            this.db = null;
        }
    }

    public collection(name: string): Collection {
        return this.db.collection(name);
    }
}