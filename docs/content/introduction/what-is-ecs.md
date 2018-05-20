+++
title = "What is the ECS pattern?"
weight = 1
+++

## How do games work?

There is a trend almost every game written in almost any engine follows. This trend
is the concept of a game loop. The game loop is simply a function that changes the
state of the game. For example in a platformer, this function is responsible for
moving all of the characters, the camera, checking for collisions and so on.

Where most games differ is how the state of the game is represented and how the
state transition function is implemented. A very common way of thinking about the
state of the game is as a collection of entities. In a traditional, object oriented
approach each of those entities is an instance of some class, which in turn inherits
from some common base class, e.g. GameObject. In such an approach, each entity
knows about it's own state (position, health, etc.) and how to update it.

Here is an example to help you understand:

```typescript
class GameObject {
  /* common code for all entities in the game */
}

class Player extends GameObject {
  private position: Vector2
  private velocity: Vector2

  update () {
    position.add(velocity)
  }
}
```

Given this example let's see how the game loop might look.

```typescript
function gameLoop (state) {
  for (const entity of state) {
    entity.update()
  }
}
```

## Encountering the problem

Suppose we are creating a game with enemies. Each enemy can move, some can shoot,
some other can dodge attacks. Because all enemies can move it would be pointless
to copy code for moving from class to class. Instead we can use inheritance to
move it higher in the hierarchy of abstraction. This leads to the following
set of classes:

```typescript
class GameObject {}
class Moving extends GameObject {}

class Shooting extends Moving {}
class Dodging extends Moving {}
```

It works and we are very happy until one day, our designer comes along and says
they want a new enemy that can shoot AND dodge at the same time. So now we have
a problem. This new enemy type is surely deserving of its own class but it
would have to inherit both from the `Shooting` or `Dodging` class. Depending on
the language you use it is either impossible or regarded as a bad pattern.

## The solution: Entity-Component-System

The Enity-Component-System solves the problem by removing logic from entities and
putting it in systems. Systems are functions that update the entities - similarily
to the update method of the GameObject class. In the ECS pattern data is also
no longer stored in class properies. Rather, the entity can be thought of as a
unique bag of components. Each component contains relevant data about some
part of the entity.

The following example illustrates how a system might update the entities.

```typescript
function movementSystem (entities) {
  for (const entity of entities) {
    if (entity.has(Position) && entity.has(Velocity)) {
      const position = entity.get(Position)
      const velocity = entity.get(Velocity)
      position.add(Velocity)
    }
  }
}
```

For the sake of completion, here is how the game loop looks under ECS:

```typescript
function gameLoop (state) {
  for (const system of state.systems) {
    system(state.entities)
  }
}
```

Coming back to our example with different enemy types. In ECS you would create
three different systems: one for moving, one for shooting and one for dodging.
Each of them would be looking for entities with different components. For example,
a shooting system might look for entities with the Shooting component.

Because of this, the way an entity behaves is only dependent on the components it
has. If we remove the Shooting component it will stop shooting, because it will
no longer be updated by the shooting system.
