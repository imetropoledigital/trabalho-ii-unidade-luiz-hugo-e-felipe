import { Request, Response } from "express";
import { ApiService } from "./apiService";

export const ApiController = {
    // POST /{collection_name}
    insertToCollection: async (req: Request, res: Response) => {
        try {
            const document = req.body;
            const collection = req.params.collection;

            if (!document || typeof document != "object" ||Array.isArray(document))
                return res.status(400).send("É obrigatório passar um JSON no corpo da requisição");

            if ("_id" in document) delete document._id;

            const createdDocument = await ApiService.insertDocument({
                document,
                collection,
            });
            return res.status(201).send(createdDocument);
        } catch (error: any) {
            if (error instanceof Error)
                return res.status(500).json({ message: error.message });
        }
    },
    // GET /{collection_name}?query={}&fields=name,-_id&skip=5&limit=10
    findFromCollection: async (req: Request, res: Response) => {
        try {
            const {collection} = req.params;
            const { query, fields, skip, limit } = req.query;

            const findQuery = query ? JSON.parse(query as string) : {};
            const fieldsInText = fields || '';
            const skipValue = skip ? Number(skip) : null;
            const limitValue = limit ? Number(limit) : null;        
            const pagination = {skip: skipValue, limit: limitValue}
            const projection = ApiService.convertTextToProjection(String(fieldsInText));

            if (typeof findQuery != 'object' || Array.isArray(findQuery))
                return res.status(400).send("É obrigatório que a consulta esteja no formato de um JSON");

            const documents = await ApiService.findDocuments({collection , filters: findQuery, projection, pagination});
            return res.status(200).send(documents);
            } catch (error: any) {
            if (error instanceof Error) return res.status(500).json({ message: error.message })       
            }
    },
    // GET /{collection_name}/{id}
    findByIdFromCollection: async (req: Request, res: Response) => {
        try {
            const { collection, id } = req.params;

            const document = await ApiService.findDocumentById({
                id,
                collection,
            });

            if (!document)
                return res
                    .status(404)
                    .send(
                        "Não foi encontrado nenhuma entidade desse tipo com esse ID"
                    );

            return res.status(200).json(document);
        } catch (error: any) {
            if (error instanceof Error)
                return res.status(500).json({ message: error.message });
        }
    },
    // PUT /{collection_name}/{id}
    updateDocumentById: async (req: Request, res: Response) => {
        try {
            const { collection, id } = req.params;
            const document = req.body;

            if (
                !document ||
                typeof document != "object" ||
                Array.isArray(document)
            )
                return res.status(400).send("É obrigatório passar um JSON no corpo da requisição");

            const updatedDocument = await ApiService.updateDocumentById({
                id,
                collection,
                document,
            });

            if (!updatedDocument)
                return res.status(404).send("Não foi encontrado nenhuma entidade desse tipo com esse ID");

            return res.status(200).json(updatedDocument);
        } catch (error: any) {
            if (error instanceof Error)
                return res.status(500).json({ message: error.message });
        }
    },
};
