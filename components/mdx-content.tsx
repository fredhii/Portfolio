import { highlight } from 'sugar-high'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'

import Counter from '@/components/counter'

function Code({ children, ...props }: any) {
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

const components = {
  code: Code,
  Counter
}

type MDXContentProps = MDXRemoteProps & {
  children?: React.ReactNode
}

export default function MDXContent(props: MDXContentProps) {
  // If props.source is provided, use MDXRemote (for raw MDX content)
  if (props.source) {
    return (
      <MDXRemote
        {...props}
        components={{ ...components, ...(props.components || {}) }}
      />
    )
  }
  
  // If props.children is provided, render the compiled content directly
  return (
    <div className="mdx-content">
      {props.children}
    </div>
  )
}
