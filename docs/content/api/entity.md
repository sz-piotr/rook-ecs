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
function Entity.add (instance: any): this
```

Using the `add` function it is possible to add components to an entity. Despite
the type being `any`, the parameter has to be an instance of a
[`ComponentClass`]({{< relref "component.md#componentclass">}}).

This function will throw if:

1. the argument is not a component
1. a component of the same type is already present on the entity

This function also returns the Entity for chaining.

Usage example:

```typescript
entity
  .add(new Position(0, 0))
  .add(new Color('red'))
```

## `Entity.has()`

```typescript
function Entity.has (componentClass: ComponentClass<any>): boolean
```

The `has` function informs about the presence or abscence of a component on
an Entity. The argument must be a
[`ComponentClass`]({{< relref "component.md#componentclass">}}).

This function will throw if:

1. the argument is not a component class

Usage example:

```typescript
entity.add(new Color('blue'))
entity.has(Color) // true
```

## `Entity.get()`

```typescript
function Entity.get <T> (componentClass: ComponentClass<T>): T
```

The `get` function retrieves a component instance of the supplied type. The argument
must be a [`ComponentClass`]({{< relref "component.md#componentclass">}}). It
is important to make sure that the entity has the specified component before
trying to use this function.

This function will throw if:

1. the argument is not a component class
1. no component of the specified class exists on the entity

Usage example:

```typescript
const instance = new Color('blue')
entity.add(instance)
entity.get(Color) === instance // true
```

## `Entity.remove()`

```typescript
function Entity.remove (componentClass: ComponentClass<any>): void
```

This function removes a component instance of the supplied type. The argument
must be a [`ComponentClass`]({{< relref "component.md#componentclass">}}). If no
such instance exists the function does nothing.

This function will throw if:

1. the argument is not a component class

Usage example:

```typescript
entity.remove(Color)
entity.has(Color) // false
```
