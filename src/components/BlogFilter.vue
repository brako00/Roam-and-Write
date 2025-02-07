<script setup lang="ts">
import { ref } from 'vue'
import { initialBlogFilter, type blogFilter } from '@/types'
import { useBlogsStore } from '@/stores/blogs'
import Accordion from 'primevue/accordion'
import AccordionHeader from 'primevue/accordionheader'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionContent from 'primevue/accordioncontent'
import InputText from 'primevue/inputtext'
import DatePicker from 'primevue/datepicker'
import Button from 'primevue/button'

const filter = ref({} as blogFilter)
const blogsStore = useBlogsStore()

const filterBlogs = () => {
  filter.value = { ...initialBlogFilter, ...filter.value }
  blogsStore.fetchFilteredBlogs(filter.value)
}

const resetFilter = () => {
  filter.value = {} as blogFilter
  blogsStore.fetchBlogs()
}
</script>

<template>
  <div class="m-4 border border-gray-700-2 shadow-md rounded-lg">
    <Accordion value="0">
      <AccordionPanel value="0">
        <AccordionHeader>Filter</AccordionHeader>
        <AccordionContent>
          <div class="grid gap-4 p-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            <div class="field-wrap">
              <label for="filter-username">Author</label>
              <InputText v-model="filter.username" id="filter-username" />
            </div>

            <div class="field-wrap">
              <label for="filter-title">Title</label>
              <InputText v-model="filter.title" id="filter-title" />
            </div>

            <div class="field-wrap">
              <label for="filter-location">Location</label>
              <InputText v-model="filter.location" id="filter-location" />
            </div>

            <div class="field-wrap">
              <label for="filter-startDate">Start date</label>
              <DatePicker v-model="filter.dateStart" showIcon id="filter-startDate" />
            </div>

            <div class="field-wrap">
              <label for="filter-endDate">End date</label>
              <DatePicker v-model="filter.dateEnd" show-icon id="filter-endDate" />
            </div>
          </div>
          <div class="m-4">
            <Button @click="filterBlogs" label="Apply" severity="success" class="mr-4" />
            <Button @click="resetFilter" label="Clear" severity="danger" />
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>
