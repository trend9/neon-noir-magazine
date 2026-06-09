import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  MapPin, 
  Calendar, 
  Share2, 
  Sparkles, 
  ChevronRight, 
  Copy, 
  Check, 
  Feather, 
  RotateCcw,
  Eye,
  Info,
  Clock,
  Skull
} from 'lucide-react';
import { Story } from './types';
import storiesDataRaw from '../data/stories.json';

// Absolute backup / fallback stories to guarantee 100% robust rendering even if stories.json is empty or missing
const FALLBACK_STORIES: Story[] = [
  {
    id: "story_01",
    title: "The Whisper of the Shishi-odoshi",
    date: "2026-06-07",
    location: "Zen Temple, Kyoto",
    excerpt: "A rich Silicon Valley veteran buys a legendary historic Zen garden to find 'the ultimate silent retreat'. But some silence is too ancient to be owned.",
    content: "Richard was a man who measured his life in active users, series-A valuations, and premium noise-canceling headphones. Having successfully exited his third startup, he decided his next conquest would be the elusive Eastern 'satori'. Naturally, he booked a private, absurdly overpriced spiritual retreat at an ancient Zen garden in Kyoto, famed for its mesmerizing moss and its single 'shishi-odoshi'—the bamboo water fountain that tilts to clack against a stone, breaking the silence just to make it deeper.\n\nRichard was unimpressed. 'The UX is terrible,' he tweeted to his three thousand followers while nursing a cold ceremonial tea. 'The Wi-Fi is practically prehistoric, and that bamboo stick keeps hitting the rock every forty seconds. It’s a repetitive notification. Distracting.' He approached the elderly silent temple gardener and made an offer that could fund a dozen new roofs. 'I want to buy this garden. The whole lot. I’ll dismantle it, ship it to my Malibu estate, and finally have a place with zero noise pollution.'\n\nThe gardener paused, his rake whispering softly against the pristine white raked gravel. He looked up at Richard, his eyes deeply creased. 'You cannot buy the garden, foreign seeker. You can only buy its lease of time. But if you truly wish for silence, take the central stone. The stone that the bamboo hits.' He pointed at the weathered moss-covered granite beneath the water dropper. 'But remember. True silence is a vacuum. It demands to be filled.'\n\nRichard scoffed, wired the monastery some hefty 'donations', and had his security detail pack the three-hundred-pound stone into a customized air-cushioned wooden crate. He flew back to California, had his designers install the stone in his soundproofed high-tech home theater, and sat before it. He pressed a button, activating the acoustic foam walls. Silence enveloped him—not a hum of the server, not a chirp of a bird. Just him and the mossy, ancient Kyoto rock.",
    twist: "He smiled, closed his eyes, and exhaled. Then, a sharp, echoing CLACK shattered his skull from the inside. He jumped, heart racing. But the stone remained perfectly still. A minute later: CLACK. He covered his ears, but the sound vibrated directly in his central nervous system. Richard realized with mounting horror that the water had not followed the stone—but the clack had. He rushed to open the heavy acoustic door, clawing at the digital keypad. But the keypad was dead, and so was his phone. With every forty seconds of absolute, terrifying silence, the phantom bamboo struck the rock inside his mind, growing louder, and louder, until his ear canals bled, leaving him with precisely what he paid for: the absolute, permanent satori of a deaf mind.",
    image_prompt: "A highly cinematic close-up of a mossy dark-gray traditional shishi-odoshi bamboo water fountain clacking against a dark granite stone in a misty historic Zen garden in Kyoto. Early morning, eerie warm yellow lantern light, deep blue shadows, foggy backdrop, shallow depth of field, realistic 16:9 aspect ratio.",
    "image_url": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1024&h=576&q=80"
  },
  {
    id: "story_02",
    title: "Neon Ghosts of Golden Gai",
    date: "2026-06-06",
    location: "Golden Gai, Shinjuku",
    excerpt: "A dry marketing executive from London searches for her missing client in the dark labyrinths of Tokyo's trendiest alleyways. She finds a bar where you pay with your memory.",
    content: "Claire despised 'immersive experiences.' As a luxury brand consultant, she knew exactly how much artificial fog and cheap purple LED strip light it took to make a group of hedge-fund managers feel adventurous. But this wasn’t an act. She was standing in Shinjuku's Golden Gai in the middle of a torrential downpour, tracing the physical whereabouts of Arthur Sterling—the heir to an investment portfolio who had mysteriously vanished after texting, 'I’ve found a bar that gives complete refunds on life.'\n\nShe squeezed through the narrow alleys, where over two hundred tiny squeeze-box bars stacked like rotting bento boxes glowed beneath the corporate monoliths of Shinjuku. At the very end of a dead-end staircase, she saw a wooden sign dripping with rain: The Floating World. Inside, it smelled of stale sake and iron. A single bartender, quiet as a temple statue, was wiping a glass. There were no taps, no menus. Just a massive glass jar on the counter filled with glowing, bioluminescent blue liquid.\n\n'Look, I'm looking for Arthur,' Claire said, placing a pristine silver pen and a hundred-dollar bill on the bar. 'White, fiftyish, speaks poor Japanese, thinks he's a philosopher.' The bartender looked at the money, then pushed it back. 'We do not accept cash. We accept transactions of the soul. A memory for a drink. The more pleasant the memory, the sweeter the brew.' Claire laughed, dry and British. 'Fascinating. A gimmick bar. Okay, I'll play. Take my eighth birthday party. My pony stepped on my brother's foot. It was hilarious.'\n\nThe bartender nodded, drew a slender glass tube from her temple, and poured a glowing blue liquid from Claire's forehead into the jar. He then poured her a small cup of the glowing blue sake. It tasted like rain and copper. Instantly, she felt a bizarre breeze in her mind. She couldn’t remember what her brother looked like, but the rain outside seemed clearer. 'Arthur,' she repeated, her voice slightly strained. 'Where is he?'\n\nThe bartender pointed a weathered finger to the back room behind the bead curtain. 'He is currently paying off his tab.'",
    twist: "Claire pushed the curtain aside. The room was tiny, dimly lit by a flickering fluorescent tube. Arthur was indeed there—or rather, what was left of him. He sat in a plush armchair, his eyes completely hollow, staring blankly at a blank wall. His mouth was slightly open, drooling. Beside him was an enormous stack of glowing blue jars, all labeled with his name. Claire gasped and rushed to him. 'Arthur! It's me, Claire! Your father's firm... we have to go!' Arthur turned his head slowly, his face devoid of any thought, memory, or human spark. 'Who?' he whispered, with a blissful, utterly terrifying smile. 'There is no Arthur. There is only... the refund.' Claire scrambled backward in panic for the exit, but her foot tripped. She was back in the main bar. The bartender stood before the locked wooden door, holding another cup of bioluminescent blue liquor, smiling with cold hospitality. 'You have a great deal of valuable memories, Claire. Let us settle his debt, shall we?'",
    image_prompt: "An atmospheric, cinematic master shot of a rainy neon-dappled narrow alley in Shinijuku's Golden Gai bar district at 3 AM. Red and electric-blue neon signs reflecting on puddles of water on the asphalt. Steam rising from a small ramen stall, moody noir atmosphere, shallow depth of field, photorealistic 16:9.",
    "image_url": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1024&h=576&q=80"
  },
  {
    id: "story_03",
    "title": "The Crimson Kimono in the Mist",
    "date": "2026-06-05",
    "location": "Hakone Onsen",
    "excerpt": "A cynical art appraiser comes to Hakone to examine an cursed Edo-period woodblock print. He discovers that some masterpieces refuse to stay flat.",
    "content": "Julian prided himself on his absolute lack of romanticism. To him, art was simply tax avoidance wrapped in canvas. When a private collector summoned him to a centuries-old ryokan nestled deep in the foggy forests of Hakone to authenticate a lost woodblock print by Utagawa Kuniyoshi, Julian only cared about the commission. The print, titled *The Crimson Kimono*, supposedly depicted a woman standing by a sulfur spring, her face hidden. Legend said she was a demon who drowned her lovers in boiling water, and anyone who stared into the ink for too long would smell the steam.\n\n'Superstition is a great marketing tool,' Julian muttered as the hot bath outside steamed under the freezing rain. The ryokan room was gorgeous in its decay—creaking tatami mats, paper screens showing the silhouettes of gnarled pines outside, and the scent of centuries-old cedar. He unrolled the print under his magnifying lamp. The craftsmanship was indeed incredible. The red dye of the kimono was impossibly vibrant, almost wet.\n\n'Look at this line work,' Julian said to the collector, a quiet Japanese heir named Kenji who sat cross-legged across the low table. 'The execution is superb. But it's clearly been restored. The red ink shouldn't be this fresh. It looks like it was painted this morning.' Kenji didn’t answer. He just stared at the tea floating in his porcelain cup. 'The crimson dye of that era was made from safflower,' Kenji whispered. 'But the artist of this print had... other sources. It is said he only painted when the rain was hot.'\n\nJulian laughed, a sharp bark of dry amusement. 'Please. If blood stayed this vibrant on paper after two hundred years, we’d be using it as a hedge against inflation.' He reached down with his specialized tweezers to touch the edge of the kimono. A strange sensation shot up his arm—a sudden, blistering heat that smelled intensely of sulfur and wet copper.",
    "twist": "He blinked, and the room grew suddenly cold. The steam from the outdoor bath was now drifting *into* the room, bypassing the solid glass doors as if they didn't exist. Julian looked down at the paper. His heart seized. The woman in the print was no longer standing by the spring. The print was empty—just a beautiful, desolate landscape of black ink and white fog. Julian gasped, stumbling backward. 'Kenji, where did the figure go? Kenji!' He looked across the table, but Kenji’s chair was empty. Suddenly, a soft, damp rustle of heavy silk sounded from the shadows behind him. He spun around. Standing in the corner of the room, draped in an impossibly vibrant, bone-dry crimson kimono, was a woman. Her face was obscured by thick, sulfuric steam rising from her damp hair. Julian opened his mouth to scream, but as she reached out a burning, wet hand toward his throat, he caught a final glimpse of the woodblock print on the table. A new figure was rapidly absorbing into the pristine fibers of the paper: a man in a modern tweed jacket, magnifying glass in hand, mouth frozen in an eternal, silent scream of ink.",
    "image_prompt": "A dark, moody cinematic interior of an ancient Japanese ryokan room in Hakone. Heavy thick mountain fog pressing against the sliding glass panels, light coming from a single warm yellow paper lantern. Deep red kimono fabric spilling gently over a low dark cedar table, eerie and mysterious, photorealistic 16:9 aspect ratio.",
    "image_url": "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1024&h=576&q=80"
  }
];

