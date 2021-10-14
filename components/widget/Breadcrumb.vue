<template>
  <span class="text-tb-primary-dark">
      <NuxtLink to="/">Testbericht.de</NuxtLink>
        <NuxtLink v-for="(link, index) in linkArray" :key="index" :to="link.url" class="last:text-tb-black last:pointer-events-none"> <span class="text-tb-primary-dark"> ></span> {{link.label}}</NuxtLink>
  </span>
</template>

<script>
export default {
    name: 'Breadcrumb',
    props: ['linkArray']
}
</script>

<style>

</style>