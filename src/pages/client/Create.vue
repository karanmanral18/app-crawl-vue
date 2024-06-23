<script setup lang="ts">
import { ToastService } from '../../services/toastNotification.service';
import { LoaderService } from '../../services/loader.service';
import { ClientService } from '../../services/client.service';
import { useVuelidate } from '@vuelidate/core'
import { email, maxLength, minLength, required, integer} from '@vuelidate/validators'
import { container } from '../../container/container';
import { computed, reactive } from 'vue';
import ErrorComponent from '../../components/ErrorComponent.vue'
import { useRouter } from 'vue-router';

const loadingService = container.resolve(LoaderService)
const toastService = container.resolve(ToastService) as ToastService
const clientService = container.resolve(ClientService) as ClientService

const router = useRouter();
const clientForm = reactive({
    name: '',
    email: '',
    cin: null,
    pin: null as null | string,
})

const v$ = useValidation(clientForm)

function useValidation(formData: any) {
    const validationRules = computed(() => ({
        email: {
            required,
            email
        },
        name: {
            required,
        },
        cin: {
            required,
            integer,
            minValue: minLength(21),
            maxValue: maxLength(21),
        },
        pin: {
            required,
            integer,
            minValue: minLength(6),
            maxValue: maxLength(6),
        },
    }))
    return useVuelidate(validationRules, formData)
}

async function createClient() {
    const loader = await loadingService.show()
    try {
        await clientService.createClient(clientForm);
        router.push({name : 'clients'})
        toastService.success('Client created successfully!');
    } catch (error: any) {
        if (error.isAxiosError) {
            if (error.response.status == 409) {
                toastService.error(error.response.data.message);
            }
            else {
                toastService.error('Something went wrong! Please try again');
            }
        }
    } finally {
        await loader.hide()
    }
}

</script>
<template>

    <header class="container-fluid py-3 py-lg-4 d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-between w-100">
            <h1 class="m-0 fw-semibold">Add new client</h1>
            <router-link :to="{ name: 'clients' }" class="d-inline-block header-main">
                <button class="btn btn-primary">Home Page</button>
            </router-link>
        </div>
    </header>
    <section class="mid-section d-flex flex-column">
        <div class="mid-info container-fluid py-4">
            <div class="mt-3 row">
                <div class="mb-3">
                    <label for="" class="mb-2 lh-sm small">Name<span class="text-danger">*</span></label>
                    <input type="text" name="" id="" class="form-control" placeholder="Enter name"
                        v-model="v$.name.$model">
                    <ErrorComponent validationKey="name" :validationError="v$.name" />
                </div>
                <div class="mb-3">
                    <label for="" class="mb-2 lh-sm small">Email<span class="text-danger">*</span></label>
                    <input type="text" name="" id="" class="form-control" placeholder="Enter email"
                        v-model="v$.email.$model">
                    <ErrorComponent validationKey="email" :validationError="v$.email" />
                </div>
                <div class="mb-3">
                    <label for="" class="mb-2 lh-sm small">CIN<span class="text-danger">*</span></label>
                    <input type="text" name="" id="" class="form-control" placeholder="Enter CIN"
                        v-model="v$.cin.$model">
                    <ErrorComponent validationKey="cin" :validationError="v$.cin" />
                </div>
                <div class="mb-3">
                    <label for="" class="mb-2 lh-sm small">PIN<span class="text-danger">*</span></label>
                    <input type="text" name="" id="" class="form-control" placeholder="Enter PIN"
                        v-model="v$.pin.$model">
                    <ErrorComponent validationKey="pin" :validationError="v$.pin" />
                </div>
                <div class="mb-3 mt-4">
                    <input class="btn btn-primary" type="submit" value="Create Client" @click.prevent="createClient()"
                        :disabled="v$.$invalid">
                </div>
            </div>
        </div>
    </section>
</template>
