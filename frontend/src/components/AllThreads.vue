<template>
    <div>
        <ul id="example-1">
            <button type="button" @click="onCreate()">Create new Thread</button>
            <li v-for="thread in threads" :key="thread.threadId">
                {{ thread.threadId}}
                {{ thread.username}}
                {{ thread.subject }}
                {{ thread.creatorId}}
                {{ thread.date_creation | moment("dddd, MMMM Do YYYY")}}
                <button type="button" @click="onSubmit(thread.threadId)" value="develop">See thread</button>
                <button type="button" @click="onModify(thread.threadId)">Modify</button>
                <button type="button" @click="onDelete(thread.threadId)">Delete</button>
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
        getAllThreads(){
            http.get("/threads/")
            .then(response => {
                let threads = response.data
                this.threads = threads
            })
        },
        onCreate(){
            this.$router.push({name: "Thread_create"})
        },
        onSubmit(threadId){
            this.$router.push({name: "Thread", params: {"threadId": threadId}})
        }, 
        onModify(threadId) {
            this.$router.push({name: "Thread_modify", params: {"threadId": threadId}})
        },
        onDelete(threadId) {
            http.delete(`/threads/${threadId}`)
            .then(() => {
            this.getAllThread()})
        },
    },
    beforeMount(){
        this.getAllThreads()
    },
}
</script>

<style>

</style>
