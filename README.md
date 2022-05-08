# proiect-iOS: Cat-Mania

# Cum instalez ?

https://reactnative.dev/docs/environment-setup

# Cum functioneaza ?

Pornesti aplicatia -> vei primi imagini random cu pisici.

Ai posibilitatea sa le salvezi pentru a le vizualiza mai tarziu folosind unul dintre butoanele de reactii ("funny" sau "aww").

Daca te razgandesti, poti efectua modificari asupra colectiei tale.

Daca doresti sa primesti o poza cu o pisica dintr-o rasa specifica, poti utiliza search bar-ul.

# Ce cerinte am incercat sa ating ?

1. Cerintele cu operatii pe baze de date. Am utilizat SQLite pentru a crea o baza de date locala prin intermediul careia salvez link-urile imaginilor cu pisici. Am implementat operatiile: de inserare/creare (adaugare in colectie), de editare (din colectie si din primul ecran), de stergere (din colectie), si de citire (citirea tuturor pozelor respectiv pe categorii)

2. Apelarea unui API. Am folosit TheCatAPI unde am apelat doua end-point-uri: unul pentru a obtine o poza cu o pisica random si unul pentru a obtine toate rasele de pisici (folosesc cel de al doilea call pentru a determina daca utilizatorul a introdus o rasa de pisica existenta)

3. Implementare UICOllectionView. Am utilizat ```<Flatlist />```, echivalentul in React-Native.

4. Clean code. Am structurat componentele de UI in componente de React-Native asa incat structura sa fie usor de inteles, minimalizand numarul de props transmise intre componente. De asemenea, am utilizat .prettier pentru a aranja codul si am adaugat comentarii relevante.

5. Incarcarea proiectului pe github.
