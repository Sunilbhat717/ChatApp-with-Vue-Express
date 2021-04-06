<template>
<div>
<v-alert dense outlined type="error" align="center" v-if="error"> {{errorMsg }}</v-alert>
  <Panel title="Sign Up" align="">
    <!-- Using template for named slots to work -->
    <template v-slot:form-container>
      <v-form class="mx-3" ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :counter="15"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="username"
          :counter="50"
          :rules="usernameRules"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :counter="50"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :counter="25"
          :rules="passwordRules"
          label="Password"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          required
        ></v-text-field>

        <v-text-field
          v-model="confirmPassword"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :counter="25"
          :rules="[(password === confirmPassword) || 'Password mismatch.']"
          label="Confirm password"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="deep-purple accent-4"
          elevation="2"
          :dark="valid"
          class="mr-4 my-4"
          @click="signup"
        >
          SignUp
        </v-btn>

        <v-btn
          elevation="2"
          color="pink darken-1"
          dark
          class="mr-4 my-4"
          :to="{
            name: 'LogIn',
          }"
        >
          Login
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
    error:false,
    valid: true,
    show:false,
    show1:false,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 15 && v.length >= 3) || "Name must be valid",
    ],
    username: "",
    usernameRules:[
      (v) => !!v || "Username is required",
      (v) => (v && v.length <= 50 && v.length >= 3 && /^[a-zA-z0-9]+$/.test(v)) || "Username must be valid",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "Email id is required",
      (v) => /.+@.+\..+/.test(v) || "Email id must be valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length >= 8) || "Password must be greater than 8 characters",
      (v) =>
        (v && v.length <= 25) || "Password must be less than 25 characters",
    ],
    confirmPassword:""
  }),
  components: {
    Panel,
  },
  methods: {
    async signup() {
      try {
        if (!this.$refs.form.validate()) {
          return;
        }

        const response = await AuthenticationService.register({
          name: this.name,
          email: this.email,
          username: this.username,
          password: this.password,
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$router.push({
          name: "LogIn",
        });
      } catch (err) {
        this.error = true
        this.errorMsg = err.response.data.error;
      }
    }
  },
};
</script>