+++
title = "Getting Started"
weight = 2
+++

Now that you know what ECS is let's put it into practice by exploring how
the Rook library goes about helping you utilize the pattern efficiently.

> **Note**: Throughout this documentation most code samples are written in TypeScript
> only. This is because we believe that TypeScript better communicates intent and
> self-documents the code. Whenever valid JavaScript code differs from its TypeScript
> counterpart by more than just the type annotations we will try to also provide a
> JavaScript example.

## Components

When writing your own game with Rook you will most likely start by creating some
components. In Rook the components are just plain JavaScript classes with an
additional `id` property. It is important to know that components should *not*
know about anything external and if they contain any logic at all, that logic
should only modify the properties of the component.

```typescript
// components.ts
export class Position {
  static id = 'Position'
  constructor (
    public x: number,
    public y: number
  ) {}
}
```
```javascript
// alternatively: components.js
export class Position {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}
Position.id = 'Position'
```

> **Note:** We can also declare another component: `Velocity`. Its
> implementation is almost identical to the `Position` and so it was omitted for brevity.

## Systems

Once we have our components laid out it is time for systems. As previously
established systems are just functions. In Rook those functions are accompanied
by metadata, that makes the code more declarative and easier to work with.

```typescript
// systems.ts
import { IterativeSystem, hasAll } from 'rook-ecs'
import { Position, Velocity } from './components'

exoprt const applyVelocity: IterativeSystem = {
  query: hasAll(Position, Velocity),
  processEntity (entity, { timeDelta }) {
    const position = entity.get(Position)
    const velocity = entity.get(Velocity)
    position.x += velocity.x * timeDelta
    position.y += velocity.y * timeDelta
  }
}
```

This looks like a lot of new stuff so let's look at it line by line.

Here we declare the `applyVelocity` variable, which is the system and its
metadata. We also annotate it with the `IterativeSystem` type to take advantage
of the type definitions that Rook provides.

```typescript
const applyVelocity: IterativeSystem = {
```

The `query` property accepts a function that is used to determine whether or not
to process a given entity by this systems. The `hasAll` utility creates a function
that checks if the entity has all of the given components.

```typescript
query: hasAll(Position, Velocity),
```

The `processEntity` property is the function that updates an entity. The entity
is provided as the first argument and it is guaranteed to match the conditions
specified in the query property. This function also receives a second argument.
For now we only need to know that by destructuring we can get the `timeDelta`
property of this argument. It is equal to the ammount of time since the last
game update.

```typescript
processEntity (entity, { timeDelta }) {
```

This next two lines show us how to retrieve the data from the entity. Each entity
has a `get` method that returns the component instance associated with that entity.
Be careful! If the entity does not have that component an exception will be
thrown. Make sure to properly check the entity in your queries.

```typescript
const position = entity.get(Position)
const velocity = entity.get(Velocity)
```

Last but not least is the update logic. The code below actually comes from the
physics equations about velocity. The equation states that the change in position
is equal to the velocity of the object multiplied by the time of travel. This
is exactly what we are doing here.

```typescript
position.x += velocity.x * timeDelta
position.y += velocity.y * timeDelta
```

## Entities

We know now how to define components and how to update our entities, but we don't
know how to actually create entities. Here is where the concept of the world comes
in. The world in Rook is tasked with creating and removing entities. The easiest
way to interact with the world is by using the init function.

In this example the init function populates the world with an entity with the
`Position` and `Velocity` components.

```typescript
// init.ts
import { World } from 'rook-ecs'
import { Position, Velocity } from './components'

export function init (world: World) {
  world.createEntity()
    .add(new Position(0, 0))
    .add(new Velocity(10, 20))
}

// later
import { Game } from 'rook-ecs'
import { init } from './init'

const systems = [/* ... */]
new Game(systems, init).start()
```

Systems can also interact with the world. The `process` function of the system
receives a reference to the world as the third argument.

```typescript
import { StandardSystem } from 'rook-ecs
import { Position, Velocity } from './components'

const spawnEntities = {
  process (entities, event, world) {
    world.createEntity()
      .add(new Position(0, 0))
      .add(new Velocity(10, 20))
  }
}
```
