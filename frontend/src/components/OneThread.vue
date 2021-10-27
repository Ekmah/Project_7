<template>
    <div>
        <ul id="example-1">
            <li v-for="post in posts" :key="post.postId">
                threadId: {{ post.threadId}} <br>
                postId: {{ post.postId}} <br>
                userId: {{ post.userId}} <br>
                creator username: {{ post.username}} <br>
                thread subject: {{ post.subject }} <br>
                post media: {{ post.media }} <br>
                post is first post: {{ post.is_first_post }} <br>
                post answer to: {{ post.answer_to }} <br>
                post content: {{ post.content }} <br>
                thread creation date: {{ post.threadCreationDate | moment("dddd, MMMM Do YYYY")}} <br>
                post creation date: {{ post.postDateCreation | moment("dddd, MMMM Do YYYY")}}{{ post.date_creation | moment("dddd, MMMM Do YYYY")}}
            </li>
        </ul>
    </div>
</template> 

<script> 
import http from "../http"
export default {
    name: "OneThread",
    data(){
        return {
            isvalid:false,
            posts: ""
        }
    },
    methods: {
        getOneThread(){
            console.log()
            http.get(`/threads/${this.$route.params.threadId}`)
            .then(response => {
                this.posts = response.data
            })
        } 
    },
    beforeMount(){
        this.getOneThread()
    },
}
</script>

<style>

</style>
