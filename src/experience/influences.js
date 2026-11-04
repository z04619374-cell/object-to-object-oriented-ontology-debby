import { ASSETS } from './assetManifest'

export const INFLUENCES = Object.freeze([
  Object.freeze({
    id: 'teamlab',
    creator: 'teamLab',
    work: 'teamLab Borderless',
    description: 'teamLab creates immersive digital environments in which light, sound and moving images flow beyond the boundaries of individual rooms. The work influenced this project’s use of space as something unstable, connected and transformed by the viewer’s presence.',
    paperSrc: ASSETS.papers.teamlab,
    imageSrc: ASSETS.works.teamlab,
    imageAlt: 'teamLab Borderless installation',
  }),
  Object.freeze({
    id: 'disco-elysium',
    creator: 'ZA/UM',
    work: 'Disco Elysium',
    description: 'Disco Elysium turns inner thought into an explorable environment, allowing conflicting voices, memories and desires to shape how the world is perceived. It influenced this project’s interest in inaccessible minds and fragmented first-person experience.',
    paperSrc: ASSETS.papers.discoElysium,
    imageSrc: ASSETS.works.discoElysium,
    imageAlt: 'Disco Elysium official key art',
  }),
  Object.freeze({
    id: 'edith-finch',
    creator: 'Giant Sparrow',
    work: 'What Remains of Edith Finch',
    description: 'What Remains of Edith Finch uses domestic spaces and shifting interaction styles to enter incomplete memories. It influenced this project’s movement between ordinary locations, subjective interpretation and surreal transformation.',
    paperSrc: ASSETS.papers.edithFinch,
    imageSrc: ASSETS.works.edithFinch,
    imageAlt: 'The Finch house seen through trees',
  }),
])
