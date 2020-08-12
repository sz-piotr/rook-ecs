<p align="center">
<img alt="logo" src="https://raw.githubusercontent.com/sz-piotr/rook-ecs/master/logo.png">
</p>

# Rook

[![npm](https://img.shields.io/npm/v/rook-ecs.svg)](https://www.npmjs.com/package/rook-ecs)
[![Build Status](https://travis-ci.org/sz-piotr/rook-ecs.svg?branch=master)](https://travis-ci.org/sz-piotr/rook-ecs)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/rook-ecs.svg)

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
[here](https://unpkg.com/rook-ecs/lib/rook-ecs.min.js)
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
The only difference is the static `type` property present on the class.

```typescript
class Position {
  static type = 'Position'
  constructor (
    public x: number,
    public y: number
  ) {}
}

class Velocity {
  static type = 'Velocity'
  constructor (
    public x: number,
    public y: number
  ) {}
}
```

Having declared our components we can now use them in a system.

```typescript
import { createSystem, UpdateTick } from 'rook-ecs'
import { Position, Velocity } from './components'

export const move = createSystem(UpdateTick, function (world) {
  for (const entity of world.query(Position, Velocity)) {
    const position = entity.get(Position)
    const velocity = entity.get(Velocity)
    position.x += velocity.x * world.event.deltaTime
    position.y += velocity.y * world.event.deltaTime
  }
})
```

And just like this, all our entities that have both the `Position` and `Velocity`
components can now be updated with this system.

The only thing that's left is to start the game and create some entities.

```typescript
import { start, gameClock } from 'rook-ecs'
import { move } from './move'

function init (world) {
  world.add([
    new Position(0, 0),
    new Velocity(10, 20)
  ])
}

start([
  gameClock(),
  init,
  move,
])
```

## Typescript support

Rook has first class TypeScript support since it is itself written with TypeScript.
No special compiler options have to be specified for Rook to work, although we
recommend using the `strict: true` setting.

## Contributing

Rook is currently a work in progress. All contributions are welcome.

## Useful reading

* [TypeScript Documentation](https://www.typescriptlang.org/docs/home.html)
* [T-Machine ECS Series](http://t-machine.org/index.php/2007/09/03/entity-systems-are-the-future-of-mmog-development-part-1/)
