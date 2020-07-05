<template>
    <a class="emoji-item">
        {{data.name}}
    </a>
</template>

<script>
export default {
    name: 'MenheraEmoji',
    props: {
        data: { 
            type: Object 
        },
    },
}
</script>
