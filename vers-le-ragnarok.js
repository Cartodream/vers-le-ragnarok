const { CharacterActorSheet } = dnd5e.applications.actor;

const VTR_RUNES = [
  {
    id: 1, nom: "Fehu", symbole: "ᚠ",
    endroit: { titre: "Fortune, succès et bien-être mérités.", effet_aett: "Vous sentez un brusque regain d'optimisme, tout semble se dérouler de la bonne manière.", effet_rune: "Vous gagnez un bonus de +1 aux tests de caractéristique et un 20 naturel est toujours considéré comme un succès." },
    envers:  { titre: "Mal, jalousie, envie.", effet_aett: "Tout semble se dérouler de la bonne manière pour tout le monde, sauf pour vous. Vous êtes jaloux de leurs réussites et anticipez vos propres échecs.", effet_rune: "Vous subissez un malus de -1 aux tests de caractéristique et un 1 naturel est toujours considéré comme un échec." },
    aett: "Freyja", don: "Le don de la vie", presides: "Auðhumla, Freyr et Freyja"
  },
  {
    id: 2, nom: "Ūruz", symbole: "ᚢ",
    endroit: { titre: "Force, courage, initiative.", effet_aett: "Rien dans les Neuf mondes ne peut vous arrêter, vous vivrez pour voir un nouveau jour se lever.", effet_rune: "Vous appliquez votre bonus de maîtrise à vos jets d'initiative." },
    envers:  { titre: "Férocité, agression, addiction.", effet_aett: "La force n'est qu'apparente lorsqu'on la compare à la faiblesse, vous pressentez l'oppression et les abus de pouvoir.", effet_rune: "Vous êtes avantagé lors des tests de Charisme (Intimidation) et des jets d'attaque contre des créatures dont la valeur de Force est inférieure à la vôtre. Vous êtes également désavantagé contre les créatures dont la valeur de Force est supérieure à la vôtre." },
    aett: "Freyja", don: "L'instinct de survie", presides: "Ymir"
  },
  {
    id: 3, nom: "Thurisaz", symbole: "ᚦ",
    endroit: { titre: "Résistance, protection, bonnes décisions.", effet_aett: "Quand éclate le plus violent des orages, il faut s'abriter derrière des murs solides et concevoir de meilleures stratégies.", effet_rune: "Chaque fois que vous subissez des dégâts d'une source unique, vous les réduisez de 1. Si le total des dégâts est réduit à 0 ou moins, vous n'en subissez aucun." },
    envers:  { titre: "Fragilité, confusion, événement imprévu.", effet_aett: "Vous vous sentez abattu, incertain, sans défense, à la merci des événements, toutes vos certitudes s'effondrent comme un mur sans fondations.", effet_rune: "Chaque fois que vous subissez des dégâts d'une source unique, vous les augmentez de 1." },
    aett: "Freyja", don: "La rencontre", presides: "Thor"
  },
  {
    id: 4, nom: "Ansuz", symbole: "ᚨ",
    endroit: { titre: "Guérison, sagesse, inspiration.", effet_aett: "Vous pressentez que de nouvelles idées surgiront au cours de la journée, que des solutions seront trouvées et que chaque nœud sera dénoué.", effet_rune: "Vous gagnez immédiatement de l'inspiration." },
    envers:  { titre: "Tromperie, trahison, égoïsme.", effet_aett: "Vous ne pouvez faire confiance à personne, la trahison et la tromperie vous attendent à chaque tournant.", effet_rune: "Vous ne pouvez pas bénéficier de l'action aider ni être avantagé grâce à d'autres créatures." },
    aett: "Freyja", don: "L'appel", presides: "Odhinn"
  },
  {
    id: 5, nom: "Raido", symbole: "ᚱ",
    endroit: { titre: "Voyage, recherche, nouveaux défis.", effet_aett: "Aujourd'hui, le monde s'étend devant vous, prêt à être exploré, allez simplement où vos pas vous mènent.", effet_rune: "Vous ignorez les terrains difficiles." },
    envers:  { titre: "Ralentissement, renonciation, échec.", effet_aett: "Vous pressentez que la route sera ardue, pleine d'obstacles, de dangers et d'incertitudes. Cela en vaut-il vraiment la peine ? Vous songez à abandonner devant le premier véritable problème.", effet_rune: "Vous ne pouvez pas faire l'action se précipiter ni bénéficier de bonus à votre vitesse de déplacement de base." },
    aett: "Freyja", don: "Le voyage du héros", presides: "les Valkyrjur"
  },
  {
    id: 6, nom: "Kenaz", symbole: "ᚲ",
    endroit: { titre: "Renaissance, compréhension, révélation.", effet_aett: "Tout se passera bien aujourd'hui, tous les problèmes deviendront une opportunité et toutes les épreuves, une chance de s'améliorer.", effet_rune: "Chaque fois que vous ratez un jet de sauvegarde, un jet d'attaque ou un test de caractéristique, vous serez avantagé lors du prochain jet du même type." },
    envers:  { titre: "Ignorance, superficialité, arrogance.", effet_aett: "Aujourd'hui, vous vous sentez bien trop sûr de vous. À cause de cela, vous serez confronté à de nombreux problèmes normalement évitables.", effet_rune: "Chaque fois que vous réussissez un jet de sauvegarde, un jet d'attaque ou un test de caractéristique, vous serez désavantagé lors du prochain jet du même type." },
    aett: "Freyja", don: "Le feu de la transformation", presides: "Surtr"
  },
  {
    id: 7, nom: "Gebo", symbole: "ᚷ",
    endroit: { titre: "Amitié, fraternité, partage, échange, gratitude.", effet_aett: "Ce présage vous rappelle que la nature est une seule et même entité, comme une toile de relations et de liens englobant aussi les humains.", effet_rune: "Vous êtes avantagé lors des tests de Charisme, mais quand un allié près de vous subit des dégâts, vous subissez vous-même un quart de ces dégâts (qui ne peuvent être réduits d'aucune manière)." },
    envers:  { titre: "Amitié, fraternité, partage, échange, gratitude.", effet_aett: "Ce présage vous rappelle que la nature est une seule et même entité, comme une toile de relations et de liens englobant aussi les humains.", effet_rune: "Vous êtes avantagé lors des tests de Charisme, mais quand un allié près de vous subit des dégâts, vous subissez vous-même un quart de ces dégâts (qui ne peuvent être réduits d'aucune manière)." },
    aett: "Freyja", don: "L'échange équitable", presides: "Freyr"
  },
  {
    id: 8, nom: "Wunjo", symbole: "ᚹ",
    endroit: { titre: "Gloire, espoir, harmonie.", effet_aett: "Le soleil est plus radieux aujourd'hui. Il remplit de joie le cœur des hommes, qui se motivent les uns les autres pour en faire davantage.", effet_rune: "Quand vous faites un jet de sauvegarde, vous pouvez utiliser le bonus d'un allié adjacent s'il est supérieur au vôtre." },
    envers:  { titre: "Dépression, solitude, pessimisme.", effet_aett: "Des nuages gris assombrissent le ciel. Ils cachent le soleil et font naître l'effroi dans le cœur des hommes. Les gens se sentent seuls et tristes.", effet_rune: "Quand vous faites un jet de sauvegarde, vous devez utiliser le bonus d'un allié adjacent s'il est inférieur au vôtre." },
    aett: "Freyja", don: "L'émanation divine", presides: "Freyr et Freyja"
  },
  {
    id: 9, nom: "Hagalaz", symbole: "ᚺ",
    endroit: { titre: "Purification, épreuve, chemin connu, libération, reconstruction.", effet_aett: "Vous pressentez que le chemin devant vous mène à la fin de tout ce que vous êtes, pour le meilleur ou pour le pire. La mort n'est pourtant pas la fin, mais une simple étape avant la renaissance.", effet_rune: "Vous êtes désavantagé lors du premier jet de sauvegarde contre la mort que vous faites chaque fois que vos points de vie sont réduits à 0. Cependant, chaque fois que vous réussissez un jet de sauvegarde contre la mort, vous pouvez lancer l'un de vos dés de vie, comme si vous aviez fini un repos court, et vous récupérez un nombre de points de vie égal au résultat obtenu plus votre modificateur de Sagesse. Une fois ce pouvoir utilisé, vous devez terminer un repos court avant de pouvoir le réutiliser." },
    envers:  { titre: "Purification, épreuve, chemin connu, libération, reconstruction.", effet_aett: "Vous pressentez que le chemin devant vous mène à la fin de tout ce que vous êtes, pour le meilleur ou pour le pire. La mort n'est pourtant pas la fin, mais une simple étape avant la renaissance.", effet_rune: "Vous êtes désavantagé lors du premier jet de sauvegarde contre la mort que vous faites chaque fois que vos points de vie sont réduits à 0. Cependant, chaque fois que vous réussissez un jet de sauvegarde contre la mort, vous pouvez lancer l'un de vos dés de vie, comme si vous aviez fini un repos court, et vous récupérez un nombre de points de vie égal au résultat obtenu plus votre modificateur de Sagesse. Une fois ce pouvoir utilisé, vous devez terminer un repos court avant de pouvoir le réutiliser." },
    aett: "Heimdallr", don: "S'écarter du plan", presides: "Urðr"
  },
  {
    id: 10, nom: "Nauthiz", symbole: "ᚾ",
    endroit: { titre: "Résistance, vertu, détermination, force intérieure.", effet_aett: "Vous pressentez une grande adversité sur votre route, mais au plus profond de votre âme, vous êtes prêt à affronter tous les défis que le destin vous réserve.", effet_rune: "Chaque fois qu'un allié, dans votre champ de vision et à 9 m ou moins de vous, voit ses points de vie réduits à 0, vous gagnez un nombre de points de vie temporaires égal à la moitié de votre niveau de personnage et vous êtes avantagé lors du prochain jet de sauvegarde que vous faites avant la fin de votre prochain tour. Une fois ce pouvoir utilisé, vous devez terminer un repos court avant de pouvoir le réutiliser." },
    envers:  { titre: "Résistance, vertu, détermination, force intérieure.", effet_aett: "Vous pressentez une grande adversité sur votre route, mais au plus profond de votre âme, vous êtes prêt à affronter tous les défis que le destin vous réserve.", effet_rune: "Chaque fois qu'un allié, dans votre champ de vision et à 9 m ou moins de vous, voit ses points de vie réduits à 0, vous gagnez un nombre de points de vie temporaires égal à la moitié de votre niveau de personnage et vous êtes avantagé lors du prochain jet de sauvegarde que vous faites avant la fin de votre prochain tour. Une fois ce pouvoir utilisé, vous devez terminer un repos court avant de pouvoir le réutiliser." },
    aett: "Heimdallr", don: "Affronter la douleur", presides: "Heimdallr"
  },
  {
    id: 11, nom: "Isaz", symbole: "ᛁ",
    endroit: { titre: "Moment de réflexion, se concentrer sur les objectifs, séparation, limitation.", effet_aett: "Vous réalisez brusquement que nous sommes seuls au monde. Vous devez prendre un moment pour bien réfléchir au sens de votre vie.", effet_rune: "Quand vous tombez à 0 point de vie, vous pouvez faire un jet de sauvegarde de Sagesse au lieu du jet de sauvegarde contre la mort habituel, avec un DD normal (10 le plus souvent)." },
    envers:  { titre: "Moment de réflexion, se concentrer sur les objectifs, séparation, limitation.", effet_aett: "Vous réalisez brusquement que nous sommes seuls au monde. Vous devez prendre un moment pour bien réfléchir au sens de votre vie.", effet_rune: "Quand vous tombez à 0 point de vie, vous pouvez faire un jet de sauvegarde de Sagesse au lieu du jet de sauvegarde contre la mort habituel, avec un DD normal (10 le plus souvent)." },
    aett: "Heimdallr", don: "L'esprit sans entraves", presides: "Búri"
  },
  {
    id: 12, nom: "Jera", symbole: "ᛃ",
    endroit: { titre: "Nature cyclique du temps, patience, contrôle, récolte, processus.", effet_aett: "Vous vous représentez la nature cyclique du monde et comprenez que chaque fleur qui dépérit permet la naissance d'une vie nouvelle.", effet_rune: "Quand vous tombez à 0 point de vie, vous êtes désavantagé lors de votre premier jet de sauvegarde contre la mort, mais chaque allié à 9 m ou moins de vous récupère immédiatement 1d6 points de vie (2d6 au niveau 6, 3d6 au niveau 10, 4d6 au niveau 17 et 5d6 au niveau 20). Une fois ce pouvoir utilisé, vous devez terminer un repos court avant de pouvoir le réutiliser." },
    envers:  { titre: "Nature cyclique du temps, patience, contrôle, récolte, processus.", effet_aett: "Vous vous représentez la nature cyclique du monde et comprenez que chaque fleur qui dépérit permet la naissance d'une vie nouvelle.", effet_rune: "Quand vous tombez à 0 point de vie, vous êtes désavantagé lors de votre premier jet de sauvegarde contre la mort, mais chaque allié à 9 m ou moins de vous récupère immédiatement 1d6 points de vie (2d6 au niveau 6, 3d6 au niveau 10, 4d6 au niveau 17 et 5d6 au niveau 20). Une fois ce pouvoir utilisé, vous devez terminer un repos court avant de pouvoir le réutiliser." },
    aett: "Heimdallr", don: "La voie du cosmos", presides: "Sif"
  },
  {
    id: 13, nom: "Eihwaz", symbole: "ᛇ",
    endroit: { titre: "Capacité défensive, fiabilité, intelligence, capacité préventive.", effet_aett: "Le temps et l'espace sont peu de chose pour ceux capables de voyager avec leur esprit plutôt qu'avec leur corps.", effet_rune: "Quand vous subissez des dégâts, vous pouvez décider de les ignorer un bref instant. Vous pouvez utiliser votre réaction pour retarder ces dégâts afin de ne les subir qu'à la fin de votre prochain tour. À la fin de votre prochain tour, vous subirez ces dégâts et réduirez de moitié votre vitesse de déplacement pendant un round. Une fois ce pouvoir utilisé, vous devez terminer un repos court avant de pouvoir le réutiliser." },
    envers:  { titre: "Capacité défensive, fiabilité, intelligence, capacité préventive.", effet_aett: "Le temps et l'espace sont peu de chose pour ceux capables de voyager avec leur esprit plutôt qu'avec leur corps.", effet_rune: "Quand vous subissez des dégâts, vous pouvez décider de les ignorer un bref instant. Vous pouvez utiliser votre réaction pour retarder ces dégâts afin de ne les subir qu'à la fin de votre prochain tour. À la fin de votre prochain tour, vous subirez ces dégâts et réduirez de moitié votre vitesse de déplacement pendant un round. Une fois ce pouvoir utilisé, vous devez terminer un repos court avant de pouvoir le réutiliser." },
    aett: "Heimdallr", don: "Le voyage spirituel", presides: "Hel et Ullr"
  },
  {
    id: 14, nom: "Perth", symbole: "ᛈ",
    endroit: { titre: "Joie, destinée, chance.", effet_aett: "Une profonde méditation vous a permis de véritablement comprendre le sens de la vie et les plus intimes secrets du monde. Cet éveil et cette compréhension des flux du destin vous procurent un véritable et profond sentiment de joie.", effet_rune: "Quand vous obtenez un 1 naturel sur l'un de vos jets d'attaque, jets de sauvegarde ou tests de caractéristique, vous pouvez le changer et considérer que vous avez obtenu un 10. Ceci peut changer l'effet." },
    envers:  { titre: "Tristesse, illusion, découragement.", effet_aett: "Votre méditation n'a pas donné les résultats attendus, peut-être que vous avez mal interprété les signes et les symboles ou que votre esprit n'était pas prêt. Vous avez mal compris leur signification et vous vous sentez à présent abattu et triste.", effet_rune: "Quand vous obtenez un 20 naturel sur l'un de vos jets d'attaque, jets de sauvegarde ou tests de caractéristique, vous devez le changer et considérer que vous avez obtenu un 10. Ceci peut changer l'effet. Si vous avez changé un jet d'attaque, l'attaque n'est pas une réussite garantie, mais vous infligez toujours des dégâts critiques." },
    aett: "Heimdallr", don: "Le jeu du destin", presides: "Vé"
  },
  {
    id: 15, nom: "Algiz", symbole: "ᛉ",
    endroit: { titre: "Connexion divine, éveil, succès.", effet_aett: "Votre esprit et votre âme s'ouvrent pour atteindre un état de conscience supérieur et entrent en contact avec les entités qui contrôlent le sort de l'humanité. Elles sont contentes de vous et récompensent votre foi.", effet_rune: "Quand vous subissez un coup critique, vous bénéficiez d'une résistance contre cette attaque en particulier. Une fois ce pouvoir utilisé, vous devez terminer un repos court avant de pouvoir le réutiliser." },
    envers:  { titre: "Perte de faveur, vulnérabilité, danger.", effet_aett: "Vous tentez de toutes vos forces d'élever votre esprit vers des plans supérieurs, ceux où vivent les dieux. Malheureusement, ceux-ci n'apprécient pas votre intrusion et vous savez qu'ils vous châtieront pour cette transgression.", effet_rune: "Quand une créature vous attaque et qu'elle est avantagée, cette attaque vous inflige 1d6 dégâts supplémentaires." },
    aett: "Heimdallr", don: "L'espace sacré", presides: "Baldr"
  },
  {
    id: 16, nom: "Sowilo", symbole: "ᛊ",
    endroit: { titre: "Pouvoir, précipitation, énergie, colère, feu purificateur.", effet_aett: "Votre périple était ardu, avec plein de croisements, mais vous devez à présent faire le choix ultime, celui qui fera pencher votre âme vers le bien ou le mal. Vous tremblez, mais vous savez quel sera le bon choix.", effet_rune: "Quand vous subissez des dégâts infligés par une créature, vous pouvez utiliser votre réaction pour lancer un certain nombre de vos dés de vie. Vous réduisez les dégâts d'un montant égal au résultat obtenu plus votre modificateur de Sagesse (s'il est positif) et infligez à l'agresseur ce même montant en dégâts radiant ou nécrotiques. Vous pouvez utiliser jusqu'à la moitié de vos dés de vie restants de cette façon (1 au minimum). Une fois ce pouvoir utilisé, vous devez terminer un repos court avant de pouvoir le réutiliser." },
    envers:  { titre: "Pouvoir, précipitation, énergie, colère, feu purificateur.", effet_aett: "Votre périple était ardu, avec plein de croisements, mais vous devez à présent faire le choix ultime, celui qui fera pencher votre âme vers le bien ou le mal. Vous tremblez, mais vous savez quel sera le bon choix.", effet_rune: "Quand vous subissez des dégâts infligés par une créature, vous pouvez utiliser votre réaction pour lancer un certain nombre de vos dés de vie. Vous réduisez les dégâts d'un montant égal au résultat obtenu plus votre modificateur de Sagesse (s'il est positif) et infligez à l'agresseur ce même montant en dégâts radiant ou nécrotiques. Vous pouvez utiliser jusqu'à la moitié de vos dés de vie restants de cette façon (1 au minimum). Une fois ce pouvoir utilisé, vous devez terminer un repos court avant de pouvoir le réutiliser." },
    aett: "Heimdallr", don: "Le pouvoir", presides: "Sól"
  },
  {
    id: 17, nom: "Teiwaz", symbole: "ᛏ",
    endroit: { titre: "Bonne direction, victoire, vertu.", effet_aett: "Aujourd'hui, vous savez que vous allez avancer comme un père qui protège ses enfants, comme un guerrier qui défend sa patrie, comme un homme vertueux qui affronte le mal.", effet_rune: "Quand vous obtenez un coup critique, vous pouvez utiliser votre réaction pour faire une unique attaque d'arme ou pour lancer un tour de magie nécessitant un jet d'attaque." },
    envers:  { titre: "Sanction, malhonnêteté, défaite.", effet_aett: "La bravoure peut très vite devenir de l'arrogance, la volonté de protéger ce que vous aimez de la suffisance, et la force des atermoiements.", effet_rune: "Quand vous subissez un coup critique, vous devez réussir un jet de sauvegarde de Charisme (DD égal à la moitié des dégâts que vous venez de subir) ou vous êtes neutralisé jusqu'à la fin de votre prochain tour." },
    aett: "Týr", don: "L'ordre universel", presides: "Týr"
  },
  {
    id: 18, nom: "Berkana", symbole: "ᛒ",
    endroit: { titre: "Fertilité, désir, amour.", effet_aett: "Aujourd'hui, partout où vous regardez, vous voyez se répandre une nouvelle vie pleine de fertilité, subtile, mais irrépressible, comme un nouvel éveil des sens.", effet_rune: "Vous pouvez utiliser votre action pour soigner chaque créature dans un rayon de 3 m autour de vous (vous y compris) d'un nombre de points de vie égal à 1d6 + votre modificateur de Charisme, jusqu'à un maximum égal à la moitié de votre maximum de points de vie. Une fois ce pouvoir utilisé, vous devez terminer un repos court avant de pouvoir le réutiliser." },
    envers:  { titre: "Immaturité, anxiété, abandon.", effet_aett: "Vous constatez à quel point vous êtes incompétent et vous vous sentez comme un fruit vert face à la vie forte et florissante qui vous entoure.", effet_rune: "Vous pouvez utiliser votre action bonus pour dépenser un dé de vie comme si vous veniez de terminer un repos court. Cependant, vous devez réduire de moitié le résultat de tous les dés de vie que vous lancez." },
    aett: "Týr", don: "Le lien des mondes", presides: "Frigg"
  },
  {
    id: 19, nom: "Ehwaz", symbole: "ᛖ",
    endroit: { titre: "Amélioration, coopération, union.", effet_aett: "Vous voyez les liens et relations invisibles entre chaque chose, chaque créature, ainsi que les forces de la nature elles-mêmes. Le monde est plus grand que la somme de ses parties... tout comme vous.", effet_rune: "Lors d'un repos court, vous et jusqu'à six de vos alliés peuvent se prendre la main et méditer ensemble pendant une heure. Ceux qui participent à cette méditation sont désavantagés lors des tests de Sagesse (Perception) et ne peuvent surveiller efficacement les environs. Pour chaque dé de vie dépensé à la fin du repos court, l'un de vos alliés récupère un nombre supplémentaire de points de vie égal à votre modificateur de Sagesse (1 au minimum). En même temps, vous récupérez un nombre supplémentaire de points de vie égal au nombre de participants formant le cercle de méditation." },
    envers:  { titre: "Précipitation, inhibition, désaccord.", effet_aett: "Même si vous tentez autant que possible de voir les choses différemment, vous devez accepter le fait que toute chose dans la nature s'oppose à une multitude d'autres choses. Pour chaque lien nouveau, beaucoup d'autres disparaissent. La nature est en perpétuel conflit. L'harmonie est une illusion.", effet_rune: "Effet négatif supérieur : chaque fois que vous déterminez l'initiative, vous pouvez dépenser un certain nombre de dés de vie. Pour chaque dé de vie dépensé, vous gagnez un bonus au jet d'initiative égal à votre modificateur de Sagesse (1 au minimum)." },
    aett: "Týr", don: "L'harmonie des opposés", presides: "Sleipnir"
  },
  {
    id: 20, nom: "Mannaz", symbole: "ᛗ",
    endroit: { titre: "Ouverture d'esprit, conscience, fraternité.", effet_aett: "Dans un moment de totale lucidité, vous comprenez votre place dans le monde et savez à quel point celle-ci est en adéquation avec vous-même. Vous êtes le centre, mais vous êtes aussi tout ce qui gravite autour. L'univers s'autoanalyse et votre conscience fait de même.", effet_rune: "Quand vous faites un jet de sauvegarde contre un effet invisible, vous pouvez utiliser votre réaction pour être avantagé lors du jet. Une fois ce pouvoir utilisé, vous devez terminer un repos court avant de pouvoir le réutiliser." },
    envers:  { titre: "Préjugice, rigidité, fanatisme.", effet_aett: "Qui êtes-vous ? Quel est le sens de VOTRE vie ? La réalité est-elle aussi insignifiante qu'il y paraît ? Peut-être que non, peut-être qu'elle n'est pas aussi futile et dénuée de sens... peut-être est-ce vous qui l'êtes. Vous pouvez observer ceux qui découvrent, ravis, la place glorieuse qu'ils occupent dans le grand ordre des choses et vous avez l'impression d'être un mauvais vers dans le grand poème du cosmos.", effet_rune: "Chaque fois que vous infligez des dégâts, vous infligez 1 dégât supplémentaire du même type si le nombre de points de vie actuels de la cible est supérieur au vôtre. Vous infligez 2 dégâts supplémentaires au niveau 11 et 3 au niveau 20. Vous ne pouvez pas terminer votre tour volontairement à 6 m ou moins d'une créature dont le nombre de points de vie actuels est supérieur au vôtre." },
    aett: "Týr", don: "L'homme cosmique", presides: "Heimdallr"
  },
  {
    id: 21, nom: "Laguz", symbole: "ᛚ",
    endroit: { titre: "Intuition, rêve, fantasme.", effet_aett: "Vous voyez la réalité sous-jacente du monde matériel connu et habité par les mortels. Tout est signe ou symbole, rien n'est ce qu'il paraît si l'on se contente de ne regarder que la surface des choses, et seuls les dieux peuvent connaître et comprendre la vérité. Mais vous pouvez aujourd'hui entrepercevoir cette vérité.", effet_rune: "Vous pouvez lancer le sort augure en tant que rituel sans composant matériel. À partir du niveau 11, vous pouvez lancer à la place le sort divination en tant que rituel sans composant matériel." },
    envers:  { titre: "Manque de créativité, confusion, peur.", effet_aett: "Vous avez tenté de projeter votre conscience au-delà du monde matériel pour comprendre sa véritable essence, mais vous n'avez rien appris. Tout semble morne, superficiel, sans aucune signification cachée. Ceci vous effraie, vous plonge dans l'incertitude, ternit les tréfonds de votre âme et vous décourage.", effet_rune: "Au début de chaque combat, vous êtes considéré comme terrorisé par toutes les créatures hostiles que vous percevez. Cet état dure jusqu'au début de votre deuxième tour de combat." },
    aett: "Týr", don: "Le puits du savoir", presides: "Mimir"
  },
  {
    id: 22, nom: "Ingwaz", symbole: "ᛜ",
    endroit: { titre: "Sexualité, fertilité, agriculture, chaleur humaine, abondance.", effet_aett: "Vous sentez une puissante force vitale vous traverser, une vive énergie primordiale, telle une chaleur qui accélère votre rythme cardiaque comme si vous étiez une source d'espoir prête à donner la vie.", effet_rune: "Par une action bonus, vous pouvez dépenser et lancer l'un de vos dés de vie pour soigner un nombre de points de vie égal au résultat obtenu plus votre modificateur de Charisme (1 au minimum) que vous divisez parmi n'importe quel nombre de créatures à 3 m ou moins de vous. Vous gagnez un nombre de points de vie temporaires égal à la moitié du montant soigné." },
    envers:  { titre: "Sexualité, fertilité, agriculture, chaleur humaine, abondance.", effet_aett: "Vous sentez une puissante force vitale vous traverser, une vive énergie primordiale, telle une chaleur qui accélère votre rythme cardiaque comme si vous étiez une source d'espoir prête à donner la vie.", effet_rune: "Par une action bonus, vous pouvez dépenser et lancer l'un de vos dés de vie pour soigner un nombre de points de vie égal au résultat obtenu plus votre modificateur de Charisme (1 au minimum) que vous divisez parmi n'importe quel nombre de créatures à 3 m ou moins de vous. Vous gagnez un nombre de points de vie temporaires égal à la moitié du montant soigné." },
    aett: "Týr", don: "L'avenir de la lignée", presides: "Freyr"
  },
  {
    id: 23, nom: "Othila", symbole: "ᛞ",
    endroit: { titre: "Propriété, famille, héritage.", effet_aett: "Vous voyez clairement, mais brièvement le présent, l'avenir et tout ce qu'il y a entre les deux. Vous voyez ce qu'il adviendra de ce que vous êtes en train de bâtir actuellement, ce que vos efforts produiront et votre contribution au monde.", effet_rune: "Quand vous faites un jet d'attaque ou un test de caractéristique avec un avantage, vous pouvez relancer le dé ayant obtenu le moins bon résultat. Vous devez garder le nouveau résultat, même s'il est moins bon. Une fois ce pouvoir utilisé, vous devez terminer un repos court avant de pouvoir le réutiliser. Vous ne pouvez utiliser ce pouvoir qu'une seule fois par tour." },
    envers:  { titre: "Esclavage, racisme, avidité.", effet_aett: "Une vision de l'avenir trompeuse et pervertie vous remplit de doutes et de suspicions. Vous ne savez pas à qui vous pouvez accorder votre confiance, vous voyez vos soi-disant amis tenter de vous maltraiter et de vous dominer, vous vous méfiez de tout et tous... La seule réponse raisonnable consiste à vous préparer au pire et être le tueur et non la victime le moment venu.", effet_rune: "Quand vous faites un jet d'attaque ou un test de caractéristique avec un avantage, vous ajoutez votre modificateur de Charisme au résultat final (1 au minimum), mais vous soustrayez votre modificateur de Charisme si vous êtes désavantagé lors du jet ou du test (1 au minimum)." },
    aett: "Týr", don: "L'honneur des ancêtres", presides: "Njörðr"
  },
  {
    id: 24, nom: "Dagaz", symbole: "ᛟ",
    endroit: { titre: "Nouveau départ, espoir, croissance, sécurité, illumination.", effet_aett: "Votre voyage à travers les mondes et la réalité, sur les ailes de la conscience et les vents de l'illumination, vous mène au sommet du monde, là où tout paraît simple, petit, et parfaitement agencé dans le grand ordre des choses. Vous êtes à présent prêt à reprendre votre voyage vers l'illumination, mais l'atteinte de ce niveau de compréhension vous a renforcé.", effet_rune: "Quand cette rune est tirée, vous récupérez tous vos points de vie et gagnez un nombre de points de vie temporaires égal à la moitié de votre maximum. Chaque fois que vous finissez un repos court, vous gagnez un nombre de points de vie temporaires égal à la moitié de votre modificateur de Charisme (1 au minimum)." },
    envers:  { titre: "Nouveau départ, espoir, croissance, sécurité, illumination.", effet_aett: "Votre voyage à travers les mondes et la réalité, sur les ailes de la conscience et les vents de l'illumination, vous mène au sommet du monde, là où tout paraît simple, petit, et parfaitement agencé dans le grand ordre des choses. Vous êtes à présent prêt à reprendre votre voyage vers l'illumination, mais l'atteinte de ce niveau de compréhension vous a renforcé.", effet_rune: "Quand cette rune est tirée, vous récupérez tous vos points de vie et gagnez un nombre de points de vie temporaires égal à la moitié de votre maximum. Chaque fois que vous finissez un repos court, vous gagnez un nombre de points de vie temporaires égal à la moitié de votre modificateur de Charisme (1 au minimum)." },
    aett: "Týr", don: "La nouvelle ère", presides: "Dagr"
  }
];


