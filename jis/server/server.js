const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

const USERS =
    path.join(__dirname, "users.json");

const PROJECTS =
    path.join(__dirname, "projects.json");

// CREATE FILES IF MISSING

if(!fs.existsSync(USERS)){
    fs.writeFileSync(USERS, "[]");
}

if(!fs.existsSync(PROJECTS)){
    fs.writeFileSync(PROJECTS, "[]");
}

// HOME

app.get("/", (req, res) => {

    res.send("JIS Server Running");
});

// SIGNUP

app.post("/signup", (req, res) => {

    const users =
        JSON.parse(
            fs.readFileSync(USERS)
        );

    const exists =
        users.find(
            u =>
                u.username ===
                req.body.username
        );

    if(exists){

        return res.send(
            "User already exists"
        );
    }

    users.push({
        username:req.body.username,
        password:req.body.password
    });

    fs.writeFileSync(
        USERS,
        JSON.stringify(users, null, 2)
    );

    res.send("Account created");
});

// LOGIN

app.post("/login", (req, res) => {

    const users =
        JSON.parse(
            fs.readFileSync(USERS)
        );

    const found =
        users.find(
            u =>
                u.username === req.body.username &&
                u.password === req.body.password
        );

    if(found){

        res.send("Success");

    }else{

        res.send("Wrong account");
    }
});

// SAVE PROJECT

app.post("/save", (req, res) => {

    const projects =
        JSON.parse(
            fs.readFileSync(PROJECTS)
        );

    projects.push({
        username:req.body.username,
        code:req.body.code
    });

    fs.writeFileSync(
        PROJECTS,
        JSON.stringify(projects, null, 2)
    );

    res.send("Project saved");
});

// RUN JAVA

app.post("/run", (req, res) => {

    const code = req.body.code;

    const javaFile =
        path.join(__dirname, "Main.java");

    fs.writeFileSync(javaFile, code);

    exec(
        "javac Main.java && java Main",
        {
            cwd:__dirname
        },

        (error, stdout, stderr) => {

            if(error){

                return res.send(
                    stderr || error.message
                );
            }

            res.send(stdout);
        }
    );
});

// START SERVER

app.listen(3000, () => {

    console.log(
        "JIS server running on port 3000"
    );
});
