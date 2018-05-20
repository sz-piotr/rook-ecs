# Rook

![npm](https://img.shields.io/npm/v/rook-ecs.svg)
![travis](https://travis-ci.org/sz-piotr/rook-ecs.svg?branch=master)

Rook is a JavaScript library for creating games in the Entity-Component-System pattern.
Rook is currently a work in progress. All contributions are welcome.

## Getting started

### Install

```
$ npm install --save rook-ecs
```

or

```
$ yarn add rook-ecs
```

After installing you can include the library in the source

```typescript
import { Game } from 'rook-ecs'

console.log('Hurray!')
```

### Using UMD build in the browser

Alternatively, you might want to use an UMD build in the browser.
To do so, grab the minified JavaScript file from
[here](https://raw.githubusercontent.com/sz-piotr/rook-ecs/master/lib/rook-ecs.min.js)
and add it to your site with a script tag.

In the browser all of the exports are available under the `Rook` global object.

```html
<script src="rook-ecs.min.js"></script>
<script>
  console.log(Rook.Game)
</script>
```

## Usage Example

First we declare the components. These are just plain classes (here implemented in TypeScript).
The only difference is the `id` property present on the class constructor.

```typescript
class Position {
  static id = 'Position'
  constructor (
    public x: number,
    public y: number
  )
}

class Velocity {
  static id = 'Velocity'
  constructor (
    public x: number,
    public y: number
  )
}
```

Having declared our components we can now use them in a system.

```typescript
import { hasAll } from 'rook-ecs'

const applyVelocity = {
  query: hasAll(Position, Velocity),
  processEntity (entity, { timeDelta }) {
    const position = entity.get(Position)
    const velocity = entity.get(Velocity)
    position.x += velocity.x * timeDelta
    position.y += velocity.y * timeDelta
  }
}
```

And just like this, all our entities that have both the `Position` and `Velocity`
components can now be updated with this system.

The only thing that's left is to start the game and create some entities.

```typescript
import { Game } from 'rook-ecs'

const systems = [applyVelocity]

function init (world) {
  world.createEntity()
    .add(new Position(0, 0))
    .add(new Velocity(10, 20))
}

new Game(systems, init).start()
```

## Typescript support

Rook has first class TypeScript support since it is itself written with TypeScript.
No special compiler options have to be specified for Rook to work, although we
recommend using the `strict: true` setting.

## Contributing

Rook is currently a work in progress. All contributions are welcome.
