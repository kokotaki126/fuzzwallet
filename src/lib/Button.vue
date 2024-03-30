<template>
  <div
    class="v-btn"
    :disabled="loading || disabled"
    :class="{
      loading,
      frame,
      disabled,
    }"
    @click.stop="clickHandler"
  >
    <font-awesome-icon
      icon="fa-solid fa-spinner"
      class="animate-spin"
      v-if="loading"
    ></font-awesome-icon>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    disabled: Boolean,
    loading: Boolean,
    frame: Boolean,
  });
  const emits = defineEmits(['click']);

  const clickHandler = () => {
    if (props.disabled || props.loading) return;
    emits('click');
  };
</script>

<style lang="less" scoped>
  .v-btn {
    @apply border-2px border-solid border-black;
    @apply flex items-center justify-center gap-4;
    @apply w-fit text-black font-bold cursor-pointer;
    @apply p-4 py-2 transition-all;
    @apply bg-primary rounded-2 select-none;
    font-size: initial;

    &.frame {
      &:hover {
        @apply bg-secondary text-white;
        box-shadow: 0 0;
      }
    }

    &:hover {
      @apply lg:bg-accent lg:text-white lg:shadow-none;
    }

    &:active {
      box-shadow: 0 0;
      transform: translate(4px, 4px);
    }

    &.loading,
    &.disabled {
      @apply cursor-not-allowed;
      box-shadow: 0 0;
      filter: contrast(0.5);

      &:hover {
        @apply lg:bg-primary lg:text-black;
      }

      &:active {
        transform: translate(0, 0);
      }
    }
  }
</style>

