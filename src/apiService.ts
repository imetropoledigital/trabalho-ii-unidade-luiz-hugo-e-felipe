import { MongoConnection } from "./infra/databases/mongodb/MongoConnection"
import { ObjectId } from "mongodb";

export const ApiService = {
  insertDocument: async ({document, collection} :{document: Object, collection: string}) => {
    const connection = await MongoConnection.getInstance();

    try {
      const result = await connection.collection(collection).insertOne(document);
      console.log("Document inserted with _id:", result.insertedId);

      // Adiciona o _id ao documento original e retorna
      const savedDocument = { ...document, _id: result.insertedId };
      
      return savedDocument;      
    } catch (error) {
      console.error("Error inserting document:", error);
      throw error;
    }
  },
  
  findDocuments: async ({collection, filters}:{collection: string, filters: Object}) => {
    const connection = await MongoConnection.getInstance();

    try {
      return await connection.collection(collection).find(filters).toArray();
    } catch (error) {
      console.error("Error reading documents:", error);
      throw error;
    }    
  },
  findDocumentById: async ({id, collection}:{id: string, collection: string}) => {
    const connection = await MongoConnection.getInstance();
    try {
      return await connection.collection(collection).findOne({"_id": new ObjectId(id)});
    } catch (error) {
      console.error("Error reading document by id:", error);
      throw error;
    }     
  }
}