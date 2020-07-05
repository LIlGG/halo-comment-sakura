<template>
<div v-show="show" class="butterBar butterBar--center">
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

<style lang="scss" scoped>
.butterBar {
    position: fixed;
    text-align: center;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 10000
}

.butterBar--center {
    margin: auto
}

.butterBar-message {
    background: #FE9600;
    color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    display: inline-block;
    font-size: 14px;
    margin-bottom: 0;
    padding: 12px 25px;
    z-index: 10000;
    margin-top: -4px
}
</style>
