<template>
         <b-list-group-item :variant="variant">
            <b-row class="p-2" align-h="center">
                <b-col cols="12" md="3" class="text-center">
                    <b-img rounded="circle" blank blank-color="#ccc" width="60" height="60" alt="placeholder"></b-img>
                   <!-- <b-img src="https://picsum.photos/125/125/?image=58" width="60" height="60" rounded="circle" alt="Circle image"></b-img>
                    -->
                </b-col>
                <b-col cols="6" align-self="center" class="d-none d-md-block">
                    <p class="mb-1">{{conversation.contact_name}}</p>
                    <p class="text-muted small mb-0">{{conversation.last_message}}</p>
                </b-col>
                <b-col cols="3" class="d-none d-md-block">
                    <p class="text-muted small ">{{conversation.last_time}}</p>
                </b-col>
            </b-row>
        </b-list-group-item>
</template>

<script>
    export default {
        props:{
            variant: String,
            conversation: Object
        },
        data(){
            return{
                name : 'Juan Lopez',
                lastMessage: 'Tu: Hasta luego..',
                lastTime: '1:37 pm',
                variant: 'dark'
            };  
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
