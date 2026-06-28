import { Icon } from '@iconify/react'

export function SearchButton() {
  return (
    <button
      className="group flex size-9 items-center justify-center rounded-full text-charcoal/60 transition-colors hover:bg-black/5 hover:text-charcoal dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
      aria-label="Search"
      onClick={() => {
        // Future implementation: Open global search modal
        console.log('Search clicked - to be implemented')
      }}
    >
      <Icon
        icon="lucide:search"
        className="size-4.5 transition-transform duration-200 ease-out group-hover:scale-110"
      />
    </button>
  )
}
