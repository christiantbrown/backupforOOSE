const api_url = "127.0.0.1"
const port=3000


const getLoginStatus = async (email, password) => {
    loginstatus = await fetch(encodeURI(`http://${api_url}:${port}/api/login/${email}/${password}`), {
        mode:"cors"
    }).then((loginstatus)=>loginstatus.json())
    console.log(loginstatus)
    return loginstatus.status
}

const login = async ()=>{


    const email=document.getElementById("email").value
    const password=document.getElementById("password").value


    //IMPLEMENT API
    console.log("waiting on login status")
    loginstatus = await getLoginStatus(email, password)
    console.log(`loginstatus:${loginstatus}`)
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