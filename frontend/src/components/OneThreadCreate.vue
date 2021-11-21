<template>
    <div class="post_create">
        <div class="body_create">
            <div>
                <label for="subject">Subject of the thread:</label> 
                <div class="content_create">
                    <input class="form-control col-12 col-md-8 col-lg-6" type="text" id="subject" name="subject" v-model="subject">
                </div>
            </div>
            <div>
                <label for="subject">Content of your initial post:</label> 
                <div class="content_create">
                    <textarea class="form-control col-12 text_area" id="content" name="content" v-model="content"></textarea>
                </div>
            </div>
        </div>
        <div class="butn-group">
            <button class="btn btn-success" type="button" @click="CreateThread()">Create Thread</button>
        </div>
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
.text_area{
    height:300px;
}
.small{
    color:gray;
}
.text{
    padding:0px 5px;
}
.post_create {
    background-color: rgb(160, 255, 160) !important; 
    margin:5px;
    border:5px solid rgb(160, 255, 160);
}
.body_create{
    display:flex;
    flex-direction: column;
}
.content_create{
    padding:5px;
    text-align: left !important; 
    background-color: rgb(160, 255, 160) !important; 
    width:100%;
}
label{
    margin-left: 10px;
}
</style>
