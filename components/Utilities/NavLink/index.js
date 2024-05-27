import { useRouter } from 'next/router'
import Link from 'next/link'
import PropTypes from 'prop-types'

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  exact: PropTypes.bool,
}

NavLink.defaultProps = {
  exact: false,
}

export default function NavLink({
  href,
  exact,
  children,
  js,
  setActive,
  ...props
}) {
  const { pathname } = useRouter()
  // debugger
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  if (isActive) {
    props.className += ' active'
    if (setActive) setActive(isActive)
  } else {
    if (setActive) setActive(isActive)
  }
  if (js) console.log('js---', js)
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}
