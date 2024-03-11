## Building Gemini AI with Vue: A Comprehensive Guide

### Introduction

Gemini AI is a powerful open-source chatbot framework that enables developers to create intelligent and interactive conversational interfaces. This guide will provide a comprehensive overview of how to build a Gemini AI bot using Vue, a popular JavaScript framework for building reactive user interfaces and Gemini API.

### Prerequisites

- Basic knowledge of Vue and JavaScript

### Gemini AI Common use cases

Gemini API has different model for different implementations:

- Generate text from text-only input
- Generate text from text-and-image input (multimodal)
- Build multi-turn conversations (chat)

The generate text from text-only input is the implementation we'll be working on in the first part of this article.

### Step 1: Create a new Vue project

Let's create a new Vue project using the following command:
`vue create gemini-vue-web-app`

### Step 2: Install Gemini AI

Install the Gemini AI library using npm:
`npm i @google/generative-ai `

### Step 3: Creating Gemini API key

To use the Gemini API, you'll need an API key. If you don't already have one, create a key in Google AI Studio.
[Get an API key](https://aistudio.google.com/app/apikey)

We'll be needing two components which are:

- GeminiAI - which will house our question form field and also our AIAnswer component.
- AIAnswer - this is where our answer will be rendered. Nothing to serious here. Smiles.

### GeminiAI component

```vue
<template>
  <h1 class="mb-5">Hello i'm Gemini AI, ask me anything</h1>

  <form class="mb-5" @submit.prevent="fetchAnswer">
    <div>
      <textarea name="question" id="question" cols="30" rows="10" v-model="question"></textarea>
    </div>
    <button type="submit" :disabled="!question">
      {{ `${isLoading ? 'asking gemini...' : 'Ask'}` }}
    </button>
  </form>

  <div class="mb-10">
    <AIAnswer :answer="answer" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGetGenerativeModelGP } from '../composables/useGetGenerativeModelGP.js'
import AIAnswer from '../components/AIAnswer.vue'

const question = ref('')
const answer = ref('')
const isLoading = ref(false)

const fetchAnswer = async () => {
  answer.value = ''
  isLoading.value = true

  try {
    answer.value = await useGetGenerativeModelGP(question.value)
  } catch (error) {
    console.log({ error })
  } finally {
    isLoading.value = false
    question.value = ''
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
```

Let's breakdown the GeminiAI component:
- Inside our **template tag** we have 3 direct children elements, which are: h1, form and a div that has AIAnswer component as a child.
- **script tag** - we are buiding with vue composition api so our script tag will take a **setup attribute**.

We are importing __ref__ from vue, __useGetGenerativeModelGP__ composable (which we'll talk about later) from our composables folder and lastly our AIAnswer component.
We have **3 reactive  states and a function** - question, answer, isLoading and fetchAnswer.
- **fetchAnswer function** - Our function when called, call the **useGetGenerativeModelGP composable**
- **useGetGenerativeModelGP** is an exported function
```
import {useGenAi} from './useGenAi.js'

export const useGetGenerativeModelGP = async (prompt) => {

    const model = await useGenAi('gemini-pro');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
}
```
where we are importing another composable named useGenAi, vue allows us to import composables in a composable file so we are taking advantage of that.

Here is what our **useGenAi** file looks like 
```
import { GoogleGenerativeAI } from '@google/generative-ai'

export const useGenAi = async (modelType) => {
  const VITE_GOOGLE_AI_STUDIO_API_KEY = import.meta.env.VITE_GOOGLE_AI_STUDIO_API_KEY

  const genAI = new GoogleGenerativeAI(VITE_GOOGLE_AI_STUDIO_API_KEY)
  const model = genAI.getGenerativeModel({ model: modelType })

  return model
}
```

we import GoogleGenerativeAI we installed earlier, create a useGenAi function that takes modelType parameter.

- Inside our **useGenAi** function we have, **VITE_GOOGLE_AI_STUDIO_API_KEY** variable where we assigned our generated API KEY to.
*Note*: we created a .env file in our root folder, where we stored our API Key and value.
**genAI** variable where we are calling a new GoogleGenerativeAI object with our API KEY.
Our **model** call, **genAI.getGenerativeModel**. Then we return model.

Back to our **useGetGenerativeModelGP** , we have variables namely:
 **model** - awaiting the useGenAi call response, the **useGenAi** takes in an argument **gemini-pro** which is our type of **Gen AI model**.
**result** - awaiting the model.generateContent(prompt) response, the prompt we are passing as an arguement is the text our users will input.
**response** - also awaits result.response and **text** - where we assign our text function call from the response variable.

Then finally we return text, which is the answer our users will be seeing.

### AIAnswer Component
```
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
```

### Step 6: Create Render Template In the `App.vue` file, add the `Chat` and `MessageList` components to the render template: `html <template> <div> <Chat /> <MessageList /> </div> </template> `

### Step 7: Run the Application Run the Vue application using the following command: `npm run dev`

### Conclusion:

#### By following the steps outlined in this guide, you have successfully built a basic Gemini AI text prompt with Vue 3. Gemini AI provides a powerful platform for creating intelligent conversational interfaces that can engage users and provide valuable assistance.
