<template>
    <div>
        <ul id="example-1">
            <button class="btn btn-success" type="button" @click="Create()">Create new Thread</button>
            <li class="thread" v-for="thread in threads" :key="thread.threadId">
                <div class="thread-body btn btn-secondary">
                    <a class="a_button" type="button" @click="Submit(thread.threadId)" value="develop">
                        <div>{{ thread.subject }}</div>
                        <!-- {{ thread.threadId}} | {{ thread.creatorId}} -->
                        <small style="color:gray">created on {{ thread.date_creation | moment("dddd, MMMM Do YYYY")}} by {{ thread.username}}</small>
                    </a>
                    <div v-if="role=='modo' || thread.userId == connected_user_id" class="butn-group">
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
        getAllThreads(){
            http.get("/threads/")
            .then(response => {
                let threads = response.data
                this.threads = threads
                this.role = sessionStorage.getItem('role')
                this.connected_user_id = sessionStorage.getItem('id')
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
        width:800px !important;
        text-align: left !important; 
        background-color: rgb(160, 255, 160) !important; 
        color:black !important;
        flex-direction: column !important;
    }
    .a_button {
        text-decoration: none;
        width:80%;
    }
    ul {
        list-style-type:none;
    }
    .thread-body:hover{
        background-color: #6bffbc !important;
        color: black !important;
        border-color: white !important;
    }
</style>
