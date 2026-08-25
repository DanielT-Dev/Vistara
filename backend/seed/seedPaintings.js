const mongoose = require("mongoose");
require("dotenv").config();

const Painting = require("../models/Painting");
const Category = require("../models/Category");

// -----------------------------------------------------------------------------
// PAINTINGS DATA (with categories added)
// -----------------------------------------------------------------------------

const paintings = [
  {
    title: "The Death of Socrates",
    artist: "Jacques-Louis David",
    year: 1787,
    medium: "Oil on canvas",
    description:
      `
      Painted in 1787, The Death of Socrates depicts the final moments of the ancient Greek philosopher Socrates, who was sentenced to death by the Athenian government in 399 BC. Accused of corrupting the youth and disrespecting the gods, Socrates was given the choice of abandoning his convictions or drinking poison hemlock. David chooses the moment immediately before Socrates takes the cup. Rather than appearing frightened or defeated, Socrates remains remarkably calm and continues speaking to his followers about the immortality of the soul. The scene is based primarily on Plato’s Phaedo, although David deliberately altered historical details to create a more powerful composition.

      \nThe composition contrasts Socrates' composure with the grief of those around him. His raised finger points upward while his other hand reaches toward the cup, creating a visual connection between his philosophical belief in the soul and the physical act of accepting death. The austere architecture, precise geometry, restrained colors, and strong, clear figures reflect David's Neoclassical style and reinforce the painting's emphasis on reason, discipline, and moral courage. Plato, shown seated at the foot of the bed, was not actually present at Socrates' death, but David includes him as the author whose account inspired the scene.

      \nThe painting ultimately presents Socrates' death as an example of intellectual and moral integrity. He refuses to abandon his principles even when doing so would save his life, and he treats his final moments as another opportunity to teach. Created only a few years before the French Revolution, the work also resonated with contemporary ideas about civic virtue, sacrifice, and resistance to injustice. David transforms the historical execution into a broader meditation on the willingness to remain faithful to one's principles in the face of death.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting1.jpg"],
    tags: ["Neoclassicism", "Philosophy", "Stoicism"],
    categories: ["Neoclassicism", "Philosophy"],
    relatedPaintings: [],
  },
  {
    title: "Reply of the Zaporozhian Cossacks",
    artist: "Ilya Repin",
    year: 1891,
    medium: "Oil on canvas",
    description:
      `
      Painted between 1880 and 1891, Reply of the Zaporozhian Cossacks depicts a legendary episode in which the Zaporozhian Cossacks supposedly compose a deliberately insulting reply to an ultimatum from the Ottoman Sultan. Repin shows the Cossacks gathered around a table, laughing, shouting, and inventing increasingly outrageous insults as they dictate their response. The painting is filled with movement and personality: almost every figure has a different expression, gesture, or reaction, turning the historical subject into a scene of collective humor and camaraderie. Repin worked on the painting for more than a decade and made numerous studies of Cossack figures and costumes while developing it.

      \nRather than presenting the Cossacks as solemn military heroes, Repin emphasizes their irreverence, independence, and refusal to be intimidated by authority. The laughter spreading through the group creates the impression that the men are enjoying the act of defiance itself. Their crowded arrangement and exaggerated facial expressions give the painting an almost theatrical quality, while the enormous canvas allows Repin to fill the scene with individual characters and details.

      \nThe work became one of Repin's best-known paintings and has acquired complicated cultural significance. The Cossacks depicted were associated with the historical Ukrainian Zaporozhian Cossacks, while Repin himself was born in what is now Ukraine and was culturally connected to both Ukrainian and Russian traditions. As a result, the painting has been claimed as part of both Ukrainian and Russian cultural heritage. At its heart, however, the scene celebrates freedom, collective identity, humor, and defiance: the Cossacks respond to an intimidating demand not with submission, but with laughter and an outrageous display of independence.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting2.jpg"],
    tags: ["Realism", "Cossacks", "Humor"],
    categories: ["Realism", "History"],
    relatedPaintings: [],
  },
  {
    title: "Alexander the Great Refuses Water in the Desert",
    artist: "Tom Lovell",
    year: 1960,
    medium: "Oil / Gouache",
    description:
      `
      Tom Lovell's Alexander the Great Refusing Water in the Desert, painted in 1968, illustrates a famous story about Alexander during his campaigns in the East. According to the tradition represented by the painting, Alexander's army was suffering from extreme thirst while crossing a harsh desert. When a small amount of water was brought to Alexander in a helmet or vessel, he refused to drink it because there was not enough water for his soldiers. Instead, he chose to remain thirsty alongside them. The story became an example of Alexander's ability to share the hardships of his army and inspire loyalty through personal sacrifice.

      \nLovell presents the moment as a dramatic image of leadership. Alexander stands at the center of the scene while the precious water is offered to him, surrounded by exhausted soldiers and the immense, unforgiving landscape. The contrast between the small amount of water and the vast desert emphasizes the desperation of the situation. The water represents not simply physical relief but a privilege that Alexander could have claimed for himself; by refusing it, he symbolically places himself on the same level as the men who depend upon him.

      \nThe painting therefore focuses less on Alexander as a conqueror and more on the idea of leadership through self-denial. His refusal suggests that a leader's authority can come from sharing the suffering of those he commands rather than separating himself from them. The episode has become a powerful illustration of selflessness, discipline, and solidarity between a commander and his soldiers. Because Lovell was a twentieth-century historical illustrator, the painting should be understood primarily as his dramatic interpretation of the traditional Alexander story rather than as a literal historical record of the event.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting3.jpg"],
    tags: ["Realism", "Alexander", "Morality"],
    categories: ["History"],
    relatedPaintings: [],
  },
  {
    title: "The Bard",
    artist: "Benjamin West",
    year: 1785,
    medium: "Oil on canvas",
    description: 
    `
    Benjamin West's The Bard is inspired by Thomas Gray's 1757 poem of the same name, which imagines the final Welsh bard confronting the army of King Edward I during the English conquest of Wales. According to the poem, Edward's forces had destroyed the Welsh bards, who represented the cultural memory and identity of the conquered people. The surviving bard stands defiantly before the advancing army, invoking the suffering of Wales and predicting misfortune for Edward's descendants. The story is based on a medieval tradition that is now considered historically unreliable, but it became an important subject for eighteenth- and nineteenth-century artists.

    \nWest presents the bard as a solitary and powerful figure, holding his harp and appearing above the forces of Edward. The contrast between the individual poet and the military power below is central to the image: the army may possess physical strength, but the bard represents something that cannot easily be conquered by force—the memory, language, poetry, and cultural identity of a people. His dramatic posture and windswept appearance give him the character of a prophetic figure rather than an ordinary musician.

    \nThe painting therefore explores the relationship between political power and cultural resistance. Edward's army represents conquest and military authority, while the bard represents the enduring power of art and collective memory. West's treatment of the subject also reflects the growing eighteenth-century fascination with the sublime, heroic emotion, and Celtic history. The image ultimately suggests that political rulers may conquer territory, but the stories, songs, and cultural identity of a people can survive long after the conqueror's power has disappeared.
    `,
    imageUrls: ["http://localhost:5000/paintings/painting4.jpg"],
    tags: ["Romanticism", "Music", "Myth"],
    categories: ["Romanticism"],
    relatedPaintings: [],
  },
  {
    title: "The Chess Players (Die Schachspieler)",
    artist: "Friedrich Moritz August Retzsch",
    year: 1890,
    medium: "Oil on canvas",
    description: 
    `
    Friedrich Moritz August Retzsch's The Chess Players, created in 1831, is a dramatic allegorical scene in which a young man plays chess against the Devil, with an angel watching over the game. The chess match represents a struggle for the man's soul. The young player appears overwhelmed and deeply distressed, resting his head in his hand as he studies the board, while the Devil sits opposite him with an expression of confidence and apparent triumph. The angel stands behind the young man, observing the game but not intervening. Retzsch was a German artist particularly known for his illustrations of Goethe's Faust, and the painting's imagery is closely connected to the Faustian tradition of temptation, moral struggle, and the human soul.

    \nThe chessboard transforms an ordinary game into a symbolic battle between good and evil. Every piece represents a possible decision, and the increasingly desperate position of the young man's king suggests that his choices have brought him dangerously close to defeat. The Devil's apparent certainty contrasts with the man's despair, while the angel's presence introduces another dimension: the possibility of divine protection or salvation. The angel does not physically intervene, leaving the human player to confront the consequences of his own choices.

    \nThe painting's enduring power comes from the feeling that the game may already be lost, while still leaving the viewer wondering whether the situation is truly hopeless. It can be interpreted as a representation of temptation, addiction, despair, moral failure, or the struggle between destructive and virtuous forces within a person. The chess game therefore becomes a metaphor for life itself: choices accumulate, consequences follow, and what initially appears to be an inevitable defeat may still contain possibilities that the desperate player has failed to recognize. A later legend famously connected the painting with the chess master Paul Morphy, who supposedly examined the position and discovered that the young man still had a winning move, although this story is generally treated as a legend rather than established historical fact.
    `,
    imageUrls: ["http://localhost:5000/paintings/painting5.jpg"],
    tags: ["Symbolism", "Allegory", "Morality"],
    categories: ["Symbolism"],
    relatedPaintings: [],
  },
  {
    title: "Daniel in the Lion's Den",
    artist: "Briton Rivière",
    year: 1872,
    medium: "Oil on canvas",
    description: 
    `Briton Rivière's 1890 painting, often titled Daniel's Answer to the King, depicts the biblical story of Daniel in the lions' den. According to the Book of Daniel, Daniel was punished for continuing to pray to God after King Darius issued a decree forbidding prayer to anyone except the king. He was thrown into a den of lions, but according to the biblical account, God protected him and the lions did not harm him. Rivière captures Daniel not during a moment of physical struggle, but in the quiet aftermath of his ordeal.

    \nDaniel stands calmly within the dark stone enclosure while several lions surround him. A shaft of light enters from above, illuminating Daniel and contrasting sharply with the shadows of the den. The lions are remarkably restrained rather than violently attacking him, making the scene feel almost unnaturally peaceful. Daniel's upward gaze and composed posture emphasize his faith and suggest that his attention is directed toward God rather than toward the danger surrounding him.

    \nThe painting's central theme is therefore faith in the face of apparently overwhelming danger. The lions represent physical power and death, while Daniel's calmness represents spiritual conviction and trust. Rivière's detailed depiction of the animals makes their potential violence especially clear, which makes Daniel's serenity even more striking. The dramatic contrast between darkness and light reinforces the idea of divine protection and hope emerging from an apparently hopeless situation. The work ultimately presents courage not as the absence of fear, but as the ability to remain faithful and composed when confronted by forces that seem impossible to overcome. The painting is held by Manchester Art Gallery.
    `,
    imageUrls: ["http://localhost:5000/paintings/painting6.jpg"],
    tags: ["Biblical", "Faith", "Realism"],
    categories: ["Religion", "Realism"],
    relatedPaintings: [],
  },
  {
    title: "The Knight in the Enchanted Garden",
    artist: "Armand Point",
    year: 1895,
    medium: "Oil on canvas",
    description:
      `
      Armand Point's The Knight in the Enchanted Garden evokes the world of medieval romance and Symbolist fantasy, placing a solitary knight within an idyllic and mysterious garden. Rather than presenting a conventional historical scene, Point creates an atmosphere in which nature, beauty, and imagination become almost dreamlike. The garden functions as a secluded world removed from ordinary reality, while the knight introduces the ideals of medieval chivalry, adventure, and the search for something beyond the material world.

      \nThe contrast between the armored figure and the delicate natural surroundings is central to the image. The knight represents discipline, strength, and purposeful action, while the garden suggests beauty, temptation, mystery, and contemplation. This juxtaposition gives the scene an ambiguous quality: the knight may be a heroic figure entering an enchanted realm, but he may also be a person who has become captivated by an idealized world of beauty.

      \nThe painting can therefore be understood as a Symbolist meditation on the tension between the heroic and the dreamlike. Point frequently drew upon medieval, Renaissance, mythological, and literary imagery, transforming these subjects into visions of an idealized world. Here, the enchanted garden can be read as a metaphor for an unreachable ideal—a place of beauty that exists somewhere between reality and imagination, where the knight's journey becomes as much an inner or spiritual quest as a physical one.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting7.jpg"],
    tags: ["Symbolism", "Fantasy", "Nature"],
    categories: ["Symbolism"],
    relatedPaintings: [],
  },
  {
    title: "The Knight of the White Cross",
    artist: "Georges-Antoine Rochegrosse",
    year: 1885,
    medium: "Oil on canvas",
    description:
      `
      Georges-Antoine Rochegrosse's The Knight of the Flowers presents a medieval or Arthurian-style knight surrounded by an abundance of flowers and elegant female figures. The knight, dressed in elaborate armor and carrying his sword, appears to have entered a world where the traditional imagery of warfare and chivalry has been transformed by beauty and sensuality. Rather than depicting the knight in battle, Rochegrosse places him within an almost dreamlike garden filled with color and vegetation.

      \nThe contrast between armor and flowers is the central visual idea. Armor traditionally represents strength, protection, violence, and the demands of warfare, while flowers suggest beauty, love, fragility, and the fleeting nature of life. By placing these elements together, Rochegrosse creates a tension between the masculine ideal of the warrior and the seductive world of beauty surrounding him. The women and flowers make the knight appear almost like a visitor from another world, caught between the heroic traditions of medieval romance and the sensual atmosphere of the garden.

      \nThe work can therefore be interpreted as an imaginative vision of chivalry rather than a literal historical scene. The knight's sword and armor evoke courage and martial virtue, while the flowers transform the traditional battlefield into a realm of beauty and temptation. The painting's appeal lies precisely in this contradiction: the figure who appears prepared for combat finds himself surrounded instead by beauty, romance, and the intoxicating atmosphere of an idealized medieval fantasy.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting8.jpg"],
    tags: ["Medieval", "Chivalry", "Religious"],
    categories: ["History", "Religion"],
    relatedPaintings: [],
  },

  {
    title: "The Oath of the Horatii",
    artist: "Jacques-Louis David",
    year: 1784,
    medium: "Oil on canvas",
    description:
      `
      Jacques-Louis David's The Oath of the Horatii, painted in 1784–1785, depicts a legendary episode from ancient Rome. The three Horatii brothers are chosen to fight the three Curiatii brothers of neighboring Alba Longa in order to settle a conflict between their cities. David shows the moment before the battle, when the Horatii swear before their father that they will fight to the death for Rome. The three brothers raise their arms toward the swords held by their father, creating a powerful image of unity, duty, and sacrifice.

      \nThe emotional structure of the painting depends on the contrast between the men and the women. The brothers are rigid, muscular, and sharply defined, their bodies forming strong geometric lines that communicate determination and discipline. Behind them, the women collapse into softer, curved forms and mourn the terrible consequences that the oath will bring. Their families are personally connected to both sides of the conflict through marriage and engagement, making the men's patriotic duty directly conflict with their personal feelings.

      \nThe painting became one of the defining works of Neoclassicism and emphasizes the idea that personal emotion may have to be sacrificed for a greater political or moral duty. Its message was especially powerful in the years immediately preceding the French Revolution, when ideas of civic virtue, patriotism, discipline, and sacrifice for the state were becoming increasingly important. David's rigid composition, classical architecture, restrained colors, and sculptural figures reinforce this sense of order and moral seriousness. The painting ultimately asks the viewer to consider a difficult question: how much should an individual be willing to sacrifice for a cause larger than themselves?
      `,
    imageUrls: ["http://localhost:5000/paintings/painting9.jpg"],
    tags: ["Neoclassicism", "Patriotism", "Roman Legend"],
    categories: ["Neoclassicism", "History"],
    relatedPaintings: [],
  },
  {
    title: "The Coronation of Napoleon",
    artist: "Jacques-Louis David",
    year: 1807,
    medium: "Oil on canvas",
    description:
      `
      Jacques-Louis David's monumental The Coronation of Napoleon depicts the coronation ceremony held at Notre-Dame Cathedral in Paris on December 2, 1804. Napoleon had proclaimed himself Emperor of the French and, during the ceremony, crowned himself before placing the crown upon the head of his wife, Joséphine. David completed the enormous painting in 1807 after working on it for two years, with assistance from several other artists. The finished canvas measures more than six meters high and nearly ten meters wide, deliberately giving the event the scale and grandeur of a historical monument.

      \nInterestingly, David did not paint the moment exactly as it happened. In the actual ceremony, Napoleon crowned himself, but the final painting shows him placing the crown on Joséphine while Pope Pius VII watches from behind. David had initially prepared a composition showing Napoleon crowning himself, but the final version emphasized the emperor's relationship with Joséphine and created a more dignified and ceremonious image. Napoleon also insisted that his mother, who had not actually attended the ceremony, be included in the painting.

      \nThe painting functions not simply as a historical record but as a carefully constructed image of imperial power. Hundreds of figures are arranged according to their social importance, while the enormous cathedral interior, luxurious clothing, and brilliant ceremonial details reinforce Napoleon's authority. The painting effectively turns a political event into an almost sacred spectacle, presenting the new emperor and his dynasty as legitimate, powerful, and worthy of historical memory.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting10.jpg"],
    tags: ["Neoclassicism", "Napoleon", "Coronation"],
    categories: ["Neoclassicism", "History"],
    relatedPaintings: [],
  },
  {
    title: "The Death of Marat",
    artist: "Jacques-Louis David",
    year: 1793,
    medium: "Oil on canvas",
    description:
      `
      Jacques-Louis David's The Death of Marat, painted in 1793, depicts the murdered French revolutionary leader Jean-Paul Marat shortly after his assassination by Charlotte Corday on July 13, 1793. Marat suffered from a painful skin condition and often worked while sitting in a medicinal bath. Corday, who opposed the radical revolutionary movement, gained access to him by claiming that she possessed information about enemies of the Revolution and then stabbed him. David, a prominent revolutionary and personal friend of Marat, was commissioned to create a memorial to him almost immediately after his death.

      \nRather than depicting the violence of the assassination itself, David shows Marat peacefully resting in his bath after death. His body is idealized, his head falls gently to one side, and the surrounding space is almost completely empty. In his hand is the letter from Charlotte Corday that enabled her to gain access to him, while the bloodied knife lies on the floor nearby. The simple wooden box used as a writing desk emphasizes Marat's modest lifestyle and reinforces his image as a man devoted to the revolutionary cause rather than personal luxury.

      \nDavid deliberately gives Marat the appearance of a martyr. The pose and treatment of the body recall traditional Christian images of Christ's death and burial, transforming a contemporary political murder into an image of sacrifice. The painting therefore served as powerful revolutionary propaganda: Marat is presented not as a controversial political agitator, but as an innocent hero who gave his life for the Revolution. At the same time, the stark background, restrained composition, and absence of unnecessary detail make the painting unusually intimate and emotionally powerful.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting11.jpg"],
    tags: ["Neoclassicism", "Revolution", "Martyrdom"],
    categories: ["Neoclassicism", "History"],
    relatedPaintings: [],
  },
  {
    title: "The Apotheosis of Homer",
    artist: "Jean-Auguste-Dominique Ingres",
    year: 1827,
    medium: "Oil on canvas",
    description:
      `
      Jean-Auguste-Dominique Ingres's The Apotheosis of Homer, completed in 1827, presents the ancient Greek poet Homer as the supreme representative of artistic and literary genius. Homer sits enthroned before a classical temple while a winged personification of Victory places a laurel crown upon his head. At his feet are personifications of his two great epic poems: the Iliad, represented by a sword, and the Odyssey, represented by an oar. The monumental composition was commissioned for the Louvre and was intended to celebrate the great achievements of Western art and literature.

      \nSurrounding Homer are dozens of figures representing celebrated artists, writers, philosophers, and poets from antiquity and the modern world. Among them are figures such as Sophocles, Plato, Pindar, Virgil, Dante, Shakespeare, Racine, Molière, Poussin, and Raphael. By bringing these figures together across different centuries, Ingres creates an imaginary gathering of artistic greatness, with Homer positioned at its center as the common ancestor and supreme model of Western literary tradition.

      \n
      The painting is therefore an elaborate celebration of artistic genius and cultural continuity. Homer is presented almost as a divine figure, elevated above ordinary humanity and honored by generations of creators who followed him. The symmetrical composition, idealized bodies, classical architecture, and carefully ordered arrangement reflect the principles of Neoclassicism. Rather than telling a conventional story, Ingres creates a visual hierarchy of artistic achievement, suggesting that great art transcends individual historical periods and connects different civilizations through a shared pursuit of beauty and excellence.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting12.jpg"],
    tags: ["Neoclassicism", "Homer", "Allegory"],
    categories: ["Neoclassicism"],
    relatedPaintings: [],
  },
  {
    title: "Liberty Leading the People",
    artist: "Eugène Delacroix",
    year: 1830,
    medium: "Oil on canvas",
    description:
      `
      Eugène Delacroix's Liberty Leading the People, painted in 1830, commemorates the July Revolution in France, when Parisians rose against King Charles X and helped bring about his overthrow. At the center of the barricade stands a powerful allegorical figure of Liberty, personified as a woman wearing a Phrygian cap and carrying the French tricolor flag. She strides forward over the fallen, calling people from different social classes to join the uprising. Delacroix combines historical events with allegory, turning a specific political revolt into a broader image of the struggle for freedom.

      \nThe figures following Liberty represent different sections of French society. A young working-class boy carries pistols, while a bourgeois man with a top hat and rifle is traditionally associated with the rising middle class. A worker and other citizens appear alongside them, suggesting that the revolution unites people who would normally occupy very different positions in society. At Liberty's feet lie the bodies of those who have already died, emphasizing that political freedom comes through sacrifice and violence.

      \nLiberty herself is neither completely realistic nor purely supernatural. She is a symbolic figure presented as if she were physically participating in the battle. Her bare breast, ancient-inspired clothing, Phrygian cap, and commanding pose give her the qualities of a classical goddess, while the smoke, weapons, corpses, and chaotic crowd place her firmly within a contemporary revolution. The painting therefore transforms political violence into a powerful visual symbol of freedom, courage, sacrifice, and collective action.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting13.jpg"],
    tags: ["Romanticism", "Revolution", "Liberty"],
    categories: ["Romanticism", "History"],
    relatedPaintings: [],
  },
  {
    title: "The Raft of the Medusa",
    artist: "Théodore Géricault",
    year: 1819,
    medium: "Oil on canvas",
    description:
      `
      Théodore Géricault's The Raft of the Medusa, completed in 1819, depicts the aftermath of one of the most notorious maritime disasters of the early nineteenth century. In 1816, the French frigate Méduse ran aground off the coast of present-day Mauritania. Because there were not enough lifeboats, around 150 people were forced onto a hastily constructed raft. They spent thirteen days drifting at sea, suffering from starvation, dehydration, violence, and despair. Only fifteen survived to be rescued. Géricault chose the moment when the survivors spot a distant ship on the horizon and desperately attempt to attract its attention.

      \nThe painting is enormous, and its scale gives the disaster the importance traditionally reserved for heroic historical subjects. Instead of depicting kings or victorious generals, Géricault places ordinary, suffering people at the center. The pyramid-shaped arrangement of bodies rises from the dead and dying figures in the foreground toward the survivor desperately waving a piece of cloth at the distant ship. This upward movement creates a dramatic progression from death and despair toward a fragile possibility of rescue.

      \nThe work was also deeply political. The Méduse was commanded by an inexperienced captain whose appointment was widely criticized as a consequence of political favoritism under the restored Bourbon monarchy. Géricault therefore transformed the shipwreck into a broader image of governmental incompetence and human suffering. At the same time, the painting explores the extremes of despair and hope: the tiny ship on the horizon is almost invisible, leaving the viewer uncertain whether rescue will actually come. The result is one of Romanticism's most powerful images of human beings struggling against forces far greater than themselves.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting14.jpg"],
    tags: ["Romanticism", "Shipwreck", "Tragedy"],
    categories: ["Romanticism"],
    relatedPaintings: [],
  },
  {
    title: "Wanderer above the Sea of Fog",
    artist: "Caspar David Friedrich",
    year: 1818,
    medium: "Oil on canvas",
    description:
      `
      Caspar David Friedrich's Wanderer above the Sea of Fog, painted around 1818, shows a solitary traveler standing on a rocky mountain peak and looking across a vast landscape covered by clouds and mist. The man's back is turned toward the viewer, making it impossible to see his expression. Instead, the viewer is encouraged to identify with him and experience the landscape from his position. The mountains emerging through the fog create a scene that is both majestic and mysterious, with much of the world concealed from view.

      \nThe wanderer can be understood as a figure contemplating nature and his own place within it. His elevated position gives him a sense of mastery over the landscape, yet the enormous expanse of fog also makes him appear small and isolated. He can see only fragments of what lies ahead, creating a tension between knowledge and uncertainty. The landscape therefore becomes more than a depiction of a particular place: it can be interpreted as a metaphor for the unknown future, the mysteries of existence, and the individual's journey through life.

      \nThe painting is one of the best-known examples of German Romanticism, in which nature was often presented as something capable of inspiring awe, wonder, and spiritual contemplation. Friedrich does not show nature as a passive background but as an overwhelming presence that confronts the individual with something greater than himself. The wanderer's elevated stance can therefore suggest both confidence and vulnerability: he has climbed above the clouds, yet the vast world before him remains largely unknowable. The painting ultimately invites the viewer to contemplate freedom, solitude, ambition, and humanity's relationship with the sublime power of nature.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting15.jpg"],
    tags: ["Romanticism", "Sublime", "Solitude"],
    categories: ["Romanticism"],
    relatedPaintings: [],
  },
  {
    title: "The Nightmare",
    artist: "Henry Fuseli",
    year: 1781,
    medium: "Oil on canvas",
    description:
      `
      Henry Fuseli's The Nightmare, painted in 1781, depicts a sleeping woman lying across a bed while a grotesque demon-like creature sits upon her chest. Behind the bed, a horse emerges from the darkness, its wide eyes and elongated head adding to the disturbing atmosphere. Fuseli combines elements of folklore, dreams, and supernatural horror to create an image of a person apparently trapped between sleep and waking. The creature on the woman's chest is commonly interpreted as an incubus, a supernatural being traditionally believed to visit sleeping women and cause nightmares.

      \nThe painting plays deliberately with the ambiguity between dream and reality. The woman's dramatic pose resembles a fainting or unconscious figure, while the strange creatures appear to emerge from the darkness of her own sleeping mind. The title refers to the traditional idea that nightmares were caused by supernatural beings pressing upon or tormenting a sleeper. At the same time, the work can be understood in psychological terms: the sleeping woman becomes an image of helplessness, vulnerability, and the frightening loss of control that can accompany dreams.

      \nFuseli's theatrical lighting and exaggerated forms intensify the sense of horror. The pale body of the woman contrasts sharply with the dark background, while the demon's grotesque appearance makes the unseen world of the nightmare physically present. The painting became famous partly because it transformed an invisible psychological experience into something visible and tangible. Rather than simply illustrating a frightening dream, Fuseli turns sleep itself into a mysterious realm where desire, fear, imagination, and supernatural forces become indistinguishable.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting16.jpg"],
    tags: ["Romanticism", "Gothic", "Nightmare"],
    categories: ["Romanticism"],
    relatedPaintings: [],
  },
  {
    title: "Ophelia",
    artist: "John Everett Millais",
    year: 1852,
    medium: "Oil on canvas",
    description:
      `
      John Everett Millais's Ophelia, painted between 1851 and 1852, depicts the tragic death of Ophelia from William Shakespeare's Hamlet. After the death of her father and the rejection of her love for Hamlet, Ophelia loses her sanity. She eventually falls into a stream while gathering flowers and drowns. Millais chooses the moment when Ophelia lies floating in the water, still singing as she gradually sinks beneath the surface. Her hands are open and her expression is strangely peaceful, creating a haunting contrast between the beauty of the scene and the tragedy taking place within it.

      \nMillais paid extraordinary attention to the natural environment surrounding Ophelia. The flowers and plants are not merely decorative but carry symbolic associations. Roses can suggest love, daisies innocence, and poppies sleep or death, while the willow is traditionally associated with abandoned love. Many of these details were drawn directly from Shakespeare's descriptions of the flowers Ophelia distributes during her descent into madness. The abundance of vegetation also creates a visual contrast with Ophelia's pale figure, making her appear almost like another element of the natural landscape.

      \nThe painting is characteristic of the Pre-Raphaelite Brotherhood's fascination with intense color, precise natural detail, medieval and literary subjects, and emotional symbolism. Millais painted much of the landscape outdoors in order to capture its vegetation with exceptional accuracy, while the figure of Ophelia was painted separately. The result is a scene in which beauty and death exist simultaneously. Ophelia's death is tragic, yet Millais presents it with extraordinary visual serenity, transforming a moment of destruction into an image of fragile beauty, surrender, and the passage from life into death.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting17.jpg"],
    tags: ["Pre-Raphaelite", "Tragedy", "Shakespeare"],
    categories: ["Romanticism"],
    relatedPaintings: [],
  },
  {
    title: "The Isle of the Dead",
    artist: "Arnold Böcklin",
    year: 1880,
    medium: "Oil on canvas",
    description:
      `
      Arnold Böcklin's The Isle of the Dead, created in several versions between 1880 and 1886, depicts a small boat approaching a mysterious, isolated island surrounded by dark water. A lone rower guides the vessel toward the shore while a white, shrouded figure stands beside a coffin at the center of the boat. The island itself rises dramatically from the sea, surrounded by enormous cliffs and dominated by tall, dark cypress trees. Böcklin deliberately avoided identifying a specific geographical location, creating instead an imaginary landscape that feels like a realm beyond ordinary human experience.

      \nThe imagery strongly evokes death and the journey into the unknown. The coffin and shrouded figure suggest a funeral procession, while the boat recalls the ancient idea of crossing a body of water into the realm of the dead. The cypress trees reinforce this association because they have long been connected with mourning and cemeteries in Mediterranean cultures. The towering cliffs and narrow entrance make the island appear almost inaccessible, as though the boat is approaching a place from which there is no return.

      \nThe painting's power comes largely from its silence and ambiguity. There is no visible violence, dramatic action, or obvious supernatural creature. Instead, Böcklin creates an atmosphere of stillness, isolation, and inevitability. The dark water reflects almost nothing, the island blocks the horizon, and the figures appear completely absorbed in their journey. The work can therefore be interpreted not only as an image of physical death but also as a meditation on mortality, grief, solitude, and the mysterious boundary between life and whatever lies beyond it. Its haunting atmosphere made it one of the most influential and widely reproduced images of death in late nineteenth-century European art.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting18.jpg"],
    tags: ["Symbolism", "Death", "Mystery"],
    categories: ["Symbolism"],
    relatedPaintings: [],
  },
  {
    title: "The Sleep of Reason Produces Monsters",
    artist: "Francisco Goya",
    year: 1799,
    medium: "Etching and aquatint",
    description:
      `
      Francisco Goya's The Sleep of Reason Produces Monsters, created in 1799 as part of his series Los Caprichos, depicts an artist asleep at his desk while a swarm of strange creatures emerges from the darkness behind him. Owls, bats, and other nocturnal creatures surround the sleeping figure, creating an atmosphere of fear and irrationality. The image was intended as a commentary on the dangers of abandoning reason and allowing ignorance, superstition, and irrational impulses to dominate the human mind.

      \nThe title is deliberately ambiguous. Goya's inscription suggests that reason, when it sleeps, allows monsters to emerge, but the image can also be understood as suggesting that imagination itself produces frightening visions when it is released from rational control. The sleeping figure is therefore caught between two worlds: the disciplined world of reason and the dark world of dreams, superstition, and unconscious fears. The owl and bat imagery reinforces this association with darkness and the unknown.

      \nGoya created Los Caprichos during a period when Enlightenment ideas were challenging superstition, fanaticism, and social ignorance. The print is therefore not simply an illustration of a nightmare but a broader warning about what happens when critical thought disappears. At the same time, Goya recognized that imagination could be a source of artistic creativity. The work ultimately leaves the viewer with a powerful question: are the monsters created by the absence of reason, or are they already present within the human mind and merely revealed when reason falls silent?
      `,
    imageUrls: ["http://localhost:5000/paintings/painting19.jpg"],
    tags: ["Romanticism", "Los Caprichos", "Enlightenment", "Satire"],
    categories: ["Romanticism"],
    relatedPaintings: [],
  },
  {
    title: "The Kiss",
    artist: "Gustav Klimt",
    year: 1908,
    medium: "Oil and gold leaf",
    description:
      `
      Gustav Klimt's The Kiss, painted between 1907 and 1908, depicts a couple embracing and kissing while kneeling at the edge of a flowering meadow. The man bends over the woman, wrapping her in an elaborate golden cloak, while she closes her eyes and accepts his embrace. Their bodies are almost completely concealed by the decorative patterns of their clothing, transforming the figures into a unified composition of gold, color, and geometric ornament. The painting is one of Klimt's most celebrated works and a defining example of his so-called Golden Period.

      \nThe contrasting patterns on the couple's clothing give the figures distinct identities while also emphasizing their union. The man's robe is decorated with rectangular and geometric forms, while the woman's clothing contains more rounded and floral motifs. Despite these differences, the patterns overlap and merge around their bodies, visually expressing the idea of two individuals becoming intimately connected. The woman's position at the edge of the meadow also introduces a subtle sense of vulnerability: she is held securely by her partner while appearing almost suspended above the surrounding landscape.

      \nGold dominates the painting, creating an atmosphere that feels simultaneously intimate, luxurious, and almost sacred. Klimt was influenced by Byzantine mosaics, medieval religious art, Japanese prints, and the decorative traditions of the Vienna Secession. By presenting a private kiss with the visual richness traditionally associated with religious imagery, he elevates romantic love into something almost spiritual. The painting ultimately celebrates intimacy, desire, tenderness, and the transformative power of human connection, while leaving the exact nature of the relationship between the two figures deliberately open to interpretation.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting20.jpg"],
    tags: ["Symbolism", "Love", "Art Nouveau"],
    categories: ["Symbolism"],
    relatedPaintings: [],
  },
  {
    title: "The Return of the Prodigal Son",
    artist: "Rembrandt",
    year: 1669,
    medium: "Oil on canvas",
    description:
      `
      Rembrandt's The Return of the Prodigal Son, painted around 1668–1669, depicts the climactic moment of the biblical Parable of the Prodigal Son. In the story, a young man demands his inheritance from his father, leaves home, and wastes his fortune on a life of pleasure. After falling into poverty and desperation, he realizes the seriousness of his actions and returns home, expecting perhaps to be rejected. Instead, his father welcomes him with compassion and embraces him without demanding punishment or repayment. Rembrandt focuses entirely on this moment of reconciliation.

      \nThe central embrace is remarkably quiet and intimate. The father bends over his son and places both hands upon his back, while the son kneels before him with his head against his father's body. The contrast between the father's rich red clothing and the son's worn, torn garments emphasizes the difference between their positions, while the son's shaved or closely cropped head and battered appearance communicate the depth of his suffering. The surrounding figures watch silently, making the father's embrace the unmistakable emotional center of the composition.

      \nThe painting is ultimately about forgiveness rather than punishment. The father does not demand that his son prove himself worthy of returning; he simply accepts him. Rembrandt's use of dramatic light emerging from darkness reinforces this theme, illuminating the figures while leaving much of the surrounding world in shadow. The work can be read as a meditation on unconditional love, repentance, mercy, and the possibility of returning home after having lost one's way. The father's gesture has become one of the most powerful visual representations of forgiveness in Western art.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting21.jpg"],
    tags: ["Baroque", "Forgiveness", "Biblical"],
    categories: ["Religion"],
    relatedPaintings: [],
  },
  {
    title: "The Last Supper",
    artist: "Leonardo da Vinci",
    year: 1498,
    medium: "Fresco",
    description:
      `
      Leonardo da Vinci's The Last Supper, painted between approximately 1495 and 1498 in the refectory of the Dominican convent of Santa Maria delle Grazie in Milan, depicts the moment when Jesus announces to his disciples that one of them will betray him. Rather than showing the meal as a static religious scene, Leonardo captures the immediate psychological reaction to Christ's words. The apostles respond with shock, disbelief, fear, and questioning, while Jesus remains remarkably calm at the center of the composition.

      \nLeonardo organizes the twelve apostles into four groups of three, creating a carefully balanced composition around the solitary figure of Christ. Jesus' body and the architectural lines of the room draw the viewer's attention toward him, while his extended arms point toward the bread and wine, symbols of his body and blood. Judas, the future betrayer, is placed among the other apostles rather than separated from them, emphasizing that betrayal can emerge from within a trusted community. His reaction is darker and more withdrawn, while the other disciples gesture and turn toward one another in confusion.

      \nThe painting's power lies in its combination of religious symbolism and psychological observation. Leonardo transforms a familiar biblical event into a study of human emotion, allowing each apostle to respond differently to the revelation of betrayal. The calm figure of Christ forms the stable center of a scene otherwise filled with movement and uncertainty. The result is not simply an illustration of a biblical story but a meditation on faith, betrayal, fear, loyalty, and the human response to the knowledge of an approaching tragedy.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting22.jpg"],
    tags: ["Renaissance", "Biblical", "Betrayal"],
    categories: ["Religion"],
    relatedPaintings: [],
  },
  {
    title: "The Creation of Adam",
    artist: "Michelangelo",
    year: 1511,
    medium: "Fresco",
    description:
      `
      Michelangelo's The Creation of Adam, painted around 1508–1512 on the ceiling of the Sistine Chapel in Vatican City, depicts the biblical moment in which God gives life to Adam, the first human being. God stretches out his hand toward Adam, whose relaxed body reaches upward from the earth. Their nearly touching fingers create one of the most recognizable images in Western art. The scene comes from the Book of Genesis, in which God creates humanity in his own image and gives Adam the breath of life.

      \nThe composition emphasizes the extraordinary relationship between the divine and the human. Adam is shown as physically powerful and idealized, reflecting the Renaissance fascination with the beauty and dignity of the human body. Yet his relaxed posture contrasts with God's energetic movement toward him. The tiny gap between their fingers is especially significant: God is close enough to give Adam life, but the two figures remain distinct. The moment captures the instant before divine life passes into the human being.

      \nThe image can therefore be understood as a celebration of humanity's divine origin and potential. Adam is not presented as weak or insignificant but as a magnificent figure capable of reflecting God's own image. The tension in the nearly touching hands also creates a sense of anticipation, as though the entire act of creation is suspended for a single moment. Through this simple gesture, Michelangelo expresses one of the central ideas of Renaissance humanism: humanity possesses extraordinary dignity because it is connected directly to the divine.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting23.jpg"],
    tags: ["Renaissance", "Creation", "Sistine Chapel"],
    categories: ["Religion"],
    relatedPaintings: [],
  },
  {
    title: "Ivan the Terrible and His Son Ivan",
    artist: "Ilya Repin",
    year: 1885,
    medium: "Oil on canvas",
    description:
      `
      Ilya Repin's Ivan the Terrible and His Son Ivan, painted between 1883 and 1885, depicts the aftermath of a violent confrontation between Ivan IV of Russia and his son, Tsarevich Ivan Ivanovich. According to a traditional account, the tsar struck his son with a staff during an argument, causing a fatal injury. The painting shows the father holding his dying son in his arms and desperately attempting to stop the bleeding. Rather than depicting the act of violence itself, Repin focuses on the horrifying moment when Ivan realizes what he has done.

      \nThe emotional contrast between the two figures gives the painting its extraordinary intensity. The son's pale face and weakened body communicate approaching death, while the father's expression combines terror, guilt, and desperate grief. Ivan's eyes are wide with shock as he presses his hand against his son's wound, seemingly attempting to reverse the consequences of his own violence. The red carpet, the blood, and the dark interior intensify the sense of tragedy and psychological horror.

      \nThe painting can be understood as a meditation on violence, remorse, and the irreversible consequences of losing control. Repin created the work during a period when Russian artists were increasingly interested in historical subjects that could indirectly comment on contemporary political and social conditions. The image of an absolute ruler destroying his own heir also carried an obvious warning about the destructive nature of unchecked power. Yet the painting's emotional force ultimately comes from something more universal: the terrible realization that a single moment of violence can destroy something precious forever, leaving remorse that cannot undo what has happened.
      `,
    imageUrls: ["http://localhost:5000/paintings/painting24.jpg"],
    tags: ["Realism", "Russian History", "Tragedy"],
    categories: ["Realism", "History"],
    relatedPaintings: [],
  },
];

// -----------------------------------------------------------------------------
// CATEGORY EXTRACTION
// -----------------------------------------------------------------------------

const extractUniqueCategories = (paintings) => {
  const set = new Set();

  paintings.forEach((p) => {
    (p.categories || []).forEach((c) => set.add(c));
  });

  return [...set];
};

// -----------------------------------------------------------------------------
// SEED FUNCTION
// -----------------------------------------------------------------------------

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    await Painting.deleteMany();
    await Category.deleteMany();

    console.log("Old data removed");

    // Create categories
    const categoryNames = extractUniqueCategories(paintings);

    const categoryDocs = await Category.insertMany(
      categoryNames.map((name) => ({ name }))
    );

    const categoryMap = {};
    categoryDocs.forEach((c) => {
      categoryMap[c.name] = c._id;
    });

    // Map paintings categories → ObjectIds
    const paintingsWithCategories = paintings.map((p) => ({
      ...p,
      categories: (p.categories || []).map((c) => categoryMap[c]),
    }));

    const inserted = await Painting.insertMany(paintingsWithCategories);

    console.log(`Inserted ${inserted.length} paintings`);
    console.log(`Inserted ${categoryDocs.length} categories`);

    console.log("Database seeded successfully");

    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();