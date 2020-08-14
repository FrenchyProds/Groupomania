<template>
    <v-container>
        <v-tabs show-arrows grow class="elevation-2 mb-2" background-color="white">
            <v-tab @click="toggleFlags()">Posts signalés</v-tab>
            <v-tab @click='toggleAdminHistory()'>Historique d'administration</v-tab>
        </v-tabs>

        <div v-if="showFlag == true">
            <v-tabs show-arrows class="elevation-2" background-color="white">
                <v-tab @click="toggleReddit()">Discutes Signalées</v-tab>
                <v-tab @click='toggleGag()'>Gags Signalés</v-tab>
                <v-tab @click='toggleUsers()'>Utilisateurs Signalés</v-tab>
                <v-tab @click="toggleComments()">Commentaires Signalés</v-tab>
            </v-tabs>
        </div>

    <div v-if="showFlag == true">
        <div v-if="showReddits == true">
            <div v-if="reddits.length != 0">
                <v-card-title class="justify-center">Reddits Signalés</v-card-title>
                <div class="content" v-for="reddit in reddits" :key="reddit.id">
                    <v-card class="my-4 text-center">
                        <div @click="goToReddit(reddit.id)">
                            <v-card-title background-color="lightgrey" class="postTitle justify-center">{{ reddit.title }}</v-card-title>
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
                        <div class="text-center py-4">
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn @click="deleteReddit(reddit.id)" v-bind="attrs" v-on="on" class="red--text mx-2">Modérer<v-icon>mdi-delete-circle</v-icon>
                                    </v-btn>
                                </template>
                                <span>Supprimer la publication</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn @click="unflagReddit(reddit.id)" v-bind="attrs" v-on="on" class="green--text">Dé-signaler<v-icon>mdi-flag-remove</v-icon>
                                    </v-btn>
                                </template>
                                <span>Supprimer le signalement</span>
                            </v-tooltip>
                        </div>
                    </v-card>            
                </div>
            </div>
        </div>

        <div v-if="gags.length != 0">
            <div v-if="showGags == true">
                <v-card-title class="justify-center">Gags Signalés</v-card-title>
                <v-card class="my-4">
                    <div class="content" v-for="gag in gags" :key="gag.id">
                        <div @click="goToGag(gag.id)">
                            <v-card-title background-color="lightgrey" class="postTitle">{{ gag.title }}</v-card-title>
                            <v-divider></v-divider>
                            <v-img
                            :src="(gag.content)"
                            aspect-ratio="1.5"
                            max-height="500"
                            contain/>
                        </div>
                        <div v-if="gag.User !== null"> 
                            <v-card-text @click="goToUser(gag.User.username)">Crée par {{ gag.User.username }} - {{ gag.createdAt | moment("from") }}</v-card-text>
                        </div>
                        <div v-else>
                            <v-card-text>Utilisateur Supprimé- {{ gag.createdAt | moment("from") }}</v-card-text>
                        </div>
                        <v-divider></v-divider>
                        <div class="text-center py-4">
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn @click="deleteGag(gag.id)" v-bind="attrs" v-on="on" class="red--text mx-2">Modérer<v-icon>mdi-delete-circle</v-icon>
                                    </v-btn>
                                </template>
                                <span>Supprimer la publication</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn @click="unflagGag(gag.id)" v-bind="attrs" v-on="on" class="green--text">Dé-signaler<v-icon>mdi-flag-remove</v-icon>
                                    </v-btn>
                                </template>
                                <span>Supprimer le signalement</span>
                            </v-tooltip>
                        </div>
                    </div>
                </v-card>
            </div>
        </div>

        
            <div v-if="users.length != 0">
                <div v-if="showUsers == true">
                    <v-card-title class="justify-center">Utilisateurs Signalés</v-card-title>
                    <div class="content" v-for="user in users" :key="user.avatar">
                        <v-card class="my-4">
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
                        <div class="text-center py-4">
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn @click="deleteUser(user.id)" v-bind="attrs" v-on="on" class="red--text mx-2">Modérer<v-icon>mdi-delete-circle</v-icon>
                                    </v-btn>
                                </template>
                                <span>Supprimer l'utilisateur</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn @click="unflagUser(user.id)" v-bind="attrs" v-on="on" class="green--text">Dé-signaler<v-icon>mdi-flag-remove</v-icon>
                                    </v-btn>
                                </template>
                                <span>Supprimer le signalement</span>
                            </v-tooltip>
                        </div>
                        </v-card>
                    </div>
                </div>
            </div>

    <div v-if="comments.length != 0">
        <div v-if="showComments == true">
            <v-card-title class="justify-center">Commentaires Signalés</v-card-title>
            <div class="content" v-for="comment in comments" :key="comment.ids">
                <v-card class="my-4 pb-4">
                <v-card-text>{{comment.content}}</v-card-text>
                <v-card-text>Dans la publication : 
                    <div @click="goToReddit(comment.redditId)" v-if="comment.redditId">{{comment.redditId}}</div>
                    <div @click="goToGag(comment.gagId)" v-else>{{comment.gagId}}</div>
                </v-card-text>
                <v-card-text @click="goToUser(comment.User.username)">Posté par {{comment.User.username}} - {{ comment.createdAt | moment("from") }}</v-card-text>
                <div class="text-center" v-if="comment.redditId">
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="adminRedditComment(comment.redditId, comment.id)" v-bind="attrs" v-on="on" class="red--text mx-2">Modérer<v-icon>mdi-delete-circle</v-icon>
                            </v-btn>
                        </template>
                        <span>Modérer le commentaire</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="unflagRedditComment(comment.redditId, comment.id)" v-bind="attrs" v-on="on" class="green--text mx-2">Dé-signaler<v-icon>mdi-flag-remove</v-icon>
                            </v-btn>
                        </template>
                        <span>Supprimer le signalement</span>
                    </v-tooltip>
                </div>
                <div class="text-center" v-else>
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="adminGagComment(comment.gagId, comment.id)" v-bind="attrs" v-on="on" class="red--text mx-2">Modérer<v-icon>mdi-delete-circle</v-icon>
                            </v-btn>
                        </template>
                        <span>Modérer le commentaire</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="unflagGagComment(comment.gagId, comment.id)" v-bind="attrs" v-on="on" class="green--text mx-2">Dé-signaler<v-icon>mdi-flag-remove</v-icon>
                            </v-btn>
                        </template>
                        <span>Supprimer le signalement</span>
                    </v-tooltip>
                </div>
                </v-card>
            </div>
        </div>
    </div>
    </div>
    

        <div v-if="showHistory == true">
            <v-tabs show-arrows class="elevation-2" background-color="white">
                <v-tab @click="toggleRedditHistory()">Discutes Signalées</v-tab>
                <v-tab @click='toggleGagHistory()'>Gags Signalés</v-tab>
                <v-tab @click='toggleUsersHistory()'>Utilisateurs Signalés</v-tab>
                <v-tab @click="toggleCommentsHistory()">Commentaires Signalés</v-tab>
            </v-tabs>
            <div v-if="showRedditsHistory == true">
                <div v-if="moderatedReddits.length != 0">
                    <v-card class="my-4">
                    <v-card-title class="justify-center">Reddits Signalés</v-card-title>
                    <div class="content" v-for="reddit in moderatedReddits" :key="reddit.id">
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
                    </v-card>
                </div>
            </div>

            <div v-if="moderatedGags.length != 0">
                <div v-if="showGagsHistory == true">
                    <v-card class="my-4">
                    <v-card-title class="justify-center">Gags Signalés</v-card-title>
                        <div class="content" v-for="gag in moderatedGags" :key="gag.id">
                            <div @click="goToGag(gag.id)">
                                <v-card-title background-color="lightgrey" class="postTitle">{{ gag.title }}</v-card-title>
                                <v-divider></v-divider>
                                <v-img
                                :src="(gag.content)"
                                aspect-ratio="1.5"
                                max-height="500"
                                contain/>
                            </div>
                            <div v-if="gag.User !== null"> 
                                <v-card-text @click="goToUser(gag.User.username)">Crée par {{ gag.User.username }} - {{ gag.createdAt | moment("from") }}</v-card-text>
                            </div>
                            <div v-else>
                                <v-card-text>Utilisateur Supprimé- {{ gag.createdAt | moment("from") }}</v-card-text>
                            </div>
                            <v-divider></v-divider>
                        </div>
                    </v-card>
                </div>
            </div>
        

        <div v-if="moderatedUsers.length != 0">
            <div v-if="showUsersHistory == true">
                <v-card class="my-4">
                    <v-card-title class="justify-center">Utilisateurs Signalés</v-card-title>
                    <div class="content" v-for="user in moderatedUsers" :key="user.avatar">
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

        <div v-if="moderatedComments.length != 0">
            <div v-if="showCommentsHistory == true">
                <v-card-title class="justify-center">Commentaires Signalés</v-card-title>
                <div class="content" v-for="comment in moderatedComments" :key="comment.id">
                    <v-card class="my-4 pb-4">
                    <v-card-text>{{comment.content}}</v-card-text>
                    <v-card-text>Dans la publication : 
                        <div @click="goToReddit(comment.redditId)" v-if="comment.redditId">{{comment.redditId}}</div>
                        <div @click="goToGag(comment.gagId)" v-else>{{comment.gagId}}</div>
                    </v-card-text>
                    <v-card-text @click="goToUser(comment.User.username)">Posté par {{comment.User.username}} - {{ comment.createdAt | moment("from") }}</v-card-text>
                    </v-card>
                </div>
            </div>
        </div>
    </div>
                            
        <modifiedfoot />
    </v-container>
