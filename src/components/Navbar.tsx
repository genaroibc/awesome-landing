import { useEffect, useRef } from "react"

type Item = {
  label: string
}

type Props = {
  items: Item[]
}

const firstItemId = "first-item-id"

export function Navbar({ items }: Props) {
  const underlineDecorationRef = useRef<HTMLSpanElement>(null)

  const handleMouseOver = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    if (underlineDecorationRef.current) {
      underlineDecorationRef.current.style.transform = `translateX(${e.currentTarget.offsetLeft}px)`
      underlineDecorationRef.current.style.width = `${e.currentTarget.offsetWidth}px`
    }
  }
  useEffect(() => {
    if (underlineDecorationRef.current) {
      const firstItemWidth =
        document
          .querySelector(`[data-first-navbar-item=${firstItemId}]`)
          ?.clientWidth?.toString() ?? "0"

      underlineDecorationRef.current.style.width = `${firstItemWidth}px`
    }
  }, [])

  return (
    <nav className="rounded-full border border-slate-50/30 w-fit bg-slate-950 px-6">
      <div className="flex items-center gap-6 relative overflow-hidden h-full py-3">
        <span
          className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300"
          ref={underlineDecorationRef}
        />

        {items.map((item, index) => (
          <span
            data-first-navbar-item={index === 0 ? firstItemId : null}
            onMouseOver={handleMouseOver}
            key={index}
          >
            {item.label}
          </span>
        ))}
      </div>
    </nav>
  )
}