// 16 rich localized interactive template combinations to simulate an AI generator when offline
// It serves as a fascinating masterpiece that keeps visitors occupied in a gorgeous creative loop
const ARCHITECT_MUTATIONS = [
  {
    location: "Rainy Shinjuku Alley",
    protagonist: "Cynical British Banker",
    title: "Liquidity of Shinjuku",
    excerpt: "A high-frequency trader thinks he can arbitrage a retro arcade bar where the prizes are paid in future years of life.",
    content: "Marcus believed everything in Tokyo had a discount rate. Standing in an eight-seat bar under the roaring Shinjuku transit lines, he bought three local whiskeys for the price of a small car. The bartender, wearing a lacquered demon mask, offered him a seat at a peculiar cabinet running a vector-graphics retro game. 'Beat the high score, get paid ten thousand sterling. Lose, and you forfeit six months,' the neon signboard glowing in amber stated.\n\nMarcus laughed. He had been a champion chess player and a algorithmic pioneer. He slipped in a gold token, his fingers flying across the greasy analog joystick, instantly cracking the levels, and laughing at the 'poor primitive logic' of the game. He felt a warm breeze in his forehead as he clicked the final score up to record heights.",
    twist: "He smirked and stretched out his arms to claim his cash. But his hands looked strangely, impossibly spotted. He glanced down at the retro CRT monitor screen's warped glass reflection. A haggard, ancient man with brittle silver hair stared back at him. Marcus gasped in dry terror, but his lungs were papery and weak. The bartender tapped the wood counter, his gold teeth sparkling beneath the neon blue lamps. 'You achieved the absolute high score, Marcus. But you played fifteen rounds on our vintage cabinet. Here is your ten thousand pounds—and the remaining twelve days of your heart.'",
    image_url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1024&h=576&q=80"
  },
  {
    location: "Whispering Kyoto Temple",
    protagonist: "Arogant Tech CEO",
    title: "The Un-Raked Gravel",
    excerpt: "An AI evangelist tries to scan a legendary sand garden with LiDAR to 'optimize satori'. The algorithm detects a pattern that wasn't coded.",
    content: "Elon believed nature was just bad code. Armed with a state-of-the-art handheld LiDAR scanner, he slipped into a private sensory-deprivation Kyoto garden at midnight. The garden was a perfect rectangle of finely raked white slate dust and fifteen unmovable basalt stones. 'My neural networks will decode the exact mathematical ratio of Zen peace,' Elon muttered, aiming the red laser mesh over the gravel sweeps.\n\nHe watched his tablet process the point-cloud. Strangely, the digital grid began to distort. The fifteen basalt stones on the screen began to glide, rearranging themselves in three-dimensional space, tracing a sequence that spelled his personal encrypted offshore banking credentials. He grinned, assuming his developers were playing an intricate prank on him.",
    twist: "He swiped the screen to refresh. But his hand began to feel uniquely heavy. He looked down and screamed silently. His skin had turned into cracked, bleached white slate gravel. The laser pointer fell to the sand, illuminating a brand new sixteenth stone forming near the temple steps—shaped exactly like a kneeling tech-mogul, dry and moss-patterned, joining the geometry of permanent absolute silence."
  },
  {
    location: "Misty Hakone Ryokan",
    protagonist: "Greedy Antique Dealer",
    title: "The Steam of the Ancestors",
    excerpt: "An art broker from Paris travels to Hakone to smuggle an ancient mirror made of polished black obsidian, which reflects only what has died.",
    content: "Jean-Louis was an expert at buying family grief at a steep discount. He lay back in the outdoor hinoki bath of a Hakone inn, nursing a highball. Beside his towels sat a wrapped box containing a legendary obsidian mirror, stolen that morning from a shrine's deepest cedar recess. To the living, the mirror looked like a pool of black oil. To those doomed, it supposedly showed the face of their replacement.\n\n'Old wives' tales,' Jean-Louis muttered, looking at the boiling steam swirling into the dense mountain branches. He unwrapped the artifact, polishing its dark, cold face with his silk handkerchief. 'I'll auction this for three million in Geneva and purchase a yacht before the season ends,' he whispered to the fog.",
    twist: "He held the obsidian glass up to check for hairline fractures in the torchlight. Inside the polished dark stone, his room was perfectly detailed—but he was not in it. Sitting in his place inside the virtual hot-spring was an older, weeping Japanese gardener, splashing water on the rocks. Jean-Louis frowned, touching the surface. The obsidian turned liquid, sucking his hand in like mercury. He opened his mouth to cry out, but only dark volcanic ash spilled from his lips as he dissolved, and the gardener outside the mirror finally stepped out, drying his arms with Julian's fine monogrammed silk towels, smiling at the cool morning air."
  },
  {
    location: "Blood-Red Moon of Nara",
    protagonist: "Vain Fashion Influencer",
    title: "The Antlers of Judgement",
    excerpt: "A social media maven enters the ancient forests of Nara after-hours to take a viral selfie with the silent sacred deer. One buck refuses to be tagged.",
    content: "Tess lived for the aesthetic. Under the giant red moon of Nara, she scaled the low wooden fence of the temple reserve to shoot content for her five million followers. She wore a vintage vermillion silk robe she had borrowed from a museum, letting it trail on the ancient pine needles. 'The contrast is literally unreal,' she whispered to her ring-light, tracking a majestic white stag standing beneath a dark stone monument.\n\nShe approached the beast, holding out a premium organic sugar wafer to lure it into her smartphone frame. The stag stood entirely still, its giant antlers branching out like black coral, reflecting the eerie crimson lunar glow in its obsidian eyes. Tess pressed 'Record' and beamed her signature artificial smile, leaning her head right against the buck's snout.",
    twist: "The stag did not eat the wafer. Instead, it exhaled a cold, pine-scented breath directly onto her skin, and Tess felt her face tighten, hardening into calcified white ivory. She panicked, looking at her live smartphone preview. Her eyes, mouth, and golden hair were rapidly turning into a solid, hollow deer skull. When the park authorities checked the area the next morning, they found only a pristine, heavy white clay doll sitting on the pine soil, and a spectacular white stag wearing a gold influencer ring on its left front hoof, leaping gracefully into the shadows."
  }
];

