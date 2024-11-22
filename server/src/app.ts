import express from 'express';
import cors from 'cors';
import movieRouter from '../routes/movieRouter'
const app = express();
const port = 3000;
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/movies', movieRouter)
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});