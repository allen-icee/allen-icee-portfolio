// src/components/public/components/CompWanderingCat.tsx
import { useState, useRef, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useAnimationFrame, useMotionValue, useTransform, useMotionTemplate, animate } from 'framer-motion'

const FRAME_SIZE = 64
const IMAGE_WIDTH = 352 * 2
const IMAGE_HEIGHT = 1696 * 2

type AnimState =
  | 'sit' | 'loaf'
  | 'restOpen' | 'restClose' | 'restCurl' | 'restSprawl'
  | 'walk' | 'run' | 'sleep' | 'eat'
  | 'meow' | 'yawn' | 'wash' | 'scratch'
  | 'hiss' | 'pawAttack'

interface AnimConfig {
  frames: number[]
  msPerFrame: number
  speedPx?: number
}

const ANIMATIONS: Record<AnimState, AnimConfig> = {

  sit: { frames: [0], msPerFrame: 1000 },
  loaf: { frames: [22], msPerFrame: 1000 },

  restOpen: { frames: [34], msPerFrame: 1000 },
  restClose: { frames: [36], msPerFrame: 1000 },
  restCurl: { frames: [40], msPerFrame: 1000 },
  restSprawl: { frames: [42], msPerFrame: 1000 },

  walk: { frames: [66, 67, 68, 69, 70, 71, 72, 73], msPerFrame: 100, speedPx: 40 },
  run: { frames: [66, 67, 68, 69, 70, 71, 72, 73], msPerFrame: 60, speedPx: 120 },

  sleep: { frames: [187, 188], msPerFrame: 800 },
  eat: { frames: [253, 254, 255, 256, 257, 258, 259, 260], msPerFrame: 150 },
  meow: { frames: [308, 309, 310], msPerFrame: 200 },
  yawn: { frames: [352, 353, 354, 355, 356, 357, 358, 359], msPerFrame: 150 },
  wash: { frames: [396, 397, 398, 399, 400, 401, 402, 403, 404], msPerFrame: 150 },
  scratch: { frames: [440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450], msPerFrame: 150 },
  hiss: { frames: [462, 463], msPerFrame: 200 },
  pawAttack: { frames: [517, 518, 519, 520, 521, 522, 523], msPerFrame: 100 }
}

const ACCESSORIES = [
  null, 
  '/assets/cats/cat 1 16x16 animation cupid.png',
  '/assets/cats/cat 1 16x16 animation nimbus.png',
  '/assets/cats/cat 1 16x16 animation wings.png',
  '/assets/cats/cat 1 16x16 animation with blue bow 2.png',
  '/assets/cats/cat 1 16x16 animation with gold bow.png',
  '/assets/cats/cat 1 16x16 animation with gold glasses hearts.png',
  '/assets/cats/cat 1 16x16 animation with green bow 2.png',
  '/assets/cats/cat 1 16x16 animation with pink bow 2.png',
  '/assets/cats/cat 1 16x16 animation with pink bow.png',
  '/assets/cats/cat 1 16x16 animation with red bow.png',
  '/assets/cats/cat 1 16x16 animation with red glasses hearts.png'
]

interface CatConfig {
  id: string
  name: string
  spriteUrl: string
  accessoryUrl?: string | null
  startXRatio: number
}

