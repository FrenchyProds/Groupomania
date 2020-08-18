<template>
    <v-container>
        <mainhead/>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    fixed
                    dark
                    fab
                    justify-center
                    color="red"
                    class="hoverTime"
                    v-bind="attrs"
                    v-on="on"
                    @click="gagpost = true"
                    >
                        <v-icon color="white">mdi-pencil</v-icon>
                    </v-btn>
                    <gagpost v-model="gagpost" />
                </template>
                <span>Créer ma publication GroupoGag !</span>    
            </v-tooltip>

            <v-card-title class="justify-center text-uppercase font-weight-bold"> Les publications Groupogag</v-card-title>

            <div v-if="posts.length > 0">
                <paginate
                v-if="shown"
                name="eachPosts"
                :list="eachPosts"
                :per="5"
                >
                <li v-for="eachpost in paginated('eachPosts')" :key="eachpost.id">
                    <v-card my-2 class="text-center">
                    <div @click="goToPost(eachpost.id)">
                        <v-card-title background-color="lightgrey">{{ eachpost.title }}</v-card-title>
                        <v-divider></v-divider>
                        <v-img
                        :src="(eachpost.content)"
                        aspect-ratio="1.5"
                        max-height="500"
                        contain/>
                        </div>
                        <div v-if="eachpost.User !== null">
                        <v-card-text @click="goToUser(eachpost.User.username)">Crée par {{ eachpost.User.username }} - {{ eachpost.createdAt | moment("from") }}</v-card-text>
                        </div>
                        <v-divider></v-divider>
                        
                        <v-card-text class="text-truncate" background-color="grey">
                        
                         <div class="likes">
                            <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="likePost(eachpost.id)" v-bind="attrs" v-on="on" class="green--text"><v-icon color="green">mdi-arrow-up-bold</v-icon>
                            <div v-if="eachpost.likesCount > eachpost.dislikesCount">{{eachpost.likesCount}}</div>
                            </v-btn>
                            </template>
                            <span>J'aime !</span>
                            </v-tooltip>
                        </div>

                        <div class="dislikes">
                            <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="dislikePost(eachpost.id)" v-bind="attrs" v-on="on" class="red--text"><v-icon>mdi-arrow-down-bold</v-icon>
                            <div v-if="eachpost.dislikesCount > eachpost.likesCount">{{eachpost.dislikesCount}}</div></v-btn>
                            </template>
                            <span>J'aime pas !</span>
                            </v-tooltip>
                        </div>

                        <div class="comments">
                            <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                            <v-btn  class="blue--text" @click="goToPost(eachpost.id)" v-bind="attrs" v-on="on"><v-icon>mdi-message</v-icon>
                            <div :key="eachpost.id">{{eachpost.commentsCount}}</div></v-btn>
                            </template>
                            <span>Laisser un commentaire</span>
                            </v-tooltip>
                        </div>

                        <div v-if="eachpost.User.id != userIsMe">
                            <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                            <v-btn class="orange--text" @click="reportContent(eachpost.id)" v-bind="attrs" v-on="on"><v-icon>mdi-flag</v-icon></v-btn>
                            </template>
                            <span>Signaler du contenu</span>
                            </v-tooltip>
                        </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    </v-card>
                </li>
                </paginate>
            </div>
            <paginate-links :hide-single-page="true" :async="true" class="stylePagination" for="eachPosts" :show-step-links="true"
            :step-links="{
            next: '>',
            prev: '<'
            }">
            </paginate-links>
            
        <foot/>
    </v-container>
</template>

<script>
import foot from '../footers/foot'
import mainhead from '../headers/mainhead'
import gagpost from './gagpost'
import swal from 'sweetalert'
import jwt_decode from 'jwt-decode'

const apiUrl = 'http://localhost:3000/gag';
let tokenFetch = JSON.parse(localStorage.getItem('jwt'))

if(tokenFetch) {
    var decoded = jwt_decode(tokenFetch);
}

let userId

