<script setup lang="ts">
import { reactive,watch } from 'vue'
import gsap from 'gsap'

const d = reactive({
    num: 0
})

const props = defineProps({
    value:{
        type:Number,
        defaut:0
    }
})

function AnimateToValue(){
    gsap.to(d,{
        duration:0.5,
        num:props.value
    })
}

AnimateToValue()

watch(()=>props.value,()=>AnimateToValue())
</script>

<template>
     <div>{{ d.num.toFixed(0) }}</div>
</template>

<style scoped></style>