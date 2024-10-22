console.log("program started");
import express from "express";
import "dotenv/config"
import { connectToDB } from "./Config/dbConfig";
import cookieParser from "cookie-parser";
import { specs, swaggerUi } from "./Swagger/Swagger"
import  TeacherRouter  from "./Routers/TeacherRouter";
import  StudentRouter  from "./Routers/StudentRouter";
import AuthRouter from "./Routers/AuthRouter";
import { ErrorRequestHandler } from "express";

const app = express();


connectToDB();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// טיפול בשגיאה
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
      console.error("Invalid JSON:", err);
      res.status(400).json({ message: "Invalid JSON" });
    } else {
      next(err);
    }
  };
  
app.use(errorHandler);

app.use('/teachers', TeacherRouter);
app.use('/students',StudentRouter);
app.use('/auth',AuthRouter)

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// הרצת שרת
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})



