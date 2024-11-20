import { Router } from "express";
const router = Router()
const headers = {
   accept: 'application/json',
   Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Njg1ZWU1NGFlYmQ4NjE5OWM5NDUxNWM0OTM2NGQ2ZSIsIm5iZiI6MTczMTc1MjYzMy43MDc5NjEzLCJzdWIiOiI2NzMzMjM3MzRiNWZkNTVhMTZjYTI1ZjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0lDnU_JT9D6BDdrFmpPPYdIRcftIGpQyFka-h1gXG5c'
}

router.get('/', async (req, res, next) => {
   const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${req.query.search}`, {
      method: 'GET',
      headers
   });
   const genre = req.query.genre;
   if (!response.ok) {
      res.status(400);
   }
   const data = await response.json();

   data.results = genre ? data.results.filter((movie) => movie.genre_ids.includes(Number(genre))) : data.results
   res.status(200).json(data);
})

router.get('/genres', async (req, res, next) => {
   const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list`, {
      method: 'GET',
      headers
   });
   if (!response.ok) {
      res.status(400);
   }
   const data = await response.json();
   res.status(200).json(data.genres);
})

export default router