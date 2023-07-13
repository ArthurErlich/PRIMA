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
|  1 | Units and Positions | I Use XYZ from the zero point of the Cardasiean Coordninats sytesm. Y stands for Up, X for forward and Z for right in the local space. The player has for now 5 Axsis of freedom: Roll,Forward,Bacwards,Left turn and Right Turn. One Unit is eqal to 1 Meter. The World is about 50Km large.|[X]|
|  2 | Hierarchy           | "Explain the setup of the graphs and the advantages you gain by it." I have two main graphs. One is the Recourses Graph where all my "Blueprints" for the GameObject. That makes me help to crate the Destryoer for exampel. And GameObjects are nodes with Transform-, Mesh-, Materials- components. The other main Graph is the Game Graph, inside the Main Grpah is the World graph wich is the main Game scene. This can help me to create other scenes (Levels for the game). I dont shift Nodes to other Graphs or to delet them or to hide the Nodes.|[X]|
|  3 | Editor              | The editor was only used for prepering the World and the neccesary data for the GameObjects. Complikatesd stuff like movment should be coded. The edior was not relaibel enought for me to use it properly, this is why I made the inteare game in code.|[X]|
|  4 | Scriptcomponents    | For the curent version the CustomComponents are not in use. I have made preperation to use the editor as a way to create maps. There is a CustomComponentPlayerSpawner wich wil spawn the Palyer on the position of the node where the PlayerSpawner is. Also therer is a start of spawning HugeAstroids with the CustomCopnent script. Both are not finished and only for testing purpose. Also I have adden an CustomTagComponent for tagging the Player and the Astroids to make special colssion events etc.|[X]|
|  5 | Extend              | The use of the Node component was heavly used in my Programm. This made creating and adding Components to the nodes easyer. Also for the UI system I extendend the  ƒ.Mutable|[X]|
|  6 | Sound               | There just two sounds for this Version. The Audio in the Backgorund and the Shooting noice of the Gattling gun.|[X]|
|  7 | VUI                 | The User Interface shows the buttons to press when the Tutorial mode is on, to help the player with the keybinds. Also if you Press "!(F)[NOTHING]" on an Astroid you can seee the healh of the Astroid|[X]|
|  8 | Event-System        | My Custom Events are used to fire Update events for the UI, GameLoop and the InputLoop|[X]|
|  9 | External Data       | I am not able to explain all the configurations files. But for the example: There is an AstroidConfig.json file where the informations like Hitpoints, size, rotations, speed on spawn, etc is inside. It will be loaded by the Config class|[X]|
|  A | Light               | HomeFudge uses an AmbiantLight to make the Dark siedes fadly visible and therer is als a Directional light to mimic the sun.|[X]|
|  B | Physics             | HomeFudge has multiply RigidBodys. The Astroids using the Box Collider and the Destryoer uses the ConvexHull Collider wich i custmom made. The Gravaty is off to have a SPACE feeling. The player and the AI (Auto Damper) uses the add Velocity funktinons to mimik thruster fire. Damping rotation and Translation is set to 0 for real newtoinan flying.|[X,X]|
|  C | Net                 | Add multiplayer functionality via network (3) <-- this is planed in the future |[]|
|  D | State Machines      | Create autonomous entities using the StateMachine (1) and/or ComponentStateMachine (1) defined in FudgeAid <-- StateMachines will be used for the AI Enemeies in the Future|[]|
|  E | Animation           | My Thruster in the Game are using the Sprite Animation system for creating the Fire effekt. For now ther Sprite Animatior is smowhat buggy and the BeamWeapon was Animated but bocke somwhere.|[X,X]|


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
