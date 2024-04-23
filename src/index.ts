import express from 'express';
import axios from 'axios';
import { Pool } from 'pg';
import dotenv from 'dotenv';
const app = express();
app.use(express.json());
const port = 3000;

dotenv.config();

const apiKey = process.env.API_KEY;
const searchEngineId = process.env.SEARCH_ENGINE_ID;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'job_crawler',
  password: 'admin',
  port: 5432,
});


app.post('/updateJobs', (req, res) => {
  axios
    .get(
      `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
        req.body.searchTerm,
      )}&key=${apiKey}&cx=${searchEngineId}`
    )
    .then((response) => {
      const items = response.data.items;
      if(!items || items.length === 0) {
        res.send('No jobs found');
        return;
      }
      const values = items.map((item: any) => [
        item.title,
        new Date(),
        item.link,
      ])

      const queryText = `INSERT INTO job_listings (job_title, date, link) VALUES ($1, $2, $3)`;
      const insertPromises = values.map((value) => pool.query(queryText, value));
      Promise.all(insertPromises)
        .then(() => {
          res.send('Jobs inserted successfully!');
        })
        .catch((error) => {
          console.error('Error inserting jobs:', error);
          res.status(500).send('Error inserting jobs');
        });

    })
    .catch((error) => {
      console.error('Error performing search:', error);
    });
});

app.get('/jobs', (req, res) => {
  pool.query('SELECT * FROM job_listings')
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error('Error fetching jobs:', error);
      res.status(500).send('Error fetching jobs');
    });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
