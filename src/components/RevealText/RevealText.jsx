import { useEffect, useRef } from 'react'
import { revealChars, revealLines, revealWords } from '../../animations/revealText'

export function RevealText({
  text,
  lines,
  mode = 'lines',
  as: Tag = 'p',
  className = '',
  delay = 0,
  scroll = true,
}) {
  const ref = useRef(null)

  const content = lines ?? (text ? [text] : [])

  useEffect(() => {
    const root = ref.current
    if (!root) return undefined

    const trigger = scroll
      ? { trigger: root, start: 'top 82%', once: true }
      : undefined

    if (mode === 'words') {
      const words = root.querySelectorAll('.rt__word')
      revealWords(words, { delay, scrollTrigger: trigger })
    } else if (mode === 'chars') {
      const chars = root.querySelectorAll('.rt__char')
      revealChars(chars, { delay, scrollTrigger: trigger })
    } else {
      const lineEls = root.querySelectorAll('.rt__line-inner')
      revealLines(lineEls, { delay, scrollTrigger: trigger })
    }
  }, [mode, delay, scroll, content.join('|')])

  return (
    <Tag className={`rt ${className}`} ref={ref}>
      {content.map((line) => (
        <span className="rt__line" key={line}>
          <span className="rt__line-inner">
            {mode === 'words' || mode === 'chars'
              ? line.split(' ').map((word, wi) => (
                  <span className="rt__word-wrap" key={`${word}-${wi}`}>
                    {mode === 'chars'
                      ? word.split('').map((ch, ci) => (
                          <span className="rt__char" key={`${ch}-${ci}`}>
                            {ch}
                          </span>
                        ))
                      : (
                        <span className="rt__word">{word}</span>
                      )}
                    <span className="rt__space"> </span>
                  </span>
                ))
              : line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
