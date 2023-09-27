import { useEffect, useRef, useState } from "react"

const RANDOM_CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%*"

const randomNum = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min)

const encrypt = (text: string) =>
  text
    .split("")
    .map(char =>
      char === " "
        ? " "
        : RANDOM_CHARACTERS[randomNum(0, RANDOM_CHARACTERS.length)]
    )
    .join("")

export function useEncryptedText(text: string, { delay = 0, interval = 60 }) {
  const randomizedTitle = useRef<string>(encrypt(text))
  const [decryptedText, setDecryptedText] = useState<string>(
    randomizedTitle.current
  )

  const lastCharIndex = useRef<number>(0)

  useEffect(() => {
    let intervalId: number

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (lastCharIndex.current >= text.length) {
          clearInterval(intervalId)
          return
        }

        const newChar = text[lastCharIndex.current]

        if (!newChar) return

        lastCharIndex.current++

        setDecryptedText(
          text.slice(0, lastCharIndex.current) +
            randomizedTitle.current.slice(lastCharIndex.current)
        )
      }, interval)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [text])

  return decryptedText
}
