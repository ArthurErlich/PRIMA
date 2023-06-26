# PRIMA

Invested Time: [![wakatime](https://wakatime.com/badge/github/ArthurErlich/PRIMA.svg)](https://wakatime.com/badge/github/ArthurErlich/PRIMA) moved to -> [HomeFudge](https://github.com/ArthurErlich/HomeFudge)

## Making, Breaking, Destroying, Trying creating -> prototypes!

[Link ](https://arthurerlich.github.io/PRIMA/Card/steckbrief.htm)  [Work Place](https://webuser.hs-furtwangen.de/~del/Prima/index.php) [Fudge Wiki](https://github.com/JirkaDellOro/FUDGE/wiki)

* Title: Home Fudge
* Author: Arthur Erlich
* Year and season (Summer, Winter):  2023 SoSe
* Curriculum and semester: MIB3
* Course this development was created in: PRIMA
* Docent: Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU
* Link to the finished and executable application on [Github-Pages](https://arthurerlich.github.io/HomeFudge/HomeFudge/index.html) 
* Link to the source [code](https://github.com/ArthurErlich/HomeFudge/tree/main/HomeFudge)
* Link to the design document and description for users on how to interact: [**PRE_DOC**](https://github.com/ArthurErlich/HomeFudge/blob/main/HomeFudge/Doc/%5BPRE%5D%20Home%20Fudge.pdf)

  **Be aware that the Game is moved to its own Repository!**




## Checklist


| Nr | Criterion           | Explanation                                                                                                                                     |   |
| -- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------|---|
|  1 | Units and Positions | I Use XYZ from the zero point of the Cardasiean Coordninats sytesm. Y stands for Up, X for forward and Z for right in the local space. The player has for now 5 Axsis of freedom: Roll,Forward,Bacwards,Left turn and Right Turn. One Unit is eqal to 1 Meter. The World is about 50Km large.                                                             |[X]|
|  2 | Hierarchy           | "Explain the setup of the graphs and the advantages you gain by it."       I have two main graphs. One is the Recourses Graph where all my "Blueprints" for the GameObject. That makes me help to crate the Destryoer for exampel. And GameObjects are nodes with Transform-, Mesh-, Materials- components. The other main Graph is the Game Graph, inside the Main Grpah is the World graph wich is the main Game scene. This can help me to create other scenes (Levels for the game). I dont shift Nodes to other Graphs or to delet them or to hide the Nodes.                                                                |[?]|
|  3 | Editor              | Use the visual editor and explain which parts are better done by coding and why. (Preperation for GameObejcts) (World Preperation)                                                                |[]|
|  4 | Scriptcomponents    | Use scriptcomponents and explain if they were useful in your context or not and why.       (PlayerSpawner) (Huge Asteroid)                                                   |[]|
|  5 | Extend              | Derive classes from FudgeCore other than ScriptComponent and explain if that was useful in your context or not and why.  (See script Hierachie)                       |[]|
|  6 | Sound               | Use sounds and explain your choice of sounds and placement in respect to the user's perception. (World Sound and Ship Sound)                                                |[]|
|  7 | VUI                 | Create a virtual user interface using the interface controller and mutables. Explain the interface.                                             |[]|
|  8 | Event-System        | Use custom events to send information that propagates along the graphs hierarchy and explain if that was useful in your context or not and why. |[]|
|  9 | External Data       | Create a configuration file your application loads and adjusts to the content. Explain your choice of parameters.                               |[X]|
|  A | Light               | If light is required, explain your choice of lights in your graphs (1)                                                                          |[]|
|  B | Physics             | Add rigidbody components and work with collisions (1) and/or forces and torques (1) and/or joints (1)                                           |[]|
|  C | Net                 | Add multiplayer functionality via network (3)                                                                                                   |[]|
|  D | State Machines      | Create autonomous entities using the StateMachine (1) and/or ComponentStateMachine (1) defined in FudgeAid                                      |[]|
|  E | Animation           | Animate using the animation system of FudgeCore (1) and/or Sprites (1) as defined in FudgeAid                                                   |[?]|

| Points | 10  | 11  | 12  | 13  |
|--------|-----|-----|-----|-----|
| Grade  | 4.0 | 3.0 | 2.0 | 1.0 |


## GameZone TODO
- Two screenshots of the running application of the sizes
  - 250 x 100 pixel
  - 1920 x 400 pixel 
* Genre, if applicable
* Tags
* Subtitel (max 40 characters), to encourage to start the application
* Short instructions (max 250 characters) on how to play
* A declaration of consent with the display of the application in the GameZone with an explicit reference to the author.
