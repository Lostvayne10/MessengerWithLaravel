<template>
    <b-row class="h-100">
        <b-col cols="12" md="8">
            <b-card
                footer-bg-variant="light"
                footer-border-variant="dark"
                title="Conversacion Activa"
                class="h-100"
                >

                <b-card-text>
                    <message-conversation-component 
                    v-for="message in messages" 
                    :key="message.id" 
                    :writtenByMe ="message.written_By_Me" >
                        {{ message.content }}
                    </message-conversation-component>
                </b-card-text>

                <div slot="footer">
                     <b-form class="mb-0" @submit.prevent="postMessages" autocomplete="off">
                        <b-input-group>
                            <b-form-input class="text-center"
                                type="text"
                                v-model="newMessage"
                                placeholder="Escribe un mensaje ..."
                                >
                                </b-form-input>
                            <b-input-group-append>
                                <b-button type="submit" variant="primary">Enviar</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form>
                </div>

            </b-card>
        </b-col>
        <b-col cols="4" class="d-none d-md-block">
             <b-img rounded="circle" blank blank-color="#ccc" width="60" height="60" alt="placeholder"></b-img>
        <!--<b-img src="https://picsum.photos/125/125/?image=58" width="60" height="60" rounded="circle" alt="Circle image"></b-img>
        -->
        <p>Usuario Seleccionado</p>
        <hr>
        <b-form-checkbox>
            Desactivar notificaciones
        </b-form-checkbox>
        </b-col>
    </b-row>
</template>

<script>
export default {
        data(){
            return{
                messages: [],
                newMessage: '',
                contactId: 2
            };
        },
        mounted() {
            this.getMessages();
        },
        methods: {
            getMessages()
            {
                
                
                
                axios.get(`/api/messages?contact_id=${this.contactId}`)
                .then((response) => 
                {
                    this.messages= response.data;
                                    });
            },
            postMessages(){
                const params = {
                    to_id: 2,
                    content: this.newMessage
                }
                axios.post('/api/messages', params)
                .then((response) => {
                   if(response.data){
                    this.newMessage = '';
                    this.getMessages();
                   }
                   else{

                   }
                });
            }
        }
    }
</script>