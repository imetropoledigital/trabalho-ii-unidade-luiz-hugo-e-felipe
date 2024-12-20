import { MongoClient, Db } from "mongodb";

export class MongoConnection {
    private static instance: Db = null;
    private static client: MongoClient = null;

    private constructor() { }

    public static async getInstance(): Promise<Db> {
        if (!MongoConnection.instance) {
            const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
            const dbName = process.env.MONGO_DB_NAME || "api-mongo";
            MongoConnection.client = new MongoClient(uri, {
                //useNewUrlParser: true,
                //useUnifiedTopology: true,
            });

            await MongoConnection.client.connect();
            MongoConnection.instance = MongoConnection.client.db(dbName);
        }

        return MongoConnection.instance;
    }

    public static async closeConnection(): Promise<void> {
        if (MongoConnection.client) {
            await MongoConnection.client.close();
            MongoConnection.instance = null;
            MongoConnection.client = null;
        }
    }
}