</template>

<script>
import modifiedfoot from '../modifiedfoot'
import swal from 'sweetalert'

let tokenFetch = JSON.parse(localStorage.getItem('jwt'))

const redditUrl = 'http://localhost:3000/reddit/';
const gagUrl = 'http://localhost:3000/gag/';
const userUrl = 'http://localhost:3000/user/'

const redditFlag = 'http://localhost:3000/flaggedReddits'
const gagFlag = 'http://localhost:3000/flaggedGags'
const userFlag = 'http://localhost:3000/flaggedUsers'
const commentFlag = 'http://localhost:3000/flaggedComments'

const moderatedReddit = 'http://localhost:3000/reddit/admin/moderated'
const moderatedGag = 'http://localhost:3000/gag/admin/moderated'
const moderatedUser = 'http://localhost:3000/user/admin/moderated'
const moderatedComment = 'http://localhost:3000/comment/admin/moderated'

export default {
    data() {
        return {
            showFlag: true,
            showHistory: false,
            isFlagged: '',
            reddits: [],
            gags: [],
            users: [],
            comments: [],
            showReddits: true,
            showGags: false,
            showUsers: false,
            showComments: false,
            showRedditsHistory: true,
            showGagsHistory: false,
            showUsersHistory: false,
            showCommentsHistory: false,
            moderatedReddits: [],
            moderatedGags: [],
            moderatedUsers: [],
            moderatedComments: [],
        }
    },
    mounted() {
        this.axios.get(redditFlag,
          {
            headers: {
             Authorization: `Bearer ${tokenFetch}`
            }
            }).then(res => {
                this.reddits = res.data.Reddit
                console.log(this.reddits)
          })
        this.axios.get(gagFlag,
          {
            headers: {
             Authorization: `Bearer ${tokenFetch}`
            }
            }).then(res => {
                this.gags = res.data.Gag
                console.log(this.gags)
          }),
          this.axios.get(userFlag,
          {
            headers: {
             Authorization: `Bearer ${tokenFetch}`
            }
            }).then(res => {
                this.users = res.data.data
                console.log(this.users)
          }),
          this.axios.get(commentFlag,
          {
            headers: {
             Authorization: `Bearer ${tokenFetch}`
            }
            }).then(res => {
                this.comments = res.data.Comment
                console.log(this.comments)
          }),
          this.axios.get(moderatedReddit,
          {
            headers: {
             Authorization: `Bearer ${tokenFetch}`
            }
            }).then(res => {
                this.moderatedReddits = res.data.reddit
                console.log(res)
                console.log(this.moderatedReddits)
          })
          this.axios.get(moderatedGag,
          {
            headers: {
             Authorization: `Bearer ${tokenFetch}`
            }
            }).then(res => {
                this.moderatedGags = res.data.gag
                console.log(this.moderatedGags)
          })
          this.axios.get(moderatedUser,
          {
            headers: {
             Authorization: `Bearer ${tokenFetch}`
            }
            }).then(res => {
                this.moderatedUsers = res.data.user
                console.log(this.moderatedUsers)
          })
          this.axios.get(moderatedComment,
          {
            headers: {
             Authorization: `Bearer ${tokenFetch}`
            }
            }).then(res => {
                this.moderatedComments = res.data.comment
                console.log(this.moderatedComments)
          })
    },
    methods: {
        deleteGag(gagId) {
            swal({
            title: "Voulez-vous vraiment supprimer la publication ?",
            text: "Une fois supprimé, vous ne pourrez pas la récupérer",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            }) 
            .then((willDelete) => {
            if (willDelete) {
                swal("La publication a été supprimé avec succes", {
                icon: "success",
                })
            this.axios.delete(gagUrl + gagId + `/admin`
            ,
                {
                    headers: {
                    Authorization: `Bearer ${tokenFetch}`
                        }    
                })
                        .then(response => {
                            // Handle success.
                            console.log(response)     
                        })
                        window.location.reload()
                    } else {
                        swal("Suppresion de publication annulée");
                    }
                    })
            
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
                swal("Quelque chose n'a pas fonctionné", "", "error")
                    })
                },
                unflagGag(gagId) {
                    this.axios.get(gagUrl + gagId + '/admin/unflag', {
                        headers: {
                            Authorization: `Bearer ${tokenFetch}`
                        }
                    }).then(response => {
                        // Handle success.
                        console.log(response)     
                    })
                    swal('Signalement supprimé', '', 'success')
                    window.location.reload();
                },
                deleteReddit(redditId) {
                    swal({
                    title: "Voulez-vous vraiment supprimer la publication ?",
                    text: "Une fois supprimé, vous ne pourrez pas la récupérer",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                    }) 
                    .then((willDelete) => {
                    if (willDelete) {
                        swal("La publication a été supprimé avec succes", {
                        icon: "success",
                        })
                    this.axios.delete(redditUrl + redditId + `/admin`
                    ,
                        {
                            headers: {
                            Authorization: `Bearer ${tokenFetch}`
                                }    
                        })
                                .then(response => {
                                    // Handle success.
                                    console.log(response)     
                                })
                                window.location.reload()
                            } else {
                                swal("Suppresion de publication annulée");
                            }
                            })
                    
                        .catch(error => {
                        // Handle error.
                        console.log('An error occurred:', error.response);
                        swal("Quelque chose n'a pas fonctionné", "", "error")
                            })
                        },
                        unflagReddit(redditId) {
                            this.axios.get(redditUrl + redditId + '/admin/unflag', {
                                headers: {
                                    Authorization: `Bearer ${tokenFetch}`
                                }
                            }).then(response => {
                                // Handle success.
                                console.log(response)     
                            })
                            swal('Signalement supprimé', '', 'success')
                            window.location.reload();
                        },
        unflagUser(userId) {
            this.axios.get(userUrl + userId + '/admin/unflag',
             {
                headers: {
                    Authorization: `Bearer ${tokenFetch}`
                }
            })
                .then(response => {
                        // Handle success.
                        console.log(response)     
                    })
                    swal('Signalement supprimé', '', 'success')
                    window.location.reload();
        },
        deleteUser(userId) {
            swal({
                title: "Voulez-vous vraiment supprimer cet utilisateur ?",
                text: "",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                }) 
                .then((willDelete) => {
                if (willDelete) {
                    swal("L'utilisateur a été supprimé avec succes", {
                    icon: "success",
                    })
                this.axios.delete(userUrl + userId + '/admin',
                    {
                        headers: {
                        Authorization: `Bearer ${tokenFetch}`
                            }    
                    })
                    .then(response => {
                        // Handle success.
                        console.log(response)     
                    })
                    window.location.reload();
                } else {
                    swal("Suppresion d'utilisateur annulée");
                }
                }).catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error.response);
                    swal("Quelque chose n'a pas fonctionné", "", "error")
                        })
        },
        unflagRedditComment(redditId, commentId) {
            this.axios.get(redditUrl + redditId + '/comment/' + commentId + '/admin/unflag',
             {
                headers: {
                    Authorization: `Bearer ${tokenFetch}`
                }
            })
                .then(response => {
                        // Handle success.
                        console.log(response)     
                    })
                    swal('Signalement supprimé', '', 'success')
                    window.location.reload();
        },
        unflagGagComment(gagId, commentId) {
            this.axios.get(gagUrl + gagId + '/comment/' + commentId + '/admin/unflag',
                    {
                        headers: {
                        Authorization: `Bearer ${tokenFetch}`
                            }    
                    })
                .then(response => {
                        // Handle success.
                        console.log(response) 
                        swal('Signalement supprimé', '', 'success')
                        window.location.reload();    
                    })
                    .catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error.response);
                    swal("Quelque chose n'a pas fonctionné", "", "error")
                        })
        },
        adminGagComment(gagId, commentId) {
            swal({
                title: "Voulez-vous vraiment supprimer ce commentaire ?",
                text: "",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                }) 
                .then((willDelete) => {
                if (willDelete) {
                    swal("Le commentaire a été supprimé avec succes", {
                    icon: "success",
                    })
                this.axios.delete(gagUrl + gagId + '/comment/' + commentId + '/admin',
                    {
                        headers: {
                        Authorization: `Bearer ${tokenFetch}`
                            }    
                    })
                    .then(response => {
                        // Handle success.
                        console.log(response)     
                    })
                    window.location.reload();
                } else {
                    swal("Suppresion de commentaire annulée");
                }
                }).catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error.response);
                    swal("Quelque chose n'a pas fonctionné", "", "error")
                        })
                    },
        adminRedditComment(redditId, commentId) {
        swal({
            title: "Voulez-vous vraiment supprimer ce commentaire ?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            }) 
            .then((willDelete) => {
            if (willDelete) {
                swal("Le commentaire a été supprimé avec succes", {
                icon: "success",
                })
            this.axios.delete(redditUrl + redditId + '/comment/' + commentId + '/admin',
                {
                    headers: {
                    Authorization: `Bearer ${tokenFetch}`
                        }    
                })
                .then(response => {
                    // Handle success.
                    console.log(response)     
                })
                window.location.reload();
            } else {
                swal("Suppresion de commentaire annulée");
            }
            }).catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
                swal("Quelque chose n'a pas fonctionné", "", "error")
                    })
                },
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
                        this.showComments = false;
                    },
        toggleReddit() {
                        this.showGags = false;
                        this.showReddits = true;
                        this.showUsers = false;
                        this.showComments = false;
                    },
        toggleUsers() {
                        this.showGags = false;
                        this.showReddits = false;
                        this.showUsers = true;
                        this.showComments = false;
                    },
        toggleComments() {
                        this.showGags = false;
                        this.showReddits = false;
                        this.showUsers = false;
                        this.showComments = true;
                    },
        toggleGagHistory() {
                        this.showGagsHistory = true;
                        this.showRedditsHistory = false;
                        this.showUsersHistory = false;
                        this.showCommentsHistory = false;
                    },
        toggleRedditHistory() {
                        this.showGagsHistory = false;
                        this.showRedditsHistory = true;
                        this.showUsersHistory = false;
                        this.showCommentsHistory = false;
                    },
        toggleUsersHistory() {
                        this.showGagsHistory = false;
                        this.showRedditsHistory = false;
                        this.showUsersHistory = true;
                        this.showCommentsHistory = false;
                    },
        toggleCommentsHistory() {
                        this.showGagsHistory = false;
                        this.showRedditsHistory = false;
                        this.showUsersHistory = false;
                        this.showCommentsHistory = true;
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