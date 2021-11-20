<template>
    <div>
        <ul id="example-1">
            <button class="btn btn-success" type="button" @click="Create()">Create new Thread</button>
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
                    <div v-if="role=='modo' || thread.creatorId == connected_user_id" class="butn-group">
                        <button class="btn btn-secondary" type="button" @click="Modify(thread.threadId)">Modify</button>
                        <button class="btn btn-danger" type="button" @click="Delete(thread.threadId)">Delete</button>
                    </div>
                </div>
            </li>
            <li v-for="post in posts" :key="post.postId">
                {{post}}<br>
                <!-- <div v-if="post.is_first_post" class="thread-header">
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
                </div> -->
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
        Modify(threadId) {
            this.$router.push({name: "Thread_modify", params: {"threadId": threadId}})
        },
        Delete(threadId) {
            http.delete(`/threads/${threadId}/${this.connected_user_id}/${this.role}`)
            .then(() => {
                this.getAllInfos()})
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
        
    }
    .thread-body {
        text-align: left ; 
        background-color: rgb(160, 255, 160) ; 
        color:black ;
        display:flex ;
        flex-wrap: wrap;
        justify-content:space-between;
        padding:5px;
        margin:5px;
        border: 1px solid gray;
    }
    .thread-body-header {
        display:flex ;
        flex-wrap: wrap;
        flex-direction: column ;
    }
    .a_button {
        text-decoration: none;
        color:black;
    }
    ul {
        list-style-type:none;
    }
</style>
