# Swapp
Plateforme de vente et d'achat de vêtements d'occasion entre particuliers.


## Choix du sujet
Dans notre quotidien, les plateformes d’achat et de revente d’articles de seconde main, comme Vinted, prennent une place importante. En tant qu'utilisatrices régulières de ces services pour acheter et revendre des vêtements et accessoires que nous n'utilisons plus, nous avons constaté qu’elles pouvaient avoir un impact environnemental conséquent malgré leur objectif de promouvoir la réutilisation. Cela est dû à la forte demande en infrastructure numérique et au nombre d'interactions qu'elles nécessitent. 

L'essor des plateformes de seconde main s'inscrit dans une dynamique plus large d'économie circulaire. 73 % des Français ont déclaré avoir acheté un produit d'occasion au cours des 12 derniers mois (source : [ENOV](https://enov.fr/blog/actus/marche-de-la-seconde-main-2023)). Ces services jouent un rôle crucial dans la lutte contre la surconsommation et la réduction des déchets, mais leur impact écologique lié à leur utilisation numérique mérite d’être examiné pour optimiser leurs bénéfices.

## Utilité sociale
Les services de vente et d'échange d'articles de seconde main jouent un rôle social essentiel en réduisant les déchets et en prolongeant la durée de vie des objets. En facilitant les échanges entre particuliers, ces plateformes luttent activement contre la culture du jetable et la surproduction, notamment dans des secteurs à fort impact environnemental comme la mode, où la fast fashion est régulièrement pointée du doigt. 

Elles offrent une alternative à la consommation de produits neufs, plus durable et accessible, tout en permettant aux utilisateurs de générer un revenu complémentaire en revendant des articles qu'ils n'utilisent plus. Ces services sont également un levier d’inclusion économique, permettant à un large public d'acquérir des biens de qualité à prix réduits. En favorisant la réutilisation et l'échange, ils soutiennent la transition vers une économie circulaire, où les ressources sont mieux exploitées. 

Enfin, ces plateformes renforcent les liens sociaux en créant des communautés d'utilisateurs partageant des centres d'intérêt communs, et en facilitant les échanges locaux, promouvant ainsi des pratiques de consommation plus collaboratives et solidaires.


## Effets de la numérisation
La numérisation de la vente et de l’échange d’articles de seconde main a permis de démocratiser l'accès à ce type de services et de créer des communautés massives d'acheteurs et de vendeurs. Des millions de transactions sont réalisées chaque année via ces plateformes. Bien que ça n’ait pas été l’objectif, un effet rebond s’est installé : là que l’échange fiable de biens qualitatifs à coûts dérisoires est facilité, les utilisateurs consomment plus que jamais. Du côté des vendeurs, il est probable que l'argent obtenu par la vente ne soit pas épargné, mais réinjecté dans des achats, qu’ils soient d'occasion ou neufs, ce qui compromet l'idée d'une véritable économie circulaire. Cette démesure s’illustre sur Vinted par la création de comptes “pro” d’utilisateurs qui capitalisent sur ce commerce (source : [Le Parisien](https://www.leparisien.fr/etudiant/vie-etudiante/a-20-ans-ils-gagnent-tous-les-mois-plusieurs-milliers-deuros-grace-a-vinted-PRLCSUNQ45BNFFM5GM7HASBVRI.php)).

D’autre part, chaque interaction numérique, qu'il s'agisse de la consultation des annonces, de l'envoi de messages, ou de la gestion des paiements et expéditions, a un coût écologique.L'impact environnemental d'une annonce en ligne peut sembler négligeable au premier abord, mais lorsqu'on considère les millions d'utilisateurs actifs et les multiples images, descriptions et requêtes serveur générées, cela devient significatif. De plus, des mécanismes incitatifs (comme les notifications push et les algorithmes de recommandation) poussent les utilisateurs à passer plus de temps sur la plateforme, augmentant ainsi leur empreinte numérique. La facilité d'achat en ligne peut parfois inciter à une surconsommation numérique, réduisant ainsi l'impact positif initial de la seconde main.

# Scénarios d'usage et impacts
Nous faisons l'hypothèse que les utilisateurs visitent les plateformes de vente d'articles de seconde main lors de moments opportunistes, que ce soit pendant leurs pauses, dans les transports en commun ou à la maison. Ces visites peuvent être motivées par la recherche d'articles spécifiques, la découverte de bonnes affaires ou la consultation de nouveautés.

## Scénario 1 : "Consulter les articles de la page de recherche"
1. L’utilisateur va pour la première fois sur le site.
2. Il accepte les cookies.
3. L’utilisateur accède à la page de recherche où sont affichés les articles les plus récents ou les articles mis en avant.
4. Il scrolle jusqu’en bas.

## Scénario 2 : "Rechercher des articles spécifiques et rajouter l'un des articles dans le panier"
1. L’utilisateur clique sur la barre de recherche et entre le mot-clé “veste en cuir”.
2. Il clique sur "Rechercher" et attend les résultats.
3. Il clique sur un filtre de prix.
4. Il entre 0 en prix minimum.
5. Il entre 50 en prix maximum.
6. Il parcourt la liste des résultats affichés.
7. Cliquer sur une annonce
8. Ajouter au panier (Cliquer “acheter” sur Vinted)

## Scénario 3 : "Déposer une annonce" 
1. L’utilisateur clique sur le bouton pour déposer une annonce
2. Il ajoute une photo.
3. Il ajoute une description.
4. Il écrit des détails (taille, …)
5. Il poste  l’annonce.

# Maquettage & données
Afin de limiter au maximum l'afflux de données inutile, nous avons choisi de mettre en place une page d'accueil sans scroll, dans laquelle il est possible de sélectionner une catégorie ou taper un élément spécifique dans le champ de saisie. 

![Maquette page d'accueil](mockups/MockupHomepage.png)
Fig1 : maquette de la page d'accueil

Cette même idée est poursuivie dans la page de recherche. Les items sont donc à minima triés par catégorie, afin de limiter les données à récupérer. Il est possible de pousser la recherche en lançant une recherche par mot clef ou en précisant un état, une taille, une couleur, un prix, sa localisation.

![Maquette page de recherche](mockups/MockupSearch.png)
Fig2 : maquette de la page de recherche

Le nombre d'images admis par item est de 4, à la taille maximale de 1Mo.

![Maquette page de détails d'un item](mockups/MockupItem.png)
Fig3 : maquette de la page descriptive d'un élément

L'échantillon de données a été créé par dummy-json selon les attributs de catégorie, état, taille, couleur, prix et localisation évoqués préalablement.


# Prototypes

## Prototype 1
Pour ce premier prototype, nous mettons en place les scripts nécessaires au déroulé du scénario 1. Nous créons et mettons à jour dynamiquement en React une grille de résultats en fonction d'un mot clef, à partir de données statiques stockées dans sample_data.json. Seule la barre de recherche est pour l'instant fonctionnelle.

![Prototype 1 - Screenshot de la page d'accueil](screenshots/prototype1_home.png)
Fig4 : Prototype 1 - Screenshot de la page d'accueil

![Prototype 1 - Screenshot de la page de recherche](screenshots/prototype1_search.png)
Fig5 : Prototype 1 - Screenshot de la page de recherche

Le nombre d'éléments à récupérer par recherche n'est pas encore établi, mais le sera au prototype suivant. Il ne sera alors possible que d'afficher 20 éléments à la fois.