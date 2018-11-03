<template>
    <v-ons-page>
        <app-header></app-header>
        <div id="app">
            <router-view/>
        </div>
    </v-ons-page>
</template>

<script>
import AppHeader from './components/parts/Header';

export default {
    name: 'app',
    components: {
        AppHeader,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ons-splitter-side[side="left"][animation="overlay"] {
  border-right: 1px solid #bbb;
}
.page-container {
  padding-top: 10px;
}
</style>

<style>
.globalfade-enter-active,
.globalfade-leave-active {
  transition: opacity 0.5s;
}
.globalfade-enter,
.globalfade-leave-to {
  opacity: 0;
}
.globalload {
  margin-top: 10%;
  text-align: center;
}
</style>
