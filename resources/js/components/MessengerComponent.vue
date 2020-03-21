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
                :contact-name="selectedConversarion.contact_name">

            </active-conversation-component>
        </b-col>
    </b-row>
    </div>
        
</template>

<script>
    export default {
        data(){
            return{
               selectedConversarion: null
            };
        },
        mounted() {
           
        },
        methods: {
           changeActiveConversation(conversation){
               this.selectedConversarion = conversation;
               console.log('nueva conversaion seleccionada', conversation);
           }
        }
    }
</script>
