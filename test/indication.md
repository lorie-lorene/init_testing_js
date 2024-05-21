## Software testing
## Test Structure
Avant de faire des test il est important de faire les test manuels:
#  id du test
# description de ce que l'on doit tester 
# on applique le principe du AAA
** Arrange: definition des valeurs de test
** Act : utilisation des fonctionnalités a utiliser
    -importer la fonction 
    -definir son resultat
** Assert: comparaison du resultat actuel au resultat attendu 
----------------------------
# factorisation
application du script
----------------------------
# execution
** npx vitest run -t "test max function"
**"test max function" est la description du test a effectuer
----------------------------
## test triving development

** ecriture des tests avant developpement du code ( le code n'existe pas !):
ecrire un test qui va echouer , ensuite ecrire un code minimal pour visualiser les differents cas de test
    - exemple calculer la moyenne d'un tableau de valeur:
        *decribre
        **test1(retourner  null si le tableau est vide )
        *AAA
        *test Fail? oui car la fonction n'existe pas 
            **creation d'un code minimal(creation d'un tableau)=> ok
        *test2( retourne un element si le tableau est de taille 1)

** cette methode permet de mieux couvrir les lignes de code, car tous les tests toucheront toutes les lignes ecritent
----------------------------

## Using Matchers:robustesse du test
** comparaison avec une exactitude de la chaine mene a  casser un test: mauvais assertion
* exemple: expect(message).toBe("internal server error");

*correction : on peut verifier en fonction d'une expression reguliere
* exemple: expect(message).toBe("/error");
*Matchers:
-toBe
-toEqual
-toBeTruthy
-toBeUndefined
-toMatchObject
-toHaveProperty
-toContain
    ----------------
    exemple : verification de la fonction core.js (getCoupon)
        * verifier si le tableau de retourner contient deux objets
        * verifier si les objets de type code et discount