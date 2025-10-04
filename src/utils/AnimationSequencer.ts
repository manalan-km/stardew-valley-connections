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
        console.log('The queue before adding the element:', this.animationQueue)
        console.log('New element added to the queue:', animation)
        this.animationQueue.push(animation)
        // console.log('The queue after adding the element:', this.animationQueue)

        this.playback()
    }

    private playback() {
        this.playbackStatus = true
        this.processNext()
    }

    private processNext() {
        if (this.animationQueue.length === 0) {
            this.playbackStatus = false
            return
        }

        const animation = this.animationQueue.shift()!

        const originalOnComplete = animation.animeParams.onComplete

        console.log('Processing target:', animation.targets)
        console.log('Processing animeParams:', animation.animeParams)

        animate(animation.targets, {
            ...animation.animeParams,
            onComplete: (self, e) => {
                if (originalOnComplete) {
                    originalOnComplete(self, e)
                }
                this.processNext()
            },
        })
    }
}
