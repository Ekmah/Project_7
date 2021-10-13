<template>
    <div>
        bla bla bla,{{abc}} il n'y as pas d'insultes ici
        <button @click.prevent="aaa" :class="{zoom:isvalid}" class="">zefuyz</button>
    </div>
</template>

<script>
export default {
    name: "LogIn",
    data(){
        return {
            abc:[],
            isvalid:false
        }
    },
    mounted(){
        let payload = {
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
        .then(data => {
            this.abc = data
        })
    },
    methods: {
        aaa(){
            this.abc = "a"
            this.isvalid = true
        }
    }
}
</script>

<style>

</style>