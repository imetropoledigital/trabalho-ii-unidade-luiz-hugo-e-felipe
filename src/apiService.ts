import { MongoConnection } from "./infra/databases/mongodb/MongoConnection"
import { ObjectId, WithoutId } from "mongodb";

export const ApiService = {
  insertDocument: async ({document, collection} :{document: WithoutId<Document>, collection: string}) => {
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
  
  findDocuments: async ({collection, filters, fields}:{collection: string, filters: Object, fields: string[]}) => {
    const connection = await MongoConnection.getInstance();

    const projection = fields.reduce((acc, field) => {
      acc[field] = 1;
      return acc;
    }, { _id: 0 });
    

    try {
      return await connection.collection(collection).find(filters, { projection: projection}).toArray();
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
  },

  updateDocumentById: async ({id, document, collection} : {id: string, document: WithoutId<Document>, collection: string}) => {
    const connection = await MongoConnection.getInstance();
    try {
      const objectId = new ObjectId(id);
      return await connection.collection(collection).findOneAndReplace({"_id": objectId}, document, {returnDocument: "after"});
    } catch (error) {
      console.error("Error updating document by id:", error);
      throw error;
    }       
  }
}