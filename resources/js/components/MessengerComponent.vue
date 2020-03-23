<template>
    <div>
        <b-row no-gutters class="h-100">
        <b-col cols="3" md="4">
            <contact-list-component @conversationSelected="changeActiveConversation($event)"></contact-list-component>
        </b-col>
        <b-col cols="9" md="8">
            <active-conversation-component
                v-if="selectedConversarion"
                :contact-id="selectedConversarion.contact_id"
                :contact-name="selectedConversarion.contact_name"
                :messages="messages">

            </active-conversation-component>
        </b-col>
    </b-row>
    </div>
        
</template>

<script>
    export default {
        props: {
            userId : Number
        },
        data(){
            return{
               selectedConversarion: null,
               messages: []
            };
        },
        mounted() {
            Echo.channel('example')
		    .listen('MessageSent', (data) => {
                const message = data.message;		    	
                message.written_By_Me = (this.userId == message.from_id);
                console.log(message);
                this.messages.push(data.message);
		    });
        },
        methods: {
           changeActiveConversation(conversation){
               this.selectedConversarion = conversation;
               this.getMessages();
           },
           getMessages()
            {
                axios.get(`/api/messages?contact_id=${this.selectedConversarion.contact_id}`)
                .then((response) => 
                {
                    this.messages= response.data;
                                    });
            },
        }
    }
</script>
