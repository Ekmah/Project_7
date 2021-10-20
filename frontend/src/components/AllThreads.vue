<template>
    <div>
        <ul id="example-1">
            <li v-for="thread in threads" :key="thread.threadId">
                <form @submit.prevent="onSubmit(thread.threadId)">
                    {{ thread.threadId}}
                    {{ thread.username}}
                    {{ thread.subject }}
                    {{ thread.creatorId}}
                    {{ thread.date_creation | moment("dddd, MMMM Do YYYY")}}
                    <button type="submit">submit</button>
                </form>
            </li>
            <li>{{posts}}</li>
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
            posts: ""
        }
    },
    methods: {
        getAllThreads(){
            http.get("/threads/")
            .then(response => {
                let threads = response.data
                this.threads = threads
                console.log(threads)
            })
        },
        onSubmit(threadId){
            http.get(`/posts/thread/${threadId}`)
            .then(response => {
                this.posts = response.data
            })
        } 
    },
    beforeMount(){
        this.getAllThreads()
    },
}
</script>

<style>

</style>
