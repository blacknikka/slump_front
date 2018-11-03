<template>
    <div>
        <store-list-page>
        </store-list-page>
    </div>
</template>

<script>
import StoreListPage from '@/components/layouts/StoreListPage';

export default {
  data() {
    return {};
  },
  mounted() {
      this.$store.commit('setTitle', 'Store List');
  },
  components: {
    StoreListPage,
  },
};
</script>

<style scoped>
</style>