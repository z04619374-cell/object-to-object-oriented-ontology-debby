import { assetPath } from '../utils/assetPath'

// EDITING GUIDE
// - Journey title/date/caption: location, date, caption
// - Four text perspectives: perspectives[].text
// - Photographs and their data: images[]
// Fields omitted from metadata are omitted from the on-screen data panel.
export const journeys = [
  {
    id: 'emerald-lake-memory',
    location: 'Emerald',
    date: '01 Sep 2026',
    caption: 'ME, CAMERA, DEBBY, RAILING, FRIENDS, WOODS.',
    images: [
      {
        src: assetPath(import.meta.env.BASE_URL, 'images/IMG_7109.JPG'),
        alt: 'Debby centred against tall trees beside a black railing near Menzies Creek',
        subject: 'Debby',
        metadata: {
          file: 'IMG_7109.JPG',
          date: '01 / 09 / 2026',
          time: '16:41',
          camera: 'Apple iPhone 15 Pro',
          lens: 'Main Camera · 24 mm · ƒ/1.78',
          dimensions: '4032 × 2268 · 9 MP · 2.4 MB',
          profile: 'Rich Contrast',
          exposure: 'ISO 100 · 48 mm · −0.7 EV · ƒ/1.78 · 1/144 sec',
          location: '47 School Road, Menzies Creek VIC 3159, Australia',
        },
      },
      {
        src: assetPath(import.meta.env.BASE_URL, 'images/IMG_7074.jpg'),
        alt: 'Debby in profile beside a railing, looking across trees and a winding path at Emerald Lake Park',
        subject: 'Debby',
        metadata: {
          file: 'IMG_7074.JPG',
          date: '01 / 09 / 2026',
          time: '16:23',
          camera: 'Apple iPhone 15 Pro',
          lens: 'Ultra Wide Camera · 13 mm · ƒ/2.2',
          dimensions: '2268 × 1588 · 3 MP · 2.8 MB',
          profile: 'Rich Contrast',
          exposure: 'ISO 40 · 14 mm · −0.7 EV · ƒ/2.2 · 1/157 sec',
          location: 'Emerald Lake Park, VIC 3782, Australia',
        },
      },
      {
        src: assetPath(import.meta.env.BASE_URL, 'images/IMG_7076.jpg'),
        alt: 'A person in profile beside the same railing, looking across trees and a winding path',
        subject: 'Photographer',
        metadata: {},
      },
    ],
    perspectives: [
      { id: 'debby', label: 'DEBBY', text: 'My owner and I are sitting on this steam train, and I can sit on the railing and see the woods beside us, just like the gril beside me.' },
      { id: 'photographer', label: 'PHOTOGRAPHER', text: 'I sat with Debby on this steam train. I positioned her next to the railing and took a photo of her from behind, making it look as if she were looking at the scenery. I tried my best to avoid capturing my hand supporting her, which would have ruined the shot. I took a photo of my friend standing in the same spot as Debby, and we both thought it was really fun.' },
      { id: 'camera', label: 'CAMERA', text: '01 SEP 2026 · 16:23 / 16:41 · TWO RECORDED POSITIONS · TWO NAMED SUBJECTS' },
      { id: 'memory', label: 'MEMORY', text: 'It was very windy on the little train that day. The view of Debby on the train against the backdrop of the woods was beautiful—it looked like the perfect scene for stop-motion animation.' },
    ],
  },
]
