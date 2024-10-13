import { addTodoService } from "../Services/TodoService"
import {Request, Response} from "express"
import { RequestWithToken } from "../Types/Interfaces/dto/reqDto"
import { TodoDto } from "../Types/Interfaces/dto/reqDto"

const addTodo = async (req: RequestWithToken, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            throw new Error("Unauthorized while adding todo")
        }
        const userId = req.user.userId
        const todo: TodoDto = req.body
        const data = await addTodoService(userId, todo)
        res.status(201).json({error: false, message: "success adding todo", data})
        console.log("success adding todo")

    } catch (error: any) {
        console.log(error)
        res.status(500).json({message: "could not adding todo", 'error': error.message})
    }
}

export {addTodo}
