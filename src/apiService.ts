import { MongoConnection } from "./infra/databases/mongodb/MongoConnection"

export const ApiService = {
  insertDocument: async (document: Object, collection: string) => {
    const connection = await MongoConnection.getInstance();
    console.log(document, collection);
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
  
  findDocuments: async (collection: string, filters: Object) => {
    const connection = await MongoConnection.getInstance();
    console.log(collection, filters);
    try {
      return await connection.collection(collection).find(filters).toArray();
    } catch (error) {
      console.error("Error inserting document:", error);
      throw error;
    }    
  }
}