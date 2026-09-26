
import { Login as LoginComponent } from '../components'
import { Container } from '../components'

function Login() {
  return (
    <div className='py-10 sm:py-14'>
      <Container>
        <LoginComponent />
        <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          Tip — use a password you haven't used elsewhere
        </p>
      </Container>
    </div>
  )
}

export default Login
