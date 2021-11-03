<template>
    <div>
        <ul id="example-1">
            <li>
                <label for="subject">thread subject:</label> 
                <input type="text" id="subject" name="subject" v-model="subject">
                <button type="button" @click="onCreateThread()">Create Thread</button>
            </li>
        </ul>
    </div>
</template> 

<script> 
import http from "../http"
import moment from 'moment';
export default {
    name: "OneThreadCreate",
    data(){
        return {
            isvalid:false,
            subject: "",
        }
    },
    methods: {
        onCreateThread(){
            let date = moment().format('YYYY-MM-DD h:mm:ss');
            let payload = {
                "thread":
                {
                    "creatorId":sessionStorage.getItem('id'), 
                    "subject": this.subject, 
                    "date_creation": date
                }
            }
            http.post(`/threads/`, payload)
            this.$router.push({name: "Home"})
        },
    },
    beforeMount(){
        this.getOneThread()
    },
}
</script>

<style>

</style>