class VtrActorSheet extends CharacterActorSheet {

  static DEFAULT_OPTIONS = foundry.utils.mergeObject(
    CharacterActorSheet.DEFAULT_OPTIONS,
    {
      classes: ["dnd5e", "sheet", "actor", "character", "vertical-tabs", "vtr-sheet"],
      position: { width: 800, height: 1000 },
      actions: {
        rollAsatru: VtrActorSheet.#rollAsatru,
        toggleAsatruProf: VtrActorSheet.#toggleAsatruProf
      }
    },
    { inplace: false }
  );

  static PARTS = CharacterActorSheet.PARTS;

  /** @inheritDoc */
  async _preparePartContext(partId, context, options) {
    context = await super._preparePartContext(partId, context, options);
    if ( partId === "details" ) {
      // Injecter Ásatrú dans les skills
      const actor = this.actor;
      const prof = actor.system.attributes.prof ?? 2;
      const wisMod = actor.system.abilities.wis?.mod ?? 0;
      const asatruProf = actor.getFlag("vers-le-ragnarok", "asatruProf") ?? 0;
      const bonus = Math.floor(prof * asatruProf);
      context.skills.asa = {
        label: "Ásatrú",
        abbreviation: "Ásatrú",
        ability: "wis",
        value: asatruProf,
        baseValue: asatruProf,
        total: wisMod + bonus,
        passive: 10 + wisMod + bonus,
        class: CharacterActorSheet.PROFICIENCY_CLASSES[asatruProf] ?? "none",
        isCustom: true
      };
    }
    if ( partId === "sidebar" ) {
      context.vtrFlags = this.actor.flags?.["vers-le-ragnarok"] ?? {};
      context.passiveAsatru = (() => {
        const prof = this.actor.system.attributes.prof ?? 2;
        const wisMod = this.actor.system.abilities.wis?.mod ?? 0;
        const asatruProf = this.actor.getFlag("vers-le-ragnarok", "asatruProf") ?? 0;
        return 10 + wisMod + Math.floor(prof * asatruProf);
      })();
    }
    return context;
  }

