require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectToDB = require('./database/db');
const authRoutes = require('./routes/auth-routes');
const taskRoutes = require('./routes/tasks-routes');
const accRoutes = require('./routes/acc-routes');

const app = express();

connectToDB();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true     
}))

app.use('/user', authRoutes);
app.use('/task',taskRoutes);
app.use('/account', accRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})