// Layout container primitive (003) — centres content with a max width and the
// DESIGN.md 8px-based gutters. Shared shell chrome so later pages (004-008) keep
// consistent measure without re-deriving padding. Width caps differ per tree:
// mobile is full-bleed with side gutters; desktop is a readable column.
export default function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={['mx-auto w-full max-w-5xl px-5 md:px-8', className].join(' ')} {...rest}>
      {children}
    </Tag>
  )
}
