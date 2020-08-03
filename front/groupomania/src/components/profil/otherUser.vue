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
                <v-tab v-if="toggleGag == false" @click="toggleGags()">Gags</v-tab>
                <v-tab v-if="toggleReddit == false" @click='toggleReddits()'>Discutes</v-tab>
                <v-tab v-if="toggleComment == false" @click='toggleComments()'>Commentaires</v-tab>
        </v-tabs>

        <div class="gags" v-show="toggleGag" v-for="gag in gags" :key="gag.id">
            <div @click="goToGag(gag.id)">
                <v-card-title class="centered-text">{{gag.title}}</v-card-title>
                <v-img
                            :src="(gag.content)"
                            aspect-ratio="1.5"
                            max-height="500"
                            contain/>
            </div>
            <v-card-text>Posté {{ gag.createdAt | moment("from") }}</v-card-text>
            <v-divider></v-divider>
        </div>

        <div class="reddits" v-show="toggleReddit" v-for="reddit in reddits" :key="reddit.id">
            <div @click="goToReddit(reddit.id)">
                <v-card-title class="centered-text">{{reddit.title}}</v-card-title>
                <v-card-text>{{reddit.content}}</v-card-text>
            </div>
            <v-card-text>Posté {{ reddit.createdAt | moment("from") }}</v-card-text>
            <v-divider></v-divider>
        </div>

    <modifiedfoot />
    <div class="clear"></div>
    </v-container>
    
</template>

<script>
import modifiedfoot from '../modifiedfoot'

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
        gags: [],
        reddits: [],
        comments: [],
        toggleGag: true,
        toggleReddit: false,
        toggleComment: false,
    }
    },
    beforeRouteUpdate (to, from, next) {
            this.fetchUser(to.params.username)
            next()
        },
    created () {
            this.fetchUser(this.$route.params.username)
            console.log(this.$route.params.username)
        },
    mounted () {
    },
    methods: {
        fetchUser() {
            this.axios
                    .get( `http://localhost:3000/finduser/${this.$route.params.username}`, {
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
                        this.fetchGags();
                        this.fetchReddits()
                    })  
            },
            fetchGags() {
                        this.axios
                        .get(`http://localhost:3000/gag/byUser/${this.id}`, {
                            headers: {
                                    Authorization: `Bearer ${tokenFetch}`
                                }
                        }).then(response => {
                        this.gags = response.data.data
                        console.log(this.gags)
                        })
            },
            fetchReddits() {
                        this.axios.get(`http://localhost:3000/reddit/byUser/${this.id}`, {
                        headers: {
                                    Authorization: `Bearer ${tokenFetch}`
                                }
                        }).then(response => {
                        this.reddits = response.data.data
                        console.log(this.reddits)
                        })
            },
            toggleGags() {
                this.toggleGag = true;
                this.toggleReddit = false;
                this.toggleComment = false;
            },
            toggleReddits() {
                this.toggleGag = false;
                this.toggleReddit = true;
                this.toggleComment = false;
            },
            toggleComments() {
                this.toggleGag = false;
                this.toggleReddit = false;
                this.toggleComment = true;
            },
             goToReddit(postId) {
            this.$router.push({name:'voirdiscute',params:{id:postId}})
            },
             goToGag(postId) {
            this.$router.push({name:'voirgag',params:{id:postId}})
            }
        },
        components: {
            modifiedfoot,
        }
    }
</script>

<style scoped>

.v-card__title {
    justify-content: center;
}

.clear { clear: both; height: 150px; }
</style>