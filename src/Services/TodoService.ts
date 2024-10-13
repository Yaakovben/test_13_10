import {UserModel} from "../Models/TeacherModel"
import { TodoDto } from "../Types/Interfaces/dto/reqDto"
import { Itodo } from "../Models/TeacherModel"

const addTodoService = async (userId: string, todo:TodoDto) : Promise<Itodo[]> => {
    try{
        const user = await UserModel.findById(userId)
        console.log(user)
        console.log(todo)
        if (!user) {
            throw new Error("user not found")
        }
        const {title, description, done} = todo
        if (!title || !description || done === undefined) {
            throw new Error("all fields are required")
        }
        user.todos.push(todo as Itodo)
        await user.save()
        return user.todos
 }
    catch(error){
        throw error
    }
}

export {addTodoService}