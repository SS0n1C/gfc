<template>
  <div ref="wrapper" class="scratch-wrapper">
    <canvas ref="canvas" :width="width" :height="height" />
    <div class="content" :style="{ width: width + 'px', height: height + 'px' }">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineExpose } from 'vue'

const props = defineProps({
  width: { type: Number, default: 300 },
  height: { type: Number, default: 120 },
  brush: { type: Number, default: 25 },
  threshold: { type: Number, default: 50 },
})

const emit = defineEmits(['completed'])

const canvas = ref(null)
let ctx, drawing = false, revealed = false

const draw = (x, y) => {
  ctx.globalCompositeOperation = 'destination-out'
  ctx.beginPath()
  ctx.arc(x, y, props.brush, 0, Math.PI * 2)
  ctx.fill()
}

const percentCleared = () => {
  const { data } = ctx.getImageData(0, 0, props.width, props.height)
  let cleared = 0
  for (let i = 3; i < data.length; i += 4) if (data[i] === 0) cleared++
  return (cleared / (props.width * props.height)) * 100
}

const handle = e => {
  if (!drawing || revealed) return
  const rect = canvas.value.getBoundingClientRect()
  const x = (e.touches?.[0]?.clientX ?? e.clientX) - rect.left
  const y = (e.touches?.[0]?.clientY ?? e.clientY) - rect.top
  draw(x, y)
  if (percentCleared() > props.threshold) {
    revealed = true
    emit('completed')
  }
}

const revealAll = () => {
  if (!ctx) return
  ctx.clearRect(0, 0, props.width, props.height)
  revealed = true
}

defineExpose({ revealAll })

onMounted(() => {
  ctx = canvas.value.getContext('2d', { willReadFrequently: true })
  const image = new Image()
  image.src = '/scratchCard.jpg' 

image.onload = () => {
  ctx.drawImage(image, 0, 0, props.width, props.height)
}

  const c = canvas.value
  c.addEventListener('mousedown', () => (drawing = true))
  c.addEventListener('mouseup', () => (drawing = false))
  c.addEventListener('mousemove', handle)
  c.addEventListener('touchstart', () => (drawing = true))
  c.addEventListener('touchend', () => (drawing = false))
  c.addEventListener('touchmove', handle)
})
</script>

<style scoped lang="scss">
.scratch-wrapper {
  text-shadow: 2px 2px 3px $brown;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  display: inline-block;
  background:linear-gradient(180deg,#aaa,#666);
  background-blend-mode: overlay;
  filter:brightness(1.1) contrast(1.2);
  border-radius:12px;
  @include font($playFair,400,18px,20px,$gold);
  border:1.5px rgba(39, 39, 150, 0.395) solid;
  box-shadow: 10px 10px 10px black;
  text-shadow: #666;
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  touch-action: none;
  border-radius:12px;
  

}
.content {
  z-index: 1;
  position: relative;
  @include flex
}
</style>