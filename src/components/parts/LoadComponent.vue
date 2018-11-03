<template>
    <div v-if="is_load === false" class="globalload">
        <v-ons-progress-circular indeterminate></v-ons-progress-circular>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        is_load: false,
    },
}
</script>

<style scoped>
</style>

