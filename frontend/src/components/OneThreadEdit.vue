<template>
    <div>
        <textarea id="subject" name="subject" class="form-control" v-model="subject"></textarea>
        <button class="btn btn-success" type="button" @click="Submit">Save Edit</button>
        <button class="btn btn-warning" type="button" @click="Cancel">Cancel</button> <br>
    </div>
</template> 

<script> 
import http from "../http"
export default {
    name: "OneThreadEdit",
    props: ["thread"],
    data(){
        return {
            isvalid:false,
            subject: "",
        }
    },
    methods: {
        isConnected() {
            if (!sessionStorage.getItem('token') && !sessionStorage.getItem('id')) {
                this.$router.push({name: "Login"})
            }
        },
        getSubject(){
                this.subject = this.thread.subject
        },
        Cancel(){
            this.$emit('edit_done', false)
        },
        Submit(){
            http.put(`/threads/${this.thread.threadId}/${sessionStorage.getItem('id')}/${sessionStorage.getItem('role')}`, {"thread":{"subject": this.subject, "id":this.thread.threadId}})
            .then(() => {
                this.$emit('edit_done', false) 
            })
        },  
    },
    beforeMount(){
        this.isConnected()
        this.getSubject()
    },
}
</script>

<style>

</style>
