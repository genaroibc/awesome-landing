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
    <nav className="rounded-full border border-slate-50/10 w-fit mx-auto bg-transparent px-6 sticky top-8 z-30 mb-8 max-w-full">
      <span className="absolute w-full h-full backdrop-blur-xl inset-0 rounded-full bg-black/50" />

      <div className="flex items-center relative h-full group/navbar">
        <span
          className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 z-10 brightness-75 group-hover/navbar:brightness-100"
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
    <button
      onClick={() => setIsSubMenuVisible(isSubMenuVisible => !isSubMenuVisible)}
      onMouseOver={
        thereAreChildItems ? () => setIsSubMenuVisible(true) : undefined
      }
      onMouseLeave={
        thereAreChildItems ? () => setIsSubMenuVisible(false) : undefined
      }
      className="relative z-20 flex items-center gap-1 md:gap-2 p-2 md:p-3 transition-colors duration-200 text-gray-400 hover:text-gray-200 group/navbar-item"
    >
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
        {item.label}
      </div>

      {thereAreChildItems ? (
        <span className="group-hover/navbar-item:-rotate-180 transition-transform duration-300">
          <IconArrow />
        </span>
      ) : null}

      {isSubMenuVisible ? (
        <nav className="absolute top-14 animate-fade-in left-0 backdrop-blur-xl bg-black/50">
          <div className="absolute inset-0 scale-150 -z-10" />
          <ul className="relative rounded-lg border overflow-hidden border-slate-50/10">
            {item.subItems?.map((subItem, index) => (
              <li
                key={index}
                className="py-2 px-4 hover:bg-slate-300/10 transition-colors duration-200 text-gray-400 hover:text-gray-200"
              >
                {subItem.label}
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </button>
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
