<template>
    <div>
        <ul id="example-1">
            <button type="button" @click="CreatePost(false)">Create new Post</button>
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
                post creation date: {{ post.postDateCreation | moment("dddd, MMMM Do YYYY")}}<br>
                {{ post.date_creation | moment("dddd, MMMM Do YYYY")}}<br>
                <button type="button" @click="ModifyThread(post.threadId)">Modify Thread</button>
                <button type="button" @click="ModifyPost(post.postId)">Modify Post</button>
                <button type="button" @click="DeletePost(post.postId)">Delete Post</button>
                <button type="button" @click="CreatePost(post.postId)">Answer to post</button>
                <div v-if="post_creation">
                    <div v-if="is_answer == post.postId">
                        <OnePostCreate :type=is_answer @creation_done="updatePostCreation"></OnePostCreate>
                    </div>
                </div>
            </li>
            <li v-if="post_creation">
                <div v-if="is_answer === false">
                    <OnePostCreate type="new_post" @creation_done="updatePostCreation"></OnePostCreate>
                </div>
            </li>
        </ul>
    </div>
</template> 

<script> 
import OnePostCreate from '@/components/OnePostCreate.vue'
import http from "../http"
export default {
    name: "OneThread",
    components: {
        OnePostCreate
    },
    data(){
        return {
            isvalid:false,
            posts: "",
            post_creation: false,
            is_answer: false,
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
                console.log("resp", response.data)
                this.posts = response.data
            })
        },
        ModifyThread(threadId) {
            this.$router.push({name: "Thread_modify", params: {"threadId": threadId}})
        },
        CreatePost(isAnswer){
            this.post_creation = true
            this.is_answer = isAnswer
        },
        ModifyPost(postId) {
            this.$router.push({name: "Post_modify", params: {"postId": postId}})
        },
        DeletePost(postId) {
            console.log(postId)
            http.delete(`/posts/${postId}`)
            .then(() => {
            this.getOneThread()})
        },
        updatePostCreation(child_post_creation) {
            this.post_creation = child_post_creation
            this.getOneThread()
        }
    },
    beforeMount(){
        this.isConnected()
        this.getOneThread()
    },
}
</script>

<style>

</style>
