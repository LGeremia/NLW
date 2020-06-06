import knex from '../database/connection';
import {Request, Response} from 'express';

class ItemsController{
    async index(request: Request, response: Response) {
        // faz o select dos items no banco
        const items = await knex('items').select('*');
        
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.5.104:3333/uploads/${item.image}`,
            }
        });
        
        return response.json({serializedItems});
    }
}

export default ItemsController;