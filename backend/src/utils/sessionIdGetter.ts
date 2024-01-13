import { Request } from "express";

/**
 * Fonction retournant la session id à partir d'une requete.
 * Vérifie si la session id est présente dans le header de la requete
 * et la retorune. Sinon, génère un nouvelle id et retourne celle-ci.
 * 
 * @param req Requete HTTP
 * @returns session id
 */
export const getSessionIdFromRequest = (req: Request): string => {
    let sessionId = req.get("sessionId");
    if(sessionId == undefined || sessionId.length == 0){
      sessionId = String(req.session.id);
    }
    return sessionId;
  }