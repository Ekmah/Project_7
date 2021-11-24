<template>
    <div>
        <ul id="example-1">
            <button class="btn btn-success" type="button" @click="Create()">Create new Thread</button>
            <h2>The 10 latest posts:</h2>
            <li class="post_home">
                <div class="post-body" v-for="post in posts" :key="post.postId">
                    <div class="inner-post">
                        <div v-if="post.media">
                            <img class="image" :src="post.media" alt="image du message" >
                        </div>
                        <div class="post-body-content">
                            <a class="a_button a_post" type="button" @click="Submit(post.threadId)" value="develop">
                                {{ post.subject }}
                            </a>
                            <div class="text">{{post.content}}</div>
                            <small style="color:gray">
                                created on {{ post.postDateCreation | moment("dddd, MMMM Do YYYY")}} by {{ post.username}}
                            </small>
                        </div>
                    </div>
                </div>
            </li>
            <h2>All threads:</h2>
            <li class="thread" v-for="thread in threads" :key="thread.threadId">
                <div class="thread-body col-12 col-md-8">
                    <div class="thread-body-header">
                        <a class="a_button" type="button" @click="Submit(thread.threadId)" value="develop">
                            <h4>{{ thread.subject }}</h4>
                        </a>
                            <!-- {{ thread.threadId}} | {{ thread.creatorId}} -->
                        <small style="color:gray">
                            created on {{ thread.date_creation | moment("dddd, MMMM Do YYYY")}} by {{ thread.username}}
                        </small>
                    </div>
                </div>
            </li>
            
        </ul>
    </div>
</template> 

<script> 
import http from "../http"
export default {
    name: "AllThreads",
    data(){
        return {
            isvalid:false,
            threads: "",
            posts: "",
            type_of_action: "",
            role: "",
            connected_user_id: ""
        }
    },
    methods: {
        isConnected() {
            if (!sessionStorage.getItem('token') && !sessionStorage.getItem('id')) {
                this.$router.push({name: "Login"})
            }
        },
        getAllInfos(){
            http.get("/threads/")
            .then(response => {
                let threads = response.data
                this.threads = threads
                this.role = sessionStorage.getItem('role')
                this.connected_user_id = sessionStorage.getItem('id')
                http.get("/posts/new/")
                .then(response => {
                    this.posts = response.data
                })
            })
            
        },
        Create(){
            this.$router.push({name: "Thread_create"})
        },
        Submit(threadId){
            this.$router.push({name: "Thread", params: {"threadId": threadId}})
        },
    },
    beforeMount(){
        this.isConnected()
        this.getAllInfos()
    },
}
</script>

<style>
    .thread{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin:5px;
    }
    .post_home{
        display:flex;
        flex-wrap: wrap;
        margin:5px;
    }
    .inner-post{
        display:flex;
    }
    .image {
        width:50px;
        height:50px;
        object-fit: cover;
    }
    .thread-body {
        text-align: left ; 
        background-color: rgb(160, 255, 160) ; 
        color:black ;
        display:flex ;
        flex-wrap: wrap;
        justify-content:space-between;
        padding:5px;
        border: 1px solid gray;
    }
    .text{
        width:100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .post-body {
        width:98%;
        max-height:110px;
        text-align: left ; 
        background-color: rgb(160, 255, 160) ; 
        color:black ;
        padding:5px;
        margin:5px;
        border: 1px solid gray;
    }
    .post-body-content {
        display:flex ;
        flex-wrap: wrap;
        flex-direction: column ;
        max-width:80%;
        margin-left: 5px;
    }
    .thread-body-header {
        display:flex ;
        flex-wrap: wrap;
        flex-direction: column ;
    }
    .a_button {
        text-decoration: none;
        color:black;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    ul {
        list-style-type:none;
        padding:unset !important;
    }
    
    h4 {
        text-overflow: ellipsis;
    }
    .a_post{
        width:100%;
        font-size: x-large;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    @media (min-width: 540px) {
        .post-body{
            width:48% !important;
            flex: 0 0 auto !important;
        }
    }
    @media (min-width: 768px) {
        .post-body{
            max-height:130px !important;
            width:30% !important;
            flex: 0 0 auto !important;
        }
    }
    @media (min-width:1021px) {
        .post-body{
            max-height:130px !important;
            width:19% !important;
            flex: 0 0 auto !important;
        }
    }
</style>