  /** @inheritDoc */
  async _onRender(context, options) {
    await super._onRender(context, options);

    // Ajouter Ásatrú dans la liste des skills si pas déjà présent
    const skillsList = this.element.querySelector(".skills-list");
    if ( skillsList && !skillsList.querySelector("[data-key='asa']") ) {
      const actor = this.actor;
      const prof = actor.system.attributes.prof ?? 2;
      const wisMod = actor.system.abilities.wis?.mod ?? 0;
      const asatruProf = actor.getFlag("vers-le-ragnarok", "asatruProf") ?? 0;
      const bonus = Math.floor(prof * asatruProf);
      const total = wisMod + bonus;
      const profClass = CharacterActorSheet.PROFICIENCY_CLASSES[asatruProf] ?? "none";
      const sign = total >= 0 ? "+" : "";

      const li = document.createElement("li");
      li.className = "skill";
      li.dataset.key = "asa";
      li.innerHTML = `
        <button type="button" class="proficiency-toggle pips ${profClass}" data-action="toggleAsatruProf"
                aria-label="Ásatrú" data-tooltip="Ásatrú">
          <pip-element></pip-element>
        </button>
        <span class="skill-name rollable" data-action="rollAsatru">
          Ásatrú <span class="ability">(SAG)</span>
        </span>
        <span class="skill-mod">${sign}${total}</span>
        <span class="passive">${10 + wisMod + bonus}</span>
      `;
      skillsList.appendChild(li);
    }
  }

