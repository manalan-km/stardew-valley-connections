import { useEffect } from 'react'
import type { ConfettiParticle } from '../../utils/models/Animation'

const Confetti = () => {
    useEffect(() => {
        const canvas = document.getElementById(
            'confetti-canvas'
        ) as HTMLCanvasElement

        if (!canvas) {
            console.error('Canvas not found!')
            return
        }

        const ctx = canvas.getContext('2d')!
        const particles: ConfettiParticle[] = []
        const resizeCanvasFunc = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        let stopCreating = false
        resizeCanvasFunc()
        window.addEventListener('resize', resizeCanvasFunc)

        const createParticles = () => {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 10 + 3,
                speedX: (Math.random() - 0.5) * 4,
                speedY: Math.random() * 4 + 2,
                rotation: (Math.random() - 0.5) * 5,
                color: `hsl(${Math.random() * 360}, 80%, 60%)`,
            })
        }

        const updateParticle = (particle: ConfettiParticle) => {
            particle.x += particle.speedX
            particle.y += particle.speedY

            if (!stopCreating && particle.y > canvas.height + 20) {
                particle.y = Math.random() * canvas.height - canvas.height
                particle.x = Math.random() * canvas.width
            }
        }

        const drawParticle = (particle: ConfettiParticle) => {
            ctx.save()
            ctx.translate(particle.x, particle.y)
            ctx.rotate(particle.rotation)
            ctx.fillStyle = particle.color
            ctx.fillRect(
                particle.size,
                particle.size / 4,
                particle.size * 2,
                particle.size / 2
            )
            ctx.restore()
        }

        for (let i = 0; i < 200; i++) {
            createParticles()
        }

        setTimeout(() => {
            stopCreating = true
        }, 3000)

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            for (let i = particles.length - 1; i >= 0; i--) {
                updateParticle(particles[i])
                drawParticle(particles[i])

                if (stopCreating && particles[i].y > canvas.height + 20) {
                    particles.splice(i, 1)
                }
            }

            if (particles.length > 0) {
                requestAnimationFrame(animate)
            }
        }
        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvasFunc)
        }
    }, [])

    return (
        <canvas
            id="confetti-canvas"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 100,
            }}
        />
    )
}

export default Confetti
