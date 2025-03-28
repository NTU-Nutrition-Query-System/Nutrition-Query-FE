<script setup lang="ts">
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const dialogVisible = ref(false);

const showDialog = () => {
    // Hide the dialog
    dialogVisible.value = true;
};
const closeDialog = () => {
    // Hide the dialog
    dialogVisible.value = false;
};
</script>

<template>
    <div style="display: flex; align-items: center;">
        <Button class="btn-yellow" @click="showDialog" >
            <div class="btn-yellow-content">
                <font-awesome-icon :icon="['fas', 'fa-bowl-rice']" 
                    style="height: 24px; width: 24px; margin-right: 5px;" />
                參考份量
            </div>
        </Button>
    </div>

    <Dialog
        v-model:visible="dialogVisible"
        header="參考份量"
        @hide="closeDialog"
        :modal="true"
        :closable="true"
        style="width: 80%; height: 80%;"
    >
        <h3 style="text-align: center;">水果類</h3>
        <table>
            <tbody>
                <tr>
                    <td><span class="sb-description">1/2 碗</span><span style="font-size: 1.2em;">葡萄</span></td>
                    <td><span class="sb-description">1 碗</span><span style="font-size: 1.2em;">小番茄</span></td>
                </tr>
                <tr>
                    <td >
                        <img class="sb-picture" src="../assets/images/one-half-bowl.jpg" alt="1/2 碗" />
                    </td>
                    <td >
                        <img class="sb-picture" src="../assets/images/a-bowl.jpg" alt="1 碗" />
                    </td>
                </tr>
            </tbody>
        </table>
        <h3 style="text-align: center; padding-top: 30px;">蔬菜類</h3>
        <table>
            <tbody>
                <tr>
                    <td><span class="sb-description">1 格</span><span style="font-size: 1.2em;">地瓜葉</span></td>
                    <td><span class="sb-description">1 格</span><span style="font-size: 1.2em;">玉米筍</span></td>
                </tr>
                <tr>
                    <td >
                        <img class="sb-picture" src="../assets/images/single-bento-item.jpg" alt="1格地瓜葉" />
                    </td>
                    <td >
                        <img class="sb-picture" src="../assets/images/single-bento-item-2.jpg" alt="1格玉米筍" />
                    </td>
                </tr>
            </tbody>
        </table>
        
    </Dialog>
</template>

<style scoped>
.p-dialog .p-dialog-title {
  text-align: center;
  flex-grow: 1;
  line-height: 120%;
  font-size: 22px;
  letter-spacing: -1px;
}

.p-dialog .p-dialog-header {
  padding: 10px;
}

table>tr>td {
    padding: 10px;
    text-align: center;
}

.sb-description {
    font-size: 1.2em;
    margin: 10px 0;
    background-color: var(--primary-color);
    width: 60px;
}

.sb-picture {
    width: 100%;
    height: auto;
    border-radius: 20px;
}

</style>
