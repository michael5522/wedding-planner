/* eslint-disable */
require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2'); // eslint-disable-line
const express = require('express');
const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({ // eslint-disable-line
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.use(staticMiddleware);
// test
app.get('/api/hello', (req, res) => {
  console.log('ola1');
  res.json({ hello: 'world' });
});

// registration
app.post('/api/auth/register', (req, res, next) => {
  console.log('post SIGN UP');
  const { firstName, lastName, email, password } = req.body;
  console.log(firstName, lastName, email, password);
  if (!firstName || !lastName || !email || !password) {
    throw new ClientError(400, 'required fields not all filled out');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      console.log('111', hashedPassword);
      console.log('222', password);
      const sql = `
      insert into "users" ("firstName", "lastName", "email", "password")
      values($1, $2, $3, $4)
      returning "userId",
                "firstName",
                "lastName",
                "email",
                "password",
                "createdAt"
      `;
      const params = [firstName, lastName, email, hashedPassword];
      db.query(sql, params)
        .then(result => {
          const [newUser] = result.rows;
          res.status(201).json(newUser);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});
//sign in
app.post('/api/auth/login', (req, res, next) => {
  console.log('post SIGN IN')
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(401, 'invalid login MISSING EMAIL OR PW');
  }

  const sql = `
        select  "userId",
                "password"
        from "users"
        where "email" = $1
      `;
  const params = [email];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      console.log('INSIDE POST SIGN IN USER', user)
      if (!user) {
        throw new ClientError(401, 'invalid login USER NO EXIST');
      }
      const {userId} = user;
      return argon2
        .verify(user.password, password)
        .then(isMatching => {
          console.log('does your password match?', isMatching);
          if (!isMatching) {
            throw new ClientError(401, 'invalid login WRONG PASSWORD');
          }
          const payload = {
            userId: userId,
            username: email
          };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.status(200).json({ user: payload, token });
        })
    })
    .catch(err => next(err));
});

//get budget list
app.get('/api/budgeter', (req, res) => {
  const sql = `
  select *
  from "budgeter"
  order by "userId"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});
//sort by USDER ID 4
app.get('/api/budgeter44', (req, res) => {
  console.log('ola')
  const sql = `
  select "item", "cost", "itemId"
  from "budgeter"
  where "userId" = 10;
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurreddd'
      });
    });
});

//get wedding checklist
app.get('/api/weddingchecklist', (req, res) => {
  const sql = `
  select *
  from "weddingCheckList"
  order by "userId"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

/* ⛔ Every route after this middleware requires a token! ⛔ */

app.use(authorizationMiddleware);
//login with token
app.post('/api/login', (req, res, next) => {
  const { userId } = req.user;
  console.log('userID', userId);
  const { question, answer } = req.body;
  if (!question || !answer) {
    throw new ClientError(400, 'question and answer are required fields');
  }
  const sql = `
    insert into "flashcards" ("userId", "question", "answer")
    values ($1, $2, $3)
    returning *
  `;
  const params = [userId, question, answer];
  db.query(sql, params)
    .then(result => {
      const [flashcard] = result.rows;
      res.status(201).json(flashcard);
    })
    .catch(err => next(err));
});

//feature 5 sort by USDER ID for BUDGET
app.get('/api/budgeter4', (req, res) => {
  const userId = req.user.userId;
  console.log('ola userID from budgeter', userId)
  const sql = `
  select *
  from "budgeter"
  where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurreddd'
      });
    });
});

//feature 5 can Add new entry into BUDGET
app.post('/api/budgeterAdd', (req, res)=>{
  const userId = req.user.userId;
  console.log('POST this is the adding into budget', userId);
  const {item, cost } = req.body;
  if(!item || !cost){
    throw new ClientError(400, 'cost and item are required fields');
  }
  const sql = `
    insert into "budgeter" ("userId" ,"item" , "cost")
    values ($1, $2, $3)
    returning *
  `
  const params = [userId, item, cost];
  db.query(sql, params)
    .then(result => {
      const item = result.rows;
      res.status(201).json(item);
    })
    .catch(err => next(err));
})

