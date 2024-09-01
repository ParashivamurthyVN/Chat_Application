import express from "express";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import cors from 'cors';
//mango
import {connectToDb, getDb} from "./db.js";
let db;

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userConnections = [];
const port = 3001;
const io = new Server(server,{ cors: {
    origin:'http://localhost:3000',
    methode:['GET', 'POST'],
}});


io.on("connection", (socket) => {
    console.log("A user connected "+socket.id);
    socket.emit("socketID", socket.id);

    socket.on('user_message', ({ message, recipientId, senderId, profile }) => {
        console.log(`Message: ${message} from Sender ID: ${senderId} to Recipient ID: ${recipientId} p: ${profile}`);
        userConnections.map((item)=>{
            if(item.email===recipientId) io.to(item.socketid).emit('message', { message, from: senderId, profile:profile});
        })
        
      });

    socket.on("disconnect", (socket) => {
        console.log("A user disconnected "+socket.id);
    });
});

app.post('/store-socket', (req, res) => {
     const { socketid, email } = req.body;
//   console.log(req.body);
    userConnections.push({ socketid, email });
     console.log('User connections:', userConnections);
    res.status(200).json({ message: 'SocketID and email stored successfully' });
  });

  app.post('/addContact', (req, res) => {
    const { email, contact } = req.body;
    db.collection('contacts')
    .updateOne(
        { email: email },
        { $push: { contacts: contact } },
        { upsert: true }
      ).then(()=>{
        db.collection('contacts')
        .findOne({email: email})
        .then((data)=>{
           // console.log(data);
           res.status(200).json(data);
        })
        .catch(()=>{
           res.status(500).json({ error: 'Can not get' });
        })
      })
 });

app.get("/contacts/:id", async (req, res) => {
    let id=req.params.id;
    db.collection('contacts')
    .findOne({email: id})
    .then((data)=>{
       // console.log(data);
       res.status(200).json(data);
    })
    .catch(()=>{
       res.status(500).json({ error: 'Can not get' });
    })
});


connectToDb ((err)=>{
    if(!err){
          db=getDb();
    }
 })

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

server.on("error", (err) => {
    console.error("Server error:", err);
});
