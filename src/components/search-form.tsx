"use client"

import { useSearchContext } from "@/lib/hooks"

export default function SearchForm() {
  const { searchQuery, handleChangeSearchQuery } = useSearchContext()
  return (
    <form className="size-full">
      <input
        className="size-full rounded-md bg-white/20 px-5 outline-none transition placeholder:text-white/50 hover:bg-white/50 focus:bg-white/50"
        placeholder="Search pets"
        type="search"
        value={searchQuery}
        onChange={(e) => console.log(e.target.value)}
      />
    </form>
  )
}
