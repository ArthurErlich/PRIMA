# I want to know if Fudge supports or has bounding boxes for collision detection.

Yes, Fudge does support bounding boxes for collision detection. Fudge provides a built-in collision detection system that supports various types of collision shapes, including bounding boxes.

To use bounding boxes for collision detection in Fudge, you can create an instance of the `CollisionBox` class and attach it to your game objects. Here's an example of how to create a `CollisionBox` and attach it to a `Node` in Fudge:

```typescript
import { Node, CollisionBox } from "Fudge";

// Create a new Node
const myNode = new Node("My Node");

// Create a new CollisionBox with a width and height of 10
const collisionBox = new CollisionBox(new FudgeCore.Vector2(10, 10));

// Attach the CollisionBox to the Node
myNode.addComponent(collisionBox);
```

Once you have attached a `CollisionBox` to a `Node`, you can use Fudge's collision detection system to detect collisions between game objects. Here's an example of how to detect collisions between two `Nodes` with `CollisionBox` components:

```typescript
import { Node, CollisionBox, Collision } from "Fudge";

// Create two Nodes with CollisionBox components
const node1 = new Node("Node 1");
node1.addComponent(new CollisionBox(new FudgeCore.Vector2(10, 10)));

const node2 = new Node("Node 2");
node2.addComponent(new CollisionBox(new FudgeCore.Vector2(10, 10)));

// Check for collisions between the two Nodes
const collision = Collision.detectCollision(node1.getComponent(CollisionBox), node2.getComponent(CollisionBox));

if (collision) {
  console.log("Collision detected!");
}
```

In this example, `Collision.detectCollision` takes two `CollisionBox` components and returns a `Collision` object if a collision is detected. You can then use the `Collision` object to get more information about the collision, such as the direction of the collision and the point of contact.

# Can I get a bounding box of a mehs inside a node?

Yes, you can get the bounding box of a mesh inside a node in Fudge.

To get the bounding box of a mesh, you first need to access the mesh component of the node. Assuming your node has a `Mesh` component attached to it, you can access it like this:

```typescript
const mesh = myNode.getComponent(Mesh);
```

Once you have the mesh component, you can use the `getBoundingBox()` method to get the bounding box of the mesh. Here's an example:

```typescript
const mesh = myNode.getComponent(Mesh);

// Get the bounding box of the mesh
const boundingBox = mesh.getBoundingBox();

// Log the minimum and maximum points of the bounding box
console.log("Minimum point:", boundingBox.min.toString());
console.log("Maximum point:", boundingBox.max.toString());
```

In this example, `mesh.getBoundingBox()` returns a `BoundingBox` object, which contains the minimum and maximum points of the bounding box. You can access these points using the `min` and `max` properties of the `BoundingBox` object.

Note that the bounding box returned by `getBoundingBox()` is in local space, relative to the mesh's transform. If you want the bounding box in world space, you can transform the bounding box using the mesh's world matrix, like this:

```typescript
const mesh = myNode.getComponent(Mesh);

// Get the bounding box of the mesh in local space
const localBoundingBox = mesh.getBoundingBox();

// Transform the bounding box into world space
const worldBoundingBox = localBoundingBox.transform(mesh.mtxWorld);
```

In this example, `localBoundingBox.transform(mesh.mtxWorld)` transforms the local bounding box into world space using the mesh's `mtxWorld` matrix. The resulting `BoundingBox` object, `worldBoundingBox`, contains the bounding box in world space.
