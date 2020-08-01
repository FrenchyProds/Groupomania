<template>
    <v-container>
        <v-list-item two-line>
            <v-list-item-avatar size="100px">
                <v-img :src="(avatar) || 'https://picsum.photos/300/200?random'"
                contain/>
            </v-list-item-avatar>
            <v-list-item-content class="text-center">
                <v-list-item-subtitle class="headline mb-1 text-capitalize">{{user.username}}</v-list-item-subtitle>
                <v-list-item-subtitle class="headline">{{user.firstName || 'Prénom'}} {{user.lastName || 'Nom'}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-card>
            <v-row class="text-center">
                <v-col cols="4">
                    Email
                </v-col>
                <v-col>
                    {{user.email}}
                </v-col>
            </v-row>
        </v-card>

        <v-card>
            <v-row class="text-center">
                <v-col cols="4">
                    Département
                </v-col>
                <v-col>
                    {{user.department}}
                </v-col>
            </v-row>
        </v-card>

        <v-tabs grow class="elevation-2" background-color="white">
                <v-tab>Profil</v-tab>
                <v-tab>Historique</v-tab>
        </v-tabs>

    </v-container>
    
</template>

<script>

let tokenFetch = JSON.parse(localStorage.getItem('jwt'));

export default {
    data() {
    
    return {
        user: [],
        id: '',
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        avatar: '',
        department: '',
    }
    },
    beforeRouteUpdate (to, from, next) {
            this.fetchUser(to.params.username)
            next()
        },
    created () {
            this.fetchUser(this.$route.params.username)
        },
    methods: {
        fetchUser() {
            this.axios
                    .get( `http://localhost:3000/user/${this.$route.params.username}`, {
                        headers: {
                            Authorization: `Bearer ${tokenFetch}`
                        }
                    })
                    .then(response => {
                        console.log(response)
                        this.user = response.data.user
                        this.id = this.user.id
                        this.username = this.user.username
                        this.email = this.user.email
                        this.firstName = this.user.firstName
                        this.lastName = this.user.lastName
                        this.department = this.user.department
                        this.avatar = this.user.avatar
                        console.log(response)
                    })
            },
        }
    }
</script>

<style scoped>

</style>