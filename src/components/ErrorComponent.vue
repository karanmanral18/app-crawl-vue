<template>
  <small v-if="hasError" :class="errorClass">{{ errorMessage }}</small>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
name: "ErrorComponent",
  props: {
    errors: {
      type: Object,
    },
    validationError: {
      type: [Object],
    },
    errorClass: {
      type: String,
      default: 'text-danger',
    },
    validationKey: {
      type: String,
      required: true
    },
  },
  computed: {
    hasError() {
      return this.errors?.[this.validationKey] || this.validationError;
    },
    errorMessage() {
      const serverError = this.errors?.[this.validationKey]?.[0];
      const clientError = this.validationError?.$errors?.[0]?.$message;
      
      return clientError || serverError  || '';
    },
  },
})
</script>
