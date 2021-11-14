<template>
    <div>
        <ul id="example-1">
            <button class="btn btn-success" type="button" @click="Create()">Create new Thread</button>
            <li class="thread" v-for="thread in threads" :key="thread.threadId">
                <div class="thread-body btn btn-secondary">
                    <a class="" type="button" @click="Submit(thread.threadId)" value="develop">
                        <div>{{ thread.subject }}</div>
                        <!-- {{ thread.threadId}} | {{ thread.creatorId}} -->
                        <small style="color:gray">created on {{ thread.date_creation | moment("dddd, MMMM Do YYYY")}} by {{ thread.username}}</small>
                    </a>
                    <div class="butn-group">
                        <button class="btn btn-secondary" type="button" @click="Modify(thread.threadId)">Modify</button>
                        <button class="btn btn-danger" type="button" @click="Delete(thread.threadId)">Delete</button>
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
            type_of_action: ""
        }
    },
    methods: {
        isConnected() {
            if (!sessionStorage.getItem('token') && !sessionStorage.getItem('id')) {
                this.$router.push({name: "Login"})
            }
        },
        getAllThreads(){
            http.get("/threads/")
            .then(response => {
                let threads = response.data
                this.threads = threads
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
            http.delete(`/threads/${threadId}`)
            .then(() => {
            this.getAllThread()})
        },
    },
    beforeMount(){
        this.isConnected()
        this.getAllThreads()
    },
}
</script>

<style>
    .butn-group {
        display:flex;
    }
    .thread-body {
        width:800px;
        text-align: left; 
        background-color: lightgreen; 
        color:black;
        flex-direction: column;
    }
    ul {
        list-style-type:none;
    }
    .thread-body:hover{
        background-color: #42b983;
        color: black;
        border-color: white;
    }
</style>