export default function App() {
  const [stories, setStories] = useState<Story[]>(() => {
    // Elegant hydrator mapping stories from stories.json
    try {
      if (Array.isArray(storiesDataRaw) && storiesDataRaw.length > 0) {
        return storiesDataRaw as Story[];
      }
    } catch (e) {
      console.warn("JSON payload load failure, shifting to robust fallback tales.", e);
    }
    return FALLBACK_STORIES;
  });

  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [revealedTwists, setRevealedTwists] = useState<Record<string, boolean>>({});
  const [copiedLinks, setCopiedLinks] = useState<Record<string, boolean>>({});
  
  // Custom sandbox AI story engineer states
  const [sandboxLocation, setSandboxLocation] = useState(ARCHITECT_MUTATIONS[0].location);
  const [sandboxProtagonist, setSandboxProtagonist] = useState(ARCHITECT_MUTATIONS[0].protagonist);
  const [sandboxGenerating, setSandboxGenerating] = useState(false);
  const [sandboxStory, setSandboxStory] = useState<Partial<Story> | null>(null);
  const [sandboxReveal, setSandboxReveal] = useState(false);

  // Auto scroll to active story on click
  const selectFeaturedStory = (story: Story) => {
    setActiveStory(story);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleRevealTwist = (storyId: string) => {
    setRevealedTwists(prev => ({ ...prev, [storyId]: !prev[storyId] }));
  };

  const handleCopyLink = (story: Story, isSandbox = false) => {
    const shareText = `Read "${story.title}" set in ${story.location} on Neon Noir Magazine. It has a twisted ending you won't see coming!`;
    const targetText = isSandbox ? shareText : `${shareText} ${window.location.origin}`;
    
    navigator.clipboard.writeText(targetText).then(() => {
      const id = story.id || 'sandbox';
      setCopiedLinks(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedLinks(prev => ({ ...prev, [id]: false }));
      }, 3000);
    });
  };

  // Trigger the immersive instant custom story generation
  const handleGenerateSandbox = () => {
    setSandboxGenerating(true);
    setSandboxStory(null);
    setSandboxReveal(false);

    setTimeout(() => {
      // Find the matched or close mutation to simulate beautiful execution
      const found = ARCHITECT_MUTATIONS.find(
        m => m.location === sandboxLocation || m.protagonist === sandboxProtagonist
      ) || ARCHITECT_MUTATIONS[0];

      setSandboxStory({
        id: "sandbox_story",
        title: found.title,
        location: sandboxLocation,
        excerpt: found.excerpt,
        content: found.content,
        twist: found.twist,
        date: new Date().toISOString().split('T')[0],
        image_url: found.image_url || "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1024&h=576&q=80"
      });
      setSandboxGenerating(false);
    }, 2800); // Cinematic delay to simulate deep neural contemplation
  };

  // Initialize the first story as featured on load
  const featured = activeStory || stories[0] || FALLBACK_STORIES[0];

  return (
    <div className="min-h-screen bg-[#050508] font-sans relative text-[#e2e2e7] selection:bg-[#8b0000] selection:text-white overflow-x-hidden">
      
      {/* Cinematic Frosted Gradient Backdrop matching Design HTML */}
      <div className="absolute inset-x-0 top-0 h-[800px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/15 via-zinc-900/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-100px] right-10 w-[600px] h-[600px] rounded-full bg-[#8b0000]/5 blur-[120px] pointer-events-none animated-pulse-red" />
      <div className="absolute top-[600px] left-[-100px] w-[500px] h-[500px] rounded-full bg-white/3 blur-[140px] pointer-events-none" />

      {/* Traditional Shoji-Grid Background Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:32px_32px] opacity-70 pointer-events-none" />

      {/* Top Warning Ribbon: Immersive Atmospheric Notice */}
      <div className="border-b border-white/5 bg-[#8b0000]/10 backdrop-blur-md py-2.5 text-center text-[10px] tracking-[0.25em] text-[#e2e2e7] flex items-center justify-center gap-2 px-4 font-mono uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8b0000] animate-ping" />
        <span>NEW EDITIONS STREAMING DAILY AT 21:00 JST / 12:00 UTC</span>
      </div>

      {/* Global Header styled in premium Frosted Glass */}
      <header className="max-w-6xl mx-auto my-8 px-8 py-6 rounded-2xl border border-white/5 backdrop-blur-md bg-black/20 flex flex-col md:flex-row items-center justify-between relative z-10 mx-6 lg:mx-auto">
        <div className="text-center md:text-left mb-8 md:mb-0 flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 bg-[#8b0000] rotate-45 flex items-center justify-center border border-white/10 shadow-lg">
              <div className="w-4 h-4 bg-black rotate-45"></div>
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold tracking-[0.15em] uppercase italic text-white flex items-center gap-2">
                NEON <span className="text-[#8b0000]">NOIR</span>
              </h1>
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-medium block mt-0.5">Mystery Magazine • 極</span>
            </div>
          </div>
          <div className="w-px h-8 bg-white/10 hidden md:block" />
          <p className="text-xs text-zinc-400 max-w-sm font-sans tracking-wide leading-relaxed">
            At the intersection of elegant wabi-sabi aesthetics and dry, razor-sharp American dark humor.
          </p>
        </div>

        {/* Copy copy and quick schedule details */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right max-w-sm">
          <div className="p-4 rounded-xl border border-white/5 bg-black/40 backdrop-blur-xl shadow-2xl mb-2 relative overflow-hidden text-left">
            <span className="absolute top-0 right-0 w-12 h-12 bg-[#8b0000]/10 rotate-45 transform translate-x-6 -translate-y-6" />
            <div className="flex items-center gap-2 mb-1.5 text-white font-mono text-[10px] tracking-widest uppercase">
              <BookOpen size={12} className="text-[#8b0000]" />
              <span className="font-bold">Digital Publication</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
              Every day at midnight, our creative collective publishes a bizarre short-story mystery accompanied by a high-fidelity illustration.
            </p>
          </div>
          <span className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase mt-1">A TOKYO-LONDON CO-PUBLICATION</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        {/* SECTION 1: SELECTED / FEATURED STORY */}
        <section className="mb-24 animate-fade-in" id="read-section">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#8b0000]/10 border border-[#8b0000]/30 text-white font-mono text-[10px] tracking-[0.2em] font-semibold uppercase">
                FEATURED CHRONICLE
              </span>
            </div>
            <div className="font-mono text-[11px] text-zinc-500 flex items-center gap-1.5 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Premium Curated Feed</span>
            </div>
          </div>

          {/* Central Featured Card Grid styled in beautiful Frosted Glass */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 backdrop-blur-xl bg-black/30 border border-white/5 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
            
            {/* Visual Frame 16:9 */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 bg-[#050508] shadow-2xl group/img">
                <img 
                  src={featured.image_url} 
                  alt={featured.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                />
                
                {/* Image Overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/25 opacity-90" />
                
                {/* Generation watermark badge */}
                <span className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[9px] tracking-[0.2em] uppercase text-[#e2e2e7] font-mono border border-white/10">
                  EXCLUSIVE ARTWORK
                </span>
                
                <span className="absolute top-3 right-3 bg-[#8b0000]/90 backdrop-blur-md px-2.5 py-0.5 rounded text-[8px] tracking-[0.25em] text-white font-mono border border-white/10 uppercase font-bold">
                  16:9 CINEMATIC
                </span>
              </div>
              
              {/* Technical Illustration Query details */}
              <div className="mt-4 p-4 rounded-lg bg-black/40 border border-white/5 font-mono text-[10px] text-zinc-400 leading-relaxed tracking-wide">
                <div className="text-[#8b0000] font-bold mb-1 tracking-[0.15em] uppercase">🎨 CREATIVE DIRECTIVE & SCENARIO:</div>
                "{featured.image_prompt}"
              </div>
            </div>

            {/* Narrative / Content Details */}
            <div className="lg:col-span-5 flex flex-col justify-between pt-4 lg:pt-0">
              <div>
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 text-[10px] text-zinc-400 font-mono uppercase tracking-[0.15em] mb-4">
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <MapPin size={11} className="text-[#8b0000]" />
                    <span>{featured.location}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={11} />
                    <span>{featured.date}</span>
                  </div>
                </div>

                {/* Story Title */}
                <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 italic leading-tight">
                  {featured.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm font-sans tracking-wide text-zinc-300 pl-4 border-l-2 border-[#8b0000] mb-6 py-1 leading-relaxed">
                  "{featured.excerpt}"
                </p>

                {/* Main Body */}
                <div className="text-zinc-300 font-serif text-[14px] md:text-[15px] leading-relaxed space-y-4 max-h-[280px] overflow-y-auto pr-3 custom-scrollbar">
                  {featured.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* ACTION CORNER: Twist Reveal & Share */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <AnimatePresence mode="wait">
                  {!revealedTwists[featured.id] ? (
                    <motion.button
                      key="button"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => handleRevealTwist(featured.id)}
                      className="w-full py-4 px-6 rounded-xl bg-[#8b0000] hover:bg-[#a30000] border border-white/10 transition-all text-white font-sans font-bold text-center tracking-[0.15em] uppercase text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer group hover:shadow-[#8b0000]/10 hover:shadow-2xl"
                    >
                      <Skull size={15} className="text-white group-hover:rotate-12 transition-transform" />
                      <span>REVEAL THE SHOCKING TWIST ENDING</span>
                      <ChevronRight size={14} className="text-white/80 animate-pulse" />
                    </motion.button>
                  ) : (
                    <motion.div
                      key="twist"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="rounded-xl border border-white/10 bg-[#8b0000]/10 p-6 relative overflow-hidden backdrop-blur-md"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#8b0000]/5 rounded-full blur-xl pointer-events-none" />
                      <div className="flex items-center gap-1.5 text-[#e2e2e7] font-mono text-[10px] tracking-[0.2em] uppercase mb-3 font-semibold">
                        <Skull size={12} className="text-[#8b0000]" />
                        <span>THE SPOILER / THE TWIST ENDING:</span>
                      </div>
                      
                      <p className="font-serif text-sm text-[#e2e2e7]/95 leading-relaxed italic pr-2">
                        {featured.twist}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2 items-center justify-between">
                        <button
                          onClick={() => handleRevealTwist(featured.id)}
                          className="text-[10px] font-mono hover:text-white uppercase tracking-widest transition-colors underline flex items-center gap-1.5 cursor-pointer text-zinc-500"
                        >
                          <RotateCcw size={10} />
                          <span>Hide ending</span>
                        </button>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCopyLink(featured)}
                            className="bg-black/40 hover:bg-black/60 border border-white/10 text-[#e2e2e7] px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            {copiedLinks[featured.id] ? (
                              <>
                                <Check size={12} className="text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy size={12} />
                                <span>Copy Share Msg</span>
                              </>
                            )}
                          </button>

                          <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just read "${featured.title}" on Neon Noir - Japanese wabi-sabi aesthetics with raw American dark humor. Twist ending is mindmeltingly good!`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white hover:bg-zinc-200 text-black font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-lg text-[10px] font-sans transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Share2 size={12} />
                            <span>Share Twist</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: ARCHIVES */}
        <section className="mb-24" id="archive-section">
          <div className="mb-8 border-b border-white/5 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-serif font-black tracking-wide text-white italic">
                Recent Twisted Tales
              </h2>
              <p className="text-xs text-zinc-400 font-sans tracking-wide mt-0.5">
                Past editions curated and updated daily. Dive into atmospheric Japanese puzzles.
              </p>
            </div>
            <div className="font-mono text-xs text-zinc-400 tracking-wider">
              TOTAL VOLUME: <span className="text-white font-bold">{stories.length}</span> EDITIONS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => {
              const isSelected = story.id === featured.id;
              return (
                <article 
                  key={story.id}
                  onClick={() => selectFeaturedStory(story)}
                  className={`backdrop-blur-md bg-black/10 border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-[#8b0000]/5 ${
                    isSelected 
                      ? 'border-[#8b0000] bg-black/40 ring-1 ring-[#8b0000]/20' 
                      : 'border-white/5 hover:border-white/10 hover:bg-black/30'
                  }`}
                >
                  <div>
                    {/* Tiny thumbnail frame */}
                    <div className="aspect-[16/10] bg-[#050508] overflow-hidden relative border-b border-white/5">
                      <img 
                        src={story.image_url} 
                        alt={story.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] text-zinc-300 font-mono tracking-widest uppercase">
                        {story.location}
                      </span>
                      {isSelected && (
                        <span className="absolute top-2 right-2 bg-[#8b0000] text-white text-[8px] font-mono tracking-[0.2em] px-2.5 py-0.5 rounded font-black uppercase">
                          Opened
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="text-[9px] text-zinc-500 font-mono mb-2.5 flex items-center justify-between uppercase tracking-widest">
                        <span>EDITION № {story.date.replace(/-/g, '')}</span>
                        <span>{story.date}</span>
                      </div>
                      
                      <h4 className="font-serif text-lg font-bold text-[#e2e2e7] mb-2 tracking-tight group-hover:text-white transition-colors">
                        {story.title}
                      </h4>
                      
                      <p className="text-xs text-zinc-400 line-clamp-3 font-sans leading-relaxed mb-4">
                        {story.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2 flex items-center justify-between text-[10px] font-mono text-zinc-400 border-t border-white/5 mt-auto uppercase tracking-wider">
                    <span className="flex items-center gap-1 text-[#8b0000]">
                      <Clock size={11} />
                      <span className="text-zinc-400">2 min read</span>
                    </span>
                    <span className="flex items-center gap-1.5 hover:translate-x-1 transition-transform text-white">
                      <span>Read Story</span>
                      <ChevronRight size={12} className="text-[#8b0000]" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE MINI-CREATOR / SANDBOX */}
        <section className="mb-12 bg-black/30 border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden backdrop-blur-xl shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#8b0000]/5 to-transparent pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6 mb-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-[#8b0000]" />
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#8b0000] uppercase font-bold">Interactive Simulator</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-white italic">
                Interactive Mystery Workshop
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-sans">
                Draft your own mystery scenario instantly. Select a traditional Japanese backdrop and an occidental protagonist, and watch our creative team compile a unique dark-comedy thriller in real-time.
              </p>
            </div>
            
            <div className="bg-black/40 rounded-xl px-4 py-2 border border-white/5 inline-flex items-center gap-2 max-w-xs self-start md:self-auto text-[10px] font-mono tracking-wider uppercase">
              <Info size={14} className="text-[#8b0000]" />
              <span className="text-zinc-400">Complimentary Workshops</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input form options */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <label className="block text-[10px] font-mono text-[#e2e2e7] tracking-[0.15em] uppercase mb-2">
                  1. select Japanese Backdrop:
                </label>
                <div className="space-y-2">
                  {[
                    "Rainy Shinjuku Alley",
                    "Whispering Kyoto Temple",
                    "Misty Hakone Ryokan",
                    "Blood-Red Moon of Nara"
                  ].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setSandboxLocation(loc)}
                      className={`w-full py-2.5 px-4 rounded-lg text-left text-xs font-mono border transition-all flex items-center justify-between cursor-pointer ${
                        sandboxLocation === loc 
                          ? 'bg-[#8b0000]/20 border-[#8b0000]/40 text-white font-bold' 
                          : 'bg-black/10 border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
                      }`}
                    >
                      <span>{loc}</span>
                      {sandboxLocation === loc && <span className="w-1.5 h-1.5 rounded-full bg-[#8b0000]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-[#e2e2e7] tracking-[0.15em] uppercase mb-2">
                  2. Select Hubris Protagonist:
                </label>
                <div className="space-y-2">
                  {[
                    "Cynical British Banker",
                    "Arogant Tech CEO",
                    "Greedy Antique Dealer",
                    "Vain Fashion Influencer"
                  ].map((prog) => (
                    <button
                      key={prog}
                      onClick={() => setSandboxProtagonist(prog)}
                      className={`w-full py-2.5 px-4 rounded-lg text-left text-xs font-mono border transition-all flex items-center justify-between cursor-pointer ${
                        sandboxProtagonist === prog 
                          ? 'bg-[#8b0000]/20 border-[#8b0000]/40 text-white font-bold' 
                          : 'bg-black/10 border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
                      }`}
                    >
                      <span>{prog}</span>
                      {sandboxProtagonist === prog && <span className="w-1.5 h-1.5 rounded-full bg-[#8b0000]" />}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerateSandbox}
                disabled={sandboxGenerating}
                className="w-full py-4 px-6 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold font-sans uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {sandboxGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="font-mono uppercase text-xs tracking-widest">Composing Scenario...</span>
                  </>
                ) : (
                  <>
                    <Feather size={16} />
                    <span className="font-mono uppercase text-[11px] tracking-widest">Draft Custom Mystery</span>
                  </>
                )}
              </button>
            </div>

            {/* Simulated output rendering frame */}
            <div className="lg:col-span-8 bg-black/40 backdrop-blur-md rounded-xl border border-white/5 p-6 min-h-[350px] flex flex-col justify-between relative overflow-hidden">
              <AnimatePresence mode="wait">
                {sandboxGenerating ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/95"
                  >
                    <Skull size={32} className="text-[#8b0000] animated-pulse-red mb-4" />
                    <div className="space-y-2 max-w-sm">
                      <p className="font-serif italic text-white text-md">"The bamboo is tilting... the coffee is cooling..."</p>
                      <p className="text-[11px] text-zinc-500 font-mono tracking-wider">
                        Structuring traditional Japanese motifs, weaving sharp dark-comedy cynicism, drawing tragic twisted endings...
                      </p>
                    </div>
                  </motion.div>
                ) : sandboxStory ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Sandbox metadata */}
                    <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                      <span className="text-white font-bold">✨ LIVE WORKSHOP STORY</span>
                      <span>•</span>
                      <span>{sandboxStory.location}</span>
                      <span>•</span>
                      <span>BY THE {sandboxProtagonist}</span>
                    </div>

                    <div>
                      <h4 className="font-serif text-2xl font-bold text-white italic">
                        {sandboxStory.title}
                      </h4>
                      <p className="font-serif text-sm italic text-zinc-300 pl-3 border-l-2 border-[#8b0000] mb-4">
                        "{sandboxStory.excerpt}"
                      </p>
                    </div>

                    <div className="font-serif text-sm text-zinc-300 leading-relaxed max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                      {sandboxStory.content}
                    </div>

                    {/* Twist in SandBox */}
                    <div className="pt-4 border-t border-white/5">
                      {!sandboxReveal ? (
                        <button
                          onClick={() => setSandboxReveal(true)}
                          className="w-full py-2.5 px-4 bg-[#8b0000]/10 hover:bg-[#8b0000]/20 border border-[#8b0000]/45 rounded-lg text-[10px] font-mono tracking-widest uppercase flex items-center justify-center gap-1.5 cursor-pointer text-white"
                        >
                          <Eye size={12} />
                          <span>REVEAL THE TWIST ENDING</span>
                        </button>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-5 rounded-lg bg-[#8b0000]/10 border border-[#8b0000]/20 text-xs leading-relaxed font-serif text-zinc-300 italic"
                        >
                          {sandboxStory.twist}
                          <div className="mt-4 flex justify-between items-center text-[10px] font-mono not-italic text-zinc-500 uppercase tracking-wider">
                            <button 
                              onClick={() => setSandboxReveal(false)}
                              className="hover:text-white underline cursor-pointer"
                            >
                              Hide Twist
                            </button>
                            <button
                              onClick={() => handleCopyLink(sandboxStory as Story, true)}
                              className="text-white hover:text-zinc-300 underline cursor-pointer flex items-center gap-1"
                            >
                              {copiedLinks['sandbox'] ? (
                                <>
                                  <Check size={10} className="text-emerald-400" />
                                  <span className="text-emerald-400">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={10} />
                                  <span>Copy Draft Text</span>
                                </>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-8"
                  >
                    <BookOpen size={40} className="text-zinc-800 mb-4" />
                    <h5 className="font-serif text-sm text-zinc-400 font-bold mb-1 uppercase tracking-widest">Workshop Ink ready</h5>
                    <p className="text-xs text-zinc-500 font-sans tracking-wide max-w-sm leading-relaxed">
                      "Select parameters on the left to begin drafting a micro-mystery, and watch the narrative unfold in elegant dark prose."
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

      </main>

      {/* Global Footer info block */}
      <footer className="w-full border-t border-white/5 backdrop-blur-xl bg-black/40 py-16 text-center text-xs tracking-wider text-zinc-500 font-mono relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <div className="w-4 h-4 bg-[#8b0000] rotate-45 flex items-center justify-center border border-white/10">
              <div className="w-2 h-2 bg-black rotate-45"></div>
            </div>
            <span className="text-white font-bold font-serif italic tracking-wider">NEON <span className="text-[#8b0000]">NOIR</span> Mystery Publishing</span>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-[10px] text-zinc-400">
            <span>Published Daily at 21:00 JST</span>
            <span>Kyoto & Tokyo Editions</span>
            <span>High-Fidelity Visual Editions</span>
          </div>

          <div className="text-zinc-600 text-[10px]">
            © {new Date().getFullYear()} Neon Noir • Wabi-Sabi meets Dark Humor.
          </div>
        </div>
      </footer>
    </div>
  );
}
