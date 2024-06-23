<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue';
import { ClientInterface } from '../../interfaces/client.interface';
import { ClientService } from '../../services/client.service';
import { ToastService } from '../../services/toastNotification.service';
import { LoaderService } from '../../services/loader.service';
import { container } from '../../container/container';
import PaginationComponent from '../../components/PaginationComponent.vue';
import { useRouter } from 'vue-router';

const loadingService = container.resolve(LoaderService)
const toastService = container.resolve(ToastService) as ToastService
const clientService = container.resolve(ClientService) as ClientService

const clients = ref<ClientInterface[]>([]);
const pagination = ref({
  totalRows: 0,
  currentPage: 0,
  perPage: 10
})
const filters = reactive<any>({
  name: null,
  email: null,
  id: null,
  cin: null,
})
const router = useRouter();

onBeforeMount(fetchClients);

// Methods
async function fetchClients(pageNumber: number = 1) {
  const loader = await loadingService.show()
  try {
    const clientData = await clientService.getClientList({
      pageNumber: pageNumber,
      perPage: pagination.value.perPage,
      email: filters.email,
      name: filters.name,
      cin: filters.cin,
      id: filters.id
    });
    clients.value = clientData.clients.items;
    pagination.value.currentPage = clientData.clients.page;
    pagination.value.totalRows = clientData.clients.totalItems;
  } catch (error: any) {
    toastService.error('Something went wrong! Please try again');
  } finally {
    await loader.hide()
  }
}

async function resetFilters(filters: any) {
  for (const key in filters) {
    filters[key] = null;
  }
  await fetchClients();
}

async function handlePageChanged(pageNumber: number) {
  await fetchClients(pageNumber);
}

function editClient(client : ClientInterface) {
  router.push({name : 'edit-client',params: { clientId: client.id }})
}

function createClient() {
  router.push({name : 'create-client'})
}

async function deleteClient(client: ClientInterface) {
  const loader = await loadingService.show()
  try {
    await clientService.deleteClient(client.id);
    clients.value =  clients.value.filter(company => company.id !== client.id);
  } catch (error: any) {
    toastService.error('Something went wrong! Please try again');
  } finally {
    await loader.hide();
  }
}
</script>
<template>
  <header class="container-fluid py-3 py-lg-4 d-flex justify-content-between align-items-center">
    <h1 class="m-0 fw-semibold">Clients Management</h1>
  </header>

  <section class="mid-section d-flex flex-column">
    <div class="mid-info container-fluid py-4">
      <!-- Filters -->
       <div class="d-flex justify-content-between">
        <h4 class="m-0 fw-semibold">Search Filters</h4>
        <button @click.prevent="createClient" class="btn btn-primary">Create Client</button>
       </div>
      <div class="bg-white rounded p-3 mt-3">
        <div class="row">
          <div class="mb-3 col-md-6 col-lg-2">
            <label for="" class="mb-2 lh-sm small">Search by Client ID</label>
            <input type="text" name="name" class="form-control" placeholder="Search by Client ID" v-model="filters.id"
              @keyup.enter="fetchClients()" />
          </div>
          <div class="mb-3 col-md-6 col-lg-2">
            <label for="" class="mb-2 lh-sm small">Search by Name</label>
            <input type="text" name="name" class="form-control" placeholder="Search by Name" v-model="filters.name"
              @keyup.enter="fetchClients()" />
          </div>
          <div class="mb-3 col-md-6 col-lg-2">
            <label for="" class="mb-2 lh-sm small">Search by Email</label>
            <input type="text" name="name" class="form-control" placeholder="Search by Email" v-model="filters.email"
              @keyup.enter="fetchClients()" />
          </div>
          <div class="mb-3 col-md-6 col-lg-2">
            <label for="" class="mb-2 lh-sm small">Search by CIN</label>
            <input type="text" name="name" class="form-control" placeholder="Search by CIN" v-model="filters.cin"
              @keyup.enter="fetchClients()" />
          </div>
          <div class="col-md-6 col-lg-4 d-flex align-items-end mb-3">
            <button class="btn btn-primary" @click.prevent="fetchClients()">Search</button>
            <button type="reset" class="btn btn-secondary ms-2" @click="() => resetFilters(filters)">Reset</button>
          </div>
        </div>
      </div>

      <!-- Clients Listing -->
      <div class="table-responsive rounded my-4">
        <table class="table m-0 size-sm" width="100%" cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <th width="5%" class="text-left">ID</th>
              <th width="20%" class="text-left">Name</th>
              <th width="20%" class="text-left">Email</th>
              <th width="20%" class="text-left">CIN</th>
              <th width="20%" class="text-left">PIN</th>
              <th width="35%" class="text-left"></th>

            </tr>
          </thead>
          <tbody v-if="clients.length > 0">
            <tr v-for="client in clients" :key="client.id">
              <td>{{ client.id }}</td>
              <td>{{ client.name }}</td>
              <td>{{ client.email }}</td>
              <td>{{ client.cin }}</td>
              <td>{{ client.pin }}</td>
              <td>
                <svg @click.prevent="deleteClient(client)" width="120" height="31" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
                <svg @click.prevent="editClient(client)" width="120" height="31" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                </svg>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="8" class="text-center">
                No Data Found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="d-flex justify-content-center">
        <pagination-component v-if="pagination.totalRows > 0" :totalRows="pagination.totalRows"
          :perPage="pagination.perPage" :currentPage="pagination.currentPage" @page-changed="handlePageChanged"
          class="justify-content-center mt-3"></pagination-component>
      </div>
    </div>
  </section>
</template>
