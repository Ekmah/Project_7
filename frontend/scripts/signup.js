//---------------------------------------------------------------------------------------------------//
//-------------------------------------SIGNUP WORKING------------------------------------------------//
//---------------------------------------------------------------------------------------------------//
payload = {
    "username": "toto",
    "email_adress": "toto.toto@toto.fr",
    "password": "147896325"
}
console.log(payload)
fetch(`http://localhost:4000/api/auth/signup`, {
headers: {
    'Content-Type': "application/json"
},
method: 'POST',
body: JSON.stringify(payload)
})