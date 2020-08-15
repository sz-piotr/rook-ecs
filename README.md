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

First we declare the components. Components are just ids that correspond to some
data. In JavaScript you don't need to declare anything, just use pure strings.

In TypeScript there is a special `component` function that creates type safe
component ids.

```typescript
import { component } from 'rook-ecs'

export interface Position {
  x: number,
  y: number,
}
export const Position = component<Position>('Position')

export interface Velocity {
  x: number,
  y: number,
}
export const Velocity = component<Velocity>('Velocity')
```

Having declared our components we can now use them in a system.

```typescript
import { system, UpdateTick } from 'rook-ecs'
import { Position, Velocity } from './components'

export const move = system(UpdateTick, function (world, event) {
  for (const entity of world.query(Position, Velocity)) {
    const position = entity.get(Position)
    const velocity = entity.get(Velocity)
    position.x += velocity.x * event.deltaTime
    position.y += velocity.y * event.deltaTime
  }
})
```

And just like this, all our entities that have both the `Position` and `Velocity`
components can now be updated with this system.

The only thing that's left is to start the game and create some entities.

```typescript
import { start, gameClock } from 'rook-ecs'
import { Position, Velocity } from './components'
import { move } from './move'

function init (world) {
  world.create()
    .set(Position, { x: 0, y: 0 })
    .set(Velocity, { x: 10, y: 20 })
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
