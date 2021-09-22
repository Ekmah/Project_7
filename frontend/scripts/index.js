//---------------------------------------------------------------------------------------------------//
//-------------------------------------SIGNUP WORKING------------------------------------------------//
//---------------------------------------------------------------------------------------------------//
// payload = {
//     "username": "toto",
//     "email_adress": "toto.toto@toto.fr",
//     "password": "147896325"
// }
// console.log(payload)
// fetch(`http://localhost:4000/api/auth/signup`, {
// headers: {
//     'Content-Type': "application/json"
// },
// method: 'POST',
// body: JSON.stringify(payload)
// })
//---------------------------------------------------------------------------------------------------//
//--------------------------------------LOGIN WORKING------------------------------------------------//
//---------------------------------------------------------------------------------------------------//
payload = {
    "email_adress": "toto.toto@toto.fr",
    "password": "147896325"
}
fetch(`http://localhost:4000/api/auth/login`, {
headers: {
    'Content-Type': "application/json"
},
method: 'POST',
body: JSON.stringify(payload)
})
//---------------------------------------------------------------------------------------------------//
//---------------------------------GET ALL THREADS WORKING-------------------------------------------//
//---------------------------------------------------------------------------------------------------//
.then(response => {
    console.log(response)
    return response.json()  
})
.then(function(res){
    console.log(res)
    const token=res.token
    fetch(`http://localhost:4000/api/threads/`, {
    headers: {
        'Authorization': token
    }
    })
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(things) {
        console.log(things)
    })
})


// payload = {
//     "contact": {
//         "firstName": document.getElementById("inputFirstName").value,
//         "lastName": document.getElementById("inputLastName").value,
//         "address": document.getElementById("inputAddress").value,
//         "city": document.getElementById("inputCity").value,
//         "email": document.getElementById("inputEmail").value
//     },
//     "products":Storage.get("products")
// }
// console.log(payload)
// fetch(`http://localhost:3000/api/furniture/order`, {
// headers: {
//     'Content-Type': "application/json"
// },
// method: 'POST',
// body: JSON.stringify(payload)
// })