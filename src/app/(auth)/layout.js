import styles from './layout.module.css'
import '../globals.css'
export default function AuthLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}