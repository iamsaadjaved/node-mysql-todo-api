import express , { Application , Request , Response , NextFunction } from 'express'
const mysql = require('mysql')

// create connection 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodeMysql'

})

db.connect((err: any ) => {
    if(err){
        throw err
    }
    console.log('MySQL Connected')
})


const app: Application = express()

app.use(express.json())

app.get('/createTodoTable' , (req , res) =>  {
    let sql = 'CREATE TABLE TodoApp(id int AUTO_INCREMENT, title VARCHAR(255) , description VARCHAR(255) , done BOOLEAN , PRIMARY KEY(id))'
    db.query(sql , (err: any , result: any ) => {
        if(err) throw err
        console.log(result)
        res.send('Todo table created.....')
    })
})

app.post('/todo/api/v1.0/tasks' , (req: Request , res: Response) =>  {
    
    let todo = req.body
    let sql = 'INSERT INTO TodoApp SET ?';
    let query = db.query(sql , todo , (err: any , result: any) => {
         if(err) throw err
         console.log(result)
         res.send(result) 
    })
    
})

app.get('/todos/api/v1.0/tasks' , (req: Request , res: Response) =>  {
    
    let sql = 'SELECT * FROM TodoApp';
    let query = db.query(sql  , (err: any , result: any) => {
         if(err) throw err
         res.send(result) 
    })
    
})

// select single todo

app.get('/todo/api/v1.0/tasks/:id' , (req: Request , res: Response) =>  {
    
    let sql = `SELECT * FROM TodoApp WHERE id = ${req.params.id}`  ;
    let query = db.query(sql  , (err: any , result: any) => {
         if(err) throw err
         console.log('single todo fetch')
         res.send(result) 
    })
    
})

app.post('/todo/api/v1.0/tasks/:id' , (req: Request , res: Response) =>  {
    
    let sql = `UPDATE TodoApp SET title = '${req.body.title}' , description = '${req.body.description}' , done = '${req.body.done}'  WHERE id = ${req.params.id}`  ;
    let query = db.query(sql , (err: any , result: any) => {
         if(err) throw err
         console.log('todo updated')
         res.send(result) 
    })
    
})

app.delete('/todo/api/v1.0/tasks/:id' , (req: Request , res: Response) =>  {
    
    let sql = `DELETE FROM TodoApp  WHERE id = ${req.params.id}`  ;
    let query = db.query(sql , (err: any , result: any) => {
         if(err) throw err
         console.log('todo deleted')
         res.send(result) 
    })
    
})




// app.post('/todo/api/v1.0/tasks', async (req: Request, res: Response) => {
//     try{
//         const todo = await new Todo(req.body).save()
//         res.status(201).send(todo)

//     }catch(e){
//         console.error(e)
//     }
// });


// app.get('/todos/api/v1.0/tasks', async (req: Request, res: Response ) => {
//     try{
//         const todos = await Todo.find({})
//         res.status(200).send(todos)
//     }catch(e){
//         console.error(e)
//     }

// });

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

app.listen(5000 , () => console.log("Server running"))