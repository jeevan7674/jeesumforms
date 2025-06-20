import express from 'express';
import cors from 'cors';
import { connectToDB } from './db.js'; 
import formRouter from './controllers/registrationform/registration.js';
import userRouter from './controllers/user/user.js';

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());
app.use('/forms', formRouter )
app.use('/user',userRouter)



connectToDB(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
