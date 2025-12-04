import { highlight } from 'sugar-high'
import Image from 'next/image'
import Counter from '@/components/counter'

function Code({ children, ...props }: any) {
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function CustomImage({ src, alt, width = 800, height = 400, ...props }: any) {
  return (
    <div className="my-8 flex justify-center">
      <Image
        src={src}
        alt={alt || ''}
        width={width}
        height={height}
        className="rounded-lg"
        {...props}
      />
    </div>
  )
}

export const mdxComponents = {
  code: Code,
  Counter,
  img: CustomImage,
  Image: CustomImage
} 