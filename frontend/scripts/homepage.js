//---------------------------------------------------------------------------------------------------//
//---------------------------------GET ALL THREADS WORKING-------------------------------------------//
//---------------------------------------------------------------------------------------------------//

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