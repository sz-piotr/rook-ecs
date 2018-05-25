+++
title = "Entity"
weight = 1
+++

## `Entity.id` property

```typescript
readonly Entity.id: number
```

Every Entity has a unique immutable `id` property. It is mostly used internally but
it can be useful when identifying entities. Entity ids are not guaranteed to
be consecutive and this behaviour should not be relied upon.


## `Entity.add()`

```typescript
function Entity.add(instance: any): this
```

Using the `add` function it is possible to add components to an entity. Despite
the type being `any`, the parameter has to be an instance of a
[`ComponentClass`]({{< relref "component.md#componentclass">}}).

This function will throw when:

1. the argument is null or undefined
1. the argument is not a component
1. a component of the same type is already present on the entity

This function also returns the Entity for chaining.

Usage example:

```typescript
entity
  .add(new Position(0, 0))
  .add(new Color('red'))
```
