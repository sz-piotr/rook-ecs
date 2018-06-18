+++
title = "System"
weight = 3
+++

## `System`

```typescript
type System = StandardSystem | MultiQuerySystem | IterativeSystem
```

The `System` type is used to describe a variety of systems that can be used
to perform operations on entities. They subscribe to game events and then update
the entities selected by the supplied query.

## `StandardSystem`

```typescript
interface StandardSystem {
  query?: Selector,
  on?: string,
  process (entites: Entity[], world: World, event: Event): void
}
```

The `StandardSystem` is a way to create systems that update a single set of
entities.

### Properties

1. `query` (optional) - a [`Selector`]({{< relref "selectors.md" >}}) that
    specifies which entities are relevant for this systems. Entities matched
    by the `query` will be passed as the first argument to `process`. If `query`
    is omitted an empty array will be passed instead.
1. `on` (optional) - a `string` denoting the type of the
    [`Event`](({{< relref "event.md" >}})) that the system subscribes to.
    Whenever an event of the given type is emitted the system will be called in
    the same tick. The `on` value defaults to `tick`.
1. `process` - this function is where the game logic lies. Each system has
    its own process function called when it is time for the system to update
    entities. *Arguments*:
    1. `entities` - an array of [`Entity`]({{< relref "entity.md" >}}) objects
        that match the criteria specified by the `query` parameter.
    2. `world` - a reference to the [`World`]({{< relref "world.md" >}}).
    3. `event` - the [`Event`](({{< relref "event.md" >}})) that caused the
        `process` function to be called.

### Examples

```typescript
const checkCollisions: System = {
  query: entity => entity.has(Rectangle),
  process (entities: Entity[], world: World, event: Event) {
    for (let i = 0; i < entities.length; i++) {
      const rect = entites[i].get(Rectangle)
      for (let j = i + 1; j < entities.length; j++) {
        if (rect.intersects(entities[j].get(Rectangle))) {
          world.emit('collision')
        }
      }
    }
  }
}
```

## `MultiQuerySystem`

```typescript
interface MultiQuerySystem {
  query: Selector[],
  on?: string,
  process (entites: Entity[][], world: World, event: Event): void
}
```

## `IterativeSystem`

```typescript
interface IterativeSystem {
  query: Selector,
  on?: string,
  processEntity (entity: Entity, world: World, event: Event): void
}
```
