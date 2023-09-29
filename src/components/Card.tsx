import clsx, { type ClassValue } from "clsx"
import { useCallback, useRef } from "react"
import { twMerge } from "tailwind-merge"

const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes))

type CardProps = {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  const mouseFollowerRef = useRef<HTMLDivElement>(null)
  const cardBorderRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!mouseFollowerRef.current || !cardBorderRef.current) return

      const { clientX, clientY } = event
      const { offsetLeft, offsetTop } = event.currentTarget
      const { offsetWidth, offsetHeight } = mouseFollowerRef.current
      const x = clientX - offsetLeft - offsetWidth / 2 + scrollX
      const y = clientY - offsetTop - offsetHeight / 2 + scrollY
      mouseFollowerRef.current.style.transform = `translate(${x}px, ${y}px)`
      cardBorderRef.current.style.transform = `translate(${x}px, ${y}px)`
    },
    []
  )

  return (
    <article
      className="border border-slate-50/20 rounded-3xl p-[1px] overflow-hidden relative z-10 group bg-slate-950"
      onMouseMove={handleMouseMove}
    >
      {/* Mouse followers */}
      <div
        ref={mouseFollowerRef}
        className="bg-indigo-500/5 rounded-full w-96 h-96 blur-[70px] absolute group-hover:opacity-100 opacity-0 transition-opacity duration-300 pointer-events-none z-10"
      />
      <div
        ref={cardBorderRef}
        className="bg-slate-50/40 rounded-full w-96 h-96 blur-[70px] absolute group-hover:opacity-100 opacity-0   transition-opacity duration-300 pointer-events-none -z-50"
      ></div>

      {/* Card content */}
      <div
        className={cn(
          "h-full w-full bg-slate-900 p-4 rounded-3xl z-20",
          className
        )}
      >
        {children}
      </div>
    </article>
  )
}
