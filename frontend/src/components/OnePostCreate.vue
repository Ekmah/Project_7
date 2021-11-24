<template>
    <div class="post_create">
        <div class="body_create">
            <div class="content_create">
                <span v-if="postId" >answer to post #{{ postId }} </span>
                <textarea class="form-control text_area" id="content" name="content" v-model="content"></textarea>
                <input type="file" id="avatar" class="btn" name="media" v-on:change="selectedFile($event)" accept="image/png, image/jpeg, image/gif">
            </div>
        </div>
        <div class="butn-group">
            <button class="btn btn-success" type="button" @click="CreatePost">Create Post</button>
            <button class="btn btn-warning" type="button" @click="Cancel">Cancel</button>
        </div>
    </div>
</template> 

<script> 
import http from "../http"
import moment from 'moment';
export default {
    name: "OnePostCreate",
    props: ["postId"],
    data(){
        return {
            isvalid:false,
            content: "",
            media: "",
        }
    },
    methods: {
        isConnected() {
            if (!sessionStorage.getItem('token') && !sessionStorage.getItem('id')) {
                this.$router.push({name: "Login"})
            }
        },
        Cancel(){
            this.$emit('creation_done', false)
        },
        selectedFile(event) {
            this.media = event.target.files[0]
        },
        CreatePost(){
            if (this.content !="") {
                let isFirstPost = false
                let isAnswer = false
                if (this.postId) {
                    isFirstPost = false, isAnswer = parseInt(this.postId)
                } else {
                    isAnswer = false
                }
                let date = moment().format('YYYY-MM-DD hh:mm:ss');
                console.log(date)
                const formData = new FormData()
                formData.set("creatorId", sessionStorage.getItem('id'))
                formData.set("content", this.content)
                formData.set("date_creation", date)
                formData.set("threadId", this.$route.params.threadId)
                formData.set("image", this.media)
                if(isFirstPost) formData.set("is_first_post", true)
                if(isAnswer) formData.set("answer_to", isAnswer)
                http.post(`/posts/`, formData)
                .then(() => {
                    this.$emit('creation_done', false)
                })
            }
        },
    },
    beforeMount(){
        this.isConnected()
    }
}
</script>

<style>
.text_area{
    height:250px;
}
ul {
    padding-inline-start:0px;
    padding:10px;
}
.small{
    color:gray;
}
.text{
    padding:0px 5px;
}
.post_create{
    text-align: left !important; 
    background-color: rgb(160, 255, 160) !important; 
    color:black !important;
    flex-direction: column !important;
    display:flex;
    margin:5px;
    border:5px solid rgb(160, 255, 160);
}
.body_create{
    text-align: left !important; 
    background-color: rgb(160, 255, 160) !important; 
    color:black !important;
    display:flex
}
.content_create{
    padding:5px;
    text-align: left !important; 
    background-color: white !important; 
    width:100%;
    color:black !important;
    /* flex-direction: column !important; */
}
</style>
