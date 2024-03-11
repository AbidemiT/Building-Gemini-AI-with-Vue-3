<template>
    <div>
        <p v-if="answer">{{ answer }}</p>
    </div>
</template>

<script setup>
    defineProps({
        answer: {
            type: String,
            default: "Answer will be displayed here."
        }
    })
</script>

<style lang="scss" scoped>

</style>