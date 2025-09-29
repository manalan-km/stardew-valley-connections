import { animate } from 'animejs'
import type { AnimationSeq } from './models/Animation'
export class AnimationSequencer {
    static instance: AnimationSequencer
    private playbackStatus: boolean = false
    private animationQueue: AnimationSeq[] = []
    constructor() {
        if (AnimationSequencer.instance) {
            return AnimationSequencer.instance
        }

        AnimationSequencer.instance = this
    }

    add(animation: AnimationSeq) {
        this.animationQueue.push(animation)

        this.playback()
    }

    playback() {
        this.playbackStatus = true
        this.processNext()
    }

    processNext() {
        if (this.animationQueue.length === 0) {
            this.playbackStatus = false
            return
        }

        const animation = this.animationQueue.shift()!

        animate(animation.targets, {
            ...animation.animeParams,
            complete: () => {
                this.processNext()
            },
        })
    }
}
