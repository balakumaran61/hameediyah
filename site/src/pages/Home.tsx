import { H0, H1, H2, H3, H4, H5, H6, H7, H8, H9, H10 } from '../sections'

/** Composes the scroll-story in order. Sections own their own content. */
export function Home() {
  return (
    <>
      <H0 />
      <main id="main">
        <H1 /><H2 /><H3 /><H4 /><H5 /><H6 /><H7 /><H8 /><H9 /><H10 />
      </main>
    </>
  )
}
