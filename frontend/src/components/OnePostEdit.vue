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
        },
        Cancel(){
            this.$emit('edit_done', false)
        },
        Submit(){
            http.put(`/posts/${this.post.id}`, {"post":{"content": this.content, "id":this.post.id}})
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
