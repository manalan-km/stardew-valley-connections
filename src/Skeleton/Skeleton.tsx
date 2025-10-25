import type { ReactNode } from 'react'

const Skeleton = ({
    className,
    children,
    color = '#d1d5db',
}: {
    className?: string
    children: ReactNode
    color?: string
}) => (
    <div
        className={`animate-pulse ${className}`}
        style={{ backgroundColor: color }}
    >
        {/* Invisible content to give it height */}
        <span className="opacity-0">{children}</span>
    </div>
)

export default Skeleton
