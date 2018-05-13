# OUYO, the Entity-Component-System library

OUYO is a library that simplifies the creation of games by allowing the developer to take advantage of the powerful design pattern of ECS (Entity-Component-System).

OUYO is currently a work in progress. All contributions are welcome.

# API

## Components

In OUYO a component is just a JavaScript class. Each component class must have an `id` property with a unique value.

```typescript
class Velocity2D {
  static id = 'Velocity2D'
  constructor (
    public x: number,
    public y: number
  ) {}
}
```

## Systems

Systems in OUYO are functions with a tiny bit of metadata. Below is an example of a very simple system. It prints `'Hello World'` every time the game updates.

```typescript
const sayHello = {
  process () {
    console.log('Hello World!')
  }
}
```

### Queries

Systems can query the world for entities. OUYO offers two selectors for this task: `hasAll` and `hasAny`.

```typescript
import { hasAll } from 'ouyo'
import { A } from './components'

const systemWithSimpleQuery = {
  query: hasAll(A),
  process (entities) {
    // ...
  }
}
```

Some systems may want to get the results of more than one query. This can be achieved by passing an array of selectors.

```typescript
import { hasAll } from 'ouyo'
import { A, B, C, D } from './components'

const systemWithMultipleQueries = {
  query: [
    hasAll(A, B),
    hasAny(C, D)
  ],
  process ([ withAandB, withCorD ]) {
    // ...
  }
}
```

The system query can be any function that takes an entity and returns a boolean. This means that you can have your own custom logic employed for finding the right entity.

```typescript
import { Entity } from 'ouyo'
import { A, B, C } from './components'

const customSelector = (entity: Entity) =>
  entity.has(A) &&
  entity.has(B) &&
  !entity.has(C)

const systemWithQustomQuery = {
  query: customSelector,
  process (entities) {
    // ...
  }
}
```

### Events

Some systems rely on something in the world changing. Events provide that information to systems. By default each system listens to the `tick` event, which is emitted every frame. Each event has a `timeDelta` property that holds the time since last event of that type. For the `tick` event the value of `timeDelta` is the time since last update.

...

## World

...

## Entities

...

### Assemblages

...

## Game

...
