import express from 'express';
import routes from './routes';
import path from 'path';

const app = express();

app.use(express.json());

//GET: Buscar informações do back-end
//POST: Criar uma nova informação no back-end
//PUT: Atualizar uma informação no back-end
//DELETE: Exclui uma informação no back-end

// Request Param: Parâmetros que vem na própria rota que indentificam um recurso
// Query Param: Parâmetros opcionais que servem para filtros, paginação
// Request Body: Parâmetros para criação/atualização de informações

app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);