<template>
    <div>
        <b-row no-gutters class="h-100">
        <b-col cols="3" md="4">
            <contact-list-component @conversationSelected="changeActiveConversation($event)"
                                    :conversations="conversations"></contact-list-component>
        </b-col>
        <b-col cols="9" md="8">
            <active-conversation-component
                v-if="selectedConversarion"
                :contact-id="selectedConversarion.contact_id"
                :contact-name="selectedConversarion.contact_name"
                :messages="messages"
                @messageCreated="addMessage($event)">


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
               messages: [],
               conversations: []
            };
        },
        mounted() {
            this.getConversations();

            Echo.channel(`users.${this.userId}`)
		    .listen('MessageSent', (data) => {
                const message = data.message;		 
                message.written_By_Me = false;   	
                this.addMessage(message);
		    });
        },
        methods: {
           changeActiveConversation(conversation){
               this.selectedConversarion = conversation;
               this.getMessages();
           },
           getConversations(){
                axios.get('/api/conversations')
                .then((response) => {
                    this.conversations = response.data;
                });
            },
           getMessages()
            {
                axios.get(`/api/messages?contact_id=${this.selectedConversarion.contact_id}`)
                .then((response) => 
                {
                    this.messages= response.data;
                                    });
            },
            addMessage(message){
                
                const conversation = this.conversations.find(function(conversation){
                    return conversation.contact_id == message.from_id 
                            || conversation.contact_id == message.to_id;
                });

                const author = this.userId === message.from_id ? 'Tú' : conversation.contact_name;
                conversation.last_message = `${author}: ${message.content}`;
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + 
                today.getSeconds();
                var dateTime = date+' '+time;
                conversation.last_time = dateTime;

                if(this.selectedConversarion.contact_id == message.from_id
                    || this.selectedConversarion.contact_id == message.to_id){
                    this.messages.push(message);
                }
            }
        }
    }
</script>
