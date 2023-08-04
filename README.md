# JEU DEMINEUR ![Logo du jeu](./public/img/mine2.png)

### LES CONVENTIONS D'ECRITURE
Choix des conventions : 
- camelCase => Fichiers JS
- Kebab Case => Fichiers HTML / CSS

----------------------------------------------------------------

### LE CHOIX DU DECOUPAGE DES FICHIERS

On retrouve les différents répertoires et un fichier 'index.html' à la racine du projet: 
- **CSS** => avec un fichier CSS pour la feuille de style du jeu
- JS:
  - **Game.js** => Fonctionnalités principales du jeu
  - **PLayer.js** => Fonctionnalités des affichages liés aux joueurs
  - **Tools.js** => Fichiers de fonctions utilitaires
- **public** => Regroupant toutes les images du projet

### LES ETAPES DE REFLEXION

0. On initialise à 0 les variables en session liées à la partie (tryNbr, loseNbr et winNbr)
1. Affichage d'un formulaire pour saisir dynamiquement des valeurs pour le nombre de lignes, de colonnes
et de mines.
2. Vérification du formulaire avec la méthode **checkForm()** avec Regexp pour pseudo.
3. Création d'une instance **game** puis connexion à l'API pour réception du tableau
de données dès qu'on clique sur le bouton start en addEventListener.
4. Fonction utilitaire pour inverser le signe **reverseSign()** des nombres du tableau pour que les mines
soient affichées avec un '-1' pour limiter les conflits lors de l'incrementation des cases adjacentes.
5. Fonction utilitaire **fillDatas()** qui remplit le tableau avec les valeurs autours des mines
dans tout le tableau en s'appuyant sur la fonction utilitaire **checkMines()**.
On va passer dans chaque case du tableau et vérifier dans les 8 cases autour le nombre de bombes et 
inscrire la valeur dans la case.
6. Méthode **drawArea()** de la classe Game pour afficher la grille en utilisant la fonction utilitaire:
**dataToHTML()** qui va dans chaque case HTML inscrire les coordonnées en dataset index ligne, colonne et la valeur du tableau.

--------------------------------------------------------
Ensuite, nous avons plusieurs addEventListeners pour les interactions avec :
- la gestion de la grille
- les clics gauche et droit
- le bouton des scores
- le bouton des règles du jeu
- le bouton de sauvegarde des scores

--------------------------------------------------------
7. addEventListener GridArea clic gauche : Gestion de l'affichage de la case avec le déclenchement
des conditions de victoire ou de défaite **Game.endGame()** et la prise en charge du clic gauche bloqué sur les cases 
avec un drapeau.
8. addEventListener GridArea clic droit : Gestion de l'affichage des cases drapeau classe **'flag'**.
9. addEventListener pour le bouton des scores : Gestion d'un tableau de scores avec une logique d'afficher 
les résultats des parties en cours et d'utiliser pour cela des valeurs en sessionStorage.
10. addEventListener pour la sauvegarde des scores : Sauvegarde possible des scores en dehors de la session
en saisissant les données en localStorage lorsque l'on clique sur un bouton de sauvegarde des scores.
Ainsi, nous pouvons afficher un tableau avec des scores de différents joueurs.
11. addEventListener pour afficher un panneau des règles du jeu pour expliquer le fonctionnement du jeu
aux joueurs débutants.


