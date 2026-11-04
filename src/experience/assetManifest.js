import { assetPath } from '../utils/assetPath'

const localAsset = (path) => assetPath(import.meta.env.BASE_URL, `assets/${path}`)

export const ASSETS = Object.freeze({
  intro: Object.freeze({
    map: localAsset('artwork/map.png'),
    steakMap: localAsset('artwork/steak-map.png'),
    redPoint: localAsset('artwork/red-point.png'),
  }),
  hands: Object.freeze({
    cigarette: localAsset('artwork/hand-cigarette.png'),
    torch: localAsset('artwork/hand-torch.png'),
    gun: localAsset('artwork/hand-gun.png'),
  }),
  navigation: Object.freeze({
    arrow: localAsset('artwork/direction-arrow.png'),
  }),
  road: Object.freeze({
    base: localAsset('artwork/road.png'),
    frames: Object.freeze([
      localAsset('artwork/car-01.png'),
      localAsset('artwork/car-02.png'),
      localAsset('artwork/car-03.png'),
      localAsset('artwork/car-04.png'),
    ]),
  }),
  statue: Object.freeze({
    base: localAsset('artwork/street.png'),
    focus: localAsset('artwork/statue.png'),
    pedestrians: Object.freeze([
      localAsset('artwork/pedestrian-01.png'),
      localAsset('artwork/pedestrian-02.png'),
      localAsset('artwork/pedestrian-03.png'),
      localAsset('artwork/pedestrian-04.png'),
      localAsset('artwork/pedestrian-05.png'),
      localAsset('artwork/pedestrian-06.png'),
    ]),
  }),
  tree: Object.freeze({
    base: localAsset('artwork/campus.png'),
    branch: localAsset('artwork/campus-tree.png'),
    apple: localAsset('artwork/campus-apple.png'),
  }),
  city: Object.freeze({
    base: localAsset('artwork/city.png'),
    burnHoles: Object.freeze([
      localAsset('artwork/burn-hole-01.png'),
      localAsset('artwork/burn-hole-02.png'),
      localAsset('artwork/burn-hole-03.png'),
    ]),
    sky: localAsset('artwork/sky.png'),
  }),
  papers: Object.freeze({
    teamlab: localAsset('influences/paper-teamlab.png'),
    discoElysium: localAsset('influences/paper-disco-elysium.png'),
    edithFinch: localAsset('influences/paper-edith-finch.png'),
  }),
  works: Object.freeze({
    teamlab: localAsset('influences/work-teamlab-borderless.jpg'),
    discoElysium: localAsset('influences/work-disco-elysium.png'),
    edithFinch: localAsset('influences/work-edith-finch.jpg'),
  }),
  media: Object.freeze({
    mapBurn: localAsset('media/map-burn.mp4'),
    carGo: localAsset('media/car-go.mp4'),
    statueFirework: localAsset('media/statue-firework.mp4'),
    skyFirework: localAsset('media/sky-firework.mp4'),
  }),
})
