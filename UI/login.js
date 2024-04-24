const api_url = "127.0.0.1"
const port=3000

const login = ()=>{


    const email=document.getElementById("email").value
    const password=document.getElementById("password").value


    //IMPLEMENT API
    loginstatus = "advisor";//call api here

    if(email == "lead"){
        loginstatus="lead"
    }


    localStorage.setItem("AASaccounttype", loginstatus)
    localStorage.setItem("AASemail", email)
    localStorage.setItem("AASpassword", password)
    console.log("local storage should be set")
    if(loginstatus == "lead")
    {
        window.location.replace(`./leadadvisor.html`)
    }

    else if(loginstatus == "advisor")
    {
        window.location.replace(`./advisor.html`)
    }
    else{
        alert("incorrect username or password")
    }

}