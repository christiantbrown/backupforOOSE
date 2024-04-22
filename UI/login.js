const login = ()=>{


    const email=document.getElementById("email").value
    const password=document.getElementById("password").value
    console.log(`test: email ${email} password ${password}`)
    loginstatus = "advisor";//call api here

    if(email.toLowerCase() == "lead")
    {
        window.location.replace("./leadadvisor.html")
    }

    if(loginstatus == "advisor"){
        console.log("successful")
//        window.location.replace("http://www.w3schools.com")        
    }
    else{
        alert("incorrect username or password")
    }

}