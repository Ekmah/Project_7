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
//---------------------------------------------------------------------------------------------------
payload = {
    "email_adress": "toto.toto@toto.fr",
    "password": "147896325"
}
console.log(payload)
fetch(`http://localhost:4000/api/auth/login`, {
headers: {
    'Content-Type': "application/json"
},
method: 'POST',
body: JSON.stringify(payload)
})
.then(function(res){
    const token=res
    return token
})
.then(function(token) {
    fetch(`http://localhost:4000/api/threads/`, {
    headers: {
        'Authorisation': token
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