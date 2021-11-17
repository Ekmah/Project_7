<template>
    <div>
        <ul id="example-1">
            <li v-for="post in posts" :key="post.postId">
                <div v-if="post.is_first_post" class="thread-header">
                    <h1>{{ post.subject }}</h1>
                    <small class="small">created the {{ post.threadCreationDate | moment("dddd, MMMM Do YYYY")}}</small>
                    <button class="btn btn-secondary" type="button" @click="ModifyThread(post.threadId)">Modify Thread</button>
                </div>
                <div class="post">
                    <div class="header">
                        <div class="header-writing">
                            <span v-if="post.answer_to" >answer to post #{{ post.answer_to }} </span>
                            sent the {{ post.postDateCreation | moment("dddd, MMMM Do YYYY")}}
                        </div>
                        <div v-if="role=='modo' || post.userId == connected_user_id" class="butn-group">
                            <button class="btn btn-secondary" type="button" @click="ModifyPost(post.postId)">Modify Post</button>
                            <button class="btn btn-danger" type="button" @click="DeletePost(post.postId)">Delete Post</button>
                        </div>
                    </div>
                    <div class="body">
                        <div class="user">{{ post.username}}</div>
                        <div class="content">
                            <div v-if="post_edit">
                                <div v-if="post_id == post.postId">
                                    <OnePostEdit :post=post @edit_done="updatePostEdit"></OnePostEdit>
                                </div>
                                <div v-else>
                                    {{ post.content }}
                                </div>
                            </div>
                            <div v-else>
                                {{ post.content }}
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-success answer" type="button" @click="CreatePost(true, post.postId)">Answer to post</button>
                    <div v-if="post_creation">
                        <div v-if="post_id == post.postId && is_answer">
                            <OnePostCreate :type=is_answer @creation_done="updatePostCreation"></OnePostCreate>
                        </div>
                    </div>
                </div>
                <!-- threadId: {{ post.threadId}} <br>
                postId: {{ post.postId}} <br>
                userId: {{ post.userId}} <br>
                creator username: {{ post.username}} <br>
                thread subject: {{ post.subject }} <br>
                post media: {{ post.media }} <br>
                post is first post: {{ post.is_first_post }} <br>
                post answer to: {{ post.answer_to }} <br>
                post content: {{ post.content }} <br>
                thread creation date: {{ post.threadCreationDate | moment("dddd, MMMM Do YYYY")}} <br>
                post creation date: {{ post.postDateCreation | moment("dddd, MMMM Do YYYY")}}<br> -->
               
                
            </li>
            <button class="btn btn-success" type="button" @click="CreatePost(false, post.postId)">Create new Post</button>
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
import OnePostEdit from '@/components/OnePostEdit.vue'
import http from "../http"
export default {
    name: "OneThread",
    components: {
        OnePostCreate,
        OnePostEdit
    },
    data(){
        return {
            isvalid:false,
            posts: "",
            post_creation: false,
            post_edit:false,
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
                console.log("resp", response.data)
                this.posts = response.data
                this.role = sessionStorage.getItem('role')
                this.connected_user_id = sessionStorage.getItem('id')
            })
        },
        ModifyThread(threadId) {
            this.$router.push({name: "Thread_modify", params: {"threadId": threadId}})
        },
        CreatePost(isAnswer, postId){
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
            http.delete(`/posts/${postId}`)
            .then(() => {
            this.getOneThread()})
        },
        updatePostCreation(child_post_creation) {
            this.post_creation = child_post_creation
            this.getOneThread()
        },
        updatePostEdit(child_post_edit) {
            this.post_edit = child_post_edit
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
.thread-hader{
    text-align: left !important; 
}
.post{
    text-align: left !important; 
    background-color: rgb(160, 255, 160) !important; 
    color:black !important;
    flex-direction: column !important;
    display:flex;
    margin:5px;
    border:5px solid rgb(160, 255, 160);
    border-top-width: 0px;;
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
    padding:5px;
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
