import { Request, Response } from "express"
import { ApiService } from "./apiService";

/**
 * TODO:
 * ROTA DE GET BY ID (CHECK)
 * IMPLEMENTAR PAGINAÇÃO
 * CRIAR ROTA DE PUT
 * IMPLEMENTAR PROJEÇÃO
 */
export const ApiController = {
  // POST /{collection_name}
  insertToCollection: async (req: Request, res: Response) => {
    try {
      const document = req.body;
      const collection = req.params.collection;

      if (!document || typeof document != 'object' || Array.isArray(document))
        return res.status(400).send("É obrigatório passar um JSON no corpo da requisição");

      const createdDocument = await ApiService.insertDocument({document, collection});
      return res.status(201).send(createdDocument);
    } catch (error: any) {
      if (error instanceof Error) return res.status(500).json({ message: error.message });
    }
  },

  findFromCollection: async (req: Request, res: Response) => {
    try {
      const {collection} = req.params;
      const findQuery = req.query.query ? JSON.parse(req.query.query as string) : {};
      const fieldsInText = req.query.fields || '';
      const projection = ApiService.convertTextToProjection(String(fieldsInText));

      if (typeof findQuery != 'object' || Array.isArray(findQuery))
        return res.status(400).send("É obrigatório que a consulta esteja no formato de um JSON");

      const documents = await ApiService.findDocuments({collection , filters: findQuery, projection});
      return res.status(200).send(documents);
    } catch (error: any) {
      if (error instanceof Error) return res.status(500).json({ message: error.message })       
    }
  },
  findByIdFromCollection: async(req: Request, res: Response) => {
    try {
      const { collection, id } = req.params;

      const document = await ApiService.findDocumentById({id, collection});
      
      if(!document) return res.status(404).send("Não foi encontrado nenhuma entidade desse tipo com esse ID");
  
      return res.status(200).json(document);
    } catch (error: any) {
      if (error instanceof Error) return res.status(500).json({ message: error.message })
    }
  },
  updateDocumentById: async (req: Request, res: Response) => {
    try {
      const { collection, id } = req.params;
      const document = req.body;

      if (!document || typeof document != 'object' || Array.isArray(document))
        return res.status(400).send("É obrigatório passar um JSON no corpo da requisição");

      const updatedDocument = await ApiService.updateDocumentById({ id, collection, document });

      if (!updatedDocument) return res.status(404).send("Não foi encontrado nenhuma entidade desse tipo com esse ID");

      return res.status(200).json(updatedDocument);
    } catch (error: any) {
      if (error instanceof Error) return res.status(500).json({ message: error.message })
    }    
  }
}