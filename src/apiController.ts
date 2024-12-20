import { Request, Response } from "express"
import { ApiService } from "./apiService";

export const ApiController = {
  // POST /{collection_name}
  insertToCollection: async (req: Request, res: Response) => {
    try {
      const document = req.body;
      const collectionName = req.params.collection;

      if (!collectionName)
        return res.status(400).send("É obrigatório passar o nome da entidade que será salva");

      if (!document || typeof document != 'object')
        return res.status(400).send("É obrigatório passar um JSON no corpo da requisição");

      const createdDocument = await ApiService.insertDocument(document, collectionName);
      return res.status(201).send(createdDocument);
    } catch (error: any) {
      if (error instanceof Error) return res.status(500).json({ message: error.message });
    }
  },

  findFromCollection: async (req: Request, res: Response) => {
    try {
      const collectionName = req.params.collection;
      const findQuery = req.query.query ? JSON.parse(req.query.query as string) : {};
 
      // TODO: IMPLEMENTAR PROJECTION

      if (!collectionName)
        return res.status(400).send("É obrigatório passar o nome da entidade que deve ser buscada");
      if (typeof findQuery != 'object')
        return res.status(400).send("É obrigatório que a consulta esteja no formato de um JSON");

      const documents = await ApiService.findDocuments(collectionName , findQuery);
      return res.status(200).send(documents);
    } catch (error) {
      if (error instanceof Error) return res.status(500).json({ message: error.message })       
    }
  }
}