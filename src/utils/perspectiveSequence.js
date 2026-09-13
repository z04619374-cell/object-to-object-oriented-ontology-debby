export function splitSentences(text) {
  return (text.match(/[^.!?]+(?:[.!?]+|$)/g) ?? [])
    .map((sentence) => sentence.trim())
    .filter(Boolean)
}

export function buildPerspectiveSequence(perspectives) {
  return perspectives.flatMap((perspective) =>
    splitSentences(perspective.text).map((text, sentenceIndex) => ({
      id: `${perspective.id}-${sentenceIndex}`,
      perspectiveId: perspective.id,
      label: perspective.label,
      text,
    })),
  )
}