//feature 6 sort by USDER ID DATA for wedding checklist
app.get('/api/weddingCheckListUser', (req, res) => {
  const userId = req.user.userId;
  console.log('ola userID from wedding checklist', userId)
  const sql = `
  select *
  from "weddingCheckList"
  where "userId" = $1
  order by "checkListCategory" asc
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurreddd'
      });
    });
});

//feature 6 user can add new entry into wedding checklist
app.post('/api/weddingCheckListAdd', (req, res) => {
  const userId = req.user.userId;
  console.log('post this is in the adding into wedding checklist', userId);
  const {checkListToDo , checkListCategory } = req.body;
  if(!checkListToDo || !checkListCategory){
    throw new ClientError(400, 'to do  and item category are required fields');
  }
  const sql = `
  insert into "weddingCheckList"("checkListToDo", "checkListCategory", "userId")
  values ($1,$2,$3)
  returning *
  `
  const params = [checkListToDo, checkListCategory, userId];
  db.query(sql, params)
    .then( result => {
      const item = result.rows;
      res.status(201).json(item);
    })
    .catch(err => next(err));
});

//feature 7 sort by USDER ID DATA for guestlist
app.get('/api/GuestListManager', (req, res) => {
  const userId = req.user.userId;
  console.log('ola userID from guest list checklist', userId)
  const sql = `
  select *
  from "guestListManager"
  where "userId" = $1
  order by "guestRelationship" asc
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurreddd'
      });
    });
});

//feature 7 user can add new entry into guest list
app.post('/api/GuestListAddEntry', (req, res) => {
  const userId = req.user.userId;
  console.log('post this is in the adding into guest list', userId);
  const { guestFirstName, guestLastName, guestEmail, guestRelationship } = req.body;
  if (!guestFirstName|| !guestLastName || !guestEmail || !guestRelationship) {
    throw new ClientError(400, 'first name, last name, email, and relationship are required fields');
  }
  const sql = `
  insert into "guestListManager"("guestFirstName", "guestLastName", "guestEmail", "guestRelationship", "userId")
  values ($1,$2,$3,$4,$5)
  returning *
  `
  const params = [guestFirstName, guestLastName, guestEmail, guestRelationship, userId];
  db.query(sql, params)
    .then(result => {
      const item = result.rows;
      res.status(201).json(item);
    })
    .catch(err => next(err));
});

//feature 8 sort by USDER ID for BUDGET
app.get('/api/foodListManagerListByUser', (req, res) => {
  const userId = req.user.userId;
  console.log('ola userID from foodlist by user', userId)
  const sql = `
  select *
  from "foodListManager"
  where "userId" = $1
  order by "foodCategory" asc
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurreddd'
      });
    });
});

//feature 8 user can add new entry into food list
app.post('/api/addToFoodList', (req, res, next) => {
  const userId = req.user.userId;
  console.log('post this is in the adding into food list', userId);
  const { foodItem, foodCategory } = req.body;
  if (!foodItem || !foodCategory) {
    throw new ClientError(400, 'food name  and food category are required fields');
  }
  const sql = `
  insert into "foodListManager"("foodName", "foodCategory", "userId")
  values ($1,$2,$3)
  returning *
  `
  const params = [foodItem, foodCategory, userId];
  db.query(sql, params)
    .then(result => {
      const item = result.rows;
      res.status(201).json(item);
    })
    .catch(err => next(err));
});

//feature 9 user can delete an item from foodlist
app.delete('/api/deleteFoodItem/:foodId', (req, res)=>{
  const foodID = parseInt(req.params.foodId);
  console.log(foodID);
  const params = [foodID];

  const sql = `
  delete from "foodListManager"
  where "foodId" = $1
  returning *;
  `;

  db.query(sql, params)
    .then(result => {
      const solution = result.rows[0];
      if(!solution){
        res.status(404).json({
          error: `${foodID} cannot be found`
        });
      }else{
        res.sendStatus(204)
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occured.'
      });
    });
})

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
