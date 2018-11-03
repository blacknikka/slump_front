<template>
    <div>
        <ons-row>
            <ons-col width="15%" :class="{'table-title' : dataSet.isTitle}">
                <div class="col-content">{{getNo}}</div>
            </ons-col>
            <ons-col width="20%" :class="{'table-title' : dataSet.isTitle}">
                <div class="col-content">{{getGameCount}}</div>
            </ons-col>
            <ons-col width="30%" :class="{'table-title' : dataSet.isTitle}">
                <div v-if="dataSet.isTitle"></div>
                <img v-else :src="getImage" width="100" height="100">
            </ons-col>
            <ons-col :class="{'table-title' : dataSet.isTitle}">
                <div class="col-content">{{getBonusName}}</div>
            </ons-col>
        </ons-row>
    </div>
</template>

<script>
import _ from 'lodash';
import path from 'path';

export default {
    props: {
        dataSet: {
            isTitle: false,
            no: 0,
            gameCount: 0,
            bonusName: '',
        },
    },
    data() {
        return {
            hasImage: false,
        };
    },
    computed: {
        getNo() {
            return this.dataSet.isTitle === false ? this.dataSet.no : 'No.';
        },
        getGameCount() {
            return this.dataSet.isTitle === false ? this.dataSet.gameCount : 'Game Count';
        },
        getBonusName() {
            return this.dataSet.isTitle === false ? this.dataSet.bonusName : 'Bonus Name';
        },
        getImage() {
            const image = _.find(this.$store.state.bonusData, d => {
                return d.name === this.dataSet.bonusName;
            });

            if (image) {
                this.hasImage = true;
                return image.image;
            } else {
                this.hasImage = false;
                return require("../../assets/noimage.png");
            }
        },
    },
}
</script>

<style scoped>
ons-col {
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #ccc;
  background: #fff;
  overflow: hidden;
  padding: 4px;
  color: rgb(88, 78, 78);
  border-radius: 7px;
}
.table-title {
  background: rgb(194, 207, 144);
  border-bottom: 2px;
  border-radius: 3px;
}
.col-content {
  font-size: 25px;
}
</style>

