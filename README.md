# JEU DEMINEUR
### CONVENTION D'ECRITURE
Choix de convention : camelCase

### LES ETAPES
- Affichage d'un formulaire pour construire la requete à l'API fournie.
- Connexion à l'API et réception d'un tableau
- Fonction reverseSign() pour transformer le tableau d'origine pour que les bombes soint représentées par des '-1'.
- Fonction fillDatas() pour remplir le tableau avec les différentes valeur représentées par le nombre de bombes autour. Et pour cela on appelle la fonction checkMines().
- Fonction checkMines() va compter le nombre de bombes autour d'une case.
- Fonction dataToHTML() qui va générer la grille HTML et injecter la valeur de la case en data-value.

Ensuite au clic sur chaque case à l'aide d'un addEventListener, on va faire apparaitre soit une valeur avec data-value soit une mine.

Si on clique sur la mine cela déclenche les conditions de défaite.


