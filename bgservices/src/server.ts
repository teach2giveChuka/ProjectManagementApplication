import express from 'express'
import cron from 'node-cron'
import dotenv from 'dotenv'
import { welcomeUser } from './services/welcomeUser'
import { assignProject } from './services/assignProject'
import router from './routes/projectRoutes'
dotenv.config()

const app = express()

app.use(express.json());

app.use('/projects', router)

const run = async()=>{
    cron.schedule('*/5 * * * * *', async()=>{
        console.log("checking the database");
        
        await welcomeUser()
    })
}

run()

const port = process.env.PORT 

app.listen(5200, ()=>{
    console.log(`Server running on port 5200 ...`);
})