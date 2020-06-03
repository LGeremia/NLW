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

        const point = {
            image: "image-fake",
            name,
            whatsapp,
            email,
            latitude,
            longitude,
            city,
            uf
        }
        const trx = await knex.transaction();
    
        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0]
    
        const pointItems = items.map((items_id: number) =>{
            return{
                items_id,
                point_id
            };
        });
    
        await trx('point_items').insert(pointItems);

        await trx.commit();
    
        return response.json({
            id: point_id,
            ...point
        });
        
    };

    async show(request: Request, response: Response) {
        // faz o select dos points no banco
        const {id} = request.params;
        const point = await knex('points').where('id',id).first();

        if(!point){
            return response.status(400).json({message: 'Point not Found'});
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.items_id')
            .where('point_items.point_id',id).select('items.title');

        return response.json({point, items});
    }

    async index(request: Request, response: Response) {
        const {city, uf, items} = request.query;

        const parsedItems = String(items).split(',').map(items => Number(items.trim()));
        console.log(parsedItems);
        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.items_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

            return response.json(points);
    }
}

export default PointsController;