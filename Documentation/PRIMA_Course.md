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

# 23.03.23 :date:

* Z-Fighting => Z-BufferError Means that two faces/meshes overlaping each other on the same plane and the Tile Texture flickers.

## The Camera

* The camerer has an FOV/Opening angle. Problem, in which angle is the Fov? Diagonal/Horizontal/Vertical :Standard is the **diagonal Angle**
* Usualy you have a far Plane for the for the distacne and a Plane for the near distance.
  * Performence boost :Rendering onliy inside the Piramide. Between Far and Near plane.
* -> Render to a cube! Squiching the far end of the Plane and streching the near Plane.
  * FievSpace!
* Deph buffer and Z buffer is the same
  * 16 bit -> 65Thousend slices! Not that precission.
  * The Z-Buffer resuolution is not linier its is more dense near the Camera.

### Nodes

* What are Nodes?
  * Pivot Point -> Rotate on the spot!
  * MTX stands for Matrix
