<template>
  <div class="bg-white q-pa-md">
      <div class="text-h4 text-center q-mt-lg">Fun With AI</div>
      <q-card-section>
        <q-form autofocus id="basic-login-form" @submit="onSubmit">
      <q-card-section>
        <div>
        <label>Enter Prompt*</label>
        <q-input
          outlined
          dense
          ref="prompt"
          v-model="prompt"
          name="prompt"
          type="textarea"
          :error="v$.prompt.$error"
          :error-message="errorFieldName(this.v$.prompt, 'Prompt')"
        />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none" style="justify-content:right;display: flex;flex-direction: column">
        <q-btn
          unelevated
          no-caps
          color="primary"
          type="submit"
          label="Submit"
        />
      </q-card-section>
    </q-form>
      </q-card-section>

    <q-card-section>
      <div class="text-h6 text-left q-mb-md">Responses</div>
      <div class="bg-grey-2 q-pa-md q-mb-md" v-for="(responseObj,index) in responses.slice().reverse()" :key="index">
        <span>Prompt: </span> {{responseObj.Prompt}} <br/>
        <span>Response: </span> {{responseObj.Response}}
      </div>
    </q-card-section>
  </div>
</template>

<script>
import { errorsMixin } from '../mixins/errorsMixins'
import { toastMessageMixins } from 'src/mixins/toastMessageMixins'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { createCompletion } from '../services/openAI'
export default {
  name: 'Fun With AI',
  mixins: [errorsMixin, toastMessageMixins],
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  data () {
    return {
      prompt: undefined,
      responses: []
    }
  },
  validations () {
    return {
      prompt: {
        required
      }
    }
  },
  mounted () {
    if (localStorage.getItem('responses')) {
      this.responses = JSON.parse(localStorage.getItem('responses'))
    }
  },
  methods: {
    onSubmit () {
      this.v$.prompt.$touch()
      if (!this.v$.$invalid) {
        const queryData = {
          prompt: this.prompt
        }
        createCompletion('text-curie-001', queryData).then(responseData => {
          this.responses.push({ Prompt: this.prompt, Response: responseData.data.choices.map(value => value.text).join('\r\n') })
          localStorage.setItem('responses', JSON.stringify(this.responses))
        }).catch(error => {
          this.handleError(error)
        })
      }
    }
  }
}
</script>
