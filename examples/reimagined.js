/* global component, Query, engine */

const Transform = component('x', 'y')
const Player = component('lives', 'score')
const Velocity = component('x', 'y')
const CircleCollider = component('radius')
const Damaging = component()

const MoveSystem = {
  query: new Query(Transform, Velocity),
  processEntity (entity, timeDelta) {
    const transform = entity.get(Transform)
    const velocity = entity.get(Velocity)

    transform.x += velocity.x * timeDelta
    transform.y += velocity.y * timeDelta
  }
}

function collides () {

}

const CollisionDetectionSystem = {
  query: [
    new Query(Player, Transform, CircleCollider).one(),
    new Query(Damaging, Transform, CircleCollider)
  ],
  process ([ player, objects ], timeDelta, engine) {
    for (const object of objects) {
      if (collides(object, player)) {
        engine.emit('damage')
        return
      }
    }
  }
}

const DamageSystem = {
  query: new Query(Player).one(),
  on: 'damage',
  process (player) {

  }
}

engine.start([
  MoveSystem,
  CollisionDetectionSystem,
  DamageSystem
])
