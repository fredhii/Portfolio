import { highlight } from 'sugar-high'
import Counter from '@/components/counter'

function Code({ children, ...props }: any) {
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

export const mdxComponents = {
  code: Code,
  Counter
} 