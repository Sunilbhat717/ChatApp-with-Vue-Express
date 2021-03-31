<template>
  <div>
    <v-layout justify-center>
      <v-flex xs10 sm8 md5>
        <v-card class="rounded-t-0 rounded-b-lg" :align="align">
          <v-toolbar flat dense class="deep-purple accent-4 rounded-t-lg" dark>
            <v-toolbar-title class="">{{ title }}</v-toolbar-title>
        </v-toolbar>
          <slot name="form-container"></slot>
        </v-card>
        <slot name="action" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ["title","align"],
};
</script>