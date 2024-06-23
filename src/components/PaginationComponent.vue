<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PaginationComponent'
})
</script>

<script setup lang="ts">
import { computed } from 'vue'
const emit = defineEmits(['page-changed'])
const props = defineProps({
  totalRows: {
    required: true,
    type: Number
  },
  perPage: {
    type: Number,
    default: 10
  },
  currentPage: {
    type: Number,
    default: 1
  }
})
const visiblePageCount = 4
const totalPages = computed(() => Math.ceil(props.totalRows / props.perPage))
const visiblePages = computed(() => {
  let maxVisiblePages = Math.min(visiblePageCount, totalPages.value)
  let startPage: number
  let endPage: number
  if (props.currentPage >= 4) {
    maxVisiblePages = 3
    startPage = props.currentPage - 1
    endPage = props.currentPage + 1
  } else {
    startPage = 1
    endPage = Math.min(maxVisiblePages, totalPages.value)
  }
  if (props.currentPage === totalPages.value) {
    startPage = Math.max(props.currentPage - maxVisiblePages, 1)
    endPage = props.currentPage
  }
  if (totalPages.value - props.currentPage < 3) {
    startPage = Math.max(totalPages.value - 3, 1)
    endPage = totalPages.value
  }
  if (props.currentPage === 4 && totalPages.value === 4) {
    startPage = 1
    endPage = totalPages.value
  }
  if (totalPages.value === 0) {
    startPage = 1
    endPage = 1
  }
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
})

const pageOptions = computed(() => {
  let displayMorePageOption = true
  if (
    props.currentPage === totalPages.value ||
    totalPages.value <= 4 ||
    totalPages.value - props.currentPage < 3
  ) {
    displayMorePageOption = false
  }
  return displayMorePageOption
})

function goToPage(pageNumber: number) {
  emit('page-changed', pageNumber)
}

function previousPage() {
  if (props.currentPage > 1) {
    emit('page-changed', props.currentPage - 1)
  }
}

function nextPage() {
  if (props.currentPage < totalPages.value) {
    emit('page-changed', props.currentPage + 1)
  }
}
</script>

<template>
  <ul class="pagination m-0">
    <li class="page-item">
      <a class="page-link" @click="goToPage(1)" :disabled="currentPage === 1"
        ><span aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M11.727 12L12.667 11.06L9.61366 8L12.667 4.94L11.727 4L7.72699 8L11.727 12Z"
              fill="#5F6D7E"
            />
            <path
              d="M7.33344 12L8.27344 11.06L5.2201 8L8.27344 4.94L7.33344 4L3.33344 8L7.33344 12Z"
              fill="#5F6D7E"
            />
          </svg> </span
      ></a>
    </li>
    <li class="page-item">
      <a
        class="page-link"
        @click="previousPage"
        :disabled="currentPage === 1"
        aria-label="Previous"
      >
        <span aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M11.727 12L12.667 11.06L9.61366 8L12.667 4.94L11.727 4L7.72699 8L11.727 12Z"
              fill="#5F6D7E"
            />
          </svg>
        </span>
      </a>
    </li>

    <li class="page-item">
      <span
        class="page-link"
        v-if="(currentPage >= 4 && totalPages !== 4) || (currentPage === 3 && totalPages === 5)"
        :disabled="true"
        >&#8230;</span
      >
    </li>
    <li class="page-item" v-for="pageNumber in visiblePages" :key="pageNumber">
      <a
        class="page-link"
        @click="goToPage(pageNumber)"
        :class="{ active: currentPage === pageNumber }"
      >
        {{ pageNumber }}
      </a>
    </li>
    <li class="page-item">
      <span class="page-link" v-if="pageOptions" :disabled="true">&#8230;</span>
    </li>

    <li class="page-item">
      <a
        class="page-link"
        @click="nextPage"
        :disabled="currentPage === totalPages || totalPages === 0"
        aria-label="Next"
      >
        <span aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4.27301 4L3.33301 4.94L6.38634 8L3.33301 11.06L4.27301 12L8.27301 8L4.27301 4Z"
              fill="#5F6D7E"
            />
          </svg>
        </span>
      </a>
    </li>
    <li class="page-item">
      <a
        class="page-link"
        @click="goToPage(totalPages)"
        :disabled="currentPage === totalPages || totalPages === 0"
        ><span aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4.27301 4L3.33301 4.94L6.38634 8L3.33301 11.06L4.27301 12L8.27301 8L4.27301 4Z"
              fill="#5F6D7E"
            />
            <path
              d="M8.66656 4L7.72656 4.94L10.7799 8L7.72656 11.06L8.66656 12L12.6666 8L8.66656 4Z"
              fill="#5F6D7E"
            />
          </svg> </span
      ></a>
    </li>
  </ul>
</template>
