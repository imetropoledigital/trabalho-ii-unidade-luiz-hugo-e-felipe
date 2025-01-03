import { MongoConnection } from "./infra/databases/mongodb/MongoConnection"
import { ObjectId, WithoutId } from "mongodb";
import { MongoProjection } from "./types/mongoProjection";

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
  
  findDocuments: async ({collection, filters, projection}:{collection: string, filters: Object, projection: MongoProjection}) => {
    const connection = await MongoConnection.getInstance();

    try {
      return await connection.collection(collection).find(filters).project(projection).toArray();
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
  },

  convertTextToProjection: (text: string) : MongoProjection => {
    const fields = text.split(',').map(txt => txt.trim()).filter(txt => txt !== null && txt.length > 0); // Separa por vírgula removendo os espaços
    const projection: MongoProjection = fields.reduce((acumulatedObject: MongoProjection, field: string) => {
      if(field.startsWith('-')) 
        acumulatedObject[field.substring(1)] = 0;
      else acumulatedObject[field] = 1;
      
      return acumulatedObject;
    }, {} as MongoProjection);

    return projection;
  }
}