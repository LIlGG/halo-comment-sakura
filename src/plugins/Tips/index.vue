<template>
<div v-show="show" class="butterBar butterBar-center">
    <p class="butterBar-message" v-html="message">
    </p>
    </div>
</template>

<script>
export default {
    name: 'tips',
    props: {
        message: {
            type: String,
            default: '',
        }
    },
    data() {
        return {
            show: false
        }
    }
}
</script>