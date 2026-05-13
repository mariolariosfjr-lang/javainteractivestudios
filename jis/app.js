// API URL

const API = "http://localhost:3000";

// SIGN UP

async function signup(){

    const username =
        document.getElementById("user").value;

    const password =
        document.getElementById("pass").value;

    const response = await fetch(
        API + "/signup",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                username:username,
                password:password
            })
        }
    );

    const text = await response.text();

    alert(text);

    if(text === "Account created"){
        window.location.href = "login.html";
    }
}

// LOGIN

async function login(){

    const username =
        document.getElementById("user").value;

    const password =
        document.getElementById("pass").value;

    const response = await fetch(
        API + "/login",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                username:username,
                password:password
            })
        }
    );

    const text = await response.text();

    if(text === "Success"){

        localStorage.setItem(
            "jisUser",
            username
        );

        window.location.href =
            "dashboard.html";

    }else{

        alert("Wrong username or password");

    }
}

// LOGOUT

function logout(){

    localStorage.removeItem("jisUser");

    window.location.href = "login.html";
}

// CHECK LOGIN

function checkLogin(){

    const user =
        localStorage.getItem("jisUser");

    if(!user){

        window.location.href =
            "login.html";
    }
}

// SHOW USERNAME

function loadUser(){

    const user =
        localStorage.getItem("jisUser");

    const name =
        document.getElementById("username");

    if(name){

        name.innerText = user;
    }
}

// SAVE PROJECT

function saveProject(){

    const code =
        editor.getValue();

    localStorage.setItem(
        "jisCode",
        code
    );

    alert("Project saved");
}

// LOAD PROJECT

function loadProject(){

    const code =
        localStorage.getItem("jisCode");

    if(code && typeof editor !== "undefined"){

        editor.setValue(code);
    }
}

// RUN JAVA

async function runJava(){

    const code =
        editor.getValue();

    const output =
        document.getElementById("output");

    output.innerText =
        "Running Java...";

    const response = await fetch(
        API + "/run",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                code:code
            })
        }
    );

    const text =
        await response.text();

    output.innerText =
        text;
}
