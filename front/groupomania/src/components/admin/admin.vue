<template>
    <v-container>
        <v-tabs grow class="elevation-2" background-color="white">
            <v-tab v-if="showFlag == false" @click="toggleFlags()">Posts signalés</v-tab>
            <v-tab v-if="showHistory == false" @click='toggleAdminHistory()'>Historique d'administration</v-tab>
        </v-tabs>

            <v-tabs grow class="elevation-2" background-color="white">
                <v-tab v-if="showReddits == false" @click="toggleReddit()">Discutes Signalées</v-tab>
                <v-tab v-if="showGags == false" @click='toggleGag()'>Gags Signalés</v-tab>
                <v-tab v-if="showUsers == false" @click='toggleUsers()'>Utilisateurs Signalés</v-tab>
            </v-tabs>

    <div v-if="showFlag == true">
        <div v-if="showReddits == true">
            <div v-if="reddits.length != 0">
                <v-card class="my-4">
                <v-card-title class="justify-center">Reddits Signalés</v-card-title>
                <div class="content" v-for="reddit in reddits" :key="reddit.id">
                    <div v-if="reddit.isFlag == true">
                        <div @click="goToReddit(reddit.id)">
                            <v-card-title background-color="lightgrey" class="postTitle">{{ reddit.title }}</v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>{{ reddit.content }}</v-card-text>
                        </div>
                        <div v-if="reddit.User !== null"> 
                            <v-card-text @click="goToUser(reddit.User.username)">Created by {{ reddit.User.username }} - {{ reddit.createdAt | moment("from") }}</v-card-text>
                        </div>
                        <div v-else>
                            <v-card-text>Utilisateur Supprimé- {{ reddit.createdAt | moment("from") }}</v-card-text>
                        </div>
                        <v-divider></v-divider>
                    </div>
                </div>
                </v-card>
            </div>
        </div>

        <div v-if="gags.length != 0">
            <div v-if="showGags == true">
                <v-card class="my-4">
                <v-card-title class="justify-center">Gags Signalés</v-card-title>
                <div class="content" v-for="gag in gag" :key="gag.id">
                    <div v-if="gag.isFlag == true">
                        <div @click="goToGag(gag.id)">
                            <v-card-title background-color="lightgrey" class="postTitle">{{ gag.title }}</v-card-title>
                            <v-divider></v-divider>
                            <v-img
                            :src="(post.content)"
                            aspect-ratio="1.5"
                            max-height="500"
                            contain/>
                        </div>
                        <div v-if="gag.User !== null"> 
                            <v-card-text @click="goToUser(gag.User.username)">Created by {{ gag.User.username }} - {{ gag.createdAt | moment("from") }}</v-card-text>
                        </div>
                        <div v-else>
                            <v-card-text>Utilisateur Supprimé- {{ gag.createdAt | moment("from") }}</v-card-text>
                        </div>
                        <v-divider></v-divider>
                    </div>
                </div>
                </v-card>
            </div>
        </div>

        
            <div v-if="users.length != 0">
                <div v-if="showUsers == true">
                <v-card class="my-4">
                <v-card-title class="justify-center">Utilisateurs Signalés</v-card-title>
                <div class="content" v-for="user in users" :key="user.avatar">
                    <div @click="goToUser(user.username)">
                    <v-list-item two-line>
                        <v-list-item-avatar size="100px">
                            <v-img :src="(user.avatar) || 'https://picsum.photos/300/200?random'"
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
                </div>
            </div>
                </v-card>
        </div>
        </div>
    </div>

        <div v-if="showHistory == true">
            Test 123 Test
        </div>
                            
        <modifiedfoot />
    </v-container>
</template>

<script>
import modifiedfoot from '../modifiedfoot'

let tokenFetch = JSON.parse(localStorage.getItem('jwt'))

const redditURL = 'http://localhost:3000/flaggedReddits'
const gagURL = 'http://localhost:3000/flaggedGags'
const userURL = 'http://localhost:3000/flaggedUsers'

export default {
    data() {
        return {
            showFlag: true,
            showHistory: false,
            isFlagged: '',
            reddits: [],
            gags: [],
            users: [],
            showReddits: true,
            showGags: false,
            showUsers: false,
        }
    },
    mounted() {
        this.axios.get(redditURL,
          {
            headers: {
             Authorization: `Bearer ${tokenFetch}`
            }
            }).then(res => {
                this.reddits = res.data.Reddit
                console.log(res)
                console.log(this.reddits)
          })
        this.axios.get(gagURL,
          {
            headers: {
             Authorization: `Bearer ${tokenFetch}`
            }
            }).then(res => {
                this.gags = res.data.Gag
                console.log(res)
                console.log(this.gags)
          }),
          this.axios.get(userURL,
          {
            headers: {
             Authorization: `Bearer ${tokenFetch}`
            }
            }).then(res => {
                this.users = res.data.data
                console.log(res)
                console.log(this.users)
          })
    },
    methods: {
        toggleFlags() {
                        this.showFlag = true;
                        this.showHistory = false;
                    },
        toggleAdminHistory() {
                        this.showFlag = false;
                        this.showHistory = true;
                    },
        toggleGag() {
                        this.showGags = true;
                        this.showReddits = false;
                        this.showUsers = false;
                    },
        toggleReddit() {
                        this.showGags = false;
                        this.showReddits = true;
                        this.showUsers = false;
                    },
        toggleUsers() {
                        this.showGags = false;
                        this.showReddits = false;
                        this.showUsers = true;
                    },
        goToGag(postId) {
            this.$router.push({name:'voirgag',params:{id:postId}})
        },
        goToReddit(postId) {
            this.$router.push({name:'voirdiscute',params:{id:postId}})
        },
        goToUser(username) {
            this.$router.push({name:'user', params:{username:username}})
        }
    },
    components: {
        modifiedfoot,    }
}
</script>


<style scoped>

</style>