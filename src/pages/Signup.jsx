
import { Signup as SignupComponent, Container } from '../components'
function Signup() {
  return (
    <div className='py-10 sm:py-14'>
      <Container>
        <SignupComponent />
        <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          Free to join — pay only with good stories
        </p>
      </Container>
    </div>
  )
}

export default Signup
