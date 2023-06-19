<template>

  <Header></Header>

  <div class="content">
    <PatientMain></PatientMain>
  </div>

  <Footer></Footer>

</template>

<script setup>

import Header from "@/components/communion/Header.vue";
import Footer from "@/components/communion/Footer.vue";
import PatientMain from "@/components/patient/PatientMain.vue";
</script>

<style scoped>
.content {
  min-height: 600px;
}
</style>
