<template>
    <div>
        <h1>Это страница пользователя: {{this.$route.params.id}}</h1>
    </div>
</template>


<script>
import router from '@/router';
export default (await import('vue')).defineComponent({
    mounted() {
        console.log(router);
    },
})
</script>
