<template>
    <div>
        <ul id="example-1">
            <li v-for="post in posts" :key="post.postId">
                <div v-if="post.is_first_post" class="thread-header">
                    <div class="thread-header-top">
                        <div v-if="thread_edit">
                            <OneThreadEdit :thread=post @edit_done="updateThreadEdit"></OneThreadEdit>
                        </div>
                        <div v-else class="text_post">
                            <h1>{{ post.subject }}</h1>
                        </div>
                        <div v-if="role=='modo' || post.threadcreatorId == connected_user_id" class="butn-group">
                            <button class="btn btn-secondary" type="button" @click="ModifyThread(post.threadId)">Modify Thread</button>
                            <button class="btn btn-danger" type="button" @click="DeleteThread(post.threadId)">Delete Thread</button>
                        </div>
                    </div>
                    <span class="small small-header">created the {{ post.threadCreationDate | moment("dddd, MMMM Do YYYY")}}</span>
                </div>
                <div class="post">
                    <div class="body">
                        <div class="user">{{ post.username}}</div>
                        <div class="content">
                            <small class="small">#{{post.postId}} | <span v-if="post.answer_to" >answer to post #{{ post.answer_to }} </span>
                            sent the {{ post.postDateCreation | moment("dddd, MMMM Do YYYY, HH:mm:ss")}}</small>
                            <hr style="margin: 0px 0px 1rem 0px;">
                            <div v-if="post_edit">
                                <div v-if="post_id == post.postId">
                                    <OnePostEdit :post=post @edit_done="updatePostEdit"></OnePostEdit>
                                </div>
                                <div v-else class="text_post">
                                    {{ post.content }}
                                </div>
                            </div>
                            <div v-else class="text_post">
                                {{ post.content }}
                            </div>
                            <div v-if="post.media">
                                <img class="" :src="post.media" alt="image du message" v-if="post.media !== ''">
                            </div>
                        </div>
                    </div>
                    <div class="butn-group">
                        <button class="btn btn-success answer" type="button" @click="CreatePost(true, post.postId)">Answer to post</button>
                        <div v-if="role=='modo' || post.userId == connected_user_id" class="butn-group">
                            <button class="btn btn-secondary" type="button" @click="ModifyPost(post.postId)">Modify Post</button>
                            <button class="btn btn-danger" type="button" @click="DeletePost(post.postId)">Delete Post</button>
                        </div>
                    </div>
                    <div v-if="post_creation">
                        <div v-if="post_id == post.postId && is_answer">
                            <OnePostCreate :postId=post_id @creation_done="updatePostCreation"></OnePostCreate>
                        </div>
                    </div>
                    
                </div>
            </li>
            <button class="btn btn-success" type="button" @click="CreatePost(false)">Create new Post</button>
            <li v-if="post_creation">
                <div v-if="is_answer === false">
                    <OnePostCreate :postId=false @creation_done="updatePostCreation"></OnePostCreate>
                </div>
            </li>
        </ul>
    </div>
</template> 

<script> 
import OnePostCreate from '@/components/OnePostCreate.vue'
import OnePostEdit from '@/components/OnePostEdit.vue'
import OneThreadEdit from '@/components/OneThreadEdit.vue'
import http from "../http"
export default {
    name: "OneThread",
    components: {
        OnePostCreate,
        OnePostEdit,
        OneThreadEdit
    },
    data(){
        return {
            isvalid:false,
            posts: "",
            post_creation: false,
            post_edit:false,
            thread_edit:false,
            is_answer: false,
            post_id: "",
            role: "",
            connected_user_id: "",
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
                this.role = sessionStorage.getItem('role')
                this.connected_user_id = sessionStorage.getItem('id')
            })
        },
        CreatePost(isAnswer, postId=null){
            this.post_creation = true
            this.is_answer = isAnswer
            this.post_id = postId
        },
        ModifyPost(postId) {
            this.post_edit = true
            this.post_id = postId
            // this.$router.push({name: "Post_modify", params: {"postId": postId}})
        },
        DeletePost(postId) {
            console.log(postId)
            http.delete(`/posts/${postId}/${this.connected_user_id}/${this.role}`)
            .then(() => {
            this.getOneThread()})
        },
        ModifyThread(threadId) {
            this.thread_edit = true
            this.thread_id = threadId
        },
        DeleteThread(threadId) {
            http.delete(`/threads/${threadId}/${this.connected_user_id}/${this.role}`)
            .then(() => {
                this.$router.push({name: "Home"})
            })
        },
        updatePostCreation(child_post_creation) {
            this.post_creation = child_post_creation
            this.getOneThread()
        },
        updatePostEdit(child_post_edit) {
            this.post_edit = child_post_edit
            this.getOneThread()
        },
        updateThreadEdit(child_thread_edit) {
            this.thread_edit = child_thread_edit
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
ul {
    padding-inline-start:0px;
    padding:10px;
}
.thread-header{
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    padding:10px;
}
.thread-header-top{
    display:flex;
    align-items: self-start;
}
.small{
    color:gray;
}
.text_post{
    padding:0px 5px;
}
.post{
    text-align: left !important; 
    background-color: rgb(160, 255, 160) !important; 
    color:black !important;
    flex-direction: column !important;
    display:flex;
    margin:5px;
    border:5px solid rgb(160, 255, 160);
}
.header{
    padding:5px;
    text-align: left !important; 
    background-color: rgb(160, 255, 160) !important; 
    color:black !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.body{
    text-align: left !important; 
    background-color: rgb(160, 255, 160) !important; 
    color:black !important;
    display:flex
}
.user{
    padding:5px 10px;
    text-align: left !important; 
    background-color: lightgray !important; 
    width:20%;
    color:black !important;
    /* flex-direction: column !important; */
}
.content{
    padding:5px;
    text-align: left !important; 
    background-color: white !important; 
    width:100%;
    min-height:250px;
    color:black !important;
    /* flex-direction: column !important; */
}
.answer{
    width:150px;
}
</style>
