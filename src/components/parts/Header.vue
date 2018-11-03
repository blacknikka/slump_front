<template>
    <v-ons-toolbar>
        <div class="center">{{ getTitle }}</div>
        <div class="left">
            <v-ons-toolbar-button icon="fa-home" @click="homeClicked"></v-ons-toolbar-button>
        </div>
    </v-ons-toolbar>
</template>

<script>
export default {
    computed: {
        getTitle() {
            // return this.$store.getters['splitter/getCurrentTitle'];
            return this.$store.getters.getCurrentTitle;
        },
    },
    methods: {
        homeClicked() {
            this.$router.replace({
                name: 'Top',
            });
        }
    }
}
</script>

<style scoped>
</style>
