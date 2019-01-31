<template>
    <div class="error d-flex justify-content-center p-2">
        <v-alert
                :value="true"
                type="error"
        >
          Page not found #404
        </v-alert>

    </div>
</template>

<script>
export default {
  name: "Error"
};
</script>

<style scoped>
</style>
