"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql = require('mysql');
// create connection 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodeMysql'
});
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected');
});
const app = express_1.default();
app.use(express_1.default.json());
app.get('/createTodoTable', (req, res) => {
    let sql = 'CREATE TABLE todos(id int AUTO_INCREMENT, title VARCHAR(255) , body VARCHAR(255) , PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err)
            throw err;
        console.log(result);
        res.send('Todo table created.....');
    });
});
// app.post('/todo/api/v1.0/tasks', async (req: Request, res: Response) => {
//     try{
//         const todo = await new Todo(req.body).save()
//         res.status(201).send(todo)
//     }catch(e){
//         console.error(e)
//     }
// });
app.get('/todos/api/v1.0/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo.find({});
        res.status(200).send(todos);
    }
    catch (e) {
        console.error(e);
    }
}));
// app.get('/todo/api/v1.0/tasks/:id', async (req: Request, res: Response ) => {
//     try{
//         const _id = req.params.id
//         const todo = await Todo.findOne({_id})
//         res.status(200).send(todo)
//     }catch(e){
//         console.error(e)
//     }
// });
// app.put('/todo/api/v1.0/tasks/:id', async (req: Request, res: Response) => {
//     const changedTodo = req.body
//     const fieldsToUpdate = Object.keys(changedTodo)  ;
//     const fieldsInModel = ["Todo", "description"];
//     const isUpdateAllowed = fieldsToUpdate.every(filed => fieldsInModel.includes(filed));
//     if (!isUpdateAllowed) {
//       return res.status(400).send({ error: "invalid fields" });
//     }
//     try {
//       const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
//       Object.assign(todo , changedTodo)
//       await todo.save()
//       res.send(todo);
//     } 
//     catch (e) {
//       res.status(400).send(e);
//     } 
// });
// app.delete('/todo/api/v1.0/tasks/:id', async (req: Request, res: Response) => {
//     try{
//         const todo = await Todo.findByIdAndDelete(req.params.id);
//         res.status(200).send(todo)
//     }catch(e){
//         console.error(e)
//     }
// });
app.listen(5000, () => console.log("Server running"));
