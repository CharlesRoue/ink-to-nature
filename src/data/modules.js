import { validateModule } from './schema'

import writingFoundations from './writing-foundations.json'
import artOfPolishing from './art-of-polishing.json'
import reviewersEye from './reviewers-eye.json'
import responseMastery from './response-mastery.json'

const allModules = [
  writingFoundations,
  artOfPolishing,
  reviewersEye,
  responseMastery,
]

if (import.meta.env.DEV) {
  allModules.forEach((mod) => validateModule(mod))
}

export default allModules

export function getModuleById(moduleId) {
  return allModules.find((m) => m.moduleId === moduleId)
}

export function getLessonById(moduleId, lessonId) {
  const mod = getModuleById(moduleId)
  if (!mod) return null
  return mod.lessons.find((l) => l.id === lessonId)
}

export function getModuleIndex(moduleId) {
  return allModules.findIndex((m) => m.moduleId === moduleId)
}
