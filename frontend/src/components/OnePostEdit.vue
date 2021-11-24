<template>
    <div>
        <textarea id="content" name="content" class="form-control" v-model="content"></textarea>
        <input type="file" id="avatar" class="btn" name="media" v-on:change="selectedFile($event)" accept="image/png, image/jpeg, image/gif">
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
            postId: "",
            media: ""
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
        selectedFile(event) {
            console.log(this.media)
            this.media = event.target.files[0]
            console.log(this.media)
        },
        Submit(){
            console.log("id?",this.postId)
            const formData = new FormData()
            formData.set("content", this.content)
            formData.set("image", this.media)
            formData.set("id", this.postId)
            http.put(`/posts/${this.postId}/${sessionStorage.getItem('id')}/${sessionStorage.getItem('role')}`, formData)
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
