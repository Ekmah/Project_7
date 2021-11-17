<template>
    <div>
        <ul id="example-1">
            <li>
                <label for="content">Post content:</label> 
                <textarea class="form-control" id="content" name="content" v-model="content"></textarea>
                <button class="btn btn-success" type="button" @click="CreatePost">Create Post</button>
                <button class="btn btn-warning" type="button" @click="Cancel">Cancel</button>
            </li>
        </ul>
    </div>
</template> 

<script> 
import http from "../http"
import moment from 'moment';
export default {
    name: "OnePostCreate",
    props: ["type"],
    data(){
        return {
            isvalid:false,
            content: "",
            post_type: this.type,
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
        CreatePost(){
            let isFirstPost = false
            let isAnswer = false
            console.log(this.type)
            console.log(this.post_type)
            if (this.post_type == "new_post") isFirstPost = false, isAnswer = false
            else isFirstPost = false, isAnswer = parseInt(this.post_type)
            let date = moment().format('YYYY-MM-DD h:mm:ss');
            let payload = {
                "post":
                {
                    "creatorId":sessionStorage.getItem('id'), 
                    "content": this.content, 
                    "date_creation": date,
                    "threadId": this.$route.params.threadId
                }
            }
            if(isFirstPost) payload.post["is_first_post"] = true
            if(isAnswer) payload.post["answer_to"] = isAnswer
            http.post(`/posts/`, payload)
            .then(() => {
                this.$emit('creation_done', false)
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
