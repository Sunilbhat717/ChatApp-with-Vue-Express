<template>
<div>
  <v-alert dense outlined type="error" align="center" v-if="error"> {{errorMsg }}</v-alert>

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
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :counter="25"
          :rules="passwordRules"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          label="Password"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="deep-purple accent-4"
          elevation="2"
          :dark="valid"
          class="mr-4 my-4"
          @click="login"
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
</div>
</template>

<script>
import Panel from "../../components/Panel";
import AuthenticationService from "../../services/AuthenticationService";
export default {
  data: () => ({
    valid: true,
    show:false,
    email: "",
    align: "center",
    error: false,
    errorMsg:"",
    emailRules: [
      (v) => !!v || "Username is required",
      (v) => (v && v.length <= 50 && v.length >= 3) || "Username must be valid",
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
    async login() {
      try {
        if (!this.$refs.form.validate()) {
          return;
        }

        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$router.push({
          name: "SignUp",
        });
      } catch (err) {
        this.error = true
        this.errorMsg = err.response.data.error;
      }
    },
  },
};
</script>