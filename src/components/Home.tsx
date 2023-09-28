import { Navbar } from "@/components/Navbar.tsx"
import { Card } from "@/components/Card"
import { Title } from "@/components/Title"
import { useEncryptedText } from "@/hooks/useEncryptedText"

export function Home() {
  const encryptedText = useEncryptedText("the world's most popular NFTs", {
    delay: 700,
    interval: 60
  })

  return (
    <section>
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

      <div className="my-28">
        <Title>
          {"Discover "
            .concat(encryptedText)
            .concat(", collectibles and digital art")}
        </Title>
      </div>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(min(400px,100%),1fr))] gap-4 my-12">
        <CustomCard />
        <CustomCard />
        <CustomCard />
        <CustomCard />
      </section>
    </section>
  )
}

const CustomCard = () => (
  <Card className="max-w-xl bg-slate-950 mx-auto">
    <img
      src="https://picsum.photos/300/200"
      alt=""
      width="300"
      height="200"
      className="w-full rounded-md mb-4 brightness-50"
    />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste amet debitis
      dolores. Est deserunt perspiciatis harum? Harum omnis aliquid nam
      aspernatur amet ullam nihil esse similique, laboriosam ab distinctio
      ducimus.
    </p>
  </Card>
)
