<template>
    <div>
        <ul id="example-1">
            <li>
                <label for="subject">thread subject:</label> 
                <input type="text" id="subject" name="subject" v-model="subject">
                <label for="content">Post content:</label> 
                <textarea id="content" name="content" v-model="content"></textarea>
                <button type="button" @click="CreateThread()">Create Thread</button>
            </li>
        </ul>
    </div>
</template> 

<script> 
import http from "../http"
import moment from 'moment';
export default {
    name: "OneThreadCreate",
    data(){
        return {
            isvalid:false,
            subject: "",
            content: "",
        }
    },
    methods: {
        isConnected() {
            if (!sessionStorage.getItem('token') && !sessionStorage.getItem('id')) {
                this.$router.push({name: "Login"})
            }
        },
        CreateThread(){
            let date = moment().format('YYYY-MM-DD h:mm:ss');
            let payload = {
                "thread":
                {
                    "creatorId":sessionStorage.getItem('id'), 
                    "subject": this.subject, 
                    "date_creation": date
                }
            }
            http.post(`/threads/`, payload)
            .then(response => {
                let payload_post = {
                "post":
                {
                    "creatorId":sessionStorage.getItem('id'), 
                    "content": this.content, 
                    "date_creation": date,
                    "threadId": response.data["resp"].insertId,
                    "is_first_post": true
                }
            }
            http.post(`/posts/`, payload_post)
            
            this.$router.push({name: "Home"})
            })
            
        },
    },
    beforeMount(){
        this.isConnected()
    }
}
</script>

<style>

</style>
