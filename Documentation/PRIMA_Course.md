# Fudge Basics

## Coordinates in Fudge

20.03.23

### Point 2

* Hirachi Nodes
  * Geometrical
  * Logical

![Example of Hirachie](assets/20230320_164654_image.png)

### Point 1

* Fudge is using a right hand coordinates system
* z-Achsis is forword!
* Camera looks in the z-Achses is forword

### Culling

* culling -> front and back side
  * you can see if the z-Achses is pointg to wards the camera
  * there is a two sideded Quad
  * Important!

### External resources

* **dose not work in the current version!**
* External resources -> to internal -> than it will become an textureImage

### Transforming GameObjects

* Moving the Mesh on the TransformMatrix will cause problem
  * Node is on the origin, mesh is somwhere else.
* Use a Transform Component to move the Mesh!

> * [X] **TASK: Create a Level for FUDGE!**
>
> ---

Fudge Level:

![Graph](assets/20230320_193625_image.png)

![Platform Transform](assets/20230320_193658_image.png)

![FloorTile Transform](assets/20230320_193732_image.png)

![Level](assets/20230320_193829_image.png)
