const mongoClient = require('mongodb').MongoClient;
const {MONGO_URL} = require('./constant');
const ObjectID = require('mongodb').ObjectID;

makeCollectionForNewUser = (response) => {
  mongoClient.connect(MONGO_URL, (err, db) => {
    if(err){
      console.log("Connection Failed");
      console.log(err);
      db.close();
      return ;
    }

    const database = db.db("mydb");
    database.createCollection("todos", (err, dbs) => {
      if(err){
        console.log("Error in the database creation");
        console.log(err);
        db.close();
        return ;
      }
      response.status(200).send("Collection Created");
      console.log("Collection Created");
      db.close();
    });
  });
}

addTodo = (userObject, response) => {
  mongoClient.connect(MONGO_URL, (err, db) => {
    if(err){
      console.log("Connection Failed");
      console.log(err);
      response.status(500).send("Connection Failed with error: " + err);
      db.close();
      return ;
    }

    const database = db.db("mydb");
    database.collection("todos").insert(userObject, (err, dbs) => {
      if(err){
        console.log("Error in Adding todo");
        console.log(err);
        response.status(500).send("Error in adding todo: " + err);
        db.close();
        return ;
      }
      response.status(200).send({_id: dbs["insertedIds"][0]});
      console.log("Todo added successfully");
      db.close();
    });
  });
}

deleteTodo = (userObject, response) => {
  mongoClient.connect(MONGO_URL, (err, db) => {
    if(err){
      console.log("Connection Failed");
      console.log(err);
      response.status(500).send("Connection Failed with error: " + err);
      db.close();
      return ;
    }

    const database = db.db("mydb");
    userObject._id = new ObjectID(userObject._id);
    database.collection("todos").deleteMany(userObject, (err, dbs) => {
      if(err){
        console.log("Error in User's todo Deletion");
        console.log(err);
        response.status(500).send("Error in User's todo deletion: " + err);
        db.close();
        return ;
      }
      response.status(200).send("Todo delete successfully");
      console.log(dbs.result.n + " user deleted");
      db.close();
    });
  });
};

changeStateOfTodo = (userObject, response) => {
  mongoClient.connect(MONGO_URL, (err, db) => {
    if(err){
      console.log("Connectin Failed");
      console.log(err);
      response.status(500).send("Error in adding todo: " + err);
      db.close();
      return ;
    }

    const database = db.db("mydb");
    userObject._id = new ObjectID(userObject._id);
    let newValue = { $set: {isCompleted: !userObject.isCompleted} };
    database.collection("todos").updateOne(userObject, newValue, (err, dbs) => {
      if(err){
        console.log("Error in finding a object");
        console.log(err);
        response.status(500).send('Error in finding a object');
        db.close();
        return ;
      }
      response.status(200).send("todo updated successfully");
      console.log("state change successfully");
      db.close();
    });
  });
};

listAllTodos = (response) => {
  mongoClient.connect(MONGO_URL, (err, db) => {
    if(err){
      console.log("Connectin Failed");
      console.log(err);
      response.status(500).send("Error in adding todo: " + err);
      db.close();
      return ;
    }

    const database = db.db("mydb");
    database.collection("todos").find({}).toArray((err, dbs) => {
      if(err){
        console.log("error in fetching all the todos");
        console.log(err);
        response.status(500).send("Error in fetching all the todos: " + err);
        db.close();
        return ;
      }
      console.log(dbs);
      response.status(200).send(dbs);
      console.log("All todos are printed");
      db.close();
    });
  });
};

module.exports = {
  makeCollectionForNewUser,
  addTodo,
  deleteTodo,
  changeStateOfTodo,
  listAllTodos,
}