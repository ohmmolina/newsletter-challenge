import { NewsletterGetter } from '../../../application/NewsletterGetter'
import { NewsletterCreator } from '../../../application/NewsletterCreator'
import { NewsletterUpdater } from '../../../application/NewsletterUpdater'
import { InMemoryNewsletterRepository } from '../../implementations/inMemory/inMemomryNewsletterRepository'
;(async () => {
  const NewsletterRepository = new InMemoryNewsletterRepository()
  const newsletterCreator = new NewsletterCreator(NewsletterRepository)
  newsletterCreator.run({
    id: '3',
    email: 'example3@email.com',
    name: 'Example 3',
    createdAt: new Date(),
    updatedAt: new Date(),
    subscribed: true
  })

  const newsletterGetter = new NewsletterGetter(NewsletterRepository)
  let newsletters = await newsletterGetter.run()
  console.log(newsletters)

  const newsletterUpdater = new NewsletterUpdater(NewsletterRepository)
  newsletterUpdater.run({
    id: '3',
    email: 'example_3@email.com',
    name: 'Example 3 (1)',
    createdAt: new Date(),
    updatedAt: new Date(),
    subscribed: false
  })

  newsletters = await newsletterGetter.run()
  console.log(newsletters)
})()
