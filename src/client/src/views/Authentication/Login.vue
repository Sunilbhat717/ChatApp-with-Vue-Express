<template>
  <Panel title="Log In" :align="align">
    <!-- Using template for named slots to work -->
    <template v-slot:form-container>
      <v-form class="mx-3" ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :counter="50"
          :rules="emailRules"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :counter="25"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="deep-purple accent-4"
          elevation="2"
          :dark="valid"
        
          class="mr-4 my-4"
          @click="validate"
        >
          Login
        </v-btn>

        <v-btn
          elevation="2"
          color="pink darken-1"
          dark
          class="mr-4 my-4"
          :to="{
            name: 'SignUp',
          }"
        >
          SignUp
        </v-btn>
      </v-form>
    </template>
  </Panel>
</template>

<script>
import Panel from "../../components/Panel";
export default {
  data: () => ({
    valid: true,
    email: "",
    align:"center",
    emailRules: [
      (v) => !!v || "Username is required",
      (v) => /.+@.+\..+/.test(v) || "Username must be valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length >= 8) || "Password must be greater than 8 characters",
      (v) =>
        (v && v.length <= 50) || "Password must be less than 50 characters",
    ],
  }),
  components: {
    Panel,
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>