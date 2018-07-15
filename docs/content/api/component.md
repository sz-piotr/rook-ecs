+++
title = "Component"
weight = 2
+++

## `ComponentClass`

```typescript
export interface ComponentClass<T> {
	new (...args: any[]): T,
	id: string
}
```

The `ComponentClass` interface serves as a way to typecheck the parameters of
[`Entity`]({{< relref "entity.md" >}}) functions. Each component class must have an
id property.

Below is an example of how to create a valid component class with the `id` property.

```typescript
// in typescript
class MyComponent {
  static id = 'MyComponent'
}
```

```javascript
// in javascript
class MyComponent {}
MyComponent.id = 'MyComponent'
```

Only instances of a class that has a static `id` property are considered components
in Rook.
