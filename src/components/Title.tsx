type TitleProps = {
  children: string
}

export function Title({ children }: TitleProps) {
  return (
    <h1
      // @ts-expect-error
      style={{ textWrap: "balance" }}
      className="bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-500 text-4xl md:text-6xl text-center !leading-tight mt-12 mb-16"
      suppressHydrationWarning
    >
      {children}
    </h1>
  )
}
