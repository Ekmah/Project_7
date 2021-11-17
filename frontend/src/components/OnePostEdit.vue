<template>
    <div>
        <textarea id="content" name="content" class="form-control" v-model="content"></textarea>
        <button class="btn btn-success" type="button" @click="Submit">Save Edit</button>
        <button class="btn btn-warning" type="button" @click="Cancel">Cancel</button> <br>
    </div>
</template> 

<script> 
import http from "../http"
export default {
    name: "OnePostEdit",
    props: ["post"],
    data(){
        return {
            isvalid:false,
            content: "",
            postId: ""
        }
    },
    methods: {
        isConnected() {
            if (!sessionStorage.getItem('token') && !sessionStorage.getItem('id')) {
                this.$router.push({name: "Login"})
            }
        },
        getOnePost(){
            this.content = this.post.content
            this.postId = this.post.postId
        },
        Cancel(){
            this.$emit('edit_done', false)
        },
        Submit(){
            console.log("id?",this.postId)
            http.put(`/posts/${this.postId}`, {"post":{"content": this.content, "id":this.postId}})
            .then(() => {
                this.$emit('edit_done', false) 
            })
        },  
    },
    beforeMount(){
        this.isConnected()
    },
    created(){
        this.getOnePost()
    },
}
</script>

<style>

</style>
