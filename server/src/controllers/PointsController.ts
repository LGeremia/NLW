import knex from '../database/connection';
import {Request, Response} from 'express';

class PointsController{

    async create(request: Request, response: Response){
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        //const trx = await knex.transaction();
    
        const insertedIds = await knex('points').insert({
            image: "image-fake",
            name,
            whatsapp,
            email,
            latitude,
            longitude,
            city,
            uf
        });
    
        const point_id = insertedIds[0]
    
        const pointItems = items.map((items_id: number) =>{
            return{
                items_id,
                point_id
            };
        });
    
        await knex('point_items').insert(pointItems);
    
        return response.json({succes: true});
        
    };
}

export default PointsController;