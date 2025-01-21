import ContentBlock from "@/components/content-block"
import H1 from "@/components/h1"

export default function AccountPage() {
  return (
    <main>
      <H1 className="my-8 text-white">Your account</H1>
      <ContentBlock className="flex h-[500px] items-center justify-center">
        <p>Logged in as ...</p>
      </ContentBlock>
    </main>
  )
}
