

const email = localStorage.getItem("AASemail")
const password = localStorage.getItem("AASpassword")
const accountType = localStorage.getItem("AASaccounttype")

console.log(`email: ${email}, password: ${password}, accountType: ${accountType}`)



document.getElementById("hello").innerHTML=`Hello ${email}!`