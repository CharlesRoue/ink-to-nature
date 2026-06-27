// Lightweight runtime validators (no dependencies)

export function validateLesson(lesson) {
  const errors = []
  if (!lesson.id) errors.push('Lesson missing id')
  if (!lesson.title) errors.push(`Lesson ${lesson.id} missing title`)
  if (!lesson.titleCn) errors.push(`Lesson ${lesson.id} missing titleCn`)
  if (!Array.isArray(lesson.cards) || lesson.cards.length === 0) {
    errors.push(`Lesson ${lesson.id} must have at least 1 card`)
  }
  lesson.cards?.forEach((card, i) => {
    if (!card.id) errors.push(`Lesson ${lesson.id} card ${i} missing id`)
    if (!card.titleCn) errors.push(`Lesson ${lesson.id} card ${i} missing titleCn`)
    if (!card.contentCn) errors.push(`Lesson ${lesson.id} card ${i} missing contentCn`)
  })
  if (!Array.isArray(lesson.exercises) || lesson.exercises.length === 0) {
    errors.push(`Lesson ${lesson.id} must have at least 1 exercise`)
  }
  lesson.exercises?.forEach((ex, i) => {
    if (!['choice', 'fill', 'order', 'scenario'].includes(ex.type)) {
      errors.push(`Lesson ${lesson.id} exercise ${i} has invalid type: ${ex.type}`)
    }
  })
  return errors
}

export function validateModule(mod) {
  const errors = []
  if (!mod.moduleId) errors.push('Module missing moduleId')
  if (!mod.title) errors.push('Module missing title')
  if (!mod.color) errors.push('Module missing color')
  if (!Array.isArray(mod.lessons)) errors.push('Module missing lessons array')
  mod.lessons?.forEach((lesson) => {
    errors.push(...validateLesson(lesson))
  })
  if (errors.length > 0) {
    console.warn(`[schema] Module "${mod.moduleId}" has ${errors.length} issues:`, errors)
  }
  return errors
}
