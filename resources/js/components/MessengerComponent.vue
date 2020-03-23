<template>
    <div>
        <b-row no-gutters class="h-100">
        <b-col cols="3" md="4">
            <b-form class=" my-3 mx-2">
                <b-form-input
                class="text-center"
                type="text"
                placeholder="Buscar Contacto..."
                v-model="querySearch"
                >
                </b-form-input>
            </b-form>
            <contact-list-component @conversationSelected="changeActiveConversation($event)"
                                    :conversations="conversationsFiltered"></contact-list-component>
        </b-col>
        <b-col cols="9" md="8">
            <active-conversation-component
                v-if="selectedConversarion"
                :contact-id="selectedConversarion.contact_id"
                :contact-name="selectedConversarion.contact_name"
                :contact-image="selectedConversarion.contact_image"
                :messages="messages"
                :my-image="MyImageUrl"
                @messageCreated="addMessage($event)">


            </active-conversation-component>
        </b-col>
    </b-row>
    </div>
        
</template>

<script>
    export default {
        props: {
            user : Object
        },
        data(){
            return{
               selectedConversarion: null,
               messages: [],
               conversations: [],
               querySearch: ''
            };
        },
        mounted() {
            this.getConversations();

            Echo.private(`users.${this.user.id}`)
		    .listen('MessageSent', (data) => {
                const message = data.message;		 
                message.written_By_Me = false;   	
                this.addMessage(message);
            });
            
            
            Echo.join(`messenger`)
		    .here((users) => {
                console.log(users);
                users.forEach(user =>
                this.changeStatus(user, true));
            })
            .joining(
                user => 
                this.changeStatus(user,true)
            )
            .leaving(
                user =>
                 this.changeStatus(user,false)
            );
            
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
           getMessages(){
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

                const author = this.user.id === message.from_id ? 'Tú' : conversation.contact_name;
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
            },
            changeStatus(user, status){
                
                const index = this.conversations.findIndex((conversation) => {
                    return conversation.contact_id == user.id;
                });
                if(index >= 0)
                    this.$set(this.conversations[index], 'online', status );
            }
        },
        computed:{
            conversationsFiltered(){

                return this.conversations.filter(
                    (conversations) => conversations.contact_name
                    .toLowerCase()
                    .includes(this.querySearch)
                    );
            },
            MyImageUrl(){
                return `/users/${this.user.image}`;
            }
        }
    }
</script>
