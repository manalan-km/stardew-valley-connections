import type { AnimationParams, TargetsParam } from 'animejs'

export interface ConfettiParticle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    rotation: number
    color: string
}
export interface AnimationSeq {
    targets: TargetsParam
    animeParams: AnimationParams
}
