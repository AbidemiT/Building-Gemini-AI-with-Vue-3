<template>
    <div>
        <h1 class="mb-5">Hello i'm Gemini AI, ask me about images</h1>

        <form class="mb-5" @submit.prevent="fetchAnswer">
            <div>
                <textarea name="question" id="question" cols="30" rows="10" v-model="question"></textarea>
            </div>
            <div>
                <input required type="file" name="image" id="image" ref="img" @change="selectedImg">
            </div>
            <button type="submit" :disabled="!question">{{ `${isLoading ? 'asking gemini...' : 'Ask'}` }}</button>
        </form>

        <div v-if="imgUrl">
            <img :src="imgUrl" height="200" alt="Image preview" />
        </div>

        <div class="mb-10">
            <AIAnswer :answer="answer"/>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGetGenerativeModelGPV } from '../composables/useGetGenerativeModelGPV.js';
import AIAnswer from "../components/AIAnswer.vue";

const question = ref('');
const img = ref(null);
const imgUrl = ref('');
const imgFiles = ref(null);
const answer = ref('');
const isLoading = ref(false);

const fetchAnswer = async () => {
    answer.value = '';
    isLoading.value = true;

    try {
        answer.value = await useGetGenerativeModelGPV(question.value, imgFiles.value);
    } catch (error) {
        console.log({ error });
    } finally {
        isLoading.value = false;
        question.value = '';
    }
}

const selectedImg = () => {

    if (img.value.files && img.value.files[0]) {
    const reader = new FileReader
    reader.addEventListener('load', () => {
        imgUrl.value = reader.result;
    })

    reader.readAsDataURL(img.value.files[0]);
     
    imgFiles.value = img.value.files
}

}
</script>

<style lang="scss" scoped>
.mb-5 {
    margin-bottom: 5rem;
}
.mb-10 {
    margin-bottom: 10rem;
}
</style>