import clsx from "clsx"
import { useCallback, useRef } from "react"

type CardProps = {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  const mouseFollowerRef = useRef<HTMLDivElement>(null)
  const cardBorderRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!mouseFollowerRef.current) return

      const { clientX, clientY } = event
      const { offsetLeft, offsetTop } = event.currentTarget
      const { offsetWidth, offsetHeight } = mouseFollowerRef.current
      const x = clientX - offsetLeft - offsetWidth / 2 + scrollX
      const y = clientY - offsetTop - offsetHeight / 2 + scrollY
      mouseFollowerRef.current.style.transform = `translate(${x}px, ${y}px)`

      event.currentTarget.style.setProperty("--client-x", `${x}px`)
      event.currentTarget.style.setProperty("--client-y", `${y}px`)
    },
    []
  )

  return (
    <article
      className="border border-slate-50/20 rounded-3xl p-[1px] overflow-hidden relative z-10 group max-w-fit"
      onMouseMove={handleMouseMove}
    >
      {/* Mouse followers */}
      <div
        ref={mouseFollowerRef}
        className="bg-indigo-500/10 rounded-full w-96 h-96 blur-[70px] absolute group-hover:opacity-100 opacity-0 transition-opacity duration-300 z-10"
      />
      <div
        ref={cardBorderRef}
        className="w-96 h-96 bg-slate-50/40 -z-50 rounded-full blur-[70px] absolute inset-0 top-[var(--client-y)] left-[var(--client-x)] rotate-90 group-hover:opacity-100 opacity-0 transition-opacity duration-300"
      ></div>

      {/* Card content */}
      <div
        className={clsx(
          "h-full w-full bg-slate-900 p-4 rounded-2xl z-20",
          className
        )}
      >
        {children}
      </div>
    </article>
  )
}
