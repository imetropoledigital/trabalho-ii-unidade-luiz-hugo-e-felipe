import { Request, Response } from "express";
import { ApiService } from "./apiService";

/**
 * TODO:
 * ROTA DE GET BY ID (CHECK)
 * IMPLEMENTAR PAGINAÇÃO
 * CRIAR ROTA DE PUT (CHECK)
 * IMPLEMENTAR PROJEÇÃO (CHECK)
 */
export const ApiController = {
    // POST /{collection_name}
    insertToCollection: async (req: Request, res: Response) => {
        try {
            const document = req.body;
            const collection = req.params.collection;

            if (
                !document ||
                typeof document != "object" ||
                Array.isArray(document)
            )
                return res
                    .status(400)
                    .send(
                        "É obrigatório passar um JSON no corpo da requisição"
                    );

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

    findFromCollection: async (req: Request, res: Response) => {
        try {
            const { collection } = req.params;
            const { query, fields, skip, limit } = req.query;

            const skipValue = skip ? Number(skip) : null;
            const limitValue = limit ? Number(limit) : null;

            if (!collection) {
                return res
                    .status(400)
                    .send("O parâmetro 'collection' é obrigatório.");
            }

            if (isNaN(skipValue) || isNaN(limitValue)) {
                return res
                    .status(400)
                    .send(
                        "Os parâmetros 'skip' e 'limit' devem ser números válidos."
                    );
            }

            if (skipValue < 0 || limitValue < 0) {
                return res
                    .status(400)
                    .send(
                        "Os parâmetros 'skip' e 'limit' devem ser números positivos."
                    );
            }

            const findQuery = query ? JSON.parse(query as string) : {};
            let findFields = [];

            if (Array.isArray(fields)) {
                findFields = fields;
            } else if (fields && typeof fields === "string") {
                findFields = fields.split(",");
            }

            if (typeof findQuery != "object" || Array.isArray(findQuery))
                return res
                    .status(400)
                    .send(
                        "É obrigatório que a consulta esteja no formato de um JSON"
                    );

            const pagination = {
                skip: skipValue,
                limit: limitValue,
            };

            const documents = await ApiService.findDocuments({
                collection,
                filters: findQuery,
                fields: findFields,
                pagination: pagination,
            });

            return res.status(200).send(documents);
        } catch (error: any) {
            return res
                .status(500)
                .json({ message: error.message ?? "Erro desconhecido" });
        }
    },
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
    updateDocumentById: async (req: Request, res: Response) => {
        try {
            const { collection, id } = req.params;
            const document = req.body;

            if (
                !document ||
                typeof document != "object" ||
                Array.isArray(document)
            )
                return res
                    .status(400)
                    .send(
                        "É obrigatório passar um JSON no corpo da requisição"
                    );

            const updatedDocument = await ApiService.updateDocumentById({
                id,
                collection,
                document,
            });

            if (!updatedDocument)
                return res
                    .status(404)
                    .send(
                        "Não foi encontrado nenhuma entidade desse tipo com esse ID"
                    );

            return res.status(200).json(updatedDocument);
        } catch (error: any) {
            if (error instanceof Error)
                return res.status(500).json({ message: error.message });
        }
    },
};
