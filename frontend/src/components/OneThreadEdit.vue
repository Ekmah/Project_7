<template>
    <div>
        <ul id="example-1">
            <li v-for="post in posts" :key="post.postId">
                <form @submit.prevent="Submit(post.threadId)">
                threadId: {{ post.threadId}} <br>
                postId: {{ post.postId}} <br>
                userId: {{ post.userId}} <br>
                creator username: {{ post.username}} <br>
                <label for="subject">thread subject:</label> 
                <input type="text" id="subject" name="subject" v-model="subject">
                <button type="submit">Save Edit</button> <br>
                post media: {{ post.media }} <br>
                post is first post: {{ post.is_first_post }} <br>
                post answer to: {{ post.answer_to }} <br>
                post content: {{ post.content }} <br>
                thread creation date: {{ post.threadCreationDate | moment("dddd, MMMM Do YYYY")}} <br>
                post creation date: {{ post.postDateCreation | moment("dddd, MMMM Do YYYY")}}{{ post.date_creation | moment("dddd, MMMM Do YYYY")}}
                </form>
            </li>
        </ul>
    </div>
</template> 

<script> 
import http from "../http"
export default {
    name: "OneThreadEdit",
    data(){
        return {
            isvalid:false,
            posts: "",
            subject: "",
        }
    },
    methods: {
        isConnected() {
            if (!sessionStorage.getItem('token') && !sessionStorage.getItem('id')) {
                this.$router.push({name: "Login"})
            }
        },
        getOneThread(){
            http.get(`/threads/${this.$route.params.threadId}`)
            .then(response => {
                this.posts = response.data
                this.subject = this.posts[0].subject
            })
        },
        Submit(threadId){
            http.put(`/threads/${this.$route.params.threadId}/${sessionStorage.getItem('id')}/${sessionStorage.getItem('role')}`, {"thread":{"subject": this.subject, "id":threadId}})
            this.$router.push({name: "Thread", params: {"threadId": threadId}})
        },  
    },
    beforeMount(){
        this.isConnected()
        this.getOneThread()
    },
}
</script>

<style>

</style>
