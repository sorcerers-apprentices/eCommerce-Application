import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import { About } from './About/About'
import s from './AboutSection.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { Link } from 'react-router-dom'

export const AboutSection = (): ReactElement => {
  const [magicOne, setMagicOne] = useState(true)
  const [magicTwo, setMagicTwo] = useState(false)
  const [magicThree, setMagicThree] = useState(false)
  const [about, setAbout] = useState(false)
  const TIME_OF_MAGIC = 1000
  useEffect(() => {
    if (magicThree) {
      const timer = setTimeout(() => {
        setAbout(true)
        setMagicThree(false)
      }, TIME_OF_MAGIC)

      return (): void => clearTimeout(timer)
    }
  }, [magicThree])
  return (
    <section className={`section ${s.section} ${magicThree ? s.white : ''}`}>
      {magicOne && (
        <div className={s.magic}>
          <p>To uncover the secret knowledge of the Sorcerer's Apprentices, you must cast a powerful spell...</p>
          <p>
            Say the magic words <span className={s.abracadabra}>"Abracadabra!"</span> and then click the button below.
          </p>
          <Button
            onClick={() => {
              setMagicTwo(true)
              setMagicOne(false)
            }}
          >
            Abracadabra!
          </Button>
        </div>
      )}
      {magicTwo && (
        <div className={s.magic}>
          <p>No, no, no... </p>
          <p>
            You must say <span className={s.abracadabra}>"Abracadabra!"</span> loudly and clearly!
          </p>
          <p>Or perhaps... you're just a Muggle?</p>
          <div className={s.buttons}>
            <Button
              onClick={() => {
                setMagicThree(true)
                setMagicTwo(false)
              }}
            >
              ABRAKADABRA!
            </Button>
            <Link to={RoutePath.MAIN}>
              <Button onClick={() => setMagicTwo(false)}>I'm a Muggle :(</Button>
            </Link>
          </div>
        </div>
      )}
      {magicThree && (
        <div className={s.loading}>
          <p>
            Secret knowledge <br />
            is loading...
          </p>
        </div>
      )}
      {about && <About />}
    </section>
  )
}
