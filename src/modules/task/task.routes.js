import { Router } from 'express';
import { Supabase } from '../../lib/supabase.js'; 
import { validate } from '../../middlewares/validate.js';
import { createTaskRepository } from './task.repository.js';
import { createTaskService } from './task.service.js';
import { createTaskController } from './task.controller.js';
import { createTaskSchema, taskIdParams, updateTaskSchema } from './task.schema.js';
import { requireAuth } from '../../middlewares/auth.js';


const repository = createTaskRepository(Supabase); 
const service = createTaskService(repository); 
const controller = createTaskController(service);


export const tasksRouter = Router();

tasksRouter.use(requireAuth);   // ← todas las rutas de tareas requieren token

// Obtener las tareas
tasksRouter.get('/', controller.list); 
// Obtener una tarea por su ID
tasksRouter.get('/:id', validate(taskIdParams, 'params'), controller.getById);
// Postear una nueva tarea
tasksRouter.post('/', validate(createTaskSchema), controller.create);
// Actualizar una tarea existente
tasksRouter.patch('/:id', validate(taskIdParams, 'params'), validate(updateTaskSchema), controller.update);
// Eliminar una tarea existente
tasksRouter.delete('/:id', validate(taskIdParams, 'params'), controller.remove);