function getViewportW() {
  return typeof window !== 'undefined' ? window.innerWidth : 1200
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function SingleCat({ config }: { config: CatConfig }) {
  const { name, spriteUrl, accessoryUrl: initialAccessory, startXRatio } = config
  const initPixelX = useMemo(() => getViewportW() * startXRatio, [startXRatio])

  const [bubble, setBubble] = useState<string | null>(null)
  const [currentAccessory, setCurrentAccessory] = useState<string | null>(initialAccessory || null)

  const x = useMotionValue(initPixelX)
  const y = useMotionValue(0)
  const initialFrame = ANIMATIONS.sit.frames[0]
  const bgX = useMotionValue(-(initialFrame % 11) * FRAME_SIZE)
  const bgY = useMotionValue(-Math.floor(initialFrame / 11) * FRAME_SIZE)
  const scaleX = useMotionValue(1)

  const zIndex = useTransform(x, (v) => Math.floor(v % 10) + 50)
  const bgPosition = useMotionTemplate`${bgX}px ${bgY}px`

  const state = useRef<AnimState>('sit')
  const frameIndex = useRef(0)
  const timeSinceLastFrame = useRef(0)

  const timeInCurrentState = useRef(0)
  const targetStateDuration = useRef(randomBetween(2000, 5000))
  const targetX = useRef(initPixelX)

  const isDragging = useRef(false)
  const isHovering = useRef(false)
  const isFalling = useRef(false)

  const pickStationaryState = useCallback(() => {

    if (Math.random() < 0.05) {
      setCurrentAccessory(ACCESSORIES[Math.floor(Math.random() * ACCESSORIES.length)])
    }

    const rand = Math.random()
    let next: AnimState = 'sit'

    if (rand < 0.1) next = 'sit'
    else if (rand < 0.2) next = 'loaf'
    else if (rand < 0.25) next = 'restOpen'
    else if (rand < 0.3) next = 'restClose'
    else if (rand < 0.35) next = 'restCurl'
    else if (rand < 0.4) next = 'restSprawl'
    else if (rand < 0.5) next = 'wash'
    else if (rand < 0.6) next = 'scratch'
    else if (rand < 0.7) next = 'eat'
    else if (rand < 0.8) next = 'meow'
    else if (rand < 0.9) next = 'yawn'
    else next = 'sleep'

    state.current = next
    targetStateDuration.current = randomBetween(3000, 7000)
    timeInCurrentState.current = 0
    frameIndex.current = 0
    timeSinceLastFrame.current = 0

    const dialogues: Partial<Record<AnimState, string[]>> = {
      sleep: ['Zzz...', 'purrrrrr...', 'snore', 'honk shoo...', '( -_・)', '(ᴗ_ ᴗ。)'],
      meow: ['Meow!', 'Mew', 'Nya!', 'Mrrrp?', 'Bleh', 'Nyenye', 'Lablab Mr.Alien ♥', '(=^･ω･^=)', '(≧◡≦)', 'Lablab Ms.Dino ♥', 'Mr.Alien is bad', 'Cute ni Ms.Dino!'],
      yawn: ['*yawn*', 'big stretch!', '(O_O;)'],
      eat: ['*munch munch*', 'num num', 'yummy!', '( ˘▽˘)っ♨'],
      wash: ['*lick lick*', 'gotta be clean', '( ＾◡＾)'],
      scratch: ['*scratch scratch*', 'itchy!', '(＞﹏＜)'],
      loaf: ['*loafing*', 'perfect loaf form', '( ◡‿◡ *)', '(=^-ω-^=)'],
      restCurl: ['so cozy', '*curls up*', '(｡♥‿♥｡)']
    }

    const options = dialogues[next]
    if (options) {
      const choice = options[Math.floor(Math.random() * options.length)]
      setBubble(`${name}: ${choice}`)
    } else {
      setBubble(null)
    }
  }, [name])

  const pickMovingState = () => {
    setBubble(null)

    state.current = Math.random() < 0.7 ? 'walk' : 'run'
    frameIndex.current = 0
    timeSinceLastFrame.current = 0

    const vw = getViewportW()
    const minX = 40
    const maxX = Math.max(vw - 80, 50)

    let nextX = randomBetween(minX, maxX)
    if (Math.abs(nextX - x.get()) < 150) {
      nextX = x.get() > maxX / 2 ? x.get() - 200 : x.get() + 200
    }
    nextX = Math.max(minX, Math.min(nextX, maxX))

    targetX.current = nextX
    scaleX.set(nextX > x.get() ? 1 : -1)
  }

  const pickNextAction = () => {
    if (Math.random() < 0.3) {
      pickMovingState()
    } else {
      pickStationaryState()
    }
  }

  const handleCatClick = () => {
    if (isDragging.current) return

    const audio = new Audio('/sounds/hiss.mp3')
    audio.play().catch(e => console.error("Audio play failed, file might be missing", e))

    const isAttack = Math.random() > 0.5
    state.current = isAttack ? 'pawAttack' : 'hiss'

    if (isAttack) {
      const attackDialogues = ['Take that!', 'BAM!', 'Ninja cat!', 'Pow!', 'Hyah!', 'Get away!']
      setBubble(`${name}: ${attackDialogues[Math.floor(Math.random() * attackDialogues.length)]}`)
    } else {
      const hissDialogues = ['HISSSS!', 'Don\'t touch me!', 'Back off!', 'Excuse me?!', 'I bite!', 'No pet! Only look.', 'Personal space!', 'Kulit mo ah!', 'Sumbong kita kay Mama!', 'Sumbong kita kay Papa!', 'Sige ka Dinosaur Mama ko!', 'Sige ka Alien Papa ko!']
      setBubble(`${name}: ${hissDialogues[Math.floor(Math.random() * hissDialogues.length)]}`)
    }

    frameIndex.current = 0
    timeSinceLastFrame.current = 0
    timeInCurrentState.current = 0
    targetStateDuration.current = 1500
  }
  useEffect(() => {
    pickStationaryState()
  }, [pickStationaryState])

  useAnimationFrame((_, delta) => {
    const safeDelta = Math.min(delta, 100)
    const currentAnim = ANIMATIONS[state.current]

    timeSinceLastFrame.current += safeDelta
    if (timeSinceLastFrame.current >= currentAnim.msPerFrame) {
      timeSinceLastFrame.current = 0
      frameIndex.current = (frameIndex.current + 1) % currentAnim.frames.length

      const absFrame = currentAnim.frames[frameIndex.current]
      const col = absFrame % 11
      const row = Math.floor(absFrame / 11)

      bgX.set(-(col * FRAME_SIZE))
      bgY.set(-(row * FRAME_SIZE))
    }

    if (isDragging.current || isHovering.current || isFalling.current) return

    if (state.current === 'walk' || state.current === 'run') {

      const speed = currentAnim.speedPx || 40
      const moveDelta = speed * (safeDelta / 1000)
      const currentX = x.get()
      const distance = Math.abs(targetX.current - currentX)

      if (distance <= moveDelta) {
        x.set(targetX.current)
        pickStationaryState()
      } else {
        const dir = targetX.current > currentX ? 1 : -1
        x.set(currentX + moveDelta * dir)
      }
    } else {

      timeInCurrentState.current += safeDelta
      if (timeInCurrentState.current >= targetStateDuration.current) {
        pickNextAction()
      }
    }
  })

  return (
    <motion.div
      className="absolute bottom-0 select-none cursor-pointer"
      drag
      dragMomentum={false}
      onDragStart={() => {
        isDragging.current = true
        state.current = 'pawAttack'
        setBubble(`${name}: Waaa! Put me down!`)
        frameIndex.current = 0
      }}
      onDragEnd={() => {
        isDragging.current = false
        isFalling.current = true
        state.current = 'run' 
        setBubble(`${name}: Ahhh!`)

        animate(y, 0, {
          type: 'spring',
          stiffness: 300,
          damping: 15,
          onComplete: () => {
            isFalling.current = false
            pickStationaryState()
          }
        })
      }}
      onMouseEnter={() => {
        if (isDragging.current) return
        
        const audio = new Audio('/sounds/meow.mp3')
        audio.play().catch(e => console.error("Audio play failed", e))

        isHovering.current = true
        state.current = 'restCurl'
        setBubble('(｡♥‿♥｡)')
        frameIndex.current = 0
      }}
      onMouseLeave={() => {
        if (isDragging.current) return
        isHovering.current = false
        setBubble(null)
        pickNextAction()
      }}
      onClick={handleCatClick}
      style={{
        x,
        y,
        zIndex,
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))',
        width: FRAME_SIZE,
        height: FRAME_SIZE
      }}
    >
      <AnimatePresence>
        {bubble && (
          <motion.div
            className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 select-none"
            initial={{ opacity: 0, y: 4, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.8 }}
            transition={{ duration: 0.25 }}
          >
            <span className="block whitespace-nowrap rounded-full bg-charcoal/10 px-3 py-1 font-sans text-[10px] font-bold tracking-widest text-charcoal/60 shadow-sm backdrop-blur-sm dark:bg-white/[0.08] dark:text-white/60">
              {bubble}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${spriteUrl}')`,
          backgroundSize: `${IMAGE_WIDTH}px ${IMAGE_HEIGHT}px`,
          imageRendering: 'pixelated',
          scaleX,
          backgroundPosition: bgPosition
        }}
      />

      {currentAccessory && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('${currentAccessory}')`,
            backgroundSize: `${IMAGE_WIDTH}px ${IMAGE_HEIGHT}px`,
            imageRendering: 'pixelated',
            scaleX,
            backgroundPosition: bgPosition
          }}
        />
      )}
    </motion.div>
  )
}

const CAT_DATA: CatConfig[] = [
  { id: 'milktea', name: 'MILKTEA', spriteUrl: '/assets/cats/cat 1.png', accessoryUrl: '/assets/cats/cat 1 16x16 animation with gold glasses hearts.png', startXRatio: 0.2 },
  { id: 'kyatkyat', name: 'KYATKYAT', spriteUrl: '/assets/cats/cat 1.6.png', accessoryUrl: '/assets/cats/cat 1 16x16 animation with red bow.png', startXRatio: 0.5 },
  { id: 'macee', name: 'ALLEN ICEE', spriteUrl: '/assets/cats/cat 1.9.png', accessoryUrl: '/assets/cats/cat 1 16x16 animation cupid.png', startXRatio: 0.8 },
]

export default function CompWanderingCat() {
  return (
    <div
      className="fixed bottom-[-15px] left-0 right-0 z-50 h-16 select-none"
      aria-hidden
    >
      {CAT_DATA.map((cat) => (
        <SingleCat key={cat.id} config={cat} />
      ))}
    </div>
  )
}