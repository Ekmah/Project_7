<template>
    <div>
        <ul id="example-1">
            <li>
                <form @submit.prevent="Submit(post.postId)">
                    threadId: {{ post.threadId}} <br>
                    postId: {{ post.postId}} <br>
                    userId: {{ post.userId}} <br>
                    creator username: {{ post.username}} <br>
                    thread subject: {{ post.subject }}
                    
                    post media: {{ post.media }} <br>
                    post is first post: {{ post.is_first_post }} <br>
                    post answer to: {{ post.answer_to }} <br>
                    <input type="text" id="content" name="content" v-model="content">
                    <button type="submit">Save Edit</button> <br>
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
    name: "OnePostEdit",
    data(){
        return {
            isvalid:false,
            post: "",
            content: "",
        }
    },
    methods: {
        isConnected() {
            if (!sessionStorage.getItem('token') && !sessionStorage.getItem('id')) {
                this.$router.push({name: "Login"})
            }
        },
        getOnePost(){
            http.get(`/posts/${this.$route.params.postId}`)
            .then(response => {
                this.post = response.data[0]
                console.log(this.post)
                this.content = this.post.content
            })
        },
        Submit(postId){
            http.put(`/posts/${this.$route.params.postId}`, {"post":{"content": this.content, "id":postId}})
            this.$router.push({name: "Thread", params: {"threadId": this.post.threadId}})
        },  
    },
    beforeMount(){
        this.isConnected()
    },
    created(){
        this.getOnePost()
    },
}
</script>

<style>

</style>
