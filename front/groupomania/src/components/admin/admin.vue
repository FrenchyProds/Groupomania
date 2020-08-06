<template>
    <v-container>
        <v-tabs grow class="elevation-2" background-color="white">
                <v-tab v-if="showFlag == false" @click="toggleFlags()">Posts signalés</v-tab>
                <v-tab v-if="showHistory == false" @click='toggleAdminHistory()'>Historique d'administration</v-tab>
            </v-tabs>
        <modifiedfoot />
    </v-container>
</template>

<script>
import modifiedfoot from '../modifiedfoot'
export default {
    data() {
        return {
            showFlag: true,
            showHistory: false
        }
    },
    methods: {
        toggleFlags() {
                        this.showFlag = true;
                        this.showHistory = false;
                    },
        toggleAdminHistory() {
                        this.showFalse = false;
                        this.showHistory = true;
                    },
    },
    components: {
        modifiedfoot,    }
}
</script>


<style scoped>

</style>