import { Navbar } from "@/components/Navbar.tsx"
import { Title } from "@/components/Title"
import { useEncryptedText } from "@/hooks/useEncryptedText"

export function Home() {
  const encryptedText = useEncryptedText("the world's most popular NFTs", {
    delay: 700,
    interval: 60
  })

  return (
    <>
      <Navbar
        items={[
          {
            label: "Home"
          },
          {
            label: "Meet the Team",
            subItems: [
              {
                label: (
                  <a href="/click" className="flex items-center gap-2">
                    <div className="flex items-center justify-center rounded-[7px] bg-gradient-to-tr transition-colors from-neutral-900 to-neutral-950 group-hover:from-neutral-800 group-hover:to-neutral-900 w-8 h-8">
                      <img src="https://doodleipsum.com/30x30/avatar" alt="" />
                    </div>
                    Jhon
                  </a>
                )
              },
              {
                label: (
                  <a href="/click" className="flex items-center gap-2">
                    <div className="flex items-center justify-center rounded-[7px] bg-gradient-to-tr transition-colors from-neutral-900 to-neutral-950 group-hover:from-neutral-800 group-hover:to-neutral-900 w-8 h-8">
                      <img src="https://doodleipsum.com/40x40/avatar" alt="" />
                    </div>
                    Alice
                  </a>
                )
              },
              {
                label: (
                  <a href="/click" className="flex items-center gap-2">
                    <div className="flex items-center justify-center rounded-[7px] bg-gradient-to-tr transition-colors from-neutral-900 to-neutral-950 group-hover:from-neutral-800 group-hover:to-neutral-900 w-8 h-8">
                      <img src="https://doodleipsum.com/50x50/avatar" alt="" />
                    </div>
                    Thomas
                  </a>
                )
              }
            ]
          },
          {
            label: "Products",
            subItems: [
              {
                label: 2
              },
              {
                label: "Domains"
              },
              {
                label: "Apps"
              },
              {
                label: "Marketing"
              }
            ]
          }
        ]}
      />

      <section>
        <div className="my-28">
          <Title>
            {"Discover "
              .concat(encryptedText)
              .concat(", collectibles and digital art")}
          </Title>
        </div>
      </section>
    </>
  )
}
