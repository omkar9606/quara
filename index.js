const express=require("express");
const app= express();
const port=8080; 
const path = require("path");
const {v4: uuidv4 }=require('uuid');
const methodOverride = require("method-override");

app.set("view,engine","ejs");
app.set("view,engine",path.join(__dirname,"public"));//setting path for view folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use (express.static(path.join(__dirname,"public")));//setting path for express in public folder
app.use (methodOverride("_method"));


let posts=[
    {
        id:uuidv4(),  
              
        username:"merimarji",
        content : "i love coding"
    },
    {
        id:uuidv4(),  
        username:"omkar",
        content : "i love playing cricket"
    },
    {
        id:uuidv4(),  
        username:"saurav",
        content : "i select"
    },
    {
        id:uuidv4(),  
        username:"shubham",
        content : "doing leetcode questions"
    },
];
 

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{ posts });
});  

app.get("/posts/new",(req,res)=>{// in get request we get the request in req parameter
    res.render("new.ejs");
});  
app.post("/posts",(req,res)=>{// in get request we get the request in req body
      
    let {username,content}=req.body;
    let id=uuidv4();     
    posts.push({id,username,content});
    res.redirect("/posts");
});  
   
app.get("/posts/:id",(req,res)=>{// in get request we get the request in req parameter
    let {id} =req.params;
    let post=posts.find((p)=>id === p.id);
    
    res.render("show.ejs",{post});// here we are randering(calling) the show.ejs file and passing {post} as the parameter
   
}); 

app.patch("/posts/:id",(req,res) =>{
    let { id }=req.params;
    let newContent = req.body.content; 

    let post=posts.find((p)=>id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req,res)=>{
    let { id }=req.params;
    let post=posts.find((p)=>id === p.id);

    res.render("edit.ejs",{post});
});
app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
     posts=posts.filter((p)=>id !== p.id);// finding the id
     res.redirect("/posts");
})

app.listen(port,()=>{
    console.log(`listening to port :${port}`);
});