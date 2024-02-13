import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "ARRAY QUESTIONS" },
  { id: 2, title: "STRING QUESTIONS" },
  { id: 3, title: "LINKEDLIST QUESTIONS" },
  { id: 4, title: "STACK QUESTIONS" },
  { id: 5, title: "QUEUE QUESTIONS" },
  { id: 6, title: "GRAPH QUESTIONS" },
  { id: 7, title: "DP QUESTIONS" },
  
];

app.get("/", (req, res) => {
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  items.push({ title: item });
  res.redirect("/");
});

app.post("/edit", async(req, res) => {
  const item=req.body.updatedItemTitle;
  const id=req.body.updateItemId;

  try{
    await db.query("UPDATE items SET title=($1) WHERE id= $2", [item,id]);
  }
  catch(err){
    console.log(err);
  }
  
});

app.post("/delete", async(req, res) => {

  const id = req.body.deleteItemId;

  try{
    await db.query("DELETE FROM items WHERE id=$1", [id]);
  }
  catch(err){
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}) ;