if(decoded != undefined) {
userId = decoded.userId
}

export default {
    data () {
        return {
        posts: [],
        url: [],
        eachPosts: [],
        id: '',
        gagpost: false,
        userIsMe: userId,
        paginate: ['eachPosts'],
        shown: false,
    }},
     mounted() {
          this.axios.get(apiUrl,
           {
                headers: {
                    Authorization: `Bearer ${tokenFetch}`
                        }
                    }).then(res => {
                this.posts = res.data.data
                for(let i = 0; i < this.posts.length; i++) {
                this.axios.get(apiUrl + '/' + this.posts[i].id,
                {
                headers: {
                    Authorization: `Bearer ${tokenFetch}`
                        }
                    }).then(res => {
                this.eachPosts.push(res.data.data)
                })
            }
          }),
                    setTimeout(() => {
                this.shown = true
                }, 1000)
        },
        methods: {
        goToPost(postId) {
            this.$router.push({name:'voirgag',params:{id:postId}})
        },
        goToUser(username) {
            this.$router.push({name:'user', params:{username:username}})
        },
        likePost(gagId) {
                    this.axios.get(apiUrl + '/' + gagId + '/like',
                    {
                        headers: {
                        Authorization: `Bearer ${tokenFetch}`
                            }    
                    })
                            .then(response => {
                                // Handle success.
                                console.log(response)
                                if(this.eachPosts.isLiked) {
                                    swal("Like supprimé !","","success");
                                    window.location.reload();
                                } else if(!this.eachPosts.isLiked) {
                                    swal("Publication likée !","","success")
                                    window.location.reload();
                                }
                            })
                        },
                 dislikePost(redditId) {
                    this.axios.get(apiUrl + '/' + redditId + '/dislike',
                    {
                        headers: {
                        Authorization: `Bearer ${tokenFetch}`
                            }    
                    })
                            .then(response => {
                                // Handle success.
                                console.log(response)
                                if(this.eachPosts.isDisliked) {
                                    swal("Dislike supprimé !","","success");
                                    window.location.reload();
                                } else if(!this.eachPosts.isDisliked) {
                                    swal("Publication dislikée !","","success")
                                    window.location.reload();
                                }
                            })
                        },
                     reportContent(eachpostId) {
                            if(this.isFlagged == false) {
                                swal({
                                    title: "Voulez-vous vraiment signaler ce contenu ?",
                                    text: "",
                                    icon: "info",
                                    buttons: true,
                                    dangerMode: true,
                                }) 
                                .then((willReport) => {
                                    if (willReport) {
                                        swal("Contenu signalé avec succes",{
                                            icon: "success",
                                        })
                                this.axios.put( apiUrl + `/report/` + eachpostId
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
                                    swal("Signlament annulé");
                                }
                                })
                        
                        .catch(error => {
                            // Handle error.
                            console.log('An error occurred:', error.response);
                            swal("Quelque chose n'a pas fonctionné", "", "error")
                                })
                            } else {
                                swal("Ce contenu a déjà été signalé par un autre utilisateur", "Merci quand même :)", "error")
                            }
                        },
    },
    name: 'groupogag',
    components: {
        foot,
        mainhead,
        gagpost
    },
}
</script>

<style scoped>
.v-responsive {
    border: 2px groove;
}
.text-truncate {
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 0.5rem 1rem;
}
.hoverTime:hover:before {
    color: darkred;
}
.v-application a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 500;
}
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined){
   bottom: 100px;
   right: 47%
}
.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
    margin: 2rem 0rem;
}
</style>

<style>
li {
    list-style: none;
}
.stylePagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    list-style: none;
}
.v-application ul, .v-application ol {
    padding-left: 0rem;
}
.stylePagination li a {
    color:rgba(0, 0, 0, 0.8);
    margin: 0rem 1rem;
    font-weight: 500;
    font-size: 1.1rem;
}
.stylePagination .active a {
    color: rgb(79, 212, 79);
    text-decoration: underline;
}
</style>