import { useEffect, useRef, useState } from "react"

type Item = {
  label: React.ReactNode
  subItems?: Item[]
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
    <nav className="rounded-full border border-slate-50/30 w-fit mx-auto bg-transparent backdrop-blur-3xl px-6 sticky top-8 z-30 mb-8">
      <div className="flex items-center relative h-full">
        <span
          className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300"
          ref={underlineDecorationRef}
        />

        {items.map((item, index) => (
          <li
            data-first-navbar-item={index === 0 ? firstItemId : null}
            onMouseOver={handleMouseOver}
            key={index}
          >
            <NavbarItem item={item} />
          </li>
        ))}
      </div>
    </nav>
  )
}

function NavbarItem({ item }: { item: Item }) {
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false)

  const thereAreChildItems = Number(item.subItems?.length ?? 0)

  return (
    <span
      onMouseOver={
        thereAreChildItems ? () => setIsSubMenuVisible(true) : undefined
      }
      onMouseLeave={
        thereAreChildItems ? () => setIsSubMenuVisible(false) : undefined
      }
      className="relative z-20 flex items-center gap-2 p-3 text-slate-50 hover:text-slate-100 cursor-pointer group"
    >
      <div>{item.label}</div>

      {thereAreChildItems ? (
        <span className="group-hover:-rotate-180 transition-transform duration-300">
          <IconArrow />
        </span>
      ) : null}

      {isSubMenuVisible ? (
        <nav className="absolute top-14 animate-fade-in left-0">
          <div className="absolute inset-0 scale-150 -z-10" />
          <ul className="relative rounded-lg border border-slate-50/30 overflow-hidden">
            {item.subItems?.map((subItem, index) => (
              <li
                key={index}
                className="py-2 px-4 bg-slate-900/50 backdrop-blur-3xl hover:bg-slate-900/90 transition-colors duration-[100ms]"
              >
                {subItem.label}
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </span>
  )
}

function IconArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M6 9l6 6l6 -6"></path>
    </svg>
  )
}
