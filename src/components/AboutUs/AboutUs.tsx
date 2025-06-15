import s from './AboutUs.module.scss'
import type { ReactElement } from 'react'

const AboutUs = (): ReactElement => {
  return (
    <section className={s.section}>
      <h3 className={s.title}>Collaboration in our team</h3>
      <p>
        Initially, we would like to express our sincere gratitude to Mikhail Matveev for his exceptional guidance and
        support. The completion of the project, both current and previous ones, is the result of collaborative problem
        solving, where under his guidance we received the best advice and took our mistakes as learning opportunities.
        It was under his wing, through this incredible learning journey, that we met and formed our team. We are
        immensely grateful for the opportunities and experience that the Rolling Scopes School and our mentor gave us,
        allowing us to create this project and grow as professionals.
      </p>
      <p>
        Learning to apply the values of courage, focus, commitment, respect, and openness, the team found solutions in
        non-standard situations while maintaining clarity of goals and mutual trust. Transparent task tracking and
        openness in communication ensured timely adjustment of priorities and high responsibility for everyone. As a
        result, this approach led to the successful completion of the project and laid a solid foundation for subsequent
        real-world practices.
      </p>
    </section>
  )
}

export default AboutUs
