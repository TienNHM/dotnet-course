import { courseTree, type Stage } from '../course'

declare const data: Stage[]
export { data }

export default {
  watch: ['../../lessons/**/*.md'],
  load: courseTree,
}
