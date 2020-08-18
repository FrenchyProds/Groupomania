<template>
    <v-container>
        <indexhead/>
        <v-card-title class="text-center">
            Règlement interieur
        </v-card-title>
        <p>
            Le réseau social Groupomania a pour objectif de développer une communauté internet
            conviviale autour de notre enseigne et de son actualité, et de donner l’occasion à cette communauté
            de se rencontrer au sein d'un espace public d'échange d'opinions, d'idées ou de connaissances.
            La présente Charte d’utilisation a été élaborée afin de préciser aux utilisateurs
             les conditions pour une utilisation paisible et conviviale des espaces d’échanges de
            cette application.
            L’utilisateur, par le fait de créer un compte, accepte pleinement et
            sans aucune réserve la présente charte d’utilisation, et s’engage, lors de chacune de ses visites sur
            cette application, à la respecter. 
        </p>
        <li class="text-center">
            <a href='#delete' v-smooth-scroll><ul>
                Suppression des contributions et désinscription
            </ul></a>
            <a href="#obligations" v-smooth-scroll><ul>
                Droits et devoirs des utilisateurs
            </ul></a>
            <a href="#moderation" v-smooth-scroll><ul>
                Modération
            </ul></a>
            <a href="#signalement" v-smooth-scroll><ul>
                Responsabilité 
            </ul></a>
            <a href="#sanctions" v-smooth-scroll><ul>
                Sanctions
            </ul></a>
        </li>

        <h4 id="delete" class="text-center">Suppression des contributions et désinscription</h4> 
        <p>
            En tant qu’utilisateur, vous pouvez à tout moment supprimer vos propres contributions (publications et commentaires).
            A tout moment, l’utilisateur peut supprimer son compte en se rendant sur son profil et en cliquant sur "Supprimer mon compte" 
        </p>

        <v-divider class="divider"/>

        <h4 id="obligations" class="text-center">Droits et devoirs des utilisateurs</h4>
        <p>
            En devenant utilisateur de notre réseau social, vous vous engagez notamment à ce
            que le contenu de vos contributions respecte les lois et règlements en vigueur, ne soit pas contraire à
            l‘ordre public ou aux bonne mœurs, et ne porte pas atteinte aux droits de personnes.
            Nous vous rappelons que vous êtes tous collègues, et que nous nous attendons à vous voir vous comporter avec respect 
            et gentillesse à l'égard de tous.
            A ce titre il vous est interdit de publier des contributions dont le contenu : 
        </p>
        <li>
            <ul>
                Serait contraire ou susceptible d’être contraire à l’ordre public, aux bonnes mœurs ou aux
                lois et règlements en vigueur.
                A ce titre, sont interdites notamment, sans que cette liste soit limitative : 
            </ul>
            <ul>
                Les contributions à caractère violent, dénigrant, diffamatoire, injurieux, illicite,
                obscène, pornographique, pédophile ; 
            </ul>
            <ul>
                Les contributions à caractère politique ou incitant à la violence, au suicide, au
                révisionnisme, à l’antisémitisme ;
            </ul>
            <ul>
                Les contributions faisant l’apologie des crimes de guerre ou des crimes contre
                l’humanité ; 
            </ul>
            <ul>
                Les contributions appelant au meurtre ou incitant à la commission d’un délit ; 
            </ul>
            <ul>
                Les contributions incitant à la discrimination ou à la haine. 
            </ul>
            <ul>
                Serait injurieux, grossier, vulgaire, ou de nature à heurter la sensibilité des utilisateurs 

            </ul>
            <ul>
                Porterait atteinte ou serait susceptible de porter atteinte à l’image ou à la réputation d’une
                marque ou d’une personne physique ou morale 
            </ul>
        </li>

        <v-divider class="divider"/>

        <h4 id="moderation" class="text-center">Modération</h4>
        <p>
            L’espace de discussion constitué par l'application Groupomania est modéré a
            posteriori dans le but d’une utilisation paisible de cette application et de permettre des échanges
            constructifs entre les utilisateurs
            En devenant membre, vous reconnaissez la possibilité pour
            le modérateur de contrôler les contributions et de supprimer à tout moment, toute
            contribution.
            Le modérateur pourra supprimer discrétionnairement toute contribution contraire à ce qui
            est prescrit dans la charte d'utilisation, ou que le modérateur jugerait non
            conforme à l’esprit d’échange et de convivialité animant l’espace de discussion.
        </p>

        <v-divider class="divider"/>

        <h4 id="signalement" class="text-center">Signalement</h4>
        <p>
            Chaque utilisateur peut à tout moment, si une contribution porte atteinte à ses droits, la signaler à nos modérateurs
            en cliquant sur le bouton "signaler" présent sur chaque publication, commentaire et profil. Nos modérateurs s'occuperont
            ensuite de modérer la contribution si elle s'avère en non-adéquation avec notre règlementation. 
        </p> 

        <v-divider class="divider"/>

        <h4 id="sanctions" class="text-center">Sanctions</h4>
        <p>
            Le réseau social étant avant tout un réseau social d'entreprise, le comportement de chacun devra être en adéquation avec
            les valeurs de Groupomania. Tout manquement entraînera des sanctions, plus ou moins graves en fonction de la sévérité du 
            manquement
        </p>
        <li>
            <ul>
                En cas d'insultes / injures / publication ou commentaire douteux, les modérateurs seront à même de vous bannir de l'application
                pendant une certaine durée.
            </ul>
            <ul>
                En cas de manquement grave, les sanctions ne limiteront pas au réseau. L'image que vous représentez en ligne est celle que 
                vous donnez au travail. Si vous dépassez les limites sur le réseau social Groupomania, nous pourrons utiliser ceci contre vous 
                et procéder à des sanctions au travail :
            </ul>
            <ul>
                Dans les cas les moins graves, un avertissement ainsi que des travaux d'intérêt général
                Dans les cas les plus graves, un licenciement, voir une plainte.
            </ul>
        </li>


        <div class="clear"></div>
        <modifiedfoot/>
    </v-container>
</template>

<script>

import indexhead from '../headers/indexhead'
import modifiedfoot from '../footers/modifiedfoot'

export default {
    components: {
        indexhead,
        modifiedfoot,
    } 
}
</script>

<style scoped>

body {
    scroll-behavior: smooth;
}

* {
    word-break: normal;
    list-style: none;
}

ul {
    padding: 0.5rem 0rem;
}

.divider {
    padding: 0.5rem 0rem;
    margin-top: 1rem;
}

.text-center {
    justify-content: center;
    padding: 1rem 0rem;
}

.clear { clear: both; height: 150px; }

</style>