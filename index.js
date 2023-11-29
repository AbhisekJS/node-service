const express = require('express')
const app = express()
const axios = require('axios')
const PORT = process.env.PORT || 3000;

require('dotenv').config();

const {redisClient} = require('./redis/redis_db')
const {db} = require('./mongo/mongo_db')
db()


async function fetchDataFromApi(characterId) {
  let apiUrl = 'https://hp-api.onrender.com/api';
  if (characterId) {
    apiUrl = `${apiUrl}/character/${characterId}`;
  } else {
    apiUrl = `${apiUrl}/characters`;
  }
  const apiResponse = await axios.get(apiUrl);
  console.log('Request sent to the API');
  return apiResponse.data;
}

app.get('/home', async (req, res) => {
  try {
    const data = await fetchDataFromApi();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const redisMiddleware = ( req,res,next)=>{
  const id = req.params.id;
  const redisKey = `hogwarts-character-${id}`;
  req.params.redisKey = redisKey;
  redisClient.get(redisKey, async (err, cachedResult) => {
      if (err) {
        console.error(err);
        next()
      } else if(cachedResult) {
          isCached = true;
          results = JSON.parse(cachedResult);
          res.status(200).send({
            fromCache: isCached,
            data: results,
          });
        }else{
        next()
      } 
      }
  )}
  
app.get('/home/:id',redisMiddleware, async (req, res) => {
  const {id,redisKey} = req.params;
  try {
    let results;
    results = await fetchDataFromApi(id);
    redisClient.set(redisKey, JSON.stringify(results));
        
    res.status(200).send({
      fromCache: false,
      data: results,
    });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
})


app.listen(PORT, function (err) {
  if (err) console.log('Error in server setup');
  console.log('Server listening on Port', PORT);
});