  /**
   * Roll Ásatrú skill check.
   * @this {VtrActorSheet}
   */
  static async #rollAsatru(event, target) {
    const actor = this.actor;
    const prof = actor.system.attributes.prof ?? 2;
    const wisMod = actor.system.abilities.wis?.mod ?? 0;
    const asatruProf = actor.getFlag("vers-le-ragnarok", "asatruProf") ?? 0;
    const bonus = Math.floor(prof * asatruProf) + wisMod;
    const roll = await new Roll(`1d20 + ${bonus}`).evaluate();
    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor: "Ásatrú (SAG)"
    });
  }

  /**
   * Toggle Ásatrú proficiency level.
   * @this {VtrActorSheet}
   */
  static async #toggleAsatruProf(event, target) {
    const current = this.actor.getFlag("vers-le-ragnarok", "asatruProf") ?? 0;
    const next = current >= 2 ? 0 : current === 0 ? 1 : 2;
    await this.actor.setFlag("vers-le-ragnarok", "asatruProf", next);
  }
}

globalThis.VtrActorSheet = VtrActorSheet;

class VtrRuneButton extends Application {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "vtr-rune-button",
      template: null,
      popOut: false
    });
  }

  render(force, options) {
    if ( document.getElementById("vtr-rune-button") ) return this;
    const btn = document.createElement("div");
    btn.id = "vtr-rune-button";
    btn.innerHTML = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,5 95,95 5,95" fill="#2c1a0e" stroke="#c88600" stroke-width="4"/>
      <text x="50" y="72" text-anchor="middle" font-size="38" fill="#c8860088">ᚱ</text>
    </svg>`;
    btn.title = "Lancer les runes";
    document.body.appendChild(btn);

    let dragging = false, startX, startY, origX, origY;
    btn.addEventListener("mousedown", e => {
      dragging = false;
      startX = e.clientX; startY = e.clientY;
      origX = btn.offsetLeft; origY = btn.offsetTop;
      const onMove = e => {
        if ( Math.abs(e.clientX - startX) > 3 || Math.abs(e.clientY - startY) > 3 ) dragging = true;
        btn.style.left = origX + (e.clientX - startX) + "px";
        btn.style.top  = origY + (e.clientY - startY) + "px";
        btn.style.right = "auto"; btn.style.bottom = "auto";
      };
      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        if ( !dragging ) this._rollRune();
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    });

    return this;
  }

  async _rollRune() {
    const rune = VTR_RUNES[Math.floor(Math.random() * VTR_RUNES.length)];
    const sens = Math.random() < 0.5 ? "endroit" : "envers";
    const data = rune[sens];
    const sensLabel = sens === "endroit" ? "🔺 À l'endroit" : "🔻 À l'envers";
    const img = `modules/vers-le-ragnarok/runes/${rune.id}.png`;
    const identique = rune.endroit.effet_rune === rune.envers.effet_rune;
    const inverseBlock = (!identique && sens === "envers") ? `
        <hr/>
        <p><strong>Effet inverse de l'ætt de ${rune.aett}</strong><br/>${rune.envers.effet_aett}</p>
        <p><strong>Effet inverse de la rune ${rune.nom}</strong><br/>${rune.envers.effet_rune}</p>
    ` : "";
    const content = `
      <div style="text-align:center;">
        <img src="${img}" style="width:80px;height:80px;border:none;display:block;margin:0 auto;"/>
        <h2 style="margin:4px 0;">${rune.id}. ${rune.nom.toUpperCase()} &mdash; ${sensLabel}</h2>
        <p><em>${rune.don}</em>, présidé par <strong>${rune.presides}</strong>.</p>
        <hr/>
        <p><strong>${data.titre}</strong></p>
        <p><strong>Effet de l'ætt de ${rune.aett}</strong><br/>${data.effet_aett}</p>
        <p><strong>Effet de la rune ${rune.nom}</strong><br/>${data.effet_rune}</p>
        ${inverseBlock}
      </div>
    `;
    ChatMessage.create({ content, speaker: ChatMessage.getSpeaker() });
  }
}

Hooks.once("ready", () => {
  if ( game.user.isGM || game.user.character ) {
    new VtrRuneButton().render(true);
  }
});
Hooks.once("init", () => {
  delete CONFIG.DND5E.skills.dec;
  CONFIG.DND5E.skills.ins.label = "Ásatrú";

  foundry.documents.collections.Actors.registerSheet("dnd5e", VtrActorSheet, {
    types: ["character"],
    makeDefault: false,
    label: "Vers le Ragnarök"
  });
});